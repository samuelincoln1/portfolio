"use client";
import React from "react";
import { ModuleSection } from "./DocBlocks";
import { wafCode } from "./codeSnippets";

const snippets = [{ code: wafCode, fileName: "waf/main.tf" }];

export default function WAFModule() {
  return <ModuleSection id="waf-module" section="wafModule" snippets={snippets} />;
}
