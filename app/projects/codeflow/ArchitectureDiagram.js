"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const MermaidDiagram = dynamic(
  () => import("../../components/MermaidDiagram"),
  {
    ssr: false,
    loading: () => (
      <div className="" style={{ minHeight: '300px' }}>
        <div className="text-center text-slate-300 py-8">
          <div className="animate-spin h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
          <p className="text-sm">Loading diagram...</p>
        </div>
      </div>
    ),
  }
);

export default function ArchitectureDiagram() {
  const { t } = useTranslation("codeflow");
  return (
    <div
      id="ci/cd-pipeline-architecture"
      className="flex flex-col gap-4 lg:max-w-full"
    >
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        {t("codeflow.architectureDiagram.title")}
      </h1>
      <p>
        {t("codeflow.architectureDiagram.description1")}
      </p>

      <ul className="list-disc pl-5">
        <li>
          <strong>GitHub Actions:</strong> {t("codeflow.architectureDiagram.githubActionsDescription")}
        </li>
        <li>
          <strong>Node.js Build:</strong> {t("codeflow.architectureDiagram.nodeJsBuildDescription")}
        </li>
        <li>
          <strong>AWS S3:</strong> {t("codeflow.architectureDiagram.awsS3Description")}
        </li>
        <li>
          <strong>CloudFront CDN:</strong> {t("codeflow.architectureDiagram.cloudFrontDescription")}
        </li>
      </ul>

      <div className="">
        <h3 className="text-lg font-semibold text-white mb-4">
          {t("codeflow.architectureDiagram.pipelineFlowDiagram")}
        </h3>
                <MermaidDiagram 
          id="codeflow-pipeline"
          chart={`graph TD
    A[Developer] --> B[GitHub Repo]
    B --> C[GitHub Actions]
    C --> D[Build]
    D --> E[Deploy S3]
    E --> F[CloudFront]
    F --> G[Live Site]
    
    style A fill:#2563eb,stroke:#3b82f6,stroke-width:2px,color:#ffffff
    style B fill:#3b82f6,stroke:#60a5fa,stroke-width:2px,color:#ffffff
    style C fill:#0ea5e9,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style D fill:#06b6d4,stroke:#22d3ee,stroke-width:2px,color:#ffffff
    style E fill:#047857,stroke:#059669,stroke-width:2px,color:#ffffff
    style F fill:#059669,stroke:#10b981,stroke-width:2px,color:#ffffff
    style G fill:#10b981,stroke:#34d399,stroke-width:2px,color:#ffffff`}
        />
        <p className="mt-4 text-sm text-gray-300">
          <em>
            {t("codeflow.architectureDiagram.pipelineFlowDiagramDescription")}
          </em>
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          {t("codeflow.architectureDiagram.keyBenefits")}
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>{t("codeflow.architectureDiagram.zeroDowntime")}</strong> {t("codeflow.architectureDiagram.zeroDowntimeDescription")}
          </li>
          <li>
            <strong>{t("codeflow.architectureDiagram.globalPerformance")}</strong> {t("codeflow.architectureDiagram.globalPerformanceDescription")}
          </li>
          <li>
            <strong>{t("codeflow.architectureDiagram.securityFirst")}</strong> {t("codeflow.architectureDiagram.securityFirstDescription")}
          </li>
          <li>
            <strong>{t("codeflow.architectureDiagram.costEffective")}</strong> {t("codeflow.architectureDiagram.costEffectiveDescription")}
          </li>
          <li>
            <strong>{t("codeflow.architectureDiagram.scalable")}</strong> {t("codeflow.architectureDiagram.scalableDescription")}
          </li>
        </ul>
      </div>
    </div>
  );
}
