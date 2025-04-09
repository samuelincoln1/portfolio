// app/components/projects/infra-as-code/BackendConfiguration.js
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { backendCode, backendVarsCode } from "./codeSnippets";
import Image from "next/image";

export default function BackendConfiguration() {
  return (
    <div id="backend-configuration" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        Backend Configuration
      </h1>
      <p>
        The backend configuration is crucial for managing the state of
        the infrastructure. We can store the state locally or
        remotely, but doing it remotely is more secure and easier to
        manage, especially when working in a team. In this project,
        the backend is configured to use Amazon S3, which stores the
        Terraform state file. This setup includes:
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>S3 Bucket: </strong>The S3 bucket where the state
          file is stored.
        </li>
        <li className="mb-2">
          <strong>Key: </strong>The path within the bucket for the
          state file.
        </li>
        <li className="mb-2">
          <strong>Region: </strong>The AWS region where the bucket is
          located.
        </li>
        <li className="mb-2">
          <strong>DynamoDB Table: </strong> Used for state locking and
          consistency, preventing concurrent operations that could
          corrupt the state.
        </li>
        <li className="mb-2">
          <strong>Encryption: </strong>Ensures that the state file is
          stored securely
        </li>
      </ul>
      <Image
        src="../images/projects/infra-as-code/backend-structure.png"
        alt="Backend Structure"
        width={300}
        height={300}
        className="border-1 border-[#4f5157] rounded-lg shadow-lg"
      />
      <p>
        The process of creating the backend configuration involves
        creating the necessary resources using Terraform instead of
        manually setting them up in the AWS console. This approach
        ensures that all resources are managed as code, providing
        consistency and version control.
      </p>
      <p>
        Once the resources are created, the backend is defined as
        &quot;s3&quot; to store the Terraform state file. After
        defining the backend, the{" "}
        <code className="bg-gray-800 px-2 rounded">
          terraform init
        </code>{" "}
        command is used to migrate the state to S3. This command
        initializes the backend configuration, ensuring that the state
        is managed remotely and securely.
      </p>
      <CodeContainer>{backendCode}</CodeContainer>
      <p>
        The variables are defined in the{" "}
        <code className="bg-gray-800 px-2 rounded">
          variables.tf
        </code>{" "}
        file. and initialized in the{" "}
        <code className="bg-gray-800 px-2 rounded">
          backend.tfvars
        </code>{" "}
        file.
      </p>
      <pre>
        <code className="language-hcl">{backendVarsCode}</code>
      </pre>
    </div>
  );
}