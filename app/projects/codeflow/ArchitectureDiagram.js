"use client";
import React from "react";
import dynamic from "next/dynamic";

// Importar MermaidDiagram apenas no cliente (evita problemas de SSR)
const MermaidDiagram = dynamic(
  () => import("../../components/MermaidDiagram"),
  {
    ssr: false,
    loading: () => (
      <div className="" style={{ minHeight: '300px' }}>
        <div className="text-center text-slate-300 py-8">
          <div className="animate-spin h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
          <p className="text-sm">Carregando diagrama...</p>
        </div>
      </div>
    ),
  }
);

export default function ArchitectureDiagram() {
  return (
    <div
      id="ci/cd-pipeline-architecture"
      className="flex flex-col gap-4 lg:max-w-full"
    >
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        CI/CD Pipeline Architecture
      </h1>
      <p>
        The CodeFlow pipeline implements a complete automated deployment
        workflow that triggers on every push to the main branch. The
        architecture follows modern DevOps practices with clear separation of
        concerns and security best practices.
      </p>

      <ul className="list-disc pl-5">
        <li>
          <strong>GitHub Actions:</strong> Orchestrates the entire pipeline with
          secure credential management and parallel job execution.
        </li>
        <li>
          <strong>Node.js Build:</strong> Handles dependency installation,
          caching, and Next.js static export generation.
        </li>
        <li>
          <strong>AWS S3:</strong> Serves as the hosting platform with optimized
          sync operations and automatic cleanup of old files.
        </li>
        <li>
          <strong>CloudFront CDN:</strong> Provides global content delivery with
          intelligent cache invalidation strategies.
        </li>
      </ul>

      <div className="">
        <h3 className="text-lg font-semibold text-white mb-4">
          Pipeline Flow Diagram
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
            Diagram generated using Mermaid
          </em>
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white mb-2">Key Benefits</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Zero Downtime:</strong> S3 sync ensures atomic deployments
          </li>
          <li>
            <strong>Global Performance:</strong> CloudFront edge locations
            worldwide
          </li>
          <li>
            <strong>Security First:</strong> No credentials in code, encrypted
            secrets
          </li>
          <li>
            <strong>Cost Effective:</strong> Pay-per-use model with efficient
            caching
          </li>
          <li>
            <strong>Scalable:</strong> Handles traffic spikes automatically
          </li>
        </ul>
      </div>
    </div>
  );
}
