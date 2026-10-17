"use client";
import React from "react";
import { ModuleSection } from "./DocBlocks";
import {
  rdsSecurityGroupCode,
  rdsParameterGroupCode,
  rdsInstanceCode,
} from "./codeSnippets";

const snippets = [
  { code: rdsSecurityGroupCode, fileName: "rds/main.tf" },
  { code: rdsParameterGroupCode, fileName: "rds/main.tf" },
  { code: rdsInstanceCode, fileName: "rds/main.tf" },
];

export default function RDSModule() {
  return <ModuleSection id="rds-module" section="rdsModule" snippets={snippets} />;
}
