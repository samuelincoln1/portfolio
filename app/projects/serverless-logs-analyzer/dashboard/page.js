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
  const { t } = useTranslation("analyzer");
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
                        {t("analyzer.dashboardPage.title")}
                      </h1>
                    </div>
                    <p className="text-sm sm:text-base">
                      {t("analyzer.dashboardPage.description1")}{" "}
                      <span className="text-[#ff4271]">849 {t("analyzer.dashboardPage.totalEvents")}</span>{" "}
                      {t("analyzer.dashboardPage.description2")}{" "}
                      <span className="text-[#ff4271]">us-east-1</span>{" "}
                      {t("analyzer.dashboardPage.description3")}{" "}
                      <span className="text-[#ff4271]">API {t("analyzer.dashboardPage.calls")} (847)</span>.
                    </p>
                    <p className="text-sm sm:text-base">
                      {t("analyzer.dashboardPage.description5")}{" "}
                      <span className="text-[#ff4271]">
                        DescribeAlarms (86 {t("analyzer.dashboardPage.calls")})
                      </span>{" "}
                      ,{" "}
                      <span className="text-[#ff4271]">
                        AssumeRole (43 {t("analyzer.dashboardPage.calls")})
                      </span>{" "}
                      , {t("analyzer.dashboardPage.description6")}{" "}
                      <span className="text-[#ff4271]">Decrypt (44 {t("analyzer.dashboardPage.calls")})</span>{" "}
                      , {t("analyzer.dashboardPage.description7")}{" "}
                      <span className="text-[#ff4271]">
                        {" "}
                        IAM Users (475 {t("analyzer.dashboardPage.events")})
                      </span>{" "}
                      {t("analyzer.dashboardPage.description8")}{" "}
                      <span className="text-[#ff4271]">Root (271 {t("analyzer.dashboardPage.events")})</span>,{" "}
                      {t("analyzer.dashboardPage.description9")}{" "}
                      <span className="text-[#ff4271]">177.55.229.104</span>.{" "}
                      {t("analyzer.dashboardPage.description10")}{" "}
                      <span className="text-[#ff4271]">
                        S3 buckets (105 {t("analyzer.dashboardPage.operations")})
                      </span>{" "}  
                      {t("analyzer.dashboardPage.description11")}{" "}
                      <span className="text-[#ff4271]">
                        IAM role activities (43 {t("analyzer.dashboardPage.operations")}) 
                      </span>
                      , {t("analyzer.dashboardPage.description12")}
                    </p>
                    <div className="border border-gray-700 rounded-lg p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                        {t("analyzer.dashboardPage.commonEventsTitle")}
                      </h3>

                      <EventCountsChart data={insightsData} />
                    </div>

                    <div className="flex flex-col lg:flex-row w-full gap-6">
                      <div className="flex-1 border border-gray-700 rounded-lg p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                          {t("analyzer.dashboardPage.sourceIPsTitle")}
                        </h3>

                        <SourceIPCountsChart data={insightsData} />
                      </div>
                      <div className="flex-1 border border-gray-700 rounded-lg p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                          {t("analyzer.dashboardPage.resourceCountsTitle")}
                        </h3>

                        <ResourceCountsChart data={insightsData} />
                      </div>
                    </div>

                    <div className="border border-gray-700 rounded-lg p-4 sm:p-6 w-full sm:max-w-md">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                        {t("analyzer.dashboardPage.activityCountsTitle")}
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
