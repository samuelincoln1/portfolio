"use client";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Result() {
  const { t } = useTranslation("codeflow");
  return (
    <div id="result">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("codeflow.results.title")}
      </h1>
      <div className="flex flex-col gap-4">
        <p>
          {t("codeflow.results.description1")}
          <span className="text-[#00bd0d]">{t("codeflow.results.uptime")}</span> {t("codeflow.results.uptimeDescription")}
          <span className="text-[#00bd0d]">{t("codeflow.results.zeroDowntime")}</span> {t("codeflow.results.zeroDowntimeDescription")}
        </p>
      </div>
    </div>
  );
}
