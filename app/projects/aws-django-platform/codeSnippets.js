// Code excerpts from https://github.com/samuelincoln1/aws-django-platform

export const repositoryTreeCode = `aws-django-platform/
├── app/                  # Django application, Dockerfile and tests
├── ci/
│   ├── buildspec-build.yml
│   ├── buildspec-deploy.yml
│   └── deploy.sh
├── docs/                 # Architecture diagram and cost analysis
├── infra/
│   ├── bootstrap/        # Terraform state bucket
│   ├── modules/
│   │   ├── alb/
│   │   ├── cdn/
│   │   ├── ecr/
│   │   ├── ecs/
│   │   ├── pipeline/
│   │   ├── rds/
│   │   ├── s3/
│   │   ├── secrets/
│   │   ├── vpc/
│   │   └── waf/
│   ├── main.tf
│   ├── outputs.tf
│   ├── variables.tf
│   └── versions.tf
└── docker-compose.yml`;

export const bootstrapCode = `resource "aws_s3_bucket" "terraform_state" {
  bucket = var.state_bucket_name

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Name      = "terraform-state"
    ManagedBy = "terraform"
  }
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`;

export const versionsCode = `terraform {
  # Write-only arguments (password_wo, secret_string_wo) require Terraform >= 1.11.
  required_version = ">= 1.11"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }

  # Partial configuration: values come from backend.hcl (see backend.hcl.example).
  backend "s3" {}
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = local.tags
  }
}

# CloudFront-scoped resources (WAF web ACL, viewer certificate) must live in us-east-1.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = local.tags
  }
}`;

export const backendHclCode = `# Copy to backend.hcl and run: terraform init -backend-config=backend.hcl
bucket       = "example-terraform-state"
key          = "django-app/prod/terraform.tfstate"
region       = "us-east-1"
encrypt      = true
use_lockfile = true # S3 native state locking, no DynamoDB table needed`;

export const vpcLocalsCode = `locals {
  az_count = length(var.availability_zones)

  # One /24 per subnet and AZ, in blocks: public, then app, then database.
  # With 2 AZs and 10.0.0.0/16: public 10.0.1-2, app 10.0.3-4, db 10.0.5-6.
  public_cidrs = [for i in range(local.az_count) : cidrsubnet(var.cidr_block, 8, 1 + i)]
  app_cidrs    = [for i in range(local.az_count) : cidrsubnet(var.cidr_block, 8, 1 + local.az_count + i)]
  db_cidrs     = [for i in range(local.az_count) : cidrsubnet(var.cidr_block, 8, 1 + 2 * local.az_count + i)]
}

resource "aws_vpc" "main" {
  cidr_block           = var.cidr_block
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "\${var.name}-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "\${var.name}-igw"
  }
}`;

export const subnetsCode = `# Public: only the ALB lives here
resource "aws_subnet" "public" {
  count = local.az_count

  vpc_id            = aws_vpc.main.id
  cidr_block        = local.public_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "\${var.name}-public-\${var.availability_zones[count.index]}"
    Tier = "public"
  }
}

# Private: ECS tasks
resource "aws_subnet" "app" {
  count = local.az_count

  vpc_id            = aws_vpc.main.id
  cidr_block        = local.app_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "\${var.name}-app-\${var.availability_zones[count.index]}"
    Tier = "app"
  }
}

# Private: RDS primary and standby
resource "aws_subnet" "db" {
  count = local.az_count

  vpc_id            = aws_vpc.main.id
  cidr_block        = local.db_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "\${var.name}-db-\${var.availability_zones[count.index]}"
    Tier = "db"
  }
}`;

export const routeTablesCode = `resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "\${var.name}-public"
  }
}

# No default route: private subnets have no internet access (no NAT gateway).
# AWS services are reached through the VPC endpoints below.
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "\${var.name}-private"
  }
}

resource "aws_route_table_association" "app" {
  count = local.az_count

  subnet_id      = aws_subnet.app[count.index].id
  route_table_id = aws_route_table.private.id
}`;

export const s3EndpointCode = `# Gateway endpoint (free). Used to pull image layers from ECR and to upload
# static files to the application bucket.
resource "aws_vpc_endpoint" "s3" {
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.\${var.region}.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = [aws_route_table.private.id]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        # ECR stores image layers in this AWS-owned bucket
        Sid       = "ECRImageLayers"
        Effect    = "Allow"
        Principal = "*"
        Action    = ["s3:GetObject"]
        Resource  = ["arn:aws:s3:::prod-\${var.region}-starport-layer-bucket/*"]
      },
      {
        Sid       = "StaticFiles"
        Effect    = "Allow"
        Principal = "*"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket",
          "s3:GetBucketLocation"
        ]
        Resource = [
          "arn:aws:s3:::\${var.static_bucket_name}",
          "arn:aws:s3:::\${var.static_bucket_name}/*"
        ]
      }
    ]
  })

  tags = {
    Name = "\${var.name}-s3"
  }
}`;

