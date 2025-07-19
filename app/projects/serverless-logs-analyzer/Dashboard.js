"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Dashboard() {
  return (
    <div id="dashboard">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        Dashboard
      </h1>
      <div className="flex flex-col gap-4 ">
        <p>
          The Dashboard is an interactive visualization interface that transforms
          the processed AWS account activity data from the Lambda Analyzer into
          intuitive charts and metrics. This dashboard provides stakeholders with
          real-time insights into AWS usage patterns, security events, and
          operational trends through visual representations of event frequencies,
          regional distribution, user activities, resource utilization, and
          source IP analysis.
        </p>
        <p>
          To see the dashboard created with the processed logs,{" "}
          <Link
            href="/projects/serverless-logs-analyzer/dashboard"
            className="underline text-blue-500 hover:text-blue-400"
            target="_blank"
          >
            go to the dashboard page.
          </Link>
        </p>
      </div>
    </div>
  );
}
