"use client";

import React from "react";
import Image from "next/image";
// import { useTranslation } from "next-i18next";
import CodeContainer from "../../util/CodeContainer";

export default function Content() {
  //   const { t } = useTranslation("common");
  const backendCode = `
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

  const backendVarsCode = `
bucket_name = "samuellincoln-iac-project-state"
sse_algorithm = "AES256"
dynamodb_table_name = "iac-project-state-locking"
billing_mode = "PAY_PER_REQUEST"
attribute_name = "LockID"
attribute_type = "S"
hash_key = "LockID"`;

  return (
    <>
      <div className="md:px-20 px-6 relative flex flex-col bg-[#0d0e12] min-h-screen">
        <div className="container mx-auto px-4 relative mt-8 z-10 max-w-full">
          <div className="flex flex-col">
            <div className="flex flex-col gap-10 mt-[72px] text-white">
              <div id="overview">
                <h1 className="text-[22px] md:text-[40px] font-bold">
                  Infra as Code - Overview
                </h1>
                <div className="flex flex-col gap-4 text-white text-sm md:text-xl max-w-[300px] md:max-w-full">
                  <p>
                    This project demonstrates the use of Terraform to manage and
                    provision cloud infrastructure on AWS. It was designed to
                    showcase a scalable and secure cloud, leveraging AWS
                    services to create a robust environment suitable for hosting
                    web applications. The project includes configurations for a
                    Virtual Private Cloud (VPC), Application Load Balancer
                    (ALB), Auto Scaling Group (ASG), and Relational Database
                    Service (RDS). The infrastructure is also secured using AWS
                    Security Groups to manage inbound and outbound traffic for
                    each resource, guaranteeing that only authorized traffic is
                    allowed.
                  </p>
                  <p>
                    Github repository:{" "}
                    <a
                      href="https://github.com/samuelincoln1/infra-as-code"
                      target="_blank"
                      className="hover:underline text-blue-500"
                    >
                      https://github.com/samuelincoln1/infra-as-code
                    </a>
                  </p>
                </div>
              </div>
              <div
                id="architecture-diagram"
                className="flex flex-col gap-4 text-white text-sm md:text-xl max-w-[300px] md:max-w-full"
              >
                <h1 className="text-[22px] md:text-[40px] font-bold">
                  Architecture Diagram
                </h1>
                The architecture diagram below shows the infrastructure, which
                includes:
                <ul className="list-disc pl-5">
                  <li>
                    <strong>VPC:</strong> A Virtual Private Cloud with public
                    and private subnets across two availability zones.
                  </li>
                  <li>
                    <strong>ALB:</strong> An Application Load Balancer to
                    distribute incoming traffic across multiple instances.
                  </li>
                  <li>
                    <strong>ASG:</strong> An Auto Scaling Group to ensure the
                    application scales based on demand.
                  </li>
                  <li>
                    <strong>RDS:</strong> A managed MySQL database instance for
                    persistent data storage.
                  </li>
                </ul>
                <p className="mt-4">
                  Users access the application via the internet through the
                  public ALB DNS, which efficiently distributes traffic across
                  instances within the Auto Scaling Group. This group is
                  configured to dynamically adjust the number of instances based
                  on demand. The RDS serves as the application's data storage
                  solution. All EC2 instances reside in private subnets,
                  ensuring they are not directly accessible from the internet,
                  similar to the RDS.
                </p>
                <figure>
                  <Image
                    src="../images/projects/infra-as-code/iac-architecture-diagram.png"
                    alt="Architecture Diagram"
                    width={1000}
                    height={1000}
                    className="border-2 border-black rounded-lg shadow-lg"
                  />
                  <figcaption className="text-white text-sm mt-2">
                    Diagram created with Lucidchart:{" "}
                    <a
                      href="https://www.lucidchart.com/pages/landing"
                      target="_blank"
                      className="hover:underline text-blue-500"
                    >
                      https://www.lucidchart.com/pages/landing
                    </a>
                  </figcaption>
                </figure>
              </div>
              <div
                id="code-structure"
                className="flex flex-col gap-4 text-white text-sm md:text-xl max-w-[300px] md:max-w-full"
              >
                <h1 className="text-[22px] md:text-[40px] font-bold">
                  Code Structure
                </h1>
                <p>
                  This Terraform project is organized into two key components:
                  modules and backend configuration. Each part plays a crucial
                  role in managing and deploying infrastructure efficiently
                </p>
                <h2 className="text-[22px] md:text-[26px] font-semibold">
                  Modules
                </h2>
                <p>
                  Modules are the building blocks of this Terraform
                  configuration. They encapsulate specific pieces of
                  infrastructure, making the code reusable and easier to manage.
                  In this project, we have several modules:
                </p>
                <ul className="list-decimal pl-5">
                  <li className="mb-2">
                    <strong>VPC Module: </strong>This module is responsible for
                    setting up the Virtual Private Cloud (VPC). It defines the
                    CIDR block and configures both public and private subnets
                    across different availability zones. In this configuration,
                    DNS hostnames are disabled, while DNS support is enabled,
                    ensuring internal DNS resolution within the VPC.
                  </li>
                  <li className="mb-2">
                    <strong>ALB Module: </strong> The Application Load Balancer
                    (ALB) module manages the load balancer configuration. It
                    sets up the ALB with specified subnets, target group
                    settings, and health check parameters to ensure traffic is
                    distributed efficiently.
                  </li>
                  <li className="mb-2">
                    <strong>ASG Module: </strong>The Auto Scaling Group (ASG)
                    module configures the auto-scaling of EC2 instances. It
                    defines the launch template, instance type, and scaling
                    policies to maintain the desired capacity and performance.
                  </li>
                  <li className="mb-2">
                    <strong>RDS Module: </strong> This module handles the setup
                    of the Relational Database Service (RDS). It specifies the
                    database engine, version, instance class, and security group
                    settings, ensuring a secure and scalable database
                    environment.
                  </li>
                </ul>
                <p>
                  Inside each module, there is a{" "}
                  <code className="bg-gray-800 text-white px-2 rounded">
                    main.tf
                  </code>{" "}
                  file that defines the resources, a{" "}
                  <code className="bg-gray-800 text-white px-2 rounded">
                    variables.tf
                  </code>{" "}
                  file that defines the variables and a{" "}
                  <code className="bg-gray-800 text-white px-2 rounded">
                    outputs.tf
                  </code>{" "}
                  file that defines the outputs, when needed.
                </p>
                <Image
                  src="../images/projects/infra-as-code/modules-structure.png"
                  alt="Code Structure"
                  width={300}
                  height={300}
                  className="border-2 border-white rounded-lg shadow-lg"
                />
              </div>
              <div
                id="backend-configuration"
                className="flex flex-col gap-4 text-white text-sm md:text-xl max-w-[300px] md:max-w-full"
              >
                <h1 className="text-[22px] md:text-[40px] font-semibold">
                  Backend Configuration
                </h1>
                <p>
                  The backend configuration is crucial for managing the state of
                  the infrastructure. We can store the state locally or
                  remotely, but doing it remotely is more secure and easier to
                  manage, especially when working in a team. In this project,
                  the backend is configured to use Amazon S3, which stores the
                  Terraform state file. This setup includes:
                </p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>S3 Bucket: </strong>The S3 bucket where the state
                    file is stored.
                  </li>
                  <li className="mb-2">
                    <strong>Key: </strong>The path within the bucket for the
                    state file.
                  </li>
                  <li className="mb-2">
                    <strong>Region: </strong>The AWS region where the bucket is
                    located.
                  </li>
                  <li className="mb-2">
                    <strong>DynamoDB Table: </strong> Used for state locking and
                    consistency, preventing concurrent operations that could
                    corrupt the state.
                  </li>
                  <li className="mb-2">
                    <strong>Encryption: </strong>Ensures that the state file is
                    stored securely
                  </li>
                </ul>
                <Image
                  src="../images/projects/infra-as-code/backend-structure.png"
                  alt="Backend Structure"
                  width={300}
                  height={300}
                  className="border-2 border-white rounded-lg shadow-lg"
                />
                <p>
                  The process of creating the backend configuration envolves
                  creating the necessary resources using Terraform instead of
                  manually setting them up in the AWS console. This approach
                  ensures that all resources are managed as code, providing
                  consistency and version control.
                </p>
                <p>
                  Once the resources are created, the backend is defined as "s3"
                  to store the Terraform state file. After defining the backend,
                  the{" "}
                  <code className="bg-gray-800 text-white px-2 rounded">
                    terraform init
                  </code>{" "}
                  command is used to migrate the state to S3. This command
                  initializes the backend configuration, ensuring that the state
                  is managed remotely and securely.
                </p>
                <CodeContainer fileName="backend/main.tf">
                  {backendCode}
                </CodeContainer>
                <p>
                  The variables are defined in the{" "}
                  <code className="bg-gray-800 text-white px-2 rounded">
                    variables.tf
                  </code>{" "}
                  file. and initialized in the{" "}
                  <code className="bg-gray-800 text-white px-2 rounded">
                    backend.tfvars
                  </code>{" "}
                  file.
                </p>
                <CodeContainer fileName="backend/backend.tfvars">
                  {backendVarsCode}
                </CodeContainer>
              </div>
              <div
                id="vpc-module"
                className="flex flex-col gap-4 text-white text-sm md:text-xl max-w-[300px] md:max-w-full"
              >
                <h1 className="text-[22px] md:text-[40px] font-semibold">
                  VPC Module
                </h1>
                <p>
                  This module is designed to create a Virtual Private Cloud
                  (VPC) on AWS, along with associated resources such as subnets,
                  internet gateways, and route tables. The architecture is
                  structured to support two public and three private subnets
                  across multiple availability zones, providing a robust and
                  scalable network infrastructure. The two public subnets are
                  used to host the ALB and the three private subnets are used to
                  host the RDS and the EC2 instances.
                </p>
                <h2 className="text-[22px] md:text-[26px] font-semibold">
                  Resources
                </h2>
                <p>1. VPC</p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Resource name: </strong>{" "}
                    <span className="text-[#6183BB]">aws_vpc.main</span>
                  </li>
                  <li className="mb-2">
                    <strong>CIDR block: </strong> Configurable via{" "}
                    <span className="text-[#6183BB]">var.cidr_block</span>
                  </li>
                  <li className="mb-2">
                    <strong>DNS Hostnames: </strong> Configurable via{" "}
                    <span className="text-[#6183BB]">
                      var.enable_dns_hostnames
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>DNS Support: </strong> Configurable via{" "}
                    <span className="text-[#6183BB]">
                      var.enable_dns_support
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>Tags: </strong> The VPC is tagged with{" "}
                    <span className="text-[#6183BB]">
                      <span className="text-purple-500">Name</span> <span className="text-yellow-500">=</span> <span className="text-green-400">"iac-project-vpc"</span>
                    </span>{" "}
                    for easy identification.
                  </li>
                </ul>
                <CodeContainer fileName="vpc/main.tf">
                  {`
resource "aws_vpc" "main" {
  cidr_block           = var.cidr_block
  enable_dns_hostnames = var.enable_dns_hostnames
  enable_dns_support   = var.enable_dns_support
  tags = {
    Name = "iac-project-vpc"
  }
}
                `}
                </CodeContainer>
                <p>2. Internet Gateway</p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Resource name: </strong>{" "}
                    <span className="text-[#6183BB]">
                      aws_internet_gateway.main
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>VPC Association: </strong>Attached to the main VPC (
                    <span className="text-[#6183BB]">aws_vpc.main.id</span>)
                  </li>
                  <li className="mb-2">
                    <strong>Tags: </strong> Tagged with{" "}
                    <span className="text-[#6183BB]">
                    <span className="text-purple-500">Name</span> <span className="text-yellow-500">=</span> <span className="text-green-400">"iac-project-igw"</span>
                    </span>
                    .
                  </li>
                </ul>
                <CodeContainer fileName="vpc/main.tf">
                  {`
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "iac-project-igw"
  }
}
                `}
                </CodeContainer>
                <p>3. Subnets</p>
                <p>
                  <strong>Public Subnets</strong>
                </p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Resource names: </strong>{" "}
                    <span className="text-[#6183BB]">
                      aws_subnet.public-subnet-1
                    </span>{" "}
                    and{" "}
                    <span className="text-[#6183BB]">
                      aws_subnet.public-subnet-2
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>CIDR Block: </strong> Configurable via{" "}
                    <span className="text-[#6183BB]">
                      var.public_subnet_cidr_block_1
                    </span>{" "}
                    and{" "}
                    <span className="text-[#6183BB]">
                      var.public_subnet_cidr_block_2
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>Public IP Mapping: </strong> Enabled with{" "}
                    <span className="text-[#6183BB]">
                      var.map_public_ip_on_launch <span className="text-yellow-500">=</span> <span className="text-green-500">true</span>
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>Availability Zones: </strong> Configurable via{" "}
                    <span className="text-[#6183BB]">
                      var.availability_zone_1
                    </span>{" "}
                    and{" "}
                    <span className="text-[#6183BB]">
                      var.availability_zone_2
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>Tags: </strong> Each subnet is tagged for
                    identification, e.g,{" "}
                    <span className="text-[#6183BB]">
                    <span className="text-purple-500">Name</span> <span className="text-yellow-500">=</span> <span className="text-green-400">"iac-project-public-subnet-1"</span>
                    </span>
                  </li>
                </ul>
                <p>
                  <strong>Private Subnets</strong>
                </p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Resource names: </strong>{" "}
                    <span className="text-[#6183BB]">
                      aws_subnet.private-subnet-1
                    </span>
                    ,{" "}
                    <span className="text-[#6183BB]">
                      aws_subnet.private-subnet-2
                    </span>{" "}
                    and{" "}
                    <span className="text-[#6183BB]">
                      aws_subnet.private-subnet-3
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>CIDR Block: </strong> Configurable via{" "}
                    <span className="text-[#6183BB]">
                      var.private_subnet_cidr_block_1
                    </span>
                    ,{" "}
                    <span className="text-[#6183BB]">
                      var.private_subnet_cidr_block_2
                    </span>{" "}
                    and{" "}
                    <span className="text-[#6183BB]">
                      var.private_subnet_cidr_block_3
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>Public IP Mapping: </strong> Disabled with{" "}
                    <span className="text-[#6183BB]">
                      var.map_public_ip_on_launch <span className="text-yellow-500">=</span> <span className="text-red-500">false</span>
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>Availability Zones: </strong> Configurable via{" "}
                    <span className="text-[#6183BB]">
                      var.availability_zone_1
                    </span>{" "}
                    and{" "}
                    <span className="text-[#6183BB]">
                      var.availability_zone_2
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>Tags: </strong> Each subnet is tagged for
                    identification, e.g,{" "}
                    <span className="text-[#6183BB]">
                    <span className="text-purple-500">Name</span> <span className="text-yellow-500">=</span> <span className="text-green-400">"iac-project-private-subnet-1"</span>
                    </span>
                  </li>
                </ul>
                <CodeContainer fileName="vpc/main.tf">
                  {`
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
  }
                `}
                </CodeContainer>
                <p>4. Route Tables</p>
                <p>
                  <strong>Public Route Table</strong>
                </p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Resource name: </strong>{" "}
                    <span className="text-[#6183BB]">
                      aws_route_table.public-route-table
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>Routes: </strong> Includes a route for{" "}
                    <span className="text-[#6183BB]">0.0.0.0/0</span> thhrough
                    the internet gateway (
                    <span className="text-[#6183BB]">
                      aws_internet_gateway.main.id
                    </span>
                    )
                  </li>
                  <li className="mb-2">
                    <strong>Tags: </strong> Tagged with{" "}
                    <span className="text-[#6183BB]">
                      <span className="text-purple-500">Name</span> <span className="text-yellow-500">=</span> <span className="text-green-400">"iac-project-public-route-table"</span>
                    </span>
                  </li>
                </ul>
                <p>
                  <strong>Private Route Table</strong>
                </p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Resource name: </strong>{" "}
                    <span className="text-[#6183BB]">
                      aws_route_table.private-route-table
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong>Tags: </strong> Tagged with{" "}
                    <span className="text-[#6183BB]">
                    <span className="text-purple-500">Name</span> <span className="text-yellow-500">=</span> <span className="text-green-400">"iac-project-private-route-table"</span>
                    </span>
                  </li>
                </ul>
                <CodeContainer fileName="vpc/main.tf">
                  {`
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
}
                `}
                </CodeContainer>
                <p>5. Route Table Associations</p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Public Subnets: </strong>Associated with the public
                    route table.
                  </li>
                  <li className="mb-2">
                    <strong>Private Subnets: </strong>Associated with the
                    private route table.
                  </li>
                </ul>
                <CodeContainer fileName="vpc/main.tf">
                  {`
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

                `}
                </CodeContainer>
                <h2 className="text-[22px] md:text-[26px] font-semibold">
                  Variables and Outputs
                </h2>
                <p>
                  All variables are defined in the{" "}
                  <span className="text-[#6183BB]">vpc/variables.tf</span> file
                  and the outputs that we need to retrieve for future use are
                  defined in the{" "}
                  <span className="text-[#6183BB]">vpc/outputs.tf</span> file.
                </p>
              </div>,
              <div
                id="alb-module"
                className="flex flex-col gap-4 text-white text-sm md:text-xl max-w-[300px] md:max-w-full"
              >
                <h2 className="text-[22px] md:text-[26px] font-semibold">
                  ALB Module
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
