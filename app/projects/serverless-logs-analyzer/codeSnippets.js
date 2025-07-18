export const s3Code = `resource "aws_s3_bucket" "serverless_log_analyzer_bucket" {
  bucket        = var.s3_input_bucket_name
  force_destroy = true

  tags = {
    Name = var.s3_input_bucket_tag
  }
}

resource "aws_s3_bucket" "serverless_log_analyzer_output" {
  bucket        = var.s3_output_bucket_name
  force_destroy = true

  tags = {
    Name = var.s3_output_bucket_tag
  }
}
`;

export const s3VersioningCode = `resource "aws_s3_bucket_versioning" "serverless_log_analyzer_bucket_versioning" {
  bucket = aws_s3_bucket.serverless_log_analyzer_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_versioning" "serverless_log_analyzer_output_versioning" {
  bucket = aws_s3_bucket.serverless_log_analyzer_output.id
  versioning_configuration {
    status = "Enabled"
  }
}`;

export const s3EncryptionCode = `resource "aws_s3_bucket_server_side_encryption_configuration" "serverless_log_analyzer_bucket_encryption" {
  bucket = aws_s3_bucket.serverless_log_analyzer_bucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "serverless_log_analyzer_output_encryption" {
  bucket = aws_s3_bucket.serverless_log_analyzer_output.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}`;

export const s3PublicAccessBlockCode = `resource "aws_s3_bucket_public_access_block" "serverless_log_analyzer_bucket_block" {
  bucket                  = aws_s3_bucket.serverless_log_analyzer_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}


resource "aws_s3_bucket_public_access_block" "serverless_log_analyzer_output_block" {
  bucket                  = aws_s3_bucket.serverless_log_analyzer_output.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`;














export const albCode = `resource "aws_lb" "iac-project-alb" {
  name                       = var.alb_name
  internal                   = false
  load_balancer_type         = "application"
  security_groups            = [aws_security_group.iac-project-alb-security-group.id]
  subnets                    = [var.public_subnet_id, var.public_subnet_id_2]
  enable_deletion_protection = false
}
`;

export const albTargetGroupCode = `resource "aws_lb_target_group" "iac-project-alb-target-group" {
  name     = var.alb_target_group_name
  port     = 8080
  protocol = var.alb_target_group_protocol
  vpc_id   = var.vpc_id

  health_check {
    path                = var.alb_target_group_health_check_path
    interval            = var.alb_target_group_health_check_interval
    timeout             = var.alb_target_group_health_check_timeout
    healthy_threshold   = var.alb_target_group_health_check_healthy_threshold
    unhealthy_threshold = var.alb_target_group_health_check_unhealthy_threshold
    matcher             = var.alb_target_group_health_check_matcher
  }
}
`;

export const albListenerCode = `resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.iac-project-alb.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.iac-project-alb-target-group.arn
  }
}
`;

export const albSecurityGroupCode = `resource "aws_security_group" "iac-project-alb-security-group" {
  name        = "iac-project-alb-security-group"
  description = "Security group for the ALB"
  vpc_id      = var.vpc_id
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = var.ec2_cidr_blocks
  }
}
`;

export const webServerLaunchTemplateCode = `resource "aws_launch_template" "web-server-launch-template" {
  name          = var.launch_template_name
  image_id      = var.image_id
  instance_type = var.instance_type
  key_name      = var.key_name

  network_interfaces {
    associate_public_ip_address = false
    security_groups             = [aws_security_group.web-server-security-group.id]
  }

  user_data = base64encode(<<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup python3 -m http.server 8080 &
              EOF
  )
}
`;

export const webServerAutoscalingGroupCode = `resource "aws_autoscaling_group" "web-server-autoscaling-group" {
  name                = var.autoscaling_group_name
  max_size            = var.max_size
  min_size            = var.min_size
  desired_capacity    = var.desired_capacity
  vpc_zone_identifier = var.vpc_zone_identifier
  launch_template {
    id = aws_launch_template.web-server-launch-template.id
  }
  target_group_arns = [var.target_group_arn]
}
`;

