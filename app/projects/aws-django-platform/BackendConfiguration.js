"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import CodeContainer from "../../components/util/CodeContainer";
import { FeatureList, Inline, useList } from "./DocBlocks";
import { bootstrapCode, versionsCode, backendHclCode } from "./codeSnippets";

export default function BackendConfiguration() {
  const { t } = useTranslation("platform");
  return (
    <div id="backend-configuration" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("platform.backendConfiguration.title")}
      </h1>
      <p>
        <Inline text={t("platform.backendConfiguration.description")} />
      </p>
      <FeatureList items={useList(t, "platform.backendConfiguration.items")} />
      <p>{t("platform.backendConfiguration.bootstrapDescription")}</p>
      <CodeContainer fileName="bootstrap/main.tf">{bootstrapCode}</CodeContainer>
      <p>{t("platform.backendConfiguration.versionsDescription")}</p>
      <CodeContainer fileName="versions.tf">{versionsCode}</CodeContainer>
      <p>
        <Inline text={t("platform.backendConfiguration.backendHclDescription")} />
      </p>
      <CodeContainer fileName="backend.hcl.example">{backendHclCode}</CodeContainer>
    </div>
  );
}
