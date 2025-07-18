"use client";
import React from "react";
import Image from "next/image";
// import { useTranslation } from "next-i18next";

export default function ArchitectureDiagram() {
  //   const { t } = useTranslation("iac");
  return (
    <div
      id="architecture-diagram"
      className="flex flex-col gap-4 lg:max-w-full"
    >
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        Architecture Diagram
      </h1>
      <p>
        {/* This project demonstrates the use of AWS services to analyze serverless
        logs. It was designed to implement a scalable and secure cloud,
        leveraging AWS services to create a robust environment suitable for
        hosting web applications. The project includes configurations for a
        Virtual Private Cloud (VPC), Application Load Balancer (ALB), Auto
        Scaling Group (ASG), and Relational Database Service (RDS). The
        infrastructure is secured using AWS Security Groups to manage inbound
        and outbound traffic for each resource, guaranteeing that only
        authorized traffic is allowed. */}
      </p>
      <ul className="list-disc pl-5">
        <li>
          <strong>AWS Cloudtrail:</strong> used to track all
          the actions performed in the AWS account.
        </li>
        <li>
          <strong>AWS EventBridge:</strong> used to
          trigger the AWS Lambda function when a new log is created.
        </li>
        <li>
          <strong>AWS Lambda:</strong> used to analyze the logs
          and store the results in Amazon S3.
        </li>
        <li>
          <strong>Amazon S3:</strong> used to store the logs and
          the results.
        </li>
      </ul>
      <p className="mt-4">
        {/* {t("iac.architectureDiagram.accessDescription")} */}
      </p>
      <figure>
        <Image
          src="../images/projects/infra-as-code/serverless-analyzer.png"
          alt="Architecture Diagram"
          width={1000}
          height={1000}
          className="border-2 border-black rounded-lg shadow-lg"
        />
        <figcaption className="mt-2">
          <p>
            {/* {t("iac.architectureDiagram.figcaption")} */} Diagram created with Lucidchart:{" "}
            <a
              href="https://www.lucidchart.com/pages/landing"
              target="_blank"
              className="underline text-blue-500 hover:text-blue-400"
            >
              https://www.lucidchart.com/pages/landing
            </a>
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
