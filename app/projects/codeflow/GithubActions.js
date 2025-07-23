"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { githubActionsCode } from "./codeSnippets";
import { useTranslation } from "react-i18next";

export default function GithubActions() {
  const { t } = useTranslation("codeflow");
  return (
    <div id="github-actions">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("codeflow.githubActions.title")}
      </h1>
      <div className="flex flex-col gap-4">
        <p>
          {t("codeflow.githubActions.description1")}
        </p>
        <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
          {t("codeflow.githubActions.configuration")}
        </h2>
        <p>
          {t("codeflow.githubActions.configurationDescription1")}
          <span className="text-[#6e5da9]">.github/workflows/deploy.yml</span>{" "}
          {t("codeflow.githubActions.configurationDescription2")}
        </p>
        <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
          {t("codeflow.githubActions.workflowSteps")}
        </h2>
          <p>{t("codeflow.githubActions.workflowStepsDescription1")}</p>
        <ul>
          <li>
            <span className="text-[#f7607a]">Checkout Code</span> - {t("codeflow.githubActions.checkoutCodeDescription")}
          </li>
          <li>
            <span className="text-[#f7607a]">Setup Node.js</span> - {t("codeflow.githubActions.setupNodeJsDescription")}
          </li>
          <li>
            <span className="text-[#f7607a]">Install Dependencies</span> - {t("codeflow.githubActions.installDependenciesDescription")}
          </li>
          <li>
            <span className="text-[#f7607a]">Build Project</span> - {t("codeflow.githubActions.buildProjectDescription")}
          </li>
          <li>
            <span className="text-[#f7607a]">Configure AWS Credentials</span> - {t("codeflow.githubActions.configureAwsCredentialsDescription")}
          </li>
          <li>
            <span className="text-[#f7607a]">Deploy to S3</span> - {t("codeflow.githubActions.deployToAwsS3Description")}
          </li>
          <li>
            <span className="text-[#f7607a]">Invalidate CloudFront Cache</span> - {t("codeflow.githubActions.deployToCloudFrontDescription")}
          </li>
        </ul>
        <CodeContainer fileName=".github/workflows/deploy.yml" language="yaml">
          {githubActionsCode}
        </CodeContainer>
      </div>
    </div>
  );
}
