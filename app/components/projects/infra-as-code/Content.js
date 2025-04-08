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
                  on demand. The RDS serves as the application&apos;s data
                  storage solution. All EC2 instances reside in private subnets,
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
                  The process of creating the backend configuration involves
                  creating the necessary resources using Terraform instead of
                  manually setting them up in the AWS console. This approach
                  ensures that all resources are managed as code, providing
                  consistency and version control.
                </p>
                <p>
                  Once the resources are created, the backend is defined as
                  &quot;s3&quot; to store the Terraform state file. After
                  defining the backend, the{" "}
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
                  Features
                </h2>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>VPC: </strong>Creates a VPC with DNS and hostname
                    support.
                  </li>
                  <li className="mb-2">
                    <strong>Internet Gateway: </strong>Provisions an internet
                    gateway to allow inbound and outbound traffic.
                  </li>
                  <li className="mb-2">
                    <strong>Subnets: </strong>Configures public and private
                    subnets across multiple availability zones.
                  </li>
                  <li className="mb-2">
                    <strong>Route Tables: </strong>Configures route tables to
                    manage network traffic.
                  </li>
                  <li className="mb-2">
                    <strong>Route Table Associations: </strong>Associates
                    subnets with the appropriate route tables.
                  </li>
                </ul>
                <h2 className="text-[22px] md:text-[26px] font-semibold">
                  Resources
                </h2>
                <p>1. Virtual Private Cloud (VPC)</p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Resource: </strong>{" "}
                    <span className="text-[#6183BB]">aws_vpc.main</span>
                  </li>
                  <ul className="list-disc pl-5 ml-5">
                    <li>
                      <span className="text-[#6183BB]">cidr_block</span>: The
                      CIDR block for the VPC.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">
                        enable_dns_hostnames
                      </span>
                      : Whether to enable DNS hostnames in the VPC.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">enable_dns_support</span>
                      : Whether to enable DNS support in the VPC.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">tags</span>: Assigns a
                      name tag to the VPC for identification.
                    </li>
                  </ul>
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
                    <strong>Resource: </strong>{" "}
                    <span className="text-[#6183BB]">aws_internet_gateway</span>
                  </li>
                  <ul className="list-disc pl-5 ml-5">
                    <li>
                      <span className="text-[#6183BB]">vpc_id</span>: The ID of
                      the VPC to which the internet gateway is attached.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">tags</span>: Assigns a
                      name tag to the internet gateway.
                    </li>
                  </ul>
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
                    <strong>Resource: </strong>{" "}
                    <span className="text-[#6183BB]">aws_subnet</span>
                    <ul className="list-disc pl-5 ml-5">
                      <li>
                        <span className="text-[#6183BB]">vpc_id</span>: The ID
                        of the VPC to which the subnet is associated.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">cidr_block</span>: The
                        CIDR block for the subnet.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">
                          map_public_ip_on_launch
                        </span>
                        : Enable to assign a public IP to instances launched in
                        this subnet.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">
                          availability_zone
                        </span>
                        : The availability zone for the subnet.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">tags</span>: Assigns a
                        name tag to the subnet.
                      </li>
                    </ul>
                  </li>
                </ul>
                <p>
                  <strong>Private Subnets</strong>
                </p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Resource: </strong>{" "}
                    <span className="text-[#6183BB]">aws_subnet</span>
                    <ul className="list-disc pl-5 ml-5">
                      <li>
                        <span className="text-[#6183BB]">vpc_id</span>: The ID
                        of the VPC to which the subnet is associated.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">cidr_block</span>: The
                        CIDR block for the subnet.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">
                          map_public_ip_on_launch
                        </span>
                        : Disable to block automatic public IP assignment to
                        instances launched in this subnet.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">
                          availability_zone
                        </span>
                        : The availability zone for the subnet.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">tags</span>: Assigns a
                        name tag to the subnet.
                      </li>
                    </ul>
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
                    <strong>Resource: </strong>{" "}
                    <span className="text-[#6183BB]">aws_route_table</span>
                  </li>
                  <ul className="list-disc pl-5 ml-5">
                    <li>
                      <span className="text-[#6183BB]">vpc_id</span>: The ID of
                      the VPC to which the route table is associated.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">route</span>: includes a
                      route for{" "}
                      <span className="text-[#6183BB]">0.0.0.0/0</span> through
                      the internet gateway. (
                      <span className="text-[#6183BB]">
                        aws_internet_gateway.main.id
                      </span>
                      )
                    </li>
                    <li>
                      <span className="text-[#6183BB]">tags</span>: Assigns a
                      name tag to the route table.
                    </li>
                  </ul>
                </ul>
                <p>
                  <strong>Private Route Table</strong>
                </p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Resource: </strong>{" "}
                    <span className="text-[#6183BB]">aws_route_table</span>
                  </li>
                  <ul className="list-disc pl-5 ml-5">
                    <li>
                      <span className="text-[#6183BB]">vpc_id</span>: The ID of
                      the VPC to which the route table is associated.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">tags</span>: Assigns a
                      name tag to the route table.
                    </li>
                  </ul>
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
                  The module uses several input variables to customize the
                  deployment, such as{" "}
                  <span className="text-[#6183BB]">cidr_block</span>,{" "}
                  <span className="text-[#6183BB]">enable_dns_hostnames</span>,{" "}
                  <span className="text-[#6183BB]">
                    public_subnet_cidr_block_1
                  </span>
                  , and others. These variables are defined in the{" "}
                  <code className="bg-gray-800 text-white px-2 rounded">
                    variables.tf
                  </code>{" "}
                  file and allow for flexible configuration of the VPC and its
                  components. The module also provides outputs for the VPC ID,
                  subnet IDs, and CIDR blocks in the{" "}
                  <code className="bg-gray-800 text-white px-2 rounded">
                    outputs.tf
                  </code>{" "}
                  file, which can be used by other modules or resources within
                  the infrastructure.
                </p>
              </div>
              <div
                id="alb-module"
                className="flex flex-col gap-4 text-white text-sm md:text-xl max-w-[300px] md:max-w-full"
              >
                <h2 className="text-[22px] md:text-[26px] font-semibold">
                  ALB Module
                </h2>
                <p>
                  The ALB (Application Load Balancer) module is a key component
                  of the infrastructure, designed to manage and distribute
                  incoming application traffic across multiple targets, such as
                  EC2 instances, in a single or multiple Availability Zones.
                  This module ensures high availability, automatic scaling, and
                  robust security for your applications.
                </p>
                <h2 className="text-[22px] md:text-[26px] font-semibold">
                  Features
                </h2>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Application Load Balancer: </strong>Configures an
                    ALB to distribute incoming HTTP and HTTPS traffic.
                  </li>
                  <li className="mb-2">
                    <strong>Target Group: </strong>Manages a target group for
                    routing requests to one or more registered targets.
                  </li>
                  <li className="mb-2">
                    <strong>Listener:</strong>Sets up a listener to check for
                    connection requests from clients and forwards them to the
                    target group
                  </li>
                  <li className="mb-2">
                    <strong>Security Group: </strong>Establishes a security
                    group to control inbound and outbound traffic to the ALB.
                  </li>
                </ul>
                <h2 className="text-[22px] md:text-[26px] font-semibold">
                  Resources
                </h2>
                <p>1. Application Load Balancer (ALB)</p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Resource: </strong>{" "}
                    <span className="text-[#6183BB]">aws_lb</span>
                    <ul className="list-disc pl-5 ml-5">
                      <li>
                        <span className="text-[#6183BB]">name</span>: The name
                        of the ALB.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">internal</span>:
                        Specifies whether the ALB is internet-facing or
                        internal, set to false.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">
                          load_balancer_type
                        </span>
                        : Type of the load balancer, set to
                        &quot;application&quot;.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">security_groups</span>:
                        List of security group IDs associated with the ALB.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">subnets</span>: List of
                        subnet IDs where the ALB is deployed.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">
                          enable_deletion_protection
                        </span>
                        : Boolean to enable/disable deletion protection.
                      </li>
                    </ul>
                  </li>
                </ul>
                <CodeContainer fileName="alb/main.tf">
                  {`
  resource "aws_lb" "iac-project-alb" {
  name                       = var.alb_name
  internal                   = false
  load_balancer_type         = "application"
  security_groups            = [aws_security_group.iac-project-alb-security-group.id]
  subnets                    = [var.public_subnet_id, var.public_subnet_id_2]
  enable_deletion_protection = false
}`}
                </CodeContainer>
                <p>2. Target Group</p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Resource: </strong>{" "}
                    <span className="text-[#6183BB]">aws_lb_target_group</span>
                  </li>
                  <ul className="list-disc pl-5 ml-5">
                    <li>
                      <span className="text-[#6183BB]">name</span>: The name of
                      the target group.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">port</span>: The port on
                      which the ALB receives traffic, set to 80.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">protocol</span>: The
                      protocol to use for routing traffic to the targets, set to
                      &quot;HTTP&quot;.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">vpc_id</span>: The ID of
                      the VPC where the target group is deployed.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">
                        Health Check Configuration:
                      </span>
                      <ul className="list-disc pl-5 ml-5">
                        <li>
                          <span className="text-[#6183BB]">path</span>: The
                          destination for the health check request.
                        </li>
                        <li>
                          <span className="text-[#6183BB]">interval</span>: Time
                          between health checks.
                        </li>
                        <li>
                          <span className="text-[#6183BB]">timeout</span>: Time
                          to wait for a health check response.
                        </li>
                        <li>
                          <span className="text-[#6183BB]">
                            healthy_threshold
                          </span>
                          : Number of consecutive successful health checks
                          required before considering a target healthy.
                        </li>
                        <li>
                          <span className="text-[#6183BB]">
                            unhealthy_threshold
                          </span>
                          : Number of consecutive failed health checks required
                          before considering a target unhealthy.
                        </li>
                        <li>
                          <span className="text-[#6183BB]">matcher</span>: HTTP
                          codes to use when checking for a successful response.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </ul>
                <CodeContainer fileName="alb/main.tf">
                  {`
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
`}
                </CodeContainer>
                <p>3. Listener</p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Resource: </strong>{" "}
                    <span className="text-[#6183BB]">aws_lb_listener</span>
                    <ul className="list-disc pl-5 ml-5">
                      <li>
                        <span className="text-[#6183BB]">
                          load_balancer_arn
                        </span>
                        : ARN of the load balancer.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">port</span>: Port on
                        which the ALB receives traffic, set to 80.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">protocol</span>:
                        Protocol to use for routing traffic to the targets, set
                        to &quot;HTTP&quot;.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">default_action</span>:
                        Default action to take when a request is received.
                        <ul className="list-disc pl-5 ml-5">
                          <li>
                            <span className="text-[#6183BB]">type</span>: Type
                            of the default action, set to &quot;forward&quot;.
                          </li>
                          <li>
                            <span className="text-[#6183BB]">
                              target_group_arn
                            </span>
                            : ARN of the target group to forward the traffic to.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
                <CodeContainer fileName="alb/main.tf">
                  {`
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.iac-project-alb.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.iac-project-alb-target-group.arn
  }
}
                `}
                </CodeContainer>
                <p>4. Security Group</p>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Resource: </strong>{" "}
                    <span className="text-[#6183BB]">aws_security_group</span>
                    <ul className="list-disc pl-5 ml-5">
                      <li>
                        <span className="text-[#6183BB]">name</span>: Name of
                        the security group.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">description</span>:
                        Description of the security group.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">vpc_id</span>: ID of
                        the VPC where the security group is deployed.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">ingress</span>: Allows
                        HTTP (port 80) and HTTPS (port 443) from any IP.
                      </li>
                      <li>
                        <span className="text-[#6183BB]">egress</span>: Allows
                        traffic only to specified CIDR blocks, in port 8080.
                      </li>
                    </ul>
                  </li>
                </ul>
                <CodeContainer fileName="alb/main.tf">
                  {`
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
                `}
                </CodeContainer>
                <h2 className="text-[22px] md:text-[26px] font-semibold">
                  Variables and Outputs
                </h2>
                <p>
                  The module uses several input variables to customize the
                  deployment, such as{" "}
                  <span className="text-[#6183BB]">alb_name</span>,{" "}
                  <span className="text-[#6183BB]">public_subnet_id</span>,{" "}
                  <span className="text-[#6183BB]">alb_target_group_name</span>,
                  and others. These variables are defined in the{" "}
                  <code className="bg-gray-800 text-white px-2 rounded">
                    variables.tf
                  </code>{" "}
                  file and allow for flexible configuration of the ALB and its
                  components. The module also provides outputs for the security
                  group ID and target group ARN in the{" "}
                  <code className="bg-gray-800 text-white px-2 rounded">
                    outputs.tf
                  </code>{" "}
                  file, which can be used by other modules or resources within
                  the infrastructure.
                </p>
              </div>
              <div
                id="asg-module"
                className="flex flex-col gap-4 text-white text-sm md:text-xl max-w-[300px] md:max-w-full"
              >
                <h2 className="text-[22px] md:text-[26px] font-semibold">
                  ASG Module
                </h2>
                <p>
                  The ASG (Auto Scaling Group) module is designed to
                  automatically manage the scaling of EC2 instances based on
                  demand. This module ensures that the application remains
                  available and can handle varying levels of traffic by
                  dynamically adjusting the number of instances in response to
                  load.
                </p>
                <h2 className="text-[22px] md:text-[26px] font-semibold">
                  Features
                </h2>
                <ul className="list-disc pl-5">
                  <li className="mb-2">
                    <strong>Lauching template: </strong>Configures a launch
                    template to define the instance configuration.
                  </li>
                  <li className="mb-2">
                    <strong>Auto Scaling Group: </strong>Manages the scaling of
                    instances to maintain desired performance.
                  </li>
                  <li className="mb-2">
                    <strong>Security Groups: </strong>Establishes security
                    groups to control inbound and outbound traffic for the
                    instances.
                  </li>
                </ul>
                <h2 className="text-[22px] md:text-[26px] font-semibold">
                  Resources
                </h2>
                <p>1. Launch Template</p>
                <ul className="list-disc pl-5">
                  <li>
                    <strong>Resource: </strong>
                    <span className="text-[#6183BB]">aws_launch_template</span>
                  </li>
                  <ul className="list-disc pl-5">
                    <li>
                      <span className="text-[#6183BB]">name</span>: The name of
                      the launch template.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">image_id</span>: The ID
                      of the AMI to use for the instances.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">instance_type</span>: The
                      type of instance to use.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">key_name</span>: The name
                      of the key for SSH access.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">network_interface</span>:
                      <ul className="list-disc pl-5 ml-5">
                        <li>
                          <span className="text-[#6183BB]">
                            associate_public_ip_address
                          </span>
                          : Whether to associate a public IP address with the
                          instanc, set to false.
                        </li>
                        <li>
                          <span className="text-[#6183BB]">
                            security_groups
                          </span>
                          : List of security group IDs to associate with the
                          instance.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="text-[#6183BB]">user_data</span>:
                      Base64-encoded script to initialize the instance.
                    </li>
                  </ul>
                </ul>

                <CodeContainer fileName="asg/main.tf">
                  {" "}
                  {`
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
                `}
                </CodeContainer>
                <p>2. Auto Scaling Group</p>
                <ul className="list-disc pl-5">
                  <li>
                    <strong>Resource: </strong>
                    <span className="text-[#6183BB]">
                      aws_autoscaling_group
                    </span>
                  </li>
                  <ul className="list-disc pl-5">
                    <li>
                      <span className="text-[#6183BB]">name</span>: The name of
                      the auto scaling group.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">max_size</span>: Maximum
                      number of instances.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">min_size</span>: Minimum
                      number of instances.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">desired_capacity</span>:
                      Desired number of instances.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">
                        vpc_zone_identifier
                      </span>
                      : List of subnet IDs to associate with the auto scaling
                      group.
                    </li>
                    <li>
                      <span className="text-[#6183BB]">target_group_arns</span>:
                      List of target group ARNs for load balancing.
                    </li>
                  </ul>
                </ul>
                <CodeContainer fileName="asg/main.tf">
                  {`
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
                  `}
                </CodeContainer>
                <p>3. Security Group</p>
                <ul className="list-disc pl-5">
                  <li>
                    <strong>Web Server Security Group</strong>
                    <ul>
                      <li>
                        <strong>Resource: </strong>
                        <span className="text-[#6183BB]">
                          aws_security_group
                        </span>
                        <ul className="list-disc pl-5 ml-5">
                          <li>
                            <span className="text-[#6183BB]">name</span>: The
                            name of the security group.
                          </li>

                          <li>
                            <span className="text-[#6183BB]">vpc_id</span>: The
                            ID of the VPC where the security group is deployed.
                          </li>
                          <li>
                            <span className="text-[#6183BB]">ingress</span>:
                            Allows HTTP on port 8080 from the ALB.
                          </li>
                          <li>
                            <span className="text-[#6183BB]">egress</span>:
                            Allows egress to RDS.
                          </li>
                        </ul>
                      </li>
                    </ul>

                    <ul>
                      <li>
                        <strong>RDS Security Group</strong>
                      </li>
                      <li>
                        <strong>Resource: </strong>
                        <span className="text-[#6183BB]">
                          aws_security_group
                        </span>
                        <ul className="list-disc pl-5 ml-5">
                          <li>
                            <span className="text-[#6183BB]">name</span>: The
                            name of the security group.
                          </li>
                          <li>
                            <span className="text-[#6183BB]">vpc_id</span>: The
                            ID of the VPC where the security group is deployed.
                          </li>
                          <li>
                            <span className="text-[#6183BB]">ingress</span>:
                            Allows traffic from the web server security group.
                          </li>
                          <li>
                            <span className="text-[#6183BB]">egress</span>:
                            Allows outbound traffic to any destination.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
                <CodeContainer fileName="asg/main.tf">
                  {`
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

                  `}
                </CodeContainer>
                <h2 className="text-[22px] md:text-[26px] font-semibold">
                  Variables and Outputs
                </h2>
                <p>
                  The module uses several input variables to customize the
                  deployment, such as{" "}
                  <span className="text-[#6183BB]">launch_template_name</span>,{" "}
                  <span className="text-[#6183BB]">image_id</span>,{" "}
                  <span className="text-[#6183BB]">instance_type</span>, and
                  others. These variables are defined in the{" "}
                  <code className="bg-gray-800 text-white px-2 rounded">
                    variables.tf
                  </code>{" "}
                  file and allow for flexible configuration of the ASG and its
                  components. The module also provides outputs for the auto
                  scaling group name and RDS security group ID in the{" "}
                  <code className="bg-gray-800 text-white px-2 rounded">
                    outputs.tf
                  </code>{" "}
                  file, which can be used by other modules or resources within
                  the infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
