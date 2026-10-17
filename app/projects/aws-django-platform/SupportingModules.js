"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import CodeContainer from "../../components/util/CodeContainer";
import { FeatureList, Inline, useList } from "./DocBlocks";
import { s3BucketCode, ecrCode, secretsCode } from "./codeSnippets";

export default function SupportingModules() {
  const { t } = useTranslation("platform");
  return (
    <div id="supporting-modules" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("platform.supportingModules.title")}
      </h1>
      <p>{t("platform.supportingModules.description")}</p>
      <FeatureList items={useList(t, "platform.supportingModules.features")} />
      <p>{t("platform.supportingModules.s3Description")}</p>
      <CodeContainer fileName="s3/main.tf">{s3BucketCode}</CodeContainer>
      <p>{t("platform.supportingModules.ecrDescription")}</p>
      <CodeContainer fileName="ecr/main.tf">{ecrCode}</CodeContainer>
      <p>
        <Inline text={t("platform.supportingModules.secretsDescription")} />
      </p>
      <CodeContainer fileName="secrets/main.tf">{secretsCode}</CodeContainer>
    </div>
  );
}
