"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import CodeContainer from "../../components/util/CodeContainer";
import { Inline } from "./DocBlocks";
import { mainCode } from "./codeSnippets";

export default function MainFile() {
  const { t } = useTranslation("platform");
  return (
    <div id="main-file" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("platform.mainFile.title")}
      </h1>
      <p>
        <Inline text={t("platform.mainFile.description")} />
      </p>
      <CodeContainer fileName="main.tf">{mainCode}</CodeContainer>
    </div>
  );
}
