"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { backendCode, backendVarsCode } from "./codeSnippets";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function BackendConfiguration() {
  const { t } = useTranslation("iac");
  return (
    <div id="backend-configuration" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("iac.backendConfiguration.title")}
      </h1>
      <p>
        {t("iac.backendConfiguration.description")}
        
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>{t("iac.backendConfiguration.s3Bucket")}</strong>
          {t("iac.backendConfiguration.s3BucketDescription")}
        </li>
        <li className="mb-2">
          <strong>{t("iac.backendConfiguration.key")}</strong>
          {t("iac.backendConfiguration.keyDescription")}
        </li>
        <li className="mb-2">
          <strong>{t("iac.backendConfiguration.region")}</strong>
          {t("iac.backendConfiguration.regionDescription")}
        </li>
        <li className="mb-2">
          <strong>{t("iac.backendConfiguration.dynamodbTable")}</strong>
          {t("iac.backendConfiguration.dynamodbTableDescription")}
        </li>
        <li className="mb-2">
          <strong>{t("iac.backendConfiguration.encryption")}</strong>
          {t("iac.backendConfiguration.encryptionDescription")}
        </li>
      </ul>
      <Image
        src="../images/projects/infra-as-code/backend-structure.png"
        alt="Backend Structure"
        width={300}
        height={300}
        className="border-1 border-[#4f5157] rounded-lg shadow-lg"
      />
      <p>
        {t("iac.backendConfiguration.processDescription1")}
      </p>
      <p>
        {t("iac.backendConfiguration.processDescription2")}
        <code className="text-[#FFCF25]">
          terraform init
        </code>{" "}
        {t("iac.backendConfiguration.processDescription3")}
      </p>
      <CodeContainer fileName="backend/main.tf">{backendCode}</CodeContainer>
      <p>
        {t("iac.backendConfiguration.variablesDescription1")}
        <code className="text-[#EC585D]">
          variables.tf
        </code>{" "}
        {t("iac.backendConfiguration.variablesDescription2")}
        <code className="text-[#EC585D]">
          backend.tfvars
        </code>{" "}.
      </p>
      <CodeContainer fileName="backend/variables.tf">{backendVarsCode}</CodeContainer>
    </div>
  );
}