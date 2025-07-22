"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function ArchitectureDiagram() {
    const { t } = useTranslation("analyzer");
  return (
    <div
      id="architecture-diagram"
      className="flex flex-col gap-4 lg:max-w-full"
    >
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("analyzer.architectureDiagram.title")}
      </h1>
      <p>
        {t("analyzer.architectureDiagram.description")}
      </p>
      <ul className="list-disc pl-5">
        <li>
          <strong>AWS Cloudtrail:</strong> {t("analyzer.architectureDiagram.cloudtrail")}
        </li>
        <li>
          <strong>AWS EventBridge:</strong> {t("analyzer.architectureDiagram.eventbridge")}
        </li>
        <li>
          <strong>AWS Lambda:</strong> {t("analyzer.architectureDiagram.lambda")}
        </li>
        <li>
          <strong>Amazon S3:</strong> {t("analyzer.architectureDiagram.s3")}
        </li>
      </ul>
      <figure>
        <Image
          src="../images/projects/infra-as-code/serverless-analyzer.png"
          alt="Architecture Diagram"
          width={1000}
          height={1000}
          className="border-2 border-black rounded-lg shadow-lg"
        />
        <figcaption className="mt-2">
          <p>
            {t("analyzer.architectureDiagram.figcaption")}
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
