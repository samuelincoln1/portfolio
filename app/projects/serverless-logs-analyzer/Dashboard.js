"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Dashboard() {
  const { t } = useTranslation("analyzer");
  return (
    <div id="dashboard">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("analyzer.dashboard.title")}
      </h1>
      <div className="flex flex-col gap-4 ">
        <p>
          {t("analyzer.dashboard.description1")}
        </p>
        <p>
          {t("analyzer.dashboard.description2")}
          <Link
            href="/projects/serverless-logs-analyzer/dashboard"
            className="underline text-blue-500 hover:text-blue-400"
            target="_blank"
          >
            {t("analyzer.dashboard.description3")}
          </Link>
        </p>
      </div>
    </div>
  );
}
