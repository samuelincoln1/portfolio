"use client";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Tests() {
  const { t } = useTranslation("iac");
  return (
    <div id="tests" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("iac.tests.title")}
      </h1>
      <p>
        {t("iac.tests.description")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Terraform fmt
      </h2>
      <p>
        {t("iac.tests.terraformFmt")} <code className="text-[#FFCF25]">terraform fmt</code>
        {t("iac.tests.terraformFmt2")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Terraform validade
      </h2>
      <p>
        {t("iac.tests.terraformValidate")} <code className="text-[#FFCF25]">terraform validate</code>
        {t("iac.tests.terraformValidate2")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Terraform plan
      </h2>
      <p> 
        {t("iac.tests.terraformPlan")} <code className="text-[#FFCF25]">terraform plan</code>
        {t("iac.tests.terraformPlan2")}
      </p>
    </div>
  );
}
