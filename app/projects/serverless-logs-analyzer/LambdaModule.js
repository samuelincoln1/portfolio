"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
// import { useTranslation } from "next-i18next";
import {
  lambdaFunctionsCode,
  lambdaPermissionsCode,
  lambdaTriggerCode,
} from "./codeSnippets";

export default function LambdaModule() {
  // const { t } = useTranslation("iac");
  return (
    <div id="lambda-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        Lambda Module
      </h1>
      <p>
        This module is designed to create the serverless compute infrastructure
        for log processing and analysis. It establishes two specialized Lambda
        functions that handle different aspects of the log analysis workflow -
        one for aggregating daily logs and another for processing aggregated
        logs to generate insights. The module also configures the necessary
        triggers, permissions, and integrations to enable automatic execution
        based on S3 events and scheduled intervals.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {/* {t("iac.vpcModule.featuresTitle")} */} Features
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Lambda Aggregator Function: </strong>
          {/* {t("iac.vpcModule.igwDescription")} */} Deploys a Python 3.11
          Lambda function that consolidates multiple daily log files into single
          aggregated files, designed to be triggered by EventBridge scheduling.
        </li>
        <li className="mb-2">
          <strong>Lambda Analyzer Function: </strong>
          {/* {t("iac.vpcModule.vpcDescription")} */} Creates a Python 3.11
          Lambda function that processes aggregated CloudTrail logs and
          generates statistical insights, triggered automatically by S3
          ObjectCreated events.
        </li>
        <li className="mb-2">
          <strong>Lambda Permissions: </strong>
          {/* {t("iac.vpcModule.igwDescription")} */} Establishes proper
          permissions allowing S3 service to invoke the Lambda functions while
          maintaining security boundaries.
        </li>
        <li className="mb-2">
          <strong>S3 Event Triggers: </strong>
          {/* {t("iac.vpcModule.igwDescription")} */} Configures S3 bucket
          notifications to automatically invoke the analyzer function whenever
          new log files are uploaded to the input bucket.
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p className="font-bold">1. Lambda Functions</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource: <span className="text-[#6e5da9]">aws_lambda_function</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">function_name:</span>{" "}
            {/* {t("iac.vpcModule.vpc.cidrBlockDescription")} */} The name of
            the Lambda function.
          </li>
          <li>
            <span className="text-[#6e5da9]">role:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */} The
            role that the Lambda function assumes when it executes, providing
            necessary permissions.
          </li>
          <li>
            <span className="text-[#6e5da9]">handler:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */} The
            entry point for the Lambda function, specifying the file and
            function name to execute.
          </li>
          <li>
            <span className="text-[#6e5da9]">runtime:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */} The
            runtime environment for the Lambda function.
          </li>
          <li>
            <span className="text-[#6e5da9]">filename:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */} The
            path to the deployment package (ZIP file) containing the Lambda
            function code.
          </li>
          <li>
            <span className="text-[#6e5da9]">source_code_hash:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */} The
            hash of the source code for the Lambda function.
          </li>
          <li>
            <span className="text-[#6e5da9]">timeout:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */} The
            maximum execution time in seconds for the Lambda function.
          </li>
          <li>
            <span className="text-[#6e5da9]">environment:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */} The
            environment variables for the Lambda function.
          </li>
          <li>
            <span className="text-[#6e5da9]">tags:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */} The
            tags for the Lambda function.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="lambda/main.tf">
        {lambdaFunctionsCode}
      </CodeContainer>
      <p className="font-bold">2. Lambda Permissions</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource:{" "}
          <span className="text-[#6e5da9]">aws_lambda_permission</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">statement_id:</span>{" "}
            {/* {t("iac.vpcModule.igw.vpcIdDescription")} */} The unique
            identifier for the permission.
          </li>
          <li>
            <span className="text-[#6e5da9]">action:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The action to allow
            the Lambda function to perform.
          </li>
          <li>
            <span className="text-[#6e5da9]">principal:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The service or
            entity that is allowed to invoke the Lambda function.
          </li>
          <li>
            <span className="text-[#6e5da9]">function_name:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The name of the
            Lambda function that is allowed to be invoked by the principal.
          </li>
          <li>
            <span className="text-[#6e5da9]">source_arn:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The ARN of the
            resource that is allowed to invoke the Lambda function.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="lambda/main.tf">
        {lambdaPermissionsCode}
      </CodeContainer>
      <p className="font-bold">3. S3 Event Triggers</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource:{" "}
          <span className="text-[#6e5da9]">aws_s3_bucket_notification</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">bucket:</span>{" "}
            {/* {t("iac.vpcModule.igw.vpcIdDescription")} */} The S3 bucket to
            configure the notification for.
          </li>
          <li>
            <span className="text-[#6e5da9]">action:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The action to allow
            the Lambda function to perform.
          </li>
          <li>
            <span className="text-[#6e5da9]">depends_on:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} To ensure that the
            Lambda function exists before the S3 bucket notification is
            configured.
          </li>
          <li>
            <span className="text-[#6e5da9]">lambda_function:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The Lambda function
            to be triggered when the event occurs and the event type that
            triggers the Lambda function.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="lambda/main.tf">
        {lambdaTriggerCode}
      </CodeContainer>
    </div>
  );
}
