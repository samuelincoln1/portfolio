"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import { FeatureList, useList } from "./DocBlocks";

export default function Overview() {
  const { t } = useTranslation("platform");

  return (
    <div id="overview">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("platform.overview.title")}
      </h1>
      <div className="flex flex-col gap-4 ">
        <p>{t("platform.overview.description")}</p>
        <p>{t("platform.overview.description2")}</p>
        <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
          {t("platform.overview.highlightsTitle")}
        </h2>
        <FeatureList items={useList(t, "platform.overview.highlights")} separator=": " />
        <p>
          {t("platform.overview.githubLink")}:{" "}
          <a
            href="https://github.com/samuelincoln1/aws-django-platform"
            target="_blank"
            className="underline text-blue-500 hover:text-blue-400"
          >
            https://github.com/samuelincoln1/aws-django-platform
          </a>
        </p>
      </div>
    </div>
  );
}