export const interfaceEndpointsCode = `# Interface endpoints required by Fargate tasks without internet access:
# pull images (ecr.api, ecr.dkr), ship logs (logs) and read secrets (secretsmanager).
resource "aws_vpc_endpoint" "interface" {
  for_each = toset(["ecr.api", "ecr.dkr", "logs", "secretsmanager"])

  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.\${var.region}.\${each.key}"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = aws_subnet.app[*].id
  security_group_ids  = [aws_security_group.vpc_endpoints.id]
  private_dns_enabled = true

  tags = {
    Name = "\${var.name}-\${replace(each.key, ".", "-")}"
  }
}

resource "aws_security_group" "vpc_endpoints" {
  name_prefix = "\${var.name}-vpce-"
  vpc_id      = aws_vpc.main.id
  description = "Interface VPC endpoints"

  ingress {
    description = "HTTPS from the app subnets"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = local.app_cidrs
  }

  tags = {
    Name = "\${var.name}-vpce"
  }

  lifecycle {
    create_before_destroy = true
  }
}`;

export const albSecurityGroupCode = `# AWS-managed list of the IP ranges CloudFront uses to reach origins
data "aws_ec2_managed_prefix_list" "cloudfront" {
  name = "com.amazonaws.global.cloudfront.origin-facing"
}

resource "aws_security_group" "alb" {
  name_prefix = "\${var.name}-alb-"
  description = "ALB: HTTPS from CloudFront only"
  vpc_id      = var.vpc_id

  # The prefix list counts as ~55 rules against the security group quota (60),
  # which is why only port 443 is opened. HTTP -> HTTPS happens at CloudFront.
  ingress {
    description     = "HTTPS from CloudFront"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    prefix_list_ids = [data.aws_ec2_managed_prefix_list.cloudfront.id]
  }

  egress {
    description = "Traffic and health checks to the ECS tasks"
    from_port   = var.target_port
    to_port     = var.target_port
    protocol    = "tcp"
    cidr_blocks = var.app_subnet_cidrs
  }

  tags = {
    Name = "\${var.name}-alb"
  }

  lifecycle {
    create_before_destroy = true
  }
}`;

export const albCode = `resource "aws_lb" "main" {
  name               = "\${var.name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = var.public_subnet_ids

  drop_invalid_header_fields = true
}

resource "aws_lb_target_group" "app" {
  name        = "\${var.name}-tg"
  port        = var.target_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  deregistration_delay = 30

  health_check {
    enabled             = true
    path                = var.health_check_path
    matcher             = "200"
    interval            = 30
    timeout             = 10
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }

  lifecycle {
    create_before_destroy = true
  }
}`;

export const albListenerCode = `resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = var.certificate_arn

  # Anything that did not come through CloudFront is rejected
  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "Forbidden"
      status_code  = "403"
    }
  }
}

resource "aws_lb_listener_rule" "from_cloudfront" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 1

  condition {
    http_header {
      http_header_name = var.origin_verify_header_name
      values           = [var.origin_verify_header_value]
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}`;

export const originSecretCode = `# Shared secret that CloudFront adds to every origin request. The ALB only
# forwards requests carrying it, so the load balancer cannot be reached directly.
resource "random_password" "origin_verify" {
  length  = 32
  special = false
}`;

export const cdnPoliciesCode = `data "aws_cloudfront_cache_policy" "disabled" {
  name = "Managed-CachingDisabled"
}

data "aws_cloudfront_cache_policy" "optimized" {
  name = "Managed-CachingOptimized"
}

# Forwards Host, cookies, query strings and headers to the ALB. Because the
# Host header is forwarded, CloudFront validates the ALB certificate against
# domain_name, so the ALB listener uses a certificate for the same domain.
data "aws_cloudfront_origin_request_policy" "all_viewer" {
  name = "Managed-AllViewer"
}

resource "aws_cloudfront_origin_access_control" "static" {
  name                              = "\${var.name}-static"
  description                       = "Access to the static files bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}`;

