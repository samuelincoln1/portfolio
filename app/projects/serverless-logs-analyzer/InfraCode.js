"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function InfraCode() {
  const { t } = useTranslation("iac");
  return (
    <div id="infra-code-structure" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        Infra Code Structure
      </h1>
      <p>
        The infrastructure is implemented through a modular architecture using
        Terraform, which provisions the following AWS components organized into
        5 main modules.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Modules
      </h2>
      <ul className="list-decimal pl-5">
        <li className="mb-2">
          <strong>S3 Module: </strong>
          This module is responsible for creating the storage infrastructure
          with two S3 buckets. It configures the input bucket to receive
          CloudTrail logs and the output bucket for processed insights. Both
          buckets are secured with versioning enabled, AES256 encryption, and
          complete public access blocking to ensure data protection and
          compliance.
        </li>
        <li className="mb-2">
          <strong>IAM Module: </strong>
          The Identity and Access Management (IAM) module manages security
          permissions for the Lambda functions. It creates a dedicated execution
          role with precise permissions for S3 operations (read, write, delete)
          on both buckets and CloudWatch logging capabilities, following the
          principle of least privilege for enhanced security.
        </li>
        <li className="mb-2">
          <strong>Lambda Module: </strong>
          This module handles the serverless compute functions that process the
          logs. It deploys two Python 3.11 Lambda functions - the Analyzer for
          processing aggregated logs and generating insights, and the Aggregator
          for consolidating daily log files. The module also configures S3 event
          triggers and proper permissions for seamless integration.
        </li>
        <li className="mb-2">
          <strong>CloudTrail Module: </strong>
          The CloudTrail module sets up comprehensive AWS account auditing and
          logging. It configures a multi-region trail that captures management
          events, global service events, and S3 data events, automatically
          delivering all logs to the input S3 bucket with appropriate bucket
          policies for secure log storage.
        </li>
        <li className="mb-2">
          <strong>EventBridge Module: </strong>
          This module manages the automated scheduling system for log
          processing. It creates a CloudWatch Event Rule with a cron expression
          to trigger the Lambda Aggregator function every 12 hours, ensuring
          regular log consolidation and processing without manual intervention.
        </li>
      </ul>

      <p>
        {/* {t("iac.codeStructure.moduleFilesDescription1")} */} Inside each module, there is a
        <code className="text-[#EC585D]">{" "}main.tf</code>{" "}
        {/* {t("iac.codeStructure.moduleFilesDescription2")}  */} file that defines the resources, a
        <code className="text-[#EC585D]">
          {" "}variables.tf
        </code>{" "}
        {/* {t("iac.codeStructure.moduleFilesDescription3")} */} file that defines the variables, and an
        <code className="text-[#EC585D]">{" "}outputs.tf</code>{" "}
        {/* {t("iac.codeStructure.moduleFilesDescription4")} */} file that defines the outputs, when needed.
      </p>
    </div>
  );
}
