"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { useTranslation } from "next-i18next";
import {
  lambdaFunctionsCode,
  lambdaPermissionsCode,
  lambdaTriggerCode,
} from "./codeSnippets";

export default function LambdaModule() {
  const { t } = useTranslation("analyzer");
  return (
    <div id="lambda-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("analyzer.lambdaModule.title")}
      </h1>
      <p>
        {t("analyzer.lambdaModule.description")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("analyzer.lambdaModule.featuresTitle")}
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Lambda Aggregator Function: </strong>
          {t("analyzer.lambdaModule.lambdaAggregatorFunctionDescription")}
        </li>
        <li className="mb-2">
          <strong>Lambda Analyzer Function: </strong>
          {t("analyzer.lambdaModule.lambdaAnalyzerFunctionDescription")}
        </li>
        <li className="mb-2">
          <strong>Lambda Permissions: </strong>
          {t("analyzer.lambdaModule.lambdaPermissionsDescription")}
        </li>
        <li className="mb-2">
          <strong>S3 Event Triggers: </strong>
          {t("analyzer.lambdaModule.s3EventTriggerDescription")}
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
            {t("analyzer.lambdaModule.lambdaFunctions.functionName")}
          </li>
          <li>
            <span className="text-[#6e5da9]">role:</span>{" "}
            {t("analyzer.lambdaModule.lambdaFunctions.role")}
          </li>
          <li>
            <span className="text-[#6e5da9]">handler:</span>{" "}
              {t("analyzer.lambdaModule.lambdaFunctions.handler")}
          </li>
          <li>
            <span className="text-[#6e5da9]">runtime:</span>{" "}
            {t("analyzer.lambdaModule.lambdaFunctions.runtime")}
          </li>
          <li>
            <span className="text-[#6e5da9]">filename:</span>{" "}
            {t("analyzer.lambdaModule.lambdaFunctions.filename")}
          </li>
          <li>
            <span className="text-[#6e5da9]">source_code_hash:</span>{" "}
            {t("analyzer.lambdaModule.lambdaFunctions.sourceCodeHash")}
          </li>
          <li>
            <span className="text-[#6e5da9]">timeout:</span>{" "}
            {t("analyzer.lambdaModule.lambdaFunctions.timeout")}
          </li>
          <li>
            <span className="text-[#6e5da9]">environment:</span>{" "}
            {t("analyzer.lambdaModule.lambdaFunctions.environment")}
          </li>
          <li>
            <span className="text-[#6e5da9]">tags:</span>{" "}
            {t("analyzer.lambdaModule.lambdaFunctions.tags")}
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
            {t("analyzer.lambdaModule.lambdaPermissions.statement_id")}
          </li>
          <li>
            <span className="text-[#6e5da9]">action:</span>{" "}
            {t("analyzer.lambdaModule.lambdaPermissions.action")}
          </li>
          <li>
            <span className="text-[#6e5da9]">principal:</span>{" "}
            {t("analyzer.lambdaModule.lambdaPermissions.principal")}
          </li>
          <li>
            <span className="text-[#6e5da9]">function_name:</span>{" "}
            {t("analyzer.lambdaModule.lambdaPermissions.function_name")}
          </li>
          <li>
            <span className="text-[#6e5da9]">source_arn:</span>{" "}
            {t("analyzer.lambdaModule.lambdaPermissions.source_arn")}
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
            {t("analyzer.lambdaModule.s3EventTrigger.bucket")}
          </li>
          <li>
            <span className="text-[#6e5da9]">action:</span>{" "}
            {t("analyzer.lambdaModule.s3EventTrigger.action")}
          </li>
          <li>
            <span className="text-[#6e5da9]">depends_on:</span>{" "}
            {t("analyzer.lambdaModule.s3EventTrigger.depends_on")}
          </li>
          <li>
            <span className="text-[#6e5da9]">lambda_function:</span>{" "}
            {t("analyzer.lambdaModule.s3EventTrigger.lambda_function")}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="lambda/main.tf">
        {lambdaTriggerCode}
      </CodeContainer>
    </div>
  );
}