export const cdnDistributionCode = `resource "aws_cloudfront_distribution" "main" {
  enabled         = true
  is_ipv6_enabled = true
  http_version    = "http2and3"
  price_class     = var.price_class
  aliases         = [var.domain_name]
  web_acl_id      = var.web_acl_arn
  comment         = var.name

  origin {
    origin_id   = "alb"
    domain_name = var.alb_dns_name

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }

    custom_header {
      name  = var.origin_verify_header_name
      value = var.origin_verify_header_value
    }
  }

  origin {
    origin_id                = "static"
    domain_name              = var.static_bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.static.id
  }

  # Application: dynamic, never cached
  default_cache_behavior {
    target_origin_id         = "alb"
    viewer_protocol_policy   = "redirect-to-https"
    allowed_methods          = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods           = ["GET", "HEAD"]
    cache_policy_id          = data.aws_cloudfront_cache_policy.disabled.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.all_viewer.id
    compress                 = true
  }

  # Static files: served from S3 and cached at the edge
  ordered_cache_behavior {
    path_pattern           = "/static/*"
    target_origin_id       = "static"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = data.aws_cloudfront_cache_policy.optimized.id
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}`;

export const cdnBucketPolicyCode = `resource "aws_s3_bucket_policy" "static" {
  bucket = var.static_bucket_id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontRead"
        Effect    = "Allow"
        Principal = { Service = "cloudfront.amazonaws.com" }
        Action    = "s3:GetObject"
        Resource  = "\${var.static_bucket_arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.main.arn
          }
        }
      }
    ]
  })
}

resource "aws_route53_record" "app" {
  for_each = var.route53_zone_id == null ? toset([]) : toset(["A", "AAAA"])

  zone_id = var.route53_zone_id
  name    = var.domain_name
  type    = each.key

  alias {
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
    evaluate_target_health = false
  }
}`;

export const wafCode = `# Attached to the CloudFront distribution, so it inspects every request to the
# application (CloudFront is the only path to the ALB).
resource "aws_wafv2_web_acl" "main" {
  name  = "\${var.name}-waf"
  scope = "CLOUDFRONT"

  default_action {
    allow {}
  }

  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 1

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "CommonRuleSet"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWSManagedRulesKnownBadInputsRuleSet"
    priority = 2

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesKnownBadInputsRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "KnownBadInputs"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWSManagedRulesSQLiRuleSet"
    priority = 3

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesSQLiRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "SQLiRuleSet"
      sampled_requests_enabled   = true
    }
  }

  # Requests per IP within a 5-minute window
  rule {
    name     = "RateLimitPerIP"
    priority = 4

    action {
      block {}
    }

    statement {
      rate_based_statement {
        limit              = var.rate_limit
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "RateLimitPerIP"
      sampled_requests_enabled   = true
    }
  }

  dynamic "rule" {
    for_each = length(var.blocked_countries) > 0 ? [1] : []

    content {
      name     = "GeoBlock"
      priority = 5

      action {
        block {}
      }

      statement {
        geo_match_statement {
          country_codes = var.blocked_countries
        }
      }

      visibility_config {
        cloudwatch_metrics_enabled = true
        metric_name                = "GeoBlock"
        sampled_requests_enabled   = true
      }
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "\${var.name}-waf"
    sampled_requests_enabled   = true
  }
}`;

export const ecsClusterCode = `resource "aws_ecs_cluster" "main" {
  name = var.name

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/\${var.name}"
  retention_in_days = var.log_retention_days
}`;

export const ecsIamCode = `# Used by the ECS agent: pull the image, write logs, read secrets
resource "aws_iam_role" "execution" {
  name               = "\${var.name}-task-execution"
  assume_role_policy = data.aws_iam_policy_document.ecs_tasks_assume.json
}

resource "aws_iam_role_policy" "execution_secrets" {
  name = "read-app-secrets"
  role = aws_iam_role.execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["secretsmanager:GetSecretValue"]
        Resource = var.secret_arns
      }
    ]
  })
}

# Used by the application code: upload static files to S3
resource "aws_iam_role" "task" {
  name               = "\${var.name}-task"
  assume_role_policy = data.aws_iam_policy_document.ecs_tasks_assume.json
}

resource "aws_iam_role_policy" "task_static_files" {
  name = "static-files"
  role = aws_iam_role.task.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:ListBucket"]
        Resource = var.static_bucket_arn
      },
      {
        Effect   = "Allow"
        Action   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
        Resource = "\${var.static_bucket_arn}/*"
      }
    ]
  })
}`;

export const ecsSecurityGroupCode = `# DNS needs no rule: traffic to the VPC resolver is not filtered by security groups.
resource "aws_security_group" "tasks" {
  name_prefix = "\${var.name}-tasks-"
  vpc_id      = var.vpc_id
  description = "ECS tasks"

  ingress {
    description     = "Application port from the ALB"
    from_port       = var.container_port
    to_port         = var.container_port
    protocol        = "tcp"
    security_groups = [var.alb_security_group_id]
  }

  egress {
    description     = "HTTPS to the interface VPC endpoints"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [var.vpc_endpoints_security_group_id]
  }

  egress {
    description     = "HTTPS to S3 through the gateway endpoint"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    prefix_list_ids = [var.s3_prefix_list_id]
  }

  egress {
    description = "PostgreSQL"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = var.db_subnet_cidrs
  }

  tags = {
    Name = "\${var.name}-tasks"
  }

  lifecycle {
    create_before_destroy = true
  }
}`;

