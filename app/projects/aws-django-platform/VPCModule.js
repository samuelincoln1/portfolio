"use client";
import React from "react";
import { ModuleSection } from "./DocBlocks";
import {
  vpcLocalsCode,
  subnetsCode,
  routeTablesCode,
  s3EndpointCode,
  interfaceEndpointsCode,
} from "./codeSnippets";

const snippets = [
  { code: vpcLocalsCode, fileName: "vpc/main.tf" },
  { code: subnetsCode, fileName: "vpc/main.tf" },
  { code: routeTablesCode, fileName: "vpc/main.tf" },
  { code: s3EndpointCode, fileName: "vpc/main.tf" },
  { code: interfaceEndpointsCode, fileName: "vpc/main.tf" },
];

export default function VPCModule() {
  return <ModuleSection id="vpc-module" section="vpcModule" snippets={snippets} />;
}
