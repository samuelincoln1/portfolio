"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import { FeatureList, useList } from "./DocBlocks";

export default function CostAnalysis() {
  const { t } = useTranslation("platform");
  return (
    <div id="cost-analysis" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("platform.cost.title")}
      </h1>
      <p>{t("platform.cost.description")}</p>
      <FeatureList items={useList(t, "platform.cost.items")} />
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("platform.cost.natTitle")}
      </h2>
      <p>
        {t("platform.cost.natDescription")}{" "}
        <a
          href="https://github.com/samuelincoln1/aws-django-platform/blob/main/docs/cost-analysis.md"
          target="_blank"
          className="underline text-blue-500 hover:text-blue-400"
        >
          docs/cost-analysis.md
        </a>
      </p>
    </div>
  );
}
