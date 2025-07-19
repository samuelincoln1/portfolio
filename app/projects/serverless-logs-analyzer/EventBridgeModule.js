"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
// import { useTranslation } from "next-i18next";
import {
  cloudwatchEventRuleCode,
  cloudwatchEventTargetCode,
  cloudwatchLambdaPermissionCode,
} from "./codeSnippets";

export default function EventBridgeModule() {
  // const { t } = useTranslation("iac");
  return (
    <div id="eventbridge-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        EventBridge Module
      </h1>
      <p>
        This module is designed to create automated scheduling infrastructure
        for periodic log processing tasks. It establishes a CloudWatch Event
        Rule with cron-based scheduling that automatically triggers the Lambda
        Aggregator function every 12 hours to consolidate daily CloudTrail logs.
        The module configures the necessary event targets, permissions, and
        payload delivery to enable seamless integration between the scheduling
        service and the serverless compute functions.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {/* {t("iac.vpcModule.featuresTitle")} */} Features
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>CloudWatch Event Rule: </strong>
          {/* {t("iac.vpcModule.igwDescription")} */} Creates a scheduled event
          rule using cron expressions to automatically trigger log aggregation
          tasks every 12 hours, ensuring consistent and timely processing of
          accumulated CloudTrail logs.
        </li>
        <li className="mb-2">
          <strong>Lambda Target Configuration: </strong>
          {/* {t("iac.vpcModule.vpcDescription")} */} Establishes the Lambda
          Aggregator function as the target for the scheduled events, with
          proper payload configuration including account ID for contextual
          processing.
        </li>
        <li className="mb-2">
          <strong>EventBridge Permissions: </strong>
          {/* {t("iac.vpcModule.vpcDescription")} */} Configures Lambda
          permissions to allow the EventBridge service to invoke the aggregator
          function while maintaining security boundaries and preventing
          unauthorized access.
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p className="font-bold">1. CloudWatch Event Rule</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource:{" "}
          <span className="text-[#6e5da9]">aws_cloudwatch_event_rule</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">name:</span>{" "}
            {/* {t("iac.vpcModule.vpc.cidrBlockDescription")} */} The unique
            name identifier for the EventBridge rule within the AWS account.
          </li>
          <li>
            <span className="text-[#6e5da9]">description:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */} A
            human-readable description explaining the purpose and functionality
            of the event rule.
          </li>
          <li>
            <span className="text-[#6e5da9]">schedule_expression:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */} The
            cron or rate expression that defines when the rule should trigger,
            supporting both cron syntax and rate-based scheduling formats.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="eventbridge/main.tf">
        {cloudwatchEventRuleCode}
      </CodeContainer>
      <p className="font-bold">2. Lambda Target Configuration</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource: <span className="text-[#6e5da9]">aws_cloudwatch_event_target</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">rule:</span>{" "}
            {/* {t("iac.vpcModule.igw.vpcIdDescription")} */} The name of the
            EventBridge rule to which the target is attached.
          </li>
          <li>
            <span className="text-[#6e5da9]">target_id:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The unique identifier
            for the target within the EventBridge rule.
          </li>
          <li>
            <span className="text-[#6e5da9]">arn:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The Amazon Resource Name (ARN) of the Lambda function to be invoked by the EventBridge rule.
          </li>
          <li>
            <span className="text-[#6e5da9]">input:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The JSON-encoded payload to be passed to the Lambda function.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="eventbridge/main.tf">
        {cloudwatchEventTargetCode}
      </CodeContainer>
      <p className="font-bold">3. EventBridge Permissions</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource: <span className="text-[#6e5da9]">aws_lambda_permission</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">statement_id:</span>{" "}
            {/* {t("iac.vpcModule.igw.vpcIdDescription")} */} The unique identifier for the permission statement.
          </li>
          <li>
            <span className="text-[#6e5da9]">action:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The AWS Lambda action that is being allowed, in this case "lambda:InvokeFunction" to permit function execution.
          </li>
          <li>
            <span className="text-[#6e5da9]">function_name:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The name of the Lambda function that will receive the permission to be invoked by the specified principal.
          </li>
          <li>
            <span className="text-[#6e5da9]">principal:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The service or entity that is allowed to invoke the Lambda function, in this case "events.amazonaws.com" for EventBridge.
          </li>
          <li>
            <span className="text-[#6e5da9]">source_arn:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The Amazon Resource Name (ARN) of the EventBridge rule that is allowed to invoke the Lambda function.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="eventbridge/main.tf">
        {cloudwatchLambdaPermissionCode}
      </CodeContainer>
    </div>
  );
}
