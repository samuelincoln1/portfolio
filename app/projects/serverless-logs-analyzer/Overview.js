"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Overview() {
  return (
    <div id="overview">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        Serverless Logs Analyzer - Overview
      </h1>
      <div className="flex flex-col gap-4 ">
        <p>
          This project demonstrates the use of AWS to generate and analyze logs.
          It was designed to provide automated insights into AWS account
          activities through a serverless architecture that monitors, processes,
          and analyzes CloudTrail logs in real-time. The system automatically
          captures all AWS API calls and management events via CloudTrail,
          aggregates daily log files for efficient processing, and generates
          comprehensive statistical reports about resource usage patterns,
          security events, and operational activities. The solution uses Lambda
          functions, S3 storage, and EventBridge to create a cost-effective,
          scalable log analysis system that requires no infrastructure
          management while providing comprehensive visibility into AWS account
          activities.
        </p>
        <p>
          Github repository:{" "}
          <a
            href="https://github.com/samuelincoln1/infra-as-code"
            target="_blank"
            className="underline text-blue-500 hover:text-blue-400"
          >
            https://github.com/samuelincoln1/infra-as-code
          </a>
        </p>
                  <p>
            To see the dashboard created with the processed logs, go to the dashboard page{" "}
            <Link
              href="/projects/serverless-logs-analyzer/dashboard"
              className="underline text-blue-500 hover:text-blue-400"
              target="_blank"
            >
              here
            </Link>
          </p>
      </div>
    </div>
  );
}
