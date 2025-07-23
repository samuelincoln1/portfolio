"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { permissionsPolicyCode, githubActionsCode } from "./codeSnippets";

export default function GithubActions() {
  return (
    <div id="github-actions">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        Github Actions Workflow
      </h1>
      <div className="flex flex-col gap-4">
        <p>
          GitHub Actions provides a powerful CI/CD platform that automates the
          entire deployment pipeline directly within the GitHub ecosystem. This
          implementation leverages Actions' event-driven architecture to trigger
          automated deployments on every code push, ensuring rapid and
          consistent delivery of portfolio updates without manual intervention.
        </p>
        <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
          Configuration
        </h2>
        <p>
          The deployment workflow is defined in{" "}
          <span className="text-[#6e5da9]">.github/workflows/deploy.yml</span>{" "}
          and configured to trigger on pushes to the main branch and pull
          request events. This approach ensures that both production deployments
          and preview builds are handled automatically, providing immediate
          feedback on code changes.
        </p>
        <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
          Workflow Steps
        </h2>
        <p>The workflow consists of several key steps:</p>
        <ul>
          <li>
            <span className="text-[#f7607a]">Checkout Code</span> - Retrieves
            the latest repository content using actions/checkout@v4
          </li>
          <li>
            <span className="text-[#f7607a]">Setup Node.js</span> - Configures
            Node.js 18 environment with integrated npm caching
          </li>
          <li>
            <span className="text-[#f7607a]">Install Dependencies</span> -
            Performs clean dependency installation using npm ci
          </li>
          <li>
            <span className="text-[#f7607a]">Build Project</span> - Generates
            production-optimized static export with npm run build
          </li>
          <li>
            <span className="text-[#f7607a]">Configure AWS Credentials</span> -
            Securely authenticates with AWS using GitHub Secrets
          </li>
          <li>
            <span className="text-[#f7607a]">Deploy to S3</span> - Uploads build
            output to S3 with atomic deployment strategy
          </li>
          <li>
            <span className="text-[#f7607a]">Invalidate CloudFront Cache</span>{" "}
            - Clears CDN cache for immediate content updates
          </li>
        </ul>
        <CodeContainer fileName="deploy.yml" language="yaml">
          {githubActionsCode}
        </CodeContainer>
      </div>
    </div>
  );
}
