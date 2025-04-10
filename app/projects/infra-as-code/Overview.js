"use client";
import React from "react";
import { useTranslation } from "next-i18next";

export default function Overview() {
  const { t } = useTranslation("iac");

  return (
    <div id="overview">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t('iac.overview.title')}
      </h1>
      <div className="flex flex-col gap-4 ">
        <p>
          {t('iac.overview.description')}
        </p>
        <p>
          {t('iac.overview.githubLink')}:{" "}
          <a
            href="https://github.com/samuelincoln1/infra-as-code"
            target="_blank"
            className="underline text-blue-500 hover:text-blue-400"
          >
            https://github.com/samuelincoln1/infra-as-code
          </a>
        </p>
      </div>
    </div>
  );
}
