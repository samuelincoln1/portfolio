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
          {t("articles.trasitioning.title")}
        </h1>
        <div>
          <p className="text-white text-center mt-6">
            {t("articles.trasitioning.author")}
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 mb-6">
          <Image
            src="/images/transition.png"
            alt="trasitioning legacy applications to the cloud"
            width={1100}
            height={1100}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4 ">
          <p>
            {t("articles.trasitioning.description1")}
          </p>{" "}
          <p>
            {" "}
            {t("articles.trasitioning.description2")}
            <strong>{t("articles.trasitioning.assessmentPlanning")}</strong>,{" "}
            {t("articles.trasitioning.description3")}
            <strong>{t("articles.trasitioning.implementation")}</strong>,{" "}
            {t("articles.trasitioning.description4")}
            <strong>{t("articles.trasitioning.validationOptimization")}</strong>,{" "}
            {t("articles.trasitioning.description5")}
          </p>{" "}
          <p>
            {" "}
            {t("articles.trasitioning.description6")}
          </p>
          <h2 className="text-[20px] lg:text-[28px] font-bold text-white">
            {t("articles.trasitioning.assessmentPlanningTitle")}
          </h2>
          <p>
            {t("articles.trasitioning.assessmentPlanningDescription1")}
          </p>
          <p>
            {t("articles.trasitioning.assessmentPlanningDescription2")}
          </p>
          <p>
            {t("articles.trasitioning.assessmentPlanningDescription3")}
          </p>
          <h2 className="text-[20px] lg:text-[28px] font-bold text-white">
            {t("articles.trasitioning.implementationTitle")}
          </h2>
          <p>
            {t("articles.trasitioning.implementationDescription1")}
          </p>
          <p>
            {t("articles.trasitioning.implementationDescription2")}
          </p>
          <h2 className="text-[20px] lg:text-[28px] font-bold text-white">
            {t("articles.trasitioning.validationOptimizationTitle")}
          </h2>
          <p>
            {t("articles.trasitioning.validationOptimizationDescription1")}
          </p>
          <p>
            {t("articles.trasitioning.validationOptimizationDescription2")}
          </p>
        </div>
      </div>
    </div>
  );
}
