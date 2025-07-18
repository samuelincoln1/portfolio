"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
// import { useTranslation } from "next-i18next";
import {
  s3Code,
  s3VersioningCode,
  s3EncryptionCode,
  s3PublicAccessBlockCode,
} from "./codeSnippets";

export default function S3Module() {
  // const { t } = useTranslation("iac");
  return (
    <div id="s3-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        S3 Module
      </h1>
      <p>
        This module is designed to create the storage infrastructure with two S3
        buckets, one for input logs and one for output insights. The input
        bucket receives CloudTrail logs automatically, while the output bucket
        stores the processed JSON and CSV reports. Both buckets are configured
        with versioning enabled for change tracking, AES256 server-side
        encryption for data protection, and complete public access blocking to
        ensure security compliance.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {/* {t("iac.vpcModule.featuresTitle")} */} Features
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>S3 Buckets: </strong>
          {/* {t("iac.vpcModule.vpcDescription")} */} Creates two S3 buckets -
          an input bucket for receiving CloudTrail logs and an output bucket for
          storing processed insights and reports.
        </li>
        <li className="mb-2">
          <strong>Versioning: </strong>
          {/* {t("iac.vpcModule.igwDescription")} */} Enables versioning on both
          buckets to maintain object history and provide rollback capabilities
          for data protection.
        </li>
        <li className="mb-2">
          <strong>Encryption: </strong>
          {/* {t("iac.vpcModule.subnetsDescription")} */} Configures AES256
          encryption by default on all objects stored in both buckets to ensure
          data security at rest.
        </li>
        <li className="mb-2">
          <strong>Public Access Blocking: </strong>
          {/* {t("iac.vpcModule.routeTablesDescription")} */} Implements
          comprehensive public access restrictions on both buckets, blocking all
          forms of public access including ACLs and bucket policies to prevent
          accidental data exposure.
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p className="font-bold">1. Buckets</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource: <span className="text-[#6e5da9]">aws_s3_bucket</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">bucket:</span>{" "}
            {/* {t("iac.vpcModule.vpc.cidrBlockDescription")} */} The unique name identifier for the S3 bucket within AWS.
          </li>
          <li>
            <span className="text-[#6e5da9]">force_destroy:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */} Whether to allow deletion of the bucket even when it contains objects.
          </li>
          <li>
            <span className="text-[#6e5da9]">tags:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsSupportDescription")} */} Assigns a name tag to the bucket for identification and resource management purposes.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="/main.tf">{s3Code}</CodeContainer>
      <p className="font-bold">2. Versioning</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource:{" "}
          <span className="text-[#6e5da9]">aws_s3_bucket_versioning</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">bucket:</span>{" "}
            {/* {t("iac.vpcModule.igw.vpcIdDescription")} */} The S3 bucket to enable versioning for.
          </li>
          <li>
            <span className="text-[#6e5da9]">versioning_configuration:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} Configuration block for versioning settings.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="s3/main.tf">{s3VersioningCode}</CodeContainer>
      <p className="font-bold">3. Encryption</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource:{" "}
          <span className="text-[#6e5da9]">
            aws_s3_bucket_server_side_encryption_configuration
          </span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6e5da9]">bucket:</span>{" "}
              {/* {t("iac.vpcModule.subnets.vpcIdDescription")} */} The S3 bucket to enable encryption for.
            </li>
            <li>
              <span className="text-[#6e5da9]">rule:</span>{" "}
              {/* {t("iac.vpcModule.subnets.cidrBlockDescription")} */} Configuration block for encryption settings.
            </li>
            <li>
              <span className="text-[#6e5da9]">apply_server_side_encryption_by_default:</span>{" "}
              {/* {t("iac.vpcModule.subnets.mapPublicIpOnLaunchDescription")} */} Configuration block for default encryption settings.
            </li>
            <li>
              <span className="text-[#6e5da9]">sse_algorithm:</span>{" "}
              {/* {t("iac.vpcModule.subnets.availabilityZoneDescription")} */} The encryption algorithm to use for the bucket.
            </li>
          </ul>
        </li>
      </ul>
      <CodeContainer fileName="s3/main.tf">{s3EncryptionCode}</CodeContainer>
      <p className="font-bold">4. Public Access Blocking</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource:{" "}
          <span className="text-[#6e5da9]">
            aws_s3_bucket_public_access_block
          </span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">bucket:</span>{" "}
            {/* {t("iac.vpcModule.routeTables.vpcIdDescription")} */} The S3 bucket to enable public access blocking for.
          </li>
          <li>
            <span className="text-[#6e5da9]">block_public_acls:</span>{" "}
            {/* {t("iac.vpcModule.routeTables.routeDescription1")} */} Whether to block public ACLs on the bucket.
          </li>
          <li>
            <span className="text-[#6e5da9]">block_public_policy:</span>{" "}
            {/* {t("iac.vpcModule.routeTables.routeDescription2")} */} Whether to block public bucket policies on the bucket.
          </li>
          <li>
            <span className="text-[#6e5da9]">ignore_public_acls:</span>{" "}
            {/* {t("iac.vpcModule.routeTables.tagsDescription")} */} Whether to ignore public ACLs on the bucket.
          </li>
          <li>
            <span className="text-[#6e5da9]">restrict_public_buckets:</span>{" "}
            {/* {t("iac.vpcModule.routeTables.tagsDescription")} */} Whether to restrict public bucket policies on the bucket.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="s3/main.tf">{s3PublicAccessBlockCode}</CodeContainer>   
    </div>
  );
}
