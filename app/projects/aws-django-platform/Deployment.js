"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import { Inline } from "./DocBlocks";

export default function Deployment() {
  const { t } = useTranslation("platform");
  return (
    <div id="deployment" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("platform.deployment.title")}
      </h1>
      <p>
        <Inline text={t("platform.deployment.description")} />
      </p>
      <p>{t("platform.deployment.description2")}</p>
    </div>
  );
}
