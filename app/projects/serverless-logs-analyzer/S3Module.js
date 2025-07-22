"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { useTranslation } from "next-i18next";
import {
  s3Code,
  s3VersioningCode,
  s3EncryptionCode,
  s3PublicAccessBlockCode,
} from "./codeSnippets";

export default function S3Module() {
  const { t } = useTranslation("analyzer");
  return (
    <div id="s3-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("analyzer.s3Module.title")}
      </h1>
      <p>
       {t("analyzer.s3Module.description")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("analyzer.s3Module.featuresTitle")}
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>{t("analyzer.s3Module.s3DescriptionTitle")}</strong>
          {t("analyzer.s3Module.s3Description")}
        </li>
        <li className="mb-2">
          <strong>{t("analyzer.s3Module.versioningDescriptionTitle")}</strong>
          {t("analyzer.s3Module.versioningDescription")}
        </li>
        <li className="mb-2">
          <strong>{t("analyzer.s3Module.encryptionDescriptionTitle")}</strong>
          {t("analyzer.s3Module.encryptionDescription")}
        </li>
        <li className="mb-2">
          <strong>{t("analyzer.s3Module.publicAccessBlockDescriptionTitle")}</strong>
          {t("analyzer.s3Module.publicAccessBlockDescription")}
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
            {t("analyzer.s3Module.buckets.bucketDescription")}
          </li>
          <li>
            <span className="text-[#6e5da9]">force_destroy:</span>{" "}
            {t("analyzer.s3Module.buckets.forceDestroyDescription")}
          </li>
          <li>
            <span className="text-[#6e5da9]">tags:</span>{" "}
            {t("analyzer.s3Module.buckets.tagsDescription")}
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
            {t("analyzer.s3Module.versioning.bucket")}
          </li>
          <li>
            <span className="text-[#6e5da9]">versioning_configuration:</span>{" "}
            {t("analyzer.s3Module.versioning.versoningConfiguration")}
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
              {t("analyzer.s3Module.encryption.bucket")}
            </li>
            <li>
              <span className="text-[#6e5da9]">rule:</span>{" "}
              {t("analyzer.s3Module.encryption.rule")}
            </li>
            <li>
              <span className="text-[#6e5da9]">apply_server_side_encryption_by_default:</span>{" "}
              {t("analyzer.s3Module.encryption.applyServerSideEncryptionByDefault")}
            </li>
            <li>
              <span className="text-[#6e5da9]">sse_algorithm:</span>{" "}
              {t("analyzer.s3Module.encryption.sseAlgorithm")}
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
            {t("analyzer.s3Module.publicAccessBlock.bucket")}
          </li>
          <li>
            <span className="text-[#6e5da9]">block_public_acls:</span>{" "}
            {t("analyzer.s3Module.publicAccessBlock.blockPublicAcls")}
          </li>
          <li>
            <span className="text-[#6e5da9]">block_public_policy:</span>{" "}
            {t("analyzer.s3Module.publicAccessBlock.blockPublicPolicy")}
          </li>
          <li>
            <span className="text-[#6e5da9]">ignore_public_acls:</span>{" "}
            {t("analyzer.s3Module.publicAccessBlock.ignorePublicAcls")}
          </li>
          <li>
            <span className="text-[#6e5da9]">restrict_public_buckets:</span>{" "}
            {t("analyzer.s3Module.publicAccessBlock.restrictPublicBuckets")}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="s3/main.tf">{s3PublicAccessBlockCode}</CodeContainer>   
    </div>
  );
}
