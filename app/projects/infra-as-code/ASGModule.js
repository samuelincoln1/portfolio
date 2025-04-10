"use client";

import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { useTranslation } from "react-i18next";
import {
  webServerLaunchTemplateCode,
  webServerAutoscalingGroupCode,
  webServerSecurityGroupCode,
} from "./codeSnippets";

export default function ASGModule() {
  const { t } = useTranslation("iac");
  return (
    <div id="asg-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("iac.asgModule.title")}
      </h1>
      <p>
        {t("iac.asgModule.description")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("iac.asgModule.featuresTitle")}
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Lauching template: </strong>{t("iac.asgModule.launchTemplateDescription")}
        </li>
        <li className="mb-2">
          <strong>Auto Scaling Group: </strong>{t("iac.asgModule.autoscalingGroupDescription")}
        </li>
        <li className="mb-2">
          <strong>Security Groups: </strong>{t("iac.asgModule.securityGroupDescription")}
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p>1. Launch Template</p>
      <ul className="list-disc pl-5">
        <li>
          <strong>Resource: </strong>
          <span className="text-[#6e5da9]">aws_launch_template</span>
        </li>
        <ul className="list-disc pl-5">
          <li>
            <span className="text-[#6e5da9]">name</span>: {t("iac.asgModule.launchTemplate.name")}
          </li>
          <li>
            <span className="text-[#6e5da9]">image_id</span>: {t("iac.asgModule.launchTemplate.imageId")}
          </li>
          <li>
            <span className="text-[#6e5da9]">instance_type</span>: {t("iac.asgModule.launchTemplate.instanceType")}
          </li>
          <li>
            <span className="text-[#6e5da9]">key_name</span>: {t("iac.asgModule.launchTemplate.keyName")}
          </li>
          <li>
            <span className="text-[#6e5da9]">network_interface</span>:
            <ul className="list-disc pl-5 ml-5">
              <li>
                <span className="text-[#6e5da9]">
                  associate_public_ip_address
                </span>
                : {t("iac.asgModule.launchTemplate.associatePublicIpAddress")}
                <code className="text-[#EC585D]"> false</code>.
              </li>
              <li>
                <span className="text-[#6e5da9]">security_groups</span>: {t("iac.asgModule.launchTemplate.securityGroups")}
              </li>
            </ul>
          </li>
          <li>
            <span className="text-[#6e5da9]">user_data</span>: {t("iac.asgModule.launchTemplate.userData")}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="asg/main.tf">
        {webServerLaunchTemplateCode}
      </CodeContainer>
      <p>2. Auto Scaling Group</p>
      <ul className="list-disc pl-5">
        <li>
          <strong>Resource: </strong>
          <span className="text-[#6e5da9]">aws_autoscaling_group</span>
        </li>
        <ul className="list-disc pl-5">
          <li>
            <span className="text-[#6e5da9]">name</span>: {t("iac.asgModule.autoscalingGroup.name")}
          </li>
          <li>
            <span className="text-[#6e5da9]">max_size</span>: {t("iac.asgModule.autoscalingGroup.maxSize")}
          </li>
          <li>
            <span className="text-[#6e5da9]">min_size</span>: {t("iac.asgModule.autoscalingGroup.minSize")}
          </li>
          <li>
            <span className="text-[#6e5da9]">desired_capacity</span>: {t("iac.asgModule.autoscalingGroup.desiredCapacity")}
          </li>
          <li>
            <span className="text-[#6e5da9]">vpc_zone_identifier</span>: {t("iac.asgModule.autoscalingGroup.vpcZoneIdentifier")}
          </li>
          <li>
            <span className="text-[#6e5da9]">target_group_arns</span>: {t("iac.asgModule.autoscalingGroup.targetGroupArns")}
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="asg/main.tf">
        {webServerAutoscalingGroupCode}
      </CodeContainer>
      <p>3. Security Group</p>
      <ul className="list-disc pl-5">
        <li>
          <strong>Web Server Security Group</strong>
          <ul>
            <li>
              <strong>Resource: </strong>
              <span className="text-[#6e5da9]">aws_security_group</span>
              <ul className="list-disc pl-5 ml-5">
                <li>
                  <span className="text-[#6e5da9]">name</span>: {t("iac.asgModule.securityGroup.name")}
                </li>

                <li>
                  <span className="text-[#6e5da9]">vpc_id</span>: {t("iac.asgModule.securityGroup.vpcId")}
                </li>
                <li>
                  <span className="text-[#6e5da9]">ingress</span>: {t("iac.asgModule.securityGroup.ingressDescription")}
                
                  <code className="text-[#02A8EF]"> 8080</code> {t("iac.asgModule.securityGroup.ingressDescription2")}
                </li>
                <li>
                  <span className="text-[#6e5da9]">egress</span>: {t("iac.asgModule.securityGroup.egressDescription")}
                </li>
              </ul>
            </li>
          </ul>

          <ul>
            <li className="list-disc pl-5">
              <strong>RDS Security Group</strong>
            </li>
            <li>
              <strong>Resource: </strong>
              <span className="text-[#6e5da9]">aws_security_group</span>
              <ul className="list-disc pl-5 ml-5">
                <li>
                  <span className="text-[#6e5da9]">name</span>: {t("iac.asgModule.securityGroup.name")}
                </li>
                <li>
                  <span className="text-[#6e5da9]">vpc_id</span>: {t("iac.asgModule.securityGroup.vpcId")}
                </li>
                <li>
                  <span className="text-[#6e5da9]">ingress</span>: {t("iac.asgModule.securityGroup.ingressDescription3")}
                </li>
                <li>
                  <span className="text-[#6e5da9]">egress</span>: {t("iac.asgModule.securityGroup.egressDescription2")}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <CodeContainer fileName="asg/main.tf">
        {webServerSecurityGroupCode}
      </CodeContainer>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("iac.asgModule.variablesAndOutputs.title")}
      </h2>
      <p>
        {t("iac.asgModule.variablesAndOutputs.description")}
         <span className="text-[#6e5da9]">launch_template_name</span>,{" "}
        <span className="text-[#6e5da9]">image_id</span>,{" "}
        <span className="text-[#6e5da9]">instance_type</span>, {t("iac.asgModule.variablesAndOutputs.description2")}
        <code className="text-[#EC585D]">{" "}variables.tf</code> {t("iac.asgModule.variablesAndOutputs.description3")}
        <code className="text-[#EC585D]">outputs.tf</code> {t("iac.asgModule.variablesAndOutputs.description4")}
      </p>
    </div>
  );
}
