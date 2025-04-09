import React from "react";

export default function Overview() {
  return (
    <div id="overview">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        Infra as Code - Overview
      </h1>
      <div className="flex flex-col gap-4 ">
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
  );
}
