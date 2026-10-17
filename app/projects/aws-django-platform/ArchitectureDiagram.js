"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { FeatureList, useList } from "./DocBlocks";

export default function ArchitectureDiagram() {
  const { t } = useTranslation("platform");
  return (
    <div id="architecture-diagram" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("platform.architectureDiagram.title")}
      </h1>
      <p>{t("platform.architectureDiagram.description")}</p>
      <FeatureList items={useList(t, "platform.architectureDiagram.items")} separator=": " />
      <p className="mt-4">{t("platform.architectureDiagram.accessDescription")}</p>
      <figure>
        <Image
          src="/images/projects/aws-django-platform/architecture-diagram.png"
          alt="Architecture Diagram"
          width={2729}
          height={1320}
          className="border-2 border-black rounded-lg shadow-lg"
        />
      </figure>
    </div>
  );
}