export const ecsTaskDefinitionCode = `# The pipeline registers new revisions of this family with the image of each
# commit. Terraform owns everything else (env vars, CPU, memory, roles): a
# change here creates a new revision that the next pipeline run builds upon.
resource "aws_ecs_task_definition" "app" {
  family                   = var.name
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.cpu
  memory                   = var.memory
  execution_role_arn       = aws_iam_role.execution.arn
  task_role_arn            = aws_iam_role.task.arn

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  container_definitions = jsonencode([
    {
      name      = local.container_name
      image     = var.container_image
      essential = true

      portMappings = [
        {
          containerPort = var.container_port
          protocol      = "tcp"
        }
      ]

      environment = [for k, v in var.environment : { name = k, value = v }]
      secrets     = [for k, v in var.secrets : { name = k, valueFrom = v }]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.app.name
          "awslogs-region"        = var.region
          "awslogs-stream-prefix" = "app"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "curl -fs http://localhost:\${var.container_port}/healthz/ || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 30
      }
    }
  ])
}`;

export const ecsServiceCode = `resource "aws_ecs_service" "app" {
  name            = var.name
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.min_capacity
  launch_type     = "FARGATE"
  propagate_tags  = "SERVICE"

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [aws_security_group.tasks.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = local.container_name
    container_port   = var.container_port
  }

  # Rolling update that never drops below the current capacity
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200
  health_check_grace_period_seconds  = 60

  # Failed deployment (tasks not becoming healthy) rolls back automatically
  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  lifecycle {
    # desired_count is owned by autoscaling, task_definition by the pipeline
    ignore_changes = [desired_count, task_definition]
  }

  depends_on = [aws_iam_role_policy_attachment.execution]
}`;

export const ecsAutoscalingCode = `resource "aws_appautoscaling_target" "app" {
  service_namespace  = "ecs"
  resource_id        = "service/\${aws_ecs_cluster.main.name}/\${aws_ecs_service.app.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  min_capacity       = var.min_capacity
  max_capacity       = var.max_capacity
}

resource "aws_appautoscaling_policy" "cpu" {
  name               = "\${var.name}-cpu-target-tracking"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.app.resource_id
  scalable_dimension = aws_appautoscaling_target.app.scalable_dimension
  service_namespace  = aws_appautoscaling_target.app.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }

    target_value       = var.scale_target_cpu
    scale_out_cooldown = 60
    scale_in_cooldown  = 300
  }
}`;

export const rdsSecurityGroupCode = `resource "aws_security_group" "rds" {
  name_prefix = "\${var.name}-rds-"
  vpc_id      = var.vpc_id
  description = "PostgreSQL: access from the application tasks only"

  ingress {
    description     = "PostgreSQL from the ECS tasks"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = var.allowed_security_group_ids
  }

  tags = {
    Name = "\${var.name}-rds"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_db_subnet_group" "main" {
  name       = var.name
  subnet_ids = var.subnet_ids
}`;

export const rdsParameterGroupCode = `resource "aws_db_parameter_group" "postgresql" {
  name   = "\${var.name}-postgres\${local.engine_major_version}"
  family = "postgres\${local.engine_major_version}"

  parameter {
    name         = "shared_preload_libraries"
    value        = "pg_stat_statements"
    apply_method = "pending-reboot"
  }

  # Log schema changes and slow queries (>1s), not every statement
  parameter {
    name  = "log_statement"
    value = "ddl"
  }

  parameter {
    name  = "log_min_duration_statement"
    value = "1000"
  }

  parameter {
    name  = "log_connections"
    value = "1"
  }

  parameter {
    name  = "log_disconnections"
    value = "1"
  }

  lifecycle {
    create_before_destroy = true
  }
}`;

export const rdsInstanceCode = `resource "aws_db_instance" "postgresql" {
  identifier     = var.name
  engine         = "postgres"
  engine_version = var.engine_version
  instance_class = var.instance_class

  db_name             = var.db_name
  username            = var.username
  password_wo         = var.password
  password_wo_version = var.password_version

  allocated_storage     = var.allocated_storage
  max_allocated_storage = var.max_allocated_storage
  storage_type          = "gp3"
  storage_encrypted     = true

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false
  multi_az               = var.multi_az
  parameter_group_name   = aws_db_parameter_group.postgresql.name

  enabled_cloudwatch_logs_exports = ["postgresql"]

  backup_retention_period = 7
  backup_window           = "03:00-04:00"
  maintenance_window      = "sun:04:30-sun:05:30"
  copy_tags_to_snapshot   = true

  auto_minor_version_upgrade  = true
  allow_major_version_upgrade = false

  monitoring_interval                   = 60
  monitoring_role_arn                   = aws_iam_role.enhanced_monitoring.arn
  performance_insights_enabled          = true
  performance_insights_retention_period = 7

  deletion_protection       = var.deletion_protection
  skip_final_snapshot       = false
  final_snapshot_identifier = "\${var.name}-final"

  depends_on = [
    aws_cloudwatch_log_group.postgresql,
    aws_iam_role_policy_attachment.enhanced_monitoring,
  ]
}`;

