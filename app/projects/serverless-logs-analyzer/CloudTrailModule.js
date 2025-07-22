"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { useTranslation } from "next-i18next";
import { cloudTrailCode, cloudTrailS3BucketPolicyCode } from "./codeSnippets";

export default function CloudTrailModule() {
  const { t } = useTranslation("analyzer");
  return (
    <div id="cloudtrail-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("analyzer.cloudtrailModule.title")}
      </h1>
      <p>
        {t("analyzer.cloudtrailModule.description")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("analyzer.cloudtrailModule.featuresTitle")}
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>CloudTrail Configuration: </strong>
          {t("analyzer.cloudtrailModule.cloudtrailTraiConfigurationlDescription")}
        </li>
        <li className="mb-2">
          <strong>S3 Integration: </strong>
          {t("analyzer.cloudtrailModule.s3IntegrationDescription")}
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p className="font-bold">1. CloudTrail Configuration</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource: <span className="text-[#6e5da9]">aws_cloudtrail</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">name:</span>{" "}
            {t("analyzer.cloudtrailModule.cloudtrailConfiguration.name")}
          </li>
          <li>
            <span className="text-[#6e5da9]">s3_bucket_name:</span>{" "}
            {t("analyzer.cloudtrailModule.cloudtrailConfiguration.s3BucketName")}
          </li>
          <li>
            <span className="text-[#6e5da9]">is_multi_region_trail:</span>{" "}
            {t("analyzer.cloudtrailModule.cloudtrailConfiguration.isMultiRegionTrail")}
          </li>
          <li>
            <span className="text-[#6e5da9]">
              include_global_service_events:
            </span>{" "}
            {t("analyzer.cloudtrailModule.cloudtrailConfiguration.includeGlobalServiceEvents")}
          </li>
          <li>
            <span className="text-[#6e5da9]">enable_logging:</span>{" "}
            {t("analyzer.cloudtrailModule.cloudtrailConfiguration.enableLogging")}
          </li>
          <li>
            <span className="text-[#6e5da9]">event_selector:</span>{" "}
            {t("analyzer.cloudtrailModule.cloudtrailConfiguration.eventSelector")}
          </li>
          <li>
            <span className="text-[#6e5da9]">depends_on:</span>{" "}
            {t("analyzer.cloudtrailModule.cloudtrailConfiguration.dependsOn")}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="cloudtrail/main.tf">
        {cloudTrailCode}
      </CodeContainer>
      <p className="font-bold">2. S3 Bucket Policy</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource: <span className="text-[#6e5da9]">aws_s3_bucket_policy</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">bucket:</span>{" "}
            {t("analyzer.cloudtrailModule.s3BucketPolicy.bucket")}
          </li>
          <li>
            <span className="text-[#6e5da9]">policy:</span>{" "}
            {t("analyzer.cloudtrailModule.s3BucketPolicy.policy")}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="cloudtrail/main.tf">
        {cloudTrailS3BucketPolicyCode}
      </CodeContainer>
    </div>
  );
}
