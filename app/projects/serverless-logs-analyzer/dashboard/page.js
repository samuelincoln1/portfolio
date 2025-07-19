"use client";
import React from "react";
import Navbar from "../../../components/util/ProjectsNavbar";
import Footer from "../Footer";
import { MenuProvider } from "../../../context/MenuContext";
import EventCountsChart from "./EventCountsChart.js";
import ResourceCountsChart from "./ResourceCountsChart.js";
import AccountCountsChart from "./AccountCountsChart.js";
import SourceIPCountsChart from "./SourceIPCountsChart.js";
import { useTranslation } from "next-i18next";
import Sidebar from "./Sidebar";

import insightsData from "../../../data/insights_cloudtrail.json";

export default function DashboardPage() {
  const { t } = useTranslation("dashboard");
  return (
    <MenuProvider>
      <div className="relative">
        <Navbar />
        <div className="bg-[#0d0e12] min-h-screen w-full">
          <Sidebar />
          <div className="xl:ml-64">
            <div
              className="px-4 sm:px-8 lg:px-12 xl:px-20 relative flex flex-col w-full text-[#d5d7db]"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              <div className="container xl:px-4 px-2 sm:px-4 relative mt-8 z-10 mb-[154px] w-full">
                <div className="flex flex-col">
                  <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 mt-[72px]">
                    <div id="dashboard">
                      <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold">
                        Dashboard - 18/07/2025
                      </h1>
                    </div>
                    <p className="text-sm sm:text-base">
                      This dashboard visualizes real AWS CloudTrail data from a
                      live AWS account, showing 849 total events captured during
                      the analysis period. The data reveals that the account
                      primarily operates in the us-east-1 region with activity
                      dominated by API calls (847) versus service events (2).
                    </p>
                    <p className="text-sm sm:text-base">
                      {" "}
                      The most frequent operations include DescribeAlarms (86
                      calls), AssumeRole (43 calls), and Decrypt (44 calls),
                      indicating active monitoring and security operations. IAM
                      Users generated the majority of activities (475 events),
                      followed by Root account usage (271 events), with most
                      traffic originating from a specific IP address
                      (177.55.229.104). The resource usage shows heavy S3 bucket
                      interactions (105 operations) and IAM role activities (43
                      operations), providing insights into storage management
                      and identity operations across the AWS environment.
                    </p>
                    <div className="border border-gray-700 rounded-lg p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                        {t("dashboard.commonEventsTitle")}
                      </h3>

                      <EventCountsChart data={insightsData} />
                    </div>

                    <div className="flex flex-col lg:flex-row w-full gap-6">
                      <div className="flex-1 border border-gray-700 rounded-lg p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                          {t("dashboard.sourceIPCountsTitle")}
                        </h3>

                        <SourceIPCountsChart data={insightsData} />
                      </div>
                      <div className="flex-1 border border-gray-700 rounded-lg p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                          {t("dashboard.resourceCountsTitle")}
                        </h3>

                        <ResourceCountsChart data={insightsData} />
                      </div>
                    </div>

                    <div className="border border-gray-700 rounded-lg p-4 sm:p-6 w-full sm:max-w-md">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                        {t("dashboard.accountCountsTitle")}
                      </h3>

                      <AccountCountsChart data={insightsData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </MenuProvider>
  );
}
