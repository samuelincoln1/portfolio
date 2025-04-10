"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import CodeContainer from "../../components/util/CodeContainer";
import {
  albCode,
  albTargetGroupCode,
  albListenerCode,
  albSecurityGroupCode,
} from "./codeSnippets";

export default function ALBModule() {
  const { t } = useTranslation("iac");

  return (
    <div id="alb-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("iac.albModule.title")}
      </h1>
      <p>
        {t("iac.albModule.description")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("iac.albModule.featuresTitle")}
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Application Load Balancer: </strong>{t("iac.albModule.albDescription")}
        </li>
        <li className="mb-2">
          <strong>Target Group: </strong>{t("iac.albModule.targetGroupDescription")}
        </li>
        <li className="mb-2">
          <strong>Listener: </strong>{t("iac.albModule.listenerDescription")}
        </li>
        <li className="mb-2">
          <strong>Security Group: </strong>{t("iac.albModule.securityGroupDescription")}
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p>1. Application Load Balancer (ALB)</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>{t("iac.albModule.resourcesTitle")} </strong>{" "}
          <span className="text-[#6e5da9]">aws_lb</span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6e5da9]">name</span>: {t("iac.albModule.alb.name")}
            </li>
            <li>
              <span className="text-[#6e5da9]">internal</span>: {t("iac.albModule.alb.internal")}
              <code className="text-[#EC585D]"> false</code>.
            </li>
            <li>
              <span className="text-[#6e5da9]">load_balancer_type</span>: {t("iac.albModule.alb.loadBalancerType")}
              <code className="text-[#526d4e]"> &quot;application&quot;</code>.
            </li>
            <li>
              <span className="text-[#6e5da9]">security_groups</span>: {t("iac.albModule.alb.securityGroups")}
            </li>
            <li>
              <span className="text-[#6e5da9]">subnets</span>: {t("iac.albModule.alb.subnets")}
            </li>
            <li>
              <span className="text-[#6e5da9]">enable_deletion_protection</span>
              : {t("iac.albModule.alb.enableDeletionProtection")}
            </li>
          </ul>
        </li>
      </ul>
      <CodeContainer fileName="alb/main.tf">{albCode}</CodeContainer>
      <p>2. Target Group</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6e5da9]">aws_lb_target_group</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">name</span>: {t("iac.albModule.targetGroup.name")}
          </li>
          <li>
            <span className="text-[#6e5da9]">port</span>: {t("iac.albModule.targetGroup.port")}
            <code className="text-[#02A8EF]">80</code>.
          </li>
          <li>
            <span className="text-[#6e5da9]">protocol</span>: {t("iac.albModule.targetGroup.protocol")}
          </li>
          <li>
            <span className="text-[#6e5da9]">vpc_id</span>: {t("iac.albModule.targetGroup.vpcId")}
          </li>
          <li>
            <span className="text-[#6e5da9]">{t("iac.albModule.targetGroup.healthCheckConfiguration")}</span>
            <ul className="list-disc pl-5 ml-5">
              <li>
                <span className="text-[#6e5da9]">path</span>: {t("iac.albModule.targetGroup.path")}
              </li>
              <li>
                <span className="text-[#6e5da9]">interval</span>: {t("iac.albModule.targetGroup.interval")}
              </li>
              <li>
                <span className="text-[#6e5da9]">timeout</span>: {t("iac.albModule.targetGroup.timeout")}
              </li>
              <li>
                <span className="text-[#6e5da9]">healthy_threshold</span>: {t("iac.albModule.targetGroup.healthyThreshold")}
              </li>
              <li>
                <span className="text-[#6e5da9]">unhealthy_threshold</span>: {t("iac.albModule.targetGroup.unhealthyThreshold")}
              </li>
              <li>
                <span className="text-[#6e5da9]">matcher</span>: {t("iac.albModule.targetGroup.matcher")}
              </li>
            </ul>
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="alb/main.tf">{albTargetGroupCode}</CodeContainer>
      <p>3. Listener</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6e5da9]">aws_lb_listener</span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6e5da9]">load_balancer_arn</span>: {t("iac.albModule.listener.loadBalancerArn")}
            </li>
            <li>
              <span className="text-[#6e5da9]">port</span>: {t("iac.albModule.listener.port")}
              <code className="text-[#02A8EF]"> 80</code>.
            </li>
            <li>
              <span className="text-[#6e5da9]">protocol</span>: {t("iac.albModule.listener.protocol")}
              <code className="text-[#526d4e]"> &quot;HTTP&quot;</code>.
            </li>
            <li>
              <span className="text-[#6e5da9]">default_action</span>: {t("iac.albModule.listener.defaultAction")}
              <ul className="list-disc pl-5 ml-5">
                <li>
                  <span className="text-[#6e5da9]">type</span>: {t("iac.albModule.listener.type")}
                  <code className="text-[#526d4e]"> &quot;forward&quot;</code>.
                </li>
                <li>
                  <span className="text-[#6e5da9]">target_group_arn</span>: {t("iac.albModule.listener.targetGroupArn")}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <CodeContainer fileName="alb/main.tf">{albListenerCode}</CodeContainer>
      <p>4. Security Group</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6e5da9]">aws_security_group</span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6e5da9]">name</span>: {t("iac.albModule.securityGroup.name")}
            </li>
            <li>
              <span className="text-[#6e5da9]">description</span>: {t("iac.albModule.securityGroup.description")}
            </li>
            <li>
              <span className="text-[#6e5da9]">vpc_id</span>: {t("iac.albModule.securityGroup.vpcId")}
            </li>
            <li>
              <span className="text-[#6e5da9]">ingress</span>: {t("iac.albModule.securityGroup.ingressDescription")}
            </li>
            <li>
              <span className="text-[#6e5da9]">egress</span>: {t("iac.albModule.securityGroup.egressDescription")}
              <code className="text-[#02A8EF]"> 8080</code>.
            </li>
          </ul>
        </li>
      </ul>
      <CodeContainer fileName="alb/main.tf">
        {albSecurityGroupCode}
      </CodeContainer>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("iac.albModule.variablesAndOutputs.title")}
      </h2>
      <p>
        {t("iac.albModule.variablesAndOutputs.description")}
        <span className="text-[#6e5da9]">alb_name</span>,{" "}
        <span className="text-[#6e5da9]">public_subnet_id</span>,{" "}
        <span className="text-[#6e5da9]">alb_target_group_name</span>, {t('iac.albModule.variablesAndOutputs.description2')} {" "}
        <code className="text-[#EC585D]">{" "}variables.tf</code> {t('iac.albModule.variablesAndOutputs.description3')} {" "}
        <code className="text-[#EC585D]">outputs.tf</code> {t('iac.albModule.variablesAndOutputs.description4')}
      </p>
    </div>
  );
}
