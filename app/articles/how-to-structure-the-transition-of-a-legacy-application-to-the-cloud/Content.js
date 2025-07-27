"use client";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Content() {
  const { t } = useTranslation("codeflow");
  return (
    <div id="portfolio-website">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("codeflow.portfolioWebsite.title")}
      </h1>
      <div className="flex flex-col gap-4">
        <p>
          {t("codeflow.portfolioWebsite.description1")}{" "}
          <span className="text-[#00b3ff]">Next.js 15</span>{" "}
          {t("codeflow.portfolioWebsite.description2")}{" "}
          <span className="text-[#00b3ff]">React 19</span>{", "}
          {t("codeflow.portfolioWebsite.description3")}{" "}
          <span className="text-[#00b3ff]">Tailwind CSS</span>{" "}
          {t("codeflow.portfolioWebsite.description4")}{" "}
          
        </p>

        <p>
          {t("codeflow.portfolioWebsite.description5")}{" "}
          <span className="text-[#00b3ff]">AWS S3</span>{" "}
          {t("codeflow.portfolioWebsite.description6")}{" "}
          <span className="text-[#00b3ff]">CloudFront CDN</span>{" "}
          {t("codeflow.portfolioWebsite.description7")}{" "}
          <span className="text-[#00b3ff]">GitHub Actions</span>.
        </p>

        <p>
          <strong>Repository:</strong>{" "}
          <a
            href="https://github.com/samuelincoln1/portfolio"
            target="_blank"
            className="underline text-blue-500 hover:text-blue-400"
          >
            https://github.com/samuelincoln1/portfolio
          </a>
        </p>
      </div>
    </div>
  );
}
