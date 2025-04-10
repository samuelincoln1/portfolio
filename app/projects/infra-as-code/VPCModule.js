"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { useTranslation } from "next-i18next";
import {
  vpcCode,
  internetGatewayCode,
  subnetsCode,
  routeTablesCode,
  routeTableAssociationsCode,
} from "./codeSnippets";

export default function VPCModule() {
  const { t } = useTranslation("iac");
  return (
    <div id="vpc-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("iac.vpcModule.title")}
      </h1>
      <p>{t("iac.vpcModule.description")}</p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("iac.vpcModule.featuresTitle")}
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>VPC: </strong>
          {t("iac.vpcModule.vpcDescription")}
        </li>
        <li className="mb-2">
          <strong>Internet Gateway: </strong>
          {t("iac.vpcModule.igwDescription")}
        </li>
        <li className="mb-2">
          <strong>Subnets: </strong>
          {t("iac.vpcModule.subnetsDescription")}
        </li>
        <li className="mb-2">
          <strong>Route Tables: </strong>
          {t("iac.vpcModule.routeTablesDescription")}
        </li>
        <li className="mb-2">
          <strong>Route Table Associations: </strong>
          {t("iac.vpcModule.routeTableAssociationsDescription")}
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p>1. Virtual Private Cloud (VPC)</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6e5da9]">aws_vpc.main</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">cidr_block</span>:{" "}
            {t("iac.vpcModule.vpc.cidrBlockDescription")}
          </li>
          <li>
            <span className="text-[#6e5da9]">enable_dns_hostnames</span>:{" "}
            {t("iac.vpcModule.vpc.enableDnsHostnamesDescription")}
          </li>
          <li>
            <span className="text-[#6e5da9]">enable_dns_support</span>:{" "}
            {t("iac.vpcModule.vpc.enableDnsSupportDescription")}
          </li>
          <li>
            <span className="text-[#6e5da9]">tags</span>:{" "}
            {t("iac.vpcModule.vpc.tagsDescription")}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="vpc/main.tf">{vpcCode}</CodeContainer>
      <p>2. Internet Gateway</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6e5da9]">aws_internet_gateway</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">vpc_id</span>:{" "}
            {t("iac.vpcModule.igw.vpcIdDescription")}
          </li>
          <li>
            <span className="text-[#6e5da9]">tags</span>:{" "}
            {t("iac.vpcModule.igw.tagsDescription")}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="vpc/main.tf">
        {internetGatewayCode}
      </CodeContainer>
      <p>3. Subnets</p>
      <p>
        <strong>Public Subnets</strong>
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6e5da9]">aws_subnet</span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6e5da9]">vpc_id</span>:{" "}
              {t("iac.vpcModule.subnets.vpcIdDescription")}
            </li>
            <li>
              <span className="text-[#6e5da9]">cidr_block</span>:{" "}
              {t("iac.vpcModule.subnets.cidrBlockDescription")}
            </li>
            <li>
              <span className="text-[#6e5da9]">map_public_ip_on_launch</span>:{" "}
              {t("iac.vpcModule.subnets.mapPublicIpOnLaunchDescription")}
            </li>
            <li>
              <span className="text-[#6e5da9]">availability_zone</span>:{" "}
              {t("iac.vpcModule.subnets.availabilityZoneDescription")}
            </li>
            <li>
              <span className="text-[#6e5da9]">tags</span>:{" "}
              {t("iac.vpcModule.subnets.tagsDescription")}
            </li>
          </ul>
        </li>
      </ul>
      <p>
        <strong>Private Subnets</strong>
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6e5da9]">aws_subnet</span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6e5da9]">vpc_id</span>:{" "}
              {t("iac.vpcModule.subnets.vpcIdDescription")}
            </li>
            <li>
              <span className="text-[#6e5da9]">cidr_block</span>:{" "}
              {t("iac.vpcModule.subnets.cidrBlockDescription")}
            </li>
            <li>
              <span className="text-[#6e5da9]">map_public_ip_on_launch</span>:{" "}
              {t("iac.vpcModule.subnets.mapPublicIpOnLaunchDescription2")}
            </li>
            <li>
              <span className="text-[#6e5da9]">availability_zone</span>:{" "}
              {t("iac.vpcModule.subnets.availabilityZoneDescription")}
            </li>
            <li>
              <span className="text-[#6e5da9]">tags</span>:{" "}
              {t("iac.vpcModule.subnets.tagsDescription")}
            </li>
          </ul>
        </li>
      </ul>
      <CodeContainer fileName="vpc/main.tf">{subnetsCode}</CodeContainer>
      <p>4. Route Tables</p>
      <p>
        <strong>Public Route Table</strong>
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6e5da9]">aws_route_table</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">vpc_id</span>:{" "}
            {t("iac.vpcModule.routeTables.vpcIdDescription")}
          </li>
          <li>
            <span className="text-[#6e5da9]">route</span>:{" "}
            {t("iac.vpcModule.routeTables.routeDescription1")}
            <span className="text-[#6a7c80]">0.0.0.0/0</span>{" "}
            {t("iac.vpcModule.routeTables.routeDescription2")}
          </li>
          <li>
            <span className="text-[#6e5da9]">tags</span>:{" "}
            {t("iac.vpcModule.routeTables.tagsDescription")}
          </li>
        </ul>
      </ul>
      <p>
        <strong>Private Route Table</strong>
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6e5da9]">aws_route_table</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">vpc_id</span>:{" "}
            {t("iac.vpcModule.routeTables.vpcIdDescription")}
          </li>
          <li>
            <span className="text-[#6e5da9]">tags</span>:{" "}
            {t("iac.vpcModule.routeTables.tagsDescription")}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="vpc/main.tf">{routeTablesCode}</CodeContainer>
      <p>5. Route Table Associations</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Public Subnets: </strong>
          {t("iac.vpcModule.routeTableAssociations.publicSubnets")}
        </li>
        <li className="mb-2">
          <strong>Private Subnets: </strong>
          {t("iac.vpcModule.routeTableAssociations.privateSubnets")}
        </li>
      </ul>
      <CodeContainer fileName="vpc/main.tf">
        {routeTableAssociationsCode}
      </CodeContainer>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("iac.vpcModule.variablesAndOutputs.title")}
      </h2>
      <p>
        {t("iac.vpcModule.variablesAndOutputs.description")}
        <span className="text-[#6e5da9]">cidr_block</span>,{" "}
        <span className="text-[#6e5da9]">enable_dns_hostnames</span>,{" "}
        <span className="text-[#6e5da9]">public_subnet_cidr_block_1</span>,{" "}
        {t("iac.vpcModule.variablesAndOutputs.description2")}
        <code className="text-[#EC585D]"> variables.tf</code>{" "}
        {t("iac.vpcModule.variablesAndOutputs.description3")}
        <code className="text-[#EC585D]">outputs.tf</code>{" "}
        {t("iac.vpcModule.variablesAndOutputs.description4")}
      </p>
    </div>
  );
}