export const s3BucketCode = `# Django static files. Private bucket: read by CloudFront through Origin
# Access Control (policy in the cdn module), written by \`collectstatic\`.
resource "aws_s3_bucket" "static" {
  bucket = var.bucket_name

  tags = {
    Name = var.bucket_name
  }
}

resource "aws_s3_bucket_public_access_block" "static" {
  bucket = aws_s3_bucket.static.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# collectstatic overwrites files on every release; keep old versions for a week
resource "aws_s3_bucket_lifecycle_configuration" "static" {
  bucket = aws_s3_bucket.static.id

  rule {
    id     = "expire-noncurrent-versions"
    status = "Enabled"

    filter {}

    noncurrent_version_expiration {
      noncurrent_days = 7
    }
  }
}`;

export const ecrCode = `resource "aws_ecr_repository" "app" {
  name = var.name

  # Images are tagged <commit SHA>-<build number> and never overwritten,
  # so every task definition revision points to a fixed image.
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_lifecycle_policy" "app" {
  repository = aws_ecr_repository.app.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Delete untagged images after 1 day"
        selection = {
          tagStatus   = "untagged"
          countType   = "sinceImagePushed"
          countUnit   = "days"
          countNumber = 1
        }
        action = {
          type = "expire"
        }
      },
      {
        rulePriority = 2
        description  = "Keep the last \${var.images_to_keep} images (rollback window)"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = var.images_to_keep
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}`;

export const secretsCode = `resource "aws_secretsmanager_secret" "db_credentials" {
  name                    = "\${var.name}/db-credentials"
  description             = "PostgreSQL credentials used by the application"
  recovery_window_in_days = var.recovery_window_in_days
}

resource "aws_secretsmanager_secret_version" "db_credentials" {
  secret_id = aws_secretsmanager_secret.db_credentials.id
  secret_string_wo = jsonencode({
    username = var.db_username
    password = var.db_password
  })
  secret_string_wo_version = var.secrets_version
}`;

