"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Content() {
  const { t } = useTranslation("articles");
  return (
    <div id="content">
      <div className="mb-10">
        <h1 className="text-[22px] lg:text-[40px] font-bold text-white text-center">
          {t("articles.cicd.title")}
        </h1>
        <div>
          <p className="text-white text-center mt-6">
            {t("articles.cicd.author")}
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 mb-6">
          <Image
            src="/images/cicdarticle.png"
            alt="trasitioning legacy applications to the cloud"
            width={1100}
            height={1100}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4 ">
          <p>
            {t("articles.cicd.description1")}
          </p>
          <h2 className="text-[20px] lg:text-[28px] font-bold text-white">
            {t("articles.cicd.description2")}
          </h2>
          <p>
            {t("articles.cicd.description3")}
          </p>
          <h2 className="text-[20px] lg:text-[28px] font-bold text-white">
            {t("articles.cicd.description4")}
          </h2>
          <p>
            {t("articles.cicd.description5")}
          </p>
          <h2 className="text-[20px] lg:text-[28px] font-bold text-white">
            {t("articles.cicd.description6")}
          </h2>
          <p>
            {t("articles.cicd.description7")}
          </p>
        </div>
      </div>
    </div>
  );
}
