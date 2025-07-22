"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { useTranslation } from "next-i18next";
import {
  cloudwatchEventRuleCode,
  cloudwatchEventTargetCode,
  cloudwatchLambdaPermissionCode,
} from "./codeSnippets";

export default function EventBridgeModule() {
  const { t } = useTranslation("analyzer");
  return (
    <div id="eventbridge-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("analyzer.eventBridgeModule.title")}
      </h1>
      <p>
        {t("analyzer.eventBridgeModule.description")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("analyzer.eventBridgeModule.featuresTitle")}
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>CloudWatch Event Rule: </strong>
          {t("analyzer.eventBridgeModule.cloudwatchEventRuleDescription")}
        </li>
        <li className="mb-2">
          <strong>Lambda Target Configuration: </strong>
          {t("analyzer.eventBridgeModule.lambdaTargetDescription")}
        </li>
        <li className="mb-2">
          <strong>EventBridge Permissions: </strong>
          {t("analyzer.eventBridgeModule.eventBridgePermissionsDescription")}
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
            {t("analyzer.eventBridgeModule.cloudwatchEventRule.name")}
          </li>
          <li>
            <span className="text-[#6e5da9]">description:</span>{" "}
            {t("analyzer.eventBridgeModule.cloudwatchEventRule.description")}
          </li>
          <li>
            <span className="text-[#6e5da9]">schedule_expression:</span>{" "}
            {t("analyzer.eventBridgeModule.cloudwatchEventRule.scheduleExpression")}
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
            {t("analyzer.eventBridgeModule.lambdaTarget.rule")}
          </li>
          <li>
            <span className="text-[#6e5da9]">target_id:</span>{" "}
            {t("analyzer.eventBridgeModule.lambdaTarget.targetId")}
          </li>
          <li>
            <span className="text-[#6e5da9]">arn:</span>{" "}
            {t("analyzer.eventBridgeModule.lambdaTarget.arn")}
          </li>
          <li>
            <span className="text-[#6e5da9]">input:</span>{" "}
            {t("analyzer.eventBridgeModule.lambdaTarget.input")}
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
            {t("analyzer.eventBridgeModule.eventBridgePermissions.statement_id")}
          </li>
          <li>
            <span className="text-[#6e5da9]">action:</span>{" "}
            {t("analyzer.eventBridgeModule.eventBridgePermissions.action")}
          </li>
          <li>
            <span className="text-[#6e5da9]">function_name:</span>{" "}
            {t("analyzer.eventBridgeModule.eventBridgePermissions.function_name")}
          </li>
          <li>
            <span className="text-[#6e5da9]">principal:</span>{" "}
            {t("analyzer.eventBridgeModule.eventBridgePermissions.principal")}
          </li>
          <li>
            <span className="text-[#6e5da9]">source_arn:</span>{" "}
            {t("analyzer.eventBridgeModule.eventBridgePermissions.source_arn")}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="eventbridge/main.tf">
        {cloudwatchLambdaPermissionCode}
      </CodeContainer>
    </div>
  );
}