export const mainCode = `locals {
  name = "\${var.project_name}-\${var.environment}"

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

data "aws_caller_identity" "current" {}

# Shared secret that CloudFront adds to every origin request. The ALB only
# forwards requests carrying it, so the load balancer cannot be reached directly.
resource "random_password" "origin_verify" {
  length  = 32
  special = false
}

module "vpc" {
  source = "./modules/vpc"

  name               = local.name
  region             = var.aws_region
  cidr_block         = var.vpc_cidr
  availability_zones = var.availability_zones
  static_bucket_name = var.static_bucket_name
}

module "alb" {
  source = "./modules/alb"

  name                       = local.name
  vpc_id                     = module.vpc.vpc_id
  public_subnet_ids          = module.vpc.public_subnet_ids
  app_subnet_cidrs           = module.vpc.app_subnet_cidrs
  certificate_arn            = var.alb_certificate_arn
  origin_verify_header_value = random_password.origin_verify.result
}

module "waf" {
  source = "./modules/waf"
  providers = {
    aws = aws.us_east_1
  }

  name = local.name
}

module "static" {
  source = "./modules/s3"

  bucket_name = var.static_bucket_name
}

module "cdn" {
  source = "./modules/cdn"

  name                       = local.name
  domain_name                = var.domain_name
  certificate_arn            = var.cloudfront_certificate_arn
  route53_zone_id            = var.route53_zone_id
  web_acl_arn                = module.waf.web_acl_arn
  alb_dns_name               = module.alb.alb_dns_name
  origin_verify_header_value = random_password.origin_verify.result

  static_bucket_id                   = module.static.bucket_id
  static_bucket_arn                  = module.static.bucket_arn
  static_bucket_regional_domain_name = module.static.bucket_regional_domain_name
}

module "ecr" {
  source = "./modules/ecr"

  name = local.name
}

module "secrets" {
  source = "./modules/secrets"

  name              = local.name
  django_secret_key = var.django_secret_key
  db_username       = var.db_username
  db_password       = var.db_password
  secrets_version   = var.secrets_version
}

module "rds" {
  source = "./modules/rds"

  name                       = local.name
  vpc_id                     = module.vpc.vpc_id
  subnet_ids                 = module.vpc.db_subnet_ids
  allowed_security_group_ids = [module.ecs.tasks_security_group_id]

  db_name          = "app"
  username         = var.db_username
  password         = var.db_password
  password_version = var.secrets_version
  instance_class   = var.db_instance_class
  multi_az         = var.db_multi_az
}

module "ecs" {
  source = "./modules/ecs"

  name   = local.name
  region = var.aws_region

  vpc_id                          = module.vpc.vpc_id
  subnet_ids                      = module.vpc.app_subnet_ids
  db_subnet_cidrs                 = module.vpc.db_subnet_cidrs
  vpc_endpoints_security_group_id = module.vpc.vpc_endpoints_security_group_id
  s3_prefix_list_id               = module.vpc.s3_prefix_list_id
  alb_security_group_id           = module.alb.security_group_id
  target_group_arn                = module.alb.target_group_arn

  # Only used for the very first deployment: the pipeline registers a new
  # task definition revision with the commit-tagged image on every release.
  container_image = "\${module.ecr.repository_url}:bootstrap"
  cpu             = var.task_cpu
  memory          = var.task_memory
  min_capacity    = var.min_tasks
  max_capacity    = var.max_tasks

  static_bucket_arn = module.static.bucket_arn

  environment = {
    DEBUG                   = "false"
    ALLOWED_HOSTS           = var.domain_name
    CSRF_TRUSTED_ORIGINS    = "https://\${var.domain_name}"
    DB_HOST                 = module.rds.address
    DB_PORT                 = tostring(module.rds.port)
    DB_NAME                 = module.rds.db_name
    USE_S3                  = "true"
    AWS_STORAGE_BUCKET_NAME = module.static.bucket_id
    AWS_REGION              = var.aws_region
    STATIC_CUSTOM_DOMAIN    = var.domain_name
  }

  secrets = {
    SECRET_KEY  = module.secrets.django_secret_key_arn
    DB_USER     = "\${module.secrets.db_credentials_arn}:username::"
    DB_PASSWORD = "\${module.secrets.db_credentials_arn}:password::"
  }
  secret_arns = [module.secrets.django_secret_key_arn, module.secrets.db_credentials_arn]
}

module "pipeline" {
  source = "./modules/pipeline"

  name       = local.name
  region     = var.aws_region
  account_id = data.aws_caller_identity.current.account_id

  repository_provider = var.repository_provider
  repository_id       = var.repository_id
  branch_name         = var.branch_name

  ecr_repository_url = module.ecr.repository_url
  ecr_repository_arn = module.ecr.repository_arn

  ecs_cluster_name       = module.ecs.cluster_name
  ecs_service_name       = module.ecs.service_name
  task_definition_family = module.ecs.task_definition_family
  container_name         = module.ecs.container_name
  task_subnet_ids        = module.vpc.app_subnet_ids
  task_security_group_id = module.ecs.tasks_security_group_id
  task_role_arns         = [module.ecs.task_role_arn, module.ecs.execution_role_arn]
}`;

export const pipelineCode = `resource "aws_codepipeline" "main" {
  name          = var.name
  role_arn      = aws_iam_role.pipeline.arn
  pipeline_type = "V2"

  # A release is never interrupted halfway through its migrations
  execution_mode = "QUEUED"

  artifact_store {
    location = aws_s3_bucket.artifacts.bucket
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = "1"
      output_artifacts = ["source"]

      configuration = {
        ConnectionArn    = aws_codeconnections_connection.source.arn
        FullRepositoryId = var.repository_id
        BranchName       = var.branch_name
      }
    }
  }

  stage {
    name = "Build"

    action {
      name            = "TestAndBuildImage"
      category        = "Build"
      owner           = "AWS"
      provider        = "CodeBuild"
      version         = "1"
      input_artifacts = ["source"]
      namespace       = "Build"

      configuration = {
        ProjectName = aws_codebuild_project.build.name
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name            = "MigrateAndDeploy"
      category        = "Build"
      owner           = "AWS"
      provider        = "CodeBuild"
      version         = "1"
      input_artifacts = ["source"]

      configuration = {
        ProjectName = aws_codebuild_project.deploy.name
        EnvironmentVariables = jsonencode([
          {
            name  = "IMAGE_URI"
            value = "#{Build.IMAGE_URI}"
            type  = "PLAINTEXT"
          }
        ])
      }
    }
  }

  depends_on = [aws_iam_role_policy.pipeline]
}`;

