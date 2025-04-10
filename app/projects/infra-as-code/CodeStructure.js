"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function CodeStructure() {
  const { t } = useTranslation("iac");
  return (
    <div id="code-structure" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("iac.codeStructure.title")}
      </h1>
      <p>
        {t("iac.codeStructure.description")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("iac.codeStructure.modulesTitle")}
      </h2>
      <p>
        {t("iac.codeStructure.modulesDescription")}
      </p>
      <ul className="list-decimal pl-5">
        <li className="mb-2">
          <strong>{t("iac.codeStructure.vpcModule1")}</strong>
          {t("iac.codeStructure.vpcModule2")}
        </li>
        <li className="mb-2">
          <strong>{t("iac.codeStructure.albModule1")}</strong>
          {t("iac.codeStructure.albModule2")}
        </li>
        <li className="mb-2">
          <strong>{t("iac.codeStructure.asgModule1")}</strong>
          {t("iac.codeStructure.asgModule2")}
        </li>
        <li className="mb-2">
          <strong>{t("iac.codeStructure.rdsModule1")}</strong>
          {t("iac.codeStructure.rdsModule2")}
        </li>
      </ul>
      <p>
        {t("iac.codeStructure.moduleFilesDescription1")}
        <code className="text-[#EC585D]">{" "}main.tf</code>{" "}
        {t("iac.codeStructure.moduleFilesDescription2")}
        <code className="text-[#EC585D]">
          {" "}variables.tf
        </code>{" "}
        {t("iac.codeStructure.moduleFilesDescription3")}
        <code className="text-[#EC585D]">{" "}outputs.tf</code>{" "}
        {t("iac.codeStructure.moduleFilesDescription4")}
      </p>
      <Image
        src="../images/projects/infra-as-code/modules-structure.png"
        alt="Code Structure"
        width={200}
        height={200}
        className="border-1 border-[#4f5157] rounded-lg "
      />
    </div>
  );
}
