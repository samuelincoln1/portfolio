"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { useTranslation } from "next-i18next";
import {
  iamRoleCode,
  iamPolicyCode,
} from "./codeSnippets";

export default function IamModule() {
  const { t } = useTranslation("analyzer");
  return (
    <div id="iam-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("analyzer.iamModule.title")}
      </h1>
      <p>
        {t("analyzer.iamModule.description")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("analyzer.iamModule.featuresTitle")}
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>IAM Role: </strong>
          {t("analyzer.iamModule.iamRoleDescription")}
        </li>
        <li className="mb-2">
          <strong>IAM Policy: </strong>
          {t("analyzer.iamModule.iamPolicyDescription")}
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p className="font-bold">1. IAM Role</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource: <span className="text-[#6e5da9]">aws_iam_role</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">name:</span>{" "}
            {t("analyzer.iamModule.iamRole.name")}
          </li>
          <li>
            <span className="text-[#6e5da9]">assume_role_policy:</span>{" "}
            {t("analyzer.iamModule.iamRole.assumeRolePolicy")}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="iam/main.tf">{iamRoleCode}</CodeContainer>
      <p className="font-bold">2. IAM Policy</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource:{" "}
          <span className="text-[#6e5da9]">aws_iam_role_policy</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">name:</span>{" "}
            {t("analyzer.iamModule.iamPolicy.name")}
          </li>
          <li>
            <span className="text-[#6e5da9]">role:</span>{" "}
            {t("analyzer.iamModule.iamPolicy.role")}
          </li>
          <li>
            <span className="text-[#6e5da9]">policy:</span>{" "}
            {t("analyzer.iamModule.iamPolicy.policy")}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="iam/main.tf">{iamPolicyCode}</CodeContainer>
    </div>
  );
}
