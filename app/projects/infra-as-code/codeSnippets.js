export const backendCode = `
terraform {
    backend "s3" {
        # bucket = "samuellincoln-terraform-state"
        # key = "tf-infra/terraform.tfstate"  
        # region = "us-east-1"
        # dynamodb_table = "terraform-state-locking"
        # encrypt = true
    }

    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 5.0"
        }
    }
}

provider "aws" {
    region = "us-east-1"
}

resource "aws_s3_bucket" "terraform_state" {
    bucket = var.bucket_name
    force_destroy = true
}

resource "aws_s3_bucket_versioning" "terraform_state_versioning" {
    bucket = aws_s3_bucket.terraform_state.id
    versioning_configuration {
        status = "Enabled"
    }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state_encryption" {
    bucket = aws_s3_bucket.terraform_state.id
    rule {
        apply_server_side_encryption_by_default {
            sse_algorithm = var.sse_algorithm
        }
    }
}

resource "aws_dynamodb_table" "terraform_locks" {
    name = var.dynamodb_table_name
    billing_mode = var.billing_mode
    hash_key = var.hash_key
    attribute {
        name = var.attribute_name
        type = var.attribute_type
    }
}`;

export const backendVarsCode = `
bucket_name = "samuellincoln-iac-project-state"
sse_algorithm = "AES256"
dynamodb_table_name = "iac-project-state-locking"
billing_mode = "PAY_PER_REQUEST"
attribute_name = "LockID"
attribute_type = "S"
hash_key = "LockID"`;

export const vpcCode = `
resource "aws_vpc" "main" {
  cidr_block           = var.cidr_block
  enable_dns_hostnames = var.enable_dns_hostnames
  enable_dns_support   = var.enable_dns_support
  tags = {
    Name = "iac-project-vpc"
  }
}`;

export const internetGatewayCode = `
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "iac-project-igw"
  }
}`;

export const subnetsCode = `
resource "aws_subnet" "public-subnet-1" {
    vpc_id                  = aws_vpc.main.id
    cidr_block              = var.public_subnet_cidr_block_1
    map_public_ip_on_launch = var.map_public_ip_on_launch
    availability_zone       = var.availability_zone_1
    tags = {
      Name = "iac-project-public-subnet-1"
    }
  }
  
  resource "aws_subnet" "public-subnet-2" {
    vpc_id                  = aws_vpc.main.id
    cidr_block              = var.public_subnet_cidr_block_2
    map_public_ip_on_launch = var.map_public_ip_on_launch
    availability_zone       = var.availability_zone_2
    tags = {
      Name = "iac-project-public-subnet-2"
    }
  }
  
  
  resource "aws_subnet" "private-subnet-1" {
    vpc_id                  = aws_vpc.main.id
    cidr_block              = var.private_subnet_cidr_block_1
    map_public_ip_on_launch = false
    availability_zone       = var.availability_zone_1
    tags = {
      Name = "iac-project-private-subnet-1"
    }
  }
  resource "aws_subnet" "private-subnet-2" {
    vpc_id                  = aws_vpc.main.id
    cidr_block              = var.private_subnet_cidr_block_2
    map_public_ip_on_launch = false
    availability_zone       = var.availability_zone_2
    tags = {
      Name = "iac-project-private-subnet-2"
    }
  }
  
  resource "aws_subnet" "private-subnet-3" {
    vpc_id                  = aws_vpc.main.id
    cidr_block              = var.private_subnet_cidr_block_3
    map_public_ip_on_launch = false
    availability_zone       = var.availability_zone_2
    tags = {
      Name = "iac-project-private-subnet-3"
    }
  }`;

export const routeTablesCode = `
resource "aws_route_table" "public-route-table" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  tags = {
    Name = "iac-project-public-route-table"
  }
}

resource "aws_route_table" "private-route-table" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "iac-project-private-route-table"
  }
}`;

export const routeTableAssociationsCode = `
resource "aws_route_table_association" "public-route-table-association" {
  subnet_id      = aws_subnet.public-subnet-1.id
  route_table_id = aws_route_table.public-route-table.id
}

resource "aws_route_table_association" "public-route-table-association-2" {
  subnet_id      = aws_subnet.public-subnet-2.id
  route_table_id = aws_route_table.public-route-table.id
}


resource "aws_route_table_association" "private-route-table-association" {
  subnet_id      = aws_subnet.private-subnet-1.id
  route_table_id = aws_route_table.private-route-table.id
}

resource "aws_route_table_association" "private-route-table-association-2" {
  subnet_id      = aws_subnet.private-subnet-2.id
  route_table_id = aws_route_table.private-route-table.id
}

resource "aws_route_table_association" "private-route-table-association-3" {
  subnet_id      = aws_subnet.private-subnet-3.id
  route_table_id = aws_route_table.private-route-table.id
}

`;

export const albCode = `
  resource "aws_lb" "iac-project-alb" {
  name                       = var.alb_name
  internal                   = false
  load_balancer_type         = "application"
  security_groups            = [aws_security_group.iac-project-alb-security-group.id]
  subnets                    = [var.public_subnet_id, var.public_subnet_id_2]
  enable_deletion_protection = false
}
`;

export const albTargetGroupCode = `
resource "aws_lb_target_group" "iac-project-alb-target-group" {
  name     = var.alb_target_group_name
  port     = var.alb_target_group_port
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

export const albListenerCode = `
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.iac-project-alb.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.iac-project-alb-target-group.arn
  }
}
`;

export const albSecurityGroupCode = `
resource "aws_security_group" "iac-project-alb-security-group" {
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

export const webServerLaunchTemplateCode = `
resource "aws_launch_template" "web-server-launch-template" {
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

export const webServerAutoscalingGroupCode = `
resource "aws_autoscaling_group" "web-server-autoscaling-group" {
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


export const webServerSecurityGroupCode = `
resource "aws_security_group" "web-server-security-group" {
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