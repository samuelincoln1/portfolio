"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function InfraCode() {
  const { t } = useTranslation("analyzer");
  return (
    <div id="infra-code-structure" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("analyzer.infrastructureCode.title")}
      </h1>
      <p>
        {t("analyzer.infrastructureCode.description")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("analyzer.infrastructureCode.modulesTitle")}
      </h2>
      <ul className="list-decimal pl-5">
        <li className="mb-2">
          <strong> {t("analyzer.infrastructureCode.s3Module1")} </strong>
         
          {t("analyzer.infrastructureCode.s3Module2")}
        </li>
        <li className="mb-2">
          <strong> {t("analyzer.infrastructureCode.iamModule1")} </strong>
          {t("analyzer.infrastructureCode.iamModule2")}
        </li>
        <li className="mb-2">
          <strong> {t("analyzer.infrastructureCode.lambdaModule1")} </strong>
          {t("analyzer.infrastructureCode.lambdaModule2")}
        </li>
        <li className="mb-2">
          <strong> {t("analyzer.infrastructureCode.cloudtrailModule1")} </strong>
          {t("analyzer.infrastructureCode.cloudtrailModule2")}
        </li>
        <li className="mb-2">
          <strong> {t("analyzer.infrastructureCode.eventBridgeModule1")} </strong>
          {t("analyzer.infrastructureCode.eventBridgeModule2")}
        </li>
      </ul>

      <p>
        {t("analyzer.infrastructureCode.moduleFilesDescription1")}
        <code className="text-[#EC585D]">{" "}main.tf</code>{" "}
        {t("analyzer.infrastructureCode.moduleFilesDescription2")}
        <code className="text-[#EC585D]">
          {" "}variables.tf
        </code>{" "}
        {t("analyzer.infrastructureCode.moduleFilesDescription3")}
        <code className="text-[#EC585D]">{" "}outputs.tf</code>{" "}
        {t("analyzer.infrastructureCode.moduleFilesDescription4")}
      </p>
    </div>
  );
}
