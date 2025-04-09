import React from "react";
import Image from "next/image";

export default function CodeStructure() {
  return (
    <div id="code-structure" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        Code Structure
      </h1>
      <p>
        This Terraform project is organized into two key components:
        modules and backend configuration. Each part plays a crucial
        role in managing and deploying infrastructure efficiently
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
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
        <code className="bg-gray-800 px-2 rounded">main.tf</code>{" "}
        file that defines the resources, a{" "}
        <code className="bg-gray-800 px-2 rounded">
          variables.tf
        </code>{" "}
        file that defines the variables and a{" "}
        <code className="bg-gray-800 px-2 rounded">outputs.tf</code>{" "}
        file that defines the outputs, when needed.
      </p>
      <Image
        src="../images/projects/infra-as-code/modules-structure.png"
        alt="Code Structure"
        width={300}
        height={300}
        className="border-1 border-[#4f5157] rounded-lg shadow-lg"
      />
    </div>
  );
}
