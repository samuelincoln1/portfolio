"use client";
import React from "react";
import { ModuleSection } from "./DocBlocks";
import {
  ecsClusterCode,
  ecsIamCode,
  ecsSecurityGroupCode,
  ecsTaskDefinitionCode,
  ecsServiceCode,
  ecsAutoscalingCode,
} from "./codeSnippets";

const snippets = [
  { code: ecsClusterCode, fileName: "ecs/main.tf" },
  { code: ecsIamCode, fileName: "ecs/main.tf" },
  { code: ecsSecurityGroupCode, fileName: "ecs/main.tf" },
  { code: ecsTaskDefinitionCode, fileName: "ecs/main.tf" },
  { code: ecsServiceCode, fileName: "ecs/main.tf" },
  { code: ecsAutoscalingCode, fileName: "ecs/main.tf" },
];

export default function ECSModule() {
  return <ModuleSection id="ecs-module" section="ecsModule" snippets={snippets} />;
}
