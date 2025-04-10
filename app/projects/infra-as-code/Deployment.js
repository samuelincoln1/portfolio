"use client";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Deployment() {
  const { t } = useTranslation("iac");
  return (
    <div id="deployment" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("iac.deployment.title")}
      </h1>
      <p>
        {t("iac.deployment.description")} <code className="text-[#FFCF25]">terraform apply</code>
        {t("iac.deployment.description2")}
      </p>
    </div>
  );
}