export const webServerSecurityGroupCode = `resource "aws_security_group" "web-server-security-group" {
  name   = "iac-project-web-server-security-group"
  vpc_id = var.vpc_id
  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [var.alb_security_group_id]
  }

  egress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [var.rds_cidr_block]
  }

  tags = {
    Name = "instances-security-group"
  }
}

resource "aws_security_group" "rds-security-group" {
  name   = "iac-project-rds-security-group"
  vpc_id = var.vpc_id
  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.web-server-security-group.id]
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    security_groups = [aws_security_group.web-server-security-group.id]
  }
}
`;

export const rdsInstanceCode = `resource "aws_db_instance" "iac-project-rds" {
  identifier_prefix      = "iac-project-rds"
  engine                 = var.engine
  engine_version         = var.engine_version
  instance_class         = var.instance_class
  allocated_storage      = var.allocated_storage
  username               = var.db_username
  password               = var.db_password
  port                   = var.port
  vpc_security_group_ids = var.rds_security_group_ids
  db_subnet_group_name   = aws_db_subnet_group.default.name
  skip_final_snapshot    = var.skip_final_snapshot
}
`;

export const rdsSubnetGroupCode = `resource "aws_db_subnet_group" "default" {
  name       = "mydb-subnet-group"
  subnet_ids = var.private_subnet_ids

  tags = {
    Name = "My DB subnet group"
  }
}
`;

export const mainCode = `terraform {
  backend "s3" {
    bucket         = "samuellincoln-iac-project-state"
    key            = "tf-infra/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "iac-project-state-locking"
    encrypt        = true
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source                      = "./modules/vpc"
  cidr_block                  = "10.0.0.0/16"
  enable_dns_hostnames        = false
  enable_dns_support          = true
  public_subnet_cidr_block_1  = "10.0.1.0/24"
  public_subnet_cidr_block_2  = "10.0.2.0/24"
  map_public_ip_on_launch     = true
  availability_zone_1         = "us-east-1a"
  availability_zone_2         = "us-east-1b"
  private_subnet_cidr_block_1 = "10.0.3.0/24"
  private_subnet_cidr_block_2 = "10.0.4.0/24"
  private_subnet_cidr_block_3 = "10.0.5.0/24"
}

module "alb" {
  source                                            = "./modules/alb"
  vpc_id                                            = module.vpc.vpc_id
  public_subnet_id                                  = module.vpc.public_subnet_id_1
  public_subnet_id_2                                = module.vpc.public_subnet_id_2
  alb_name                                          = "iac-project-alb"
  alb_target_group_name                             = "iac-project-alb-target-group"
  alb_target_group_port                             = 80
  alb_target_group_protocol                         = "HTTP"
  alb_target_group_health_check_path                = "/"
  alb_target_group_health_check_interval            = 30
  alb_target_group_health_check_timeout             = 10
  alb_target_group_health_check_healthy_threshold   = 2
  alb_target_group_health_check_unhealthy_threshold = 2
  alb_target_group_health_check_matcher             = "200-399"
  ec2_cidr_blocks                                   = [module.vpc.private_subnet_cidr_block_3]
}

module "asg" {
  source                 = "./modules/asg"
  vpc_id                 = module.vpc.vpc_id
  launch_template_name   = "web-server-launch-template"
  image_id               = "ami-011899242bb902164"
  instance_type          = "t2.micro"
  key_name               = "aws-server"
  autoscaling_group_name = "web-server-autoscaling-group"
  max_size               = 4
  min_size               = 2
  desired_capacity       = 2
  vpc_zone_identifier    = [module.vpc.private_subnet_id_1, module.vpc.private_subnet_id_2]
  target_group_arn       = module.alb.target_group_arn
  alb_security_group_id  = module.alb.security_group_id
  rds_cidr_block         = "10.0.0.0/16"
}


module "rds" {
  source                 = "./modules/rds"
  engine                 = "mysql"
  engine_version         = "8.4.4"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  port                   = 3306
  rds_security_group_ids = [module.asg.rds-security-group-id]
  skip_final_snapshot    = true
  private_subnet_ids     = [module.vpc.private_subnet_id_1, module.vpc.private_subnet_id_2, module.vpc.private_subnet_id_3]
  db_username            = var.db_username
  db_password            = var.db_password
}
`;
