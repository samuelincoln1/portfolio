"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import CodeContainer from "../../components/util/CodeContainer";
import { rdsInstanceCode, rdsSubnetGroupCode } from "./codeSnippets";

export default function RDSModule() {
  const { t } = useTranslation("iac");
  return (
    <div id="rds-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("iac.rdsModule.title")}
      </h1>
      <p>
        {t("iac.rdsModule.description")}
        
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("iac.rdsModule.featuresTitle")}
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>RDS Instance: </strong>{t("iac.rdsModule.rdsInstanceDescription") }
        </li>
        <li className="mb-2">
          <strong>Subnet Group: </strong>{t("iac.rdsModule.subnetGroupDescription")}
        </li>
        <li className="mb-2">
          <strong>Security Group: </strong>{t("iac.rdsModule.securityGroupDescription")}
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p>1. RDS Instance</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6e5da9]">aws_rds_instance</span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6e5da9]">identifier_prefix</span>: {t("iac.rdsModule.rdsInstance.identifierPrefix")}
            </li>
            <li>
              <span className="text-[#6e5da9]">engine</span>: {t("iac.rdsModule.rdsInstance.engine")}
            </li>
            <li>
              <span className="text-[#6e5da9]">engine_version</span>: {t("iac.rdsModule.rdsInstance.engineVersion")}
            </li>
            <li>
              <span className="text-[#6e5da9]">instance_class</span>: {t("iac.rdsModule.rdsInstance.instanceClass")}
            </li>
            <li>
              <span className="text-[#6e5da9]">allocated_storage</span>: {t("iac.rdsModule.rdsInstance.allocatedStorage")}
            </li>
            <li>
              <span className="text-[#6e5da9]">username</span>: {t("iac.rdsModule.rdsInstance.username")}
            </li>
            <li>
              <span className="text-[#6e5da9]">password</span>: {t("iac.rdsModule.rdsInstance.password")}
            </li>
            <li>
              <span className="text-[#6e5da9]">vpc_security_group_ids</span>: {t("iac.rdsModule.rdsInstance.vpc_security_group_ids")}
            </li>
            <li>
              <span className="text-[#6e5da9]">db_subnet_group_name</span>: {t("iac.rdsModule.rdsInstance.db_subnet_group_name")}
            </li>
            <li>
              <span className="text-[#6e5da9]">skip_final_snapshot</span>: {t("iac.rdsModule.rdsInstance.skip_final_snapshot")}
            </li>
          </ul>
        </li>
      </ul>
      <CodeContainer fileName="rds/main.tf">{rdsInstanceCode}</CodeContainer>
      <p>2. DB Subnet Group</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6e5da9]">aws_db_subnet_group</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">name</span>: {t("iac.rdsModule.dbSubnetGroup.name")}
          </li>
          <li>
            <span className="text-[#6e5da9]">subnet_ids</span>: {t("iac.rdsModule.dbSubnetGroup.subnetIds")}
          </li>
          <li>
            <span className="text-[#6e5da9]">tags</span>: {t("iac.rdsModule.dbSubnetGroup.tags")}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="rds/main.tf">{rdsSubnetGroupCode}</CodeContainer>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("iac.rdsModule.variablesAndOutputs.title")}
      </h2>
      <p>
        {t("iac.rdsModule.variablesAndOutputs.description")}
        such as <span className="text-[#6e5da9]">engine</span>,{" "}
        <span className="text-[#6e5da9]">engine_version</span>,{" "}
        <span className="text-[#6e5da9]">instance_class {" "}</span>{t("iac.rdsModule.variablesAndOutputs.description2")}
        <code className="text-[#EC585D]">{" "}variables.tf</code> {t("iac.rdsModule.variablesAndOutputs.description3")}
 {" "}
        <span className="text-[#6e5da9]">username</span> {t("iac.rdsModule.variablesAndOutputs.description4")}
        <span className="text-[#6e5da9]">password</span> {t("iac.rdsModule.variablesAndOutputs.description5")}
      </p>
    </div>
  );
}