export const deployRolePolicyCode = `resource "aws_iam_role_policy" "deploy" {
  name = "deploy"
  role = aws_iam_role.deploy.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["logs:CreateLogStream", "logs:PutLogEvents"]
        Resource = "\${aws_cloudwatch_log_group.codebuild.arn}:*"
      },
      {
        Effect   = "Allow"
        Action   = ["s3:GetObject", "s3:GetObjectVersion"]
        Resource = "\${aws_s3_bucket.artifacts.arn}/*"
      },
      {
        # These actions do not support resource-level permissions
        Effect   = "Allow"
        Action   = ["ecs:DescribeTaskDefinition", "ecs:RegisterTaskDefinition"]
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = ["ecs:RunTask"]
        Resource = local.task_definition_arn
        Condition = {
          ArnEquals = { "ecs:cluster" = local.cluster_arn }
        }
      },
      {
        Effect   = "Allow"
        Action   = ["ecs:DescribeTasks"]
        Resource = "arn:aws:ecs:\${var.region}:\${var.account_id}:task/\${var.ecs_cluster_name}/*"
      },
      {
        Effect   = "Allow"
        Action   = ["ecs:UpdateService", "ecs:DescribeServices"]
        Resource = local.service_arn
      },
      {
        Effect   = "Allow"
        Action   = ["iam:PassRole"]
        Resource = var.task_role_arns
        Condition = {
          StringEquals = { "iam:PassedToService" = "ecs-tasks.amazonaws.com" }
        }
      }
    ]
  })
}`;

export const buildspecCode = `# Build stage: test the image that will be shipped, then push it to ECR.
version: 0.2

env:
  exported-variables:
    - IMAGE_URI

phases:
  pre_build:
    commands:
      - aws ecr get-login-password --region "$AWS_DEFAULT_REGION" | docker login --username AWS --password-stdin "\${ECR_REPOSITORY_URL%%/*}"
      # Commit SHA + build number: tags are immutable, so re-running a commit needs a new tag
      - IMAGE_URI="$ECR_REPOSITORY_URL:$(echo "$CODEBUILD_RESOLVED_SOURCE_VERSION" | cut -c 1-7)-$CODEBUILD_BUILD_NUMBER"
      - echo "Image $IMAGE_URI"
  build:
    commands:
      - docker build -t "$IMAGE_URI" app
      # Tests and Django's deployment checklist run inside the image itself.
      # SQLite keeps the build independent from the VPC.
      - >-
        docker run --rm
        -e SECRET_KEY="ci-only-$(head -c 48 /dev/urandom | base64 | tr -dc 'a-zA-Z0-9')"
        -e DATABASE_URL=sqlite:////tmp/ci.sqlite3
        -e ALLOWED_HOSTS=example.com
        "$IMAGE_URI"
        sh -c "python manage.py test --noinput && python manage.py check --deploy --fail-level WARNING"
      # Pushed here and not in post_build: post_build also runs when the build phase fails
      - docker push "$IMAGE_URI"`;

export const deployScriptCode = `#!/usr/bin/env bash
# Releases IMAGE_URI to the ECS service:
#   1. registers a new task definition revision with the new image
#   2. runs migrations + collectstatic as a one-off task, before any traffic moves
#   3. points the service at the new revision and waits for the rollout
#
# Required env: IMAGE_URI CLUSTER SERVICE TASK_FAMILY CONTAINER_NAME SUBNETS SECURITY_GROUP
set -euo pipefail

echo "==> Registering task definition for $IMAGE_URI"
# Latest ACTIVE revision of the family = Terraform's configuration + previous image
aws ecs describe-task-definition --task-definition "$TASK_FAMILY" --query taskDefinition \\
  | jq --arg image "$IMAGE_URI" --arg name "$CONTAINER_NAME" '
      .containerDefinitions |= map(if .name == $name then .image = $image else . end)
      | del(.taskDefinitionArn, .revision, .status, .requiresAttributes,
            .compatibilities, .registeredAt, .registeredBy)' \\
  > /tmp/task-definition.json

TASK_DEFINITION_ARN=$(aws ecs register-task-definition \\
  --cli-input-json file:///tmp/task-definition.json \\
  --query taskDefinition.taskDefinitionArn --output text)
echo "    $TASK_DEFINITION_ARN"

echo "==> Running migrations"
# Schema changes must stay compatible with the version still serving traffic
# (expand/contract), since old tasks keep running until the rollout finishes.
OVERRIDES=$(jq -n --arg name "$CONTAINER_NAME" '{containerOverrides: [{
  name: $name,
  command: ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput"]
}]}')

TASK_ARN=$(aws ecs run-task \\
  --cluster "$CLUSTER" \\
  --task-definition "$TASK_DEFINITION_ARN" \\
  --launch-type FARGATE \\
  --started-by "codebuild-release" \\
  --network-configuration "awsvpcConfiguration={subnets=[$SUBNETS],securityGroups=[$SECURITY_GROUP],assignPublicIp=DISABLED}" \\
  --overrides "$OVERRIDES" \\
  --query 'tasks[0].taskArn' --output text)
echo "    $TASK_ARN"

aws ecs wait tasks-stopped --cluster "$CLUSTER" --tasks "$TASK_ARN"

EXIT_CODE=$(aws ecs describe-tasks --cluster "$CLUSTER" --tasks "$TASK_ARN" \\
  --query "tasks[0].containers[?name=='$CONTAINER_NAME'].exitCode | [0]" --output text)
if [[ "$EXIT_CODE" != "0" ]]; then
  echo "Migration task failed (exit code: $EXIT_CODE). Logs: CloudWatch, stream app/$CONTAINER_NAME/\${TASK_ARN##*/}" >&2
  exit 1
fi

echo "==> Updating service $SERVICE"
aws ecs update-service --cluster "$CLUSTER" --service "$SERVICE" \\
  --task-definition "$TASK_DEFINITION_ARN" > /dev/null

# The circuit breaker rolls back failed deployments, so "stable" alone is not
# enough: wait until the rollout of *this* revision completes or fails.
for _ in $(seq 1 90); do
  STATE=$(aws ecs describe-services --cluster "$CLUSTER" --services "$SERVICE" \\
    --query "services[0].deployments[?taskDefinition=='$TASK_DEFINITION_ARN'].rolloutState | [0]" \\
    --output text)
  case "$STATE" in
    COMPLETED) echo "==> Deployed $IMAGE_URI"; exit 0 ;;
    FAILED)    echo "Deployment failed and was rolled back" >&2; exit 1 ;;
    *)         sleep 10 ;;
  esac
done

echo "Timed out waiting for the deployment" >&2
exit 1`;

