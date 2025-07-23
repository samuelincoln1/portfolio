"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { permissionsPolicyCode, githubActionsCode } from "./codeSnippets";

export default function SecuritySection() {
  return (
    <div id="security">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        Security
      </h1>
      <div className="flex flex-col gap-4">
        <p>
          Security is a fundamental aspect of the CI/CD implementation, with
          particular attention to credential management, access control, and
          secure deployment practices. The pipeline ensures that sensitive
          information never appears in code or logs while maintaining
          operational transparency.
        </p>
        <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
          GitHub Secrets Management
        </h2>
        <p>
          The pipeline uses GitHub Actions secrets to securely store AWS
          credentials. These secrets are only available to the pipeThe workflow
          leverages GitHub's encrypted secrets feature to securely store and
          access AWS credentials. All sensitive data is encrypted at rest and
          only decrypted during workflow execution, ensuring that credentials
          remain protected throughout the entire CI/CD process.
        </p>
        <h3 className="text-[18px] lg:text-[20px] font-semibold text-white">
          Required Secrets:
        </h3>
        <ul className="list-disc pl-5">
          <li>
            <strong>AWS_ACCESS_KEY_ID:</strong> IAM user access key with minimal
            required permissions
          </li>
          <li>
            <strong>AWS_SECRET_ACCESS_KEY:</strong> Corresponding secret key for
            authentication
          </li>
          <li>
            <strong>AWS_REGION:</strong> Target deployment region for resource
            consistency
          </li>
          <li>
            <strong>S3_BUCKET_NAME:</strong> Destination bucket for static file
            hosting
          </li>
          <li>
            <strong>CLOUDFRONT_DISTRIBUTION_ID:</strong> Distribution identifier
            for cache invalidation
          </li>
        </ul>
        <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
          IAM Security Model
        </h2>
        <p>
          The implementation follows the principle of least privilege by
          creating a dedicated IAM user specifically for CI/CD operations. This
          user has only the minimum permissions required for successful
          deployment.
        </p>
        <h3 className="text-[18px] lg:text-[20px] font-semibold text-white">
          S3 Permissions:
        </h3>
        <ul className="list-disc pl-5">
          <li>
            <span className="text-[#6e5da9]">s3:ListBucket</span> - Enumerate
            bucket contents for sync operations
          </li>
          <li>
            <span className="text-[#6e5da9]">s3:GetObject</span> - Read existing
            files for comparison
          </li>
          <li>
            <span className="text-[#6e5da9]">s3:PutObject</span> - Upload new
            and updated files
          </li>
          <li>
            <span className="text-[#6e5da9]">s3:DeleteObject</span> - Remove
            obsolete files during cleanup
          </li>
          <li>
            <span className="text-[#6e5da9]">s3:PutObjectAcl</span> - Set
            appropriate file permissions
          </li>
        </ul>
        <h3 className="text-[18px] lg:text-[20px] font-semibold text-white">
          CloudFront Permissions:
        </h3>
        <ul className="list-disc pl-5">
          <li>
            <span className="text-[#6e5da9]">
              cloudfront:CreateInvalidation
            </span>{" "}
            - Clear cached content for immediate updates.
          </li>
        </ul>
        <CodeContainer fileName="permissions-policy.json" language="json">
          {permissionsPolicyCode}
        </CodeContainer>
      </div>
    </div>
  );
}
