"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { mainCode } from "./codeSnippets";
import { useTranslation } from "react-i18next";

export default function RDSModule() {
  const { t } = useTranslation("analyzer");
  return (
    <div id="main-file" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("analyzer.terraformMainFile.title")}
      </h1>
      <p>
        {t("analyzer.terraformMainFile.description1")}{" "}
        <code className="text-[#EC585D]"> main.tf</code>{" "}
        {t("analyzer.terraformMainFile.description2")}
      </p>
      <CodeContainer fileName="main.tf">{mainCode}</CodeContainer>
    </div>
  );
}
