"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Overview() {
  const { t } = useTranslation("analyzer");
  return (
    <div id="overview">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("analyzer.overview.title")}
      </h1>
      <div className="flex flex-col gap-4 ">
        <p>{t("analyzer.overview.description")}</p>
        <p>
          {t("analyzer.overview.githubLink")}:{" "}
          <a
            href="https://github.com/samuelincoln1/infra-as-code"
            target="_blank"
            className="underline text-blue-500 hover:text-blue-400"
          >
            https://github.com/samuelincoln1/serverless-logs-analyzer
          </a>
        </p>
        <p>
          {t("analyzer.overview.dashboardLink1")}{" "}
          <Link
            href="/projects/serverless-logs-analyzer/dashboard"
            className="underline text-blue-500 hover:text-blue-400"
            target="_blank"
          >
            {t("analyzer.overview.dashboardLink2")}
          </Link>
        </p>
      </div>
    </div>
  );
}
