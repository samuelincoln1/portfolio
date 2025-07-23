"use client";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Overview() {
  const { t } = useTranslation("codeflow");
  return (
    <div id="overview">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("codeflow.overview.title")}
      </h1>
      <div className="flex flex-col gap-4">
        <p>
          {t("codeflow.overview.description1")}
        </p>
        
        <p>
          <strong>{t("codeflow.overview.description2")}</strong> {t("codeflow.overview.description3")}
        </p>
        
        <p>
          <strong>{t("codeflow.overview.description4")}</strong> {t("codeflow.overview.description5")}
        </p>
      </div>
    </div>
  );
}
