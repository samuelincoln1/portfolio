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
    <div id="vpc-module" className="flex flex-col gap-4 lg:max-w-full">
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
              <span className="text-[#6e5da9]">vpc_id</span>:{" "}
              {/* {t("iac.vpcModule.subnets.vpcIdDescription")} */}
            </li>
            <li>
              <span className="text-[#6e5da9]">cidr_block</span>:{" "}
              {/* {t("iac.vpcModule.subnets.cidrBlockDescription")} */}
            </li>
            <li>
              <span className="text-[#6e5da9]">map_public_ip_on_launch</span>:{" "}
              {/* {t("iac.vpcModule.subnets.mapPublicIpOnLaunchDescription")} */}
            </li>
            <li>
              <span className="text-[#6e5da9]">availability_zone</span>:{" "}
              {/* {t("iac.vpcModule.subnets.availabilityZoneDescription")} */}
            </li>
            <li>
              <span className="text-[#6e5da9]">tags</span>:{" "}
              {/* {t("iac.vpcModule.subnets.tagsDescription")} */}
            </li>
          </ul>
        </li>
      </ul>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource: <span className="text-[#6e5da9]">aws_subnet</span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6e5da9]">vpc_id</span>:{" "}
              {/* {t("iac.vpcModule.subnets.vpcIdDescription")} */}
            </li>
            <li>
              <span className="text-[#6e5da9]">cidr_block</span>:{" "}
              {/* {t("iac.vpcModule.subnets.cidrBlockDescription")} */}
            </li>
            <li>
              <span className="text-[#6e5da9]">map_public_ip_on_launch</span>:{" "}
              {/* {t("iac.vpcModule.subnets.mapPublicIpOnLaunchDescription2")} */}
            </li>
            <li>
              <span className="text-[#6e5da9]">availability_zone</span>:{" "}
              {/* {t("iac.vpcModule.subnets.availabilityZoneDescription")} */}
            </li>
            <li>
              <span className="text-[#6e5da9]">tags</span>:{" "}
              {/* {t("iac.vpcModule.subnets.tagsDescription")} */}
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
            <span className="text-[#6e5da9]">vpc_id</span>:{" "}
            {/* {t("iac.vpcModule.routeTables.vpcIdDescription")} */}
          </li>
          <li>
            <span className="text-[#6e5da9]">route</span>:{" "}
            {/* {t("iac.vpcModule.routeTables.routeDescription1")} */}
            <span className="text-[#6a7c80]">0.0.0.0/0</span>{" "}
            {/* {t("iac.vpcModule.routeTables.routeDescription2")} */}
          </li>
          <li>
            <span className="text-[#6e5da9]">tags</span>:{" "}
            {/* {t("iac.vpcModule.routeTables.tagsDescription")} */}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="s3/main.tf">{s3PublicAccessBlockCode}</CodeContainer>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {/* {t("iac.vpcModule.variablesAndOutputs.title")} */}aaaaa
      </h2>
      <p>
        {/* {t("iac.vpcModule.variablesAndOutputs.description")} */} aaa
        <span className="text-[#6e5da9]">cidr_block</span>,{" "}
        <span className="text-[#6e5da9]">enable_dns_hostnames</span>,{" "}
        <span className="text-[#6e5da9]">public_subnet_cidr_block_1</span>,{" "}
        {/* {t("iac.vpcModule.variablesAndOutputs.description2")} */}
        <code className="text-[#EC585D]"> variables.tf</code>{" "}
        {/* {t("iac.vpcModule.variablesAndOutputs.description3")} */}
        <code className="text-[#EC585D]">outputs.tf</code>{" "}
        {/* {t("iac.vpcModule.variablesAndOutputs.description4")} */}
      </p>
    </div>
  );
}