export const dockerfileCode = `FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1

WORKDIR /app

# curl is used by the ECS container health check
RUN apt-get update \\
    && apt-get install -y --no-install-recommends curl \\
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN useradd --system --create-home app
USER app

EXPOSE 8000

# Migrations and collectstatic are not run here: with several tasks starting at
# once they would race. The pipeline runs them once per release (ci/deploy.sh).
CMD ["gunicorn", "app.wsgi:application", \\
     "--bind", "0.0.0.0:8000", \\
     "--workers", "3", \\
     "--timeout", "60", \\
     "--access-logfile", "-"]`;

export const middlewareCode = `from django.http import JsonResponse


class HealthCheckMiddleware:
    """Answers /healthz/ before the rest of the middleware stack runs.

    ALB and container health checks send the task's private IP (or localhost)
    as Host and use plain HTTP, so a normal request would fail ALLOWED_HOSTS
    validation or be redirected to HTTPS.

    Liveness only: checking the database here would make the ALB drain every
    task during an RDS failover, turning a short blip into a full outage.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path == "/healthz/":
            return JsonResponse({"status": "healthy"})
        return self.get_response(request)`;

export const staticSettingsCode = `# Static files
#
# In AWS, \`collectstatic\` (run by the release task) uploads the files to S3
# under static/, and CloudFront serves them from the application domain at
# /static/* — same origin, no CORS, cached at the edge. The manifest storage
# adds a content hash to every file name (app.3f2a1b.js), so a release never
# serves stale cached assets and no CloudFront invalidation is needed.

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
}

if os.getenv("USE_S3", "false").lower() == "true":
    STORAGES["staticfiles"] = {
        "BACKEND": "storages.backends.s3.S3ManifestStaticStorage",
        "OPTIONS": {
            "bucket_name": os.environ["AWS_STORAGE_BUCKET_NAME"],
            "region_name": os.getenv("AWS_REGION", "us-east-1"),
            "location": "static",
            "custom_domain": os.getenv("STATIC_CUSTOM_DOMAIN"),
            "querystring_auth": False,
        },
    }`;

export const securitySettingsCode = `# Security (production only)
#
# TLS terminates at CloudFront and again at the ALB, which sets
# X-Forwarded-Proto. Health checks never get here (HealthCheckMiddleware).

if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SECURE_SSL_REDIRECT = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True`;

export const testsCode = `class CsrfTests(TestCase):
    def setUp(self):
        self.client = HttpsClient(enforce_csrf_checks=True)

    def test_write_without_token_is_rejected(self):
        response = self.client.post(
            reverse("items_list"), data=json.dumps({"name": "x"}), content_type="application/json"
        )
        self.assertEqual(response.status_code, 403)

    def test_write_with_token_from_home_page(self):
        page = self.client.get(reverse("home")).wsgi_request
        token = self.client.cookies["csrftoken"].value
        # Browsers send Origin on fetch() POST; it must match the site's own origin
        origin = f"{page.scheme}://{page.get_host()}"

        response = self.client.post(
            reverse("items_list"),
            data=json.dumps({"name": "x"}),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=token,
            HTTP_ORIGIN=origin,
        )
        self.assertEqual(response.status_code, 201)`;

