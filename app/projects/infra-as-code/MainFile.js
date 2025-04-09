import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { mainCode } from "./codeSnippets";

export default function RDSModule() {
  return (
    <div id="main-file" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        Main file
      </h1>
      <p>
        The <code className="text-[#EC585D]">main.tf</code> file serves as the
        central configuration for deploying and managing the infrastructure on
        AWS using Terraform. It orchestrates the setup of the modules and
        resources previously defined, ensuring that all components are correctly
        provisioned and interconnected to form a cohesive infrastructure
        environment.
      </p>
      <CodeContainer fileName="main.tf">{mainCode}</CodeContainer>
    </div>
  );
}
