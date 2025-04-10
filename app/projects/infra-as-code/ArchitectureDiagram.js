"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";


export default function ArchitectureDiagram() {
  const { t } = useTranslation("iac");
  return (
    <div id="architecture-diagram" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("iac.architectureDiagram.title")}
      </h1>
      <p>{t("iac.architectureDiagram.description")}</p>
      <ul className="list-disc pl-5">
        <li>
          <strong>VPC:</strong> {t("iac.architectureDiagram.vpc")}
        </li>
        <li>
          <strong>ALB:</strong> {t("iac.architectureDiagram.alb")}
        </li>
        <li>
          <strong>ASG:</strong> {t("iac.architectureDiagram.asg")}
        </li>
        <li>
          <strong>RDS:</strong> {t("iac.architectureDiagram.rds")}
        </li>
      </ul>
      <p className="mt-4">
        {t("iac.architectureDiagram.accessDescription")}
      </p>
      <figure>
        <Image
          src="../images/projects/infra-as-code/iac-architecture-diagram.png"
          alt="Architecture Diagram"
          width={1000}
          height={1000}
          className="border-2 border-black rounded-lg shadow-lg"
        />
        <figcaption className="mt-2">
          <p>
            {t("iac.architectureDiagram.figcaption")}
            <a
              href="https://www.lucidchart.com/pages/landing"
              target="_blank"
              className="underline text-blue-500 hover:text-blue-400"
            >
              https://www.lucidchart.com/pages/landing
            </a>
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
