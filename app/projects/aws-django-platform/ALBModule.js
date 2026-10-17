"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import CodeContainer from "../../components/util/CodeContainer";
import { ModuleSection } from "./DocBlocks";
import {
  albSecurityGroupCode,
  albCode,
  albListenerCode,
  originSecretCode,
} from "./codeSnippets";

const snippets = [
  { code: albSecurityGroupCode, fileName: "alb/main.tf" },
  { code: albCode, fileName: "alb/main.tf" },
  { code: albListenerCode, fileName: "alb/main.tf" },
];

export default function ALBModule() {
  const { t } = useTranslation("platform");
  return (
    <ModuleSection id="alb-module" section="albModule" snippets={snippets}>
      <p>{t("platform.albModule.originSecretDescription")}</p>
      <CodeContainer fileName="main.tf">{originSecretCode}</CodeContainer>
    </ModuleSection>
  );
}
