"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import CodeContainer from "../../components/util/CodeContainer";
import { FeatureList, Inline, useList } from "./DocBlocks";
import { repositoryTreeCode } from "./codeSnippets";

export default function CodeStructure() {
  const { t } = useTranslation("platform");
  return (
    <div id="code-structure" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("platform.codeStructure.title")}
      </h1>
      <p>{t("platform.codeStructure.description")}</p>
      <FeatureList items={useList(t, "platform.codeStructure.folders")} separator=": " />
      <CodeContainer fileName="aws-django-platform" language="text">
        {repositoryTreeCode}
      </CodeContainer>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("platform.codeStructure.modulesTitle")}
      </h2>
      <p>{t("platform.codeStructure.modulesDescription")}</p>
      <FeatureList items={useList(t, "platform.codeStructure.modules")} ordered />
      <p>
        <Inline text={t("platform.codeStructure.moduleFilesDescription")} />
      </p>
    </div>
  );
}
