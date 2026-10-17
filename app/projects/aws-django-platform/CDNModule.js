"use client";
import React from "react";
import { ModuleSection } from "./DocBlocks";
import {
  cdnPoliciesCode,
  cdnDistributionCode,
  cdnBucketPolicyCode,
} from "./codeSnippets";

const snippets = [
  { code: cdnPoliciesCode, fileName: "cdn/main.tf" },
  { code: cdnDistributionCode, fileName: "cdn/main.tf" },
  { code: cdnBucketPolicyCode, fileName: "cdn/main.tf" },
];

export default function CDNModule() {
  return <ModuleSection id="cdn-module" section="cdnModule" snippets={snippets} />;
}
