"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import CodeContainer from "../../components/util/CodeContainer";
import { FeatureList, useList } from "./DocBlocks";
import {
  pipelineCode,
  buildspecCode,
  deployScriptCode,
  deployRolePolicyCode,
} from "./codeSnippets";

export default function CICDPipeline() {
  const { t } = useTranslation("platform");
  return (
    <div id="cicd-pipeline" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("platform.cicdPipeline.title")}
      </h1>
      <p>{t("platform.cicdPipeline.description")}</p>
      <FeatureList items={useList(t, "platform.cicdPipeline.stages")} ordered />
      <p>{t("platform.cicdPipeline.pipelineDescription")}</p>
      <CodeContainer fileName="pipeline/main.tf">{pipelineCode}</CodeContainer>
      <p>{t("platform.cicdPipeline.buildspecDescription")}</p>
      <CodeContainer fileName="ci/buildspec-build.yml" language="yaml">
        {buildspecCode}
      </CodeContainer>
      <p>{t("platform.cicdPipeline.deployDescription")}</p>
      <CodeContainer fileName="ci/deploy.sh" language="bash">
        {deployScriptCode}
      </CodeContainer>
      <p>{t("platform.cicdPipeline.iamDescription")}</p>
      <CodeContainer fileName="pipeline/main.tf">{deployRolePolicyCode}</CodeContainer>
    </div>
  );
}
