"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
// import { useTranslation } from "next-i18next";
import {
  iamRoleCode,
  iamPolicyCode,
} from "./codeSnippets";

export default function IamModule() {
  // const { t } = useTranslation("iac");
  return (
    <div id="iam-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        IAM Module
      </h1>
      <p>
        This module is designed to create the security and access management
        infrastructure for the Lambda functions. It establishes a dedicated IAM
        role with precisely scoped permissions following the principle of least
        privilege. The role allows Lambda functions to interact with S3 buckets
        for log processing and CloudWatch for logging, while restricting access
        to only the necessary resources and actions required for the log
        analysis workflow.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {/* {t("iac.vpcModule.featuresTitle")} */} Features
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>IAM Role: </strong>
          {/* {t("iac.vpcModule.vpcDescription")} */} Creates a dedicated
          execution role specifically for Lambda functions with a trust policy
          that allows only the Lambda service to assume the role
        </li>
        <li className="mb-2">
          <strong>IAM Policy: </strong>
          {/* {t("iac.vpcModule.igwDescription")} */} Attaches a policy to the
          role that grants the necessary permissions for the Lambda function to
          access the S3 bucket and CloudWatch logs.
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p className="font-bold">1. IAM Role</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource: <span className="text-[#6e5da9]">aws_iam_role</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">name:</span>{" "}
            {/* {t("iac.vpcModule.vpc.cidrBlockDescription")} */} The name of the IAM role.
          </li>
          <li>
            <span className="text-[#6e5da9]">assume_role_policy:</span>{" "}
            {/* {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")} */}{" "}
            The policy that allows the Lambda service to assume the role. It defines which services are allowed to assume the role, in this case, only the Lambda service.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="iam/main.tf">{iamRoleCode}</CodeContainer>
      <p className="font-bold">2. IAM Policy</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          Resource:{" "}
          <span className="text-[#6e5da9]">aws_iam_role_policy</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">name:</span>{" "}
            {/* {t("iac.vpcModule.igw.vpcIdDescription")} */} The name of the IAM policy.
          </li>
          <li>
            <span className="text-[#6e5da9]">role:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The IAM role to attach the policy to.
          </li>
          <li>
            <span className="text-[#6e5da9]">policy:</span>{" "}
            {/* {t("iac.vpcModule.igw.tagsDescription")} */} The policy to attach to the IAM role. It grants the necessary permissions for the Lambda function to access the S3 bucket and CloudWatch logs.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="iam/main.tf">{iamPolicyCode}</CodeContainer>
    </div>
  );
}
