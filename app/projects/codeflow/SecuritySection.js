"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { permissionsPolicyCode } from "./codeSnippets";
import { useTranslation } from "react-i18next";

export default function SecuritySection() {
  const { t } = useTranslation("codeflow");
  return (
    <div id="security">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("codeflow.security.title")}
      </h1>
      <div className="flex flex-col gap-4">
        <p>
          {t("codeflow.security.description1")}
        </p>
        <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
          {t("codeflow.security.githubSecretsManagement")}
        </h2>
        <p>
          {t("codeflow.security.githubSecretsManagementDescription")}
        </p>
        <h3 className="text-[18px] lg:text-[20px] font-semibold text-white">
          {t("codeflow.security.requiredSecrets")}
        </h3>
        <ul className="list-disc pl-5">
          <li>
            <strong>AWS_ACCESS_KEY_ID:</strong> {t("codeflow.security.awsAccessKeyIdDescription")}	
          </li>
          <li>
            <strong>AWS_SECRET_ACCESS_KEY:</strong> {t("codeflow.security.awsSecretAccessKeyDescription")}
          </li>
          <li>
            <strong>AWS_REGION:</strong> {t("codeflow.security.awsRegionDescription")}
          </li>
          <li>
            <strong>S3_BUCKET_NAME:</strong> {t("codeflow.security.s3BucketNameDescription")}
          </li>
          <li>
            <strong>CLOUDFRONT_DISTRIBUTION_ID:</strong> {t("codeflow.security.cloudFrontDistributionIdDescription")}
          </li>
        </ul>
        <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
          {t("codeflow.security.iamSecurityModel")}
        </h2>
        <p>
          {t("codeflow.security.iamSecurityModelDescription")}
        </p>
        <h3 className="text-[18px] lg:text-[20px] font-semibold text-white">
          {t("codeflow.security.s3Permissions")}
        </h3>
        <ul className="list-disc pl-5">
          <li>
            <span className="text-[#6e5da9]">s3:ListBucket</span> - {t("codeflow.security.listBucketDescription")}
          </li>
          <li>
            <span className="text-[#6e5da9]">s3:GetObject</span> - {t("codeflow.security.getObjectDescription")}
          </li>
          <li>
            <span className="text-[#6e5da9]">s3:PutObject</span> - {t("codeflow.security.putObjectDescription")}
          </li>
          <li>
            <span className="text-[#6e5da9]">s3:DeleteObject</span> - {t("codeflow.security.deleteObjectDescription")}
          </li>
          <li>
            <span className="text-[#6e5da9]">s3:PutObjectAcl</span> - {t("codeflow.security.s3PutObjectAclDescription")}
          </li>
        </ul>
        <h3 className="text-[18px] lg:text-[20px] font-semibold text-white">
          {t("codeflow.security.cloudFrontPermissions")}
        </h3>
        <ul className="list-disc pl-5">
          <li>
            <span className="text-[#6e5da9]">
              cloudfront:CreateInvalidation
            </span>{" "}
            - {t("codeflow.security.cloudFrontCreateInvalidationDescription")}
          </li>
        </ul>
        <CodeContainer fileName="permissions-policy.json" language="json">
          {permissionsPolicyCode}
        </CodeContainer>
      </div>
    </div>
  );
}
