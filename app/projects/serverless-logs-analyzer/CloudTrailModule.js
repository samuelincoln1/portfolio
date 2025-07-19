"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
// import { useTranslation } from "next-i18next";
import { cloudTrailCode, cloudTrailS3BucketPolicyCode } from "./codeSnippets";

export default function CloudTrailModule() {
  // const { t } = useTranslation("iac");
  return (
    <div id="cloudtrail-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        CloudTrail Module
      </h1>
      <p>
        This module is designed to create comprehensive AWS account auditing and
        logging infrastructure. It establishes a multi-region CloudTrail that
        captures all management events, global service events, and S3 data
        events across the entire AWS account. The module automatically delivers
        all captured logs to the designated S3 input bucket and configures the
        necessary bucket policies to enable secure log storage while maintaining
        proper access controls for the CloudTrail servic
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {/* {t("iac.vpcModule.featuresTitle")} */} Features
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>CloudTrail Configuration: </strong>
          {/* {t("iac.vpcModule.igwDescription")} */} Creates a multi-region
          trail that monitors AWS account activities across all regions,
          including global services like IAM, Route53, and CloudFront to provide
          complete visibility. The CloudTrail also captures all management plane
          operations such as resource creation, deletion, and configuration
          changes for comprehensive account auditing.
        </li>
        <li className="mb-2">
          <strong>S3 Integration: </strong>
          {/* {t("iac.vpcModule.vpcDescription")} */} Automatically delivers all
          captured logs to the input S3 bucket, and establishes secure S3 bucket
          policies that grant CloudTrail service the minimum necessary
          permissions to write logs and read bucket ACLs while maintaining
          security boundaries.
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
            {/* {t("iac.vpcModule.vpc.cidrBlockDescription")} */} The name of
            the CloudTrail.
          </li>
          <li>
            <span className="text-[#6e5da9]">s3_bucket_name:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */} The
            name of the S3 bucket to store the CloudTrail logs.
          </li>
          <li>
            <span className="text-[#6e5da9]">is_multi_region_trail:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */}{" "}
            Whether the trail captures events from all AWS regions or just where
            it's created.
          </li>
          <li>
            <span className="text-[#6e5da9]">
              include_global_service_events:
            </span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */}{" "}
            Whether to include events from global AWS services like IAM and STS.
          </li>
          <li>
            <span className="text-[#6e5da9]">enable_logging:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */}{" "}
            Whether to enable logging for the CloudTrail.
          </li>
          <li>
            <span className="text-[#6e5da9]">event_selector:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */}{" "}
            Configuration block that defines which types of events the trail
            should capture.
          </li>
          <li>
            <span className="text-[#6e5da9]">depends_on:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */}{" "}
            Ensures the CloudTrail is created only after the specified
            dependencies are established.
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
            {/* {t("iac.vpcModule.igw.vpcIdDescription")} */} The S3 bucket to
            configure the policy for.
          </li>
          <li>
            <span className="text-[#6e5da9]">policy:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The JSON-encoded
            policy document that defines the permissions and access controls for
            the bucket, specifying who can perform what actions on the bucket
            and its objects.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="cloudtrail/main.tf">
        {cloudTrailS3BucketPolicyCode}
      </CodeContainer>
    </div>
  );
}
