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

import insightsData from "../../../data/insights_cloudtrail.json";

export default function DashboardPage() {
  const { t } = useTranslation("dashboard");
  return (
    <MenuProvider>
      <div className="relative">
        <Navbar />
        <div className="bg-[#0d0e12] min-h-screen w-full">
          <div className="">
            <div
              className="px-8 relative flex flex-col  w-full text-[#d5d7db]"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              <div className="container xl:px-4 px-8 relative mt-8 z-10 mb-[154px] w-full">
                <div className="flex flex-col">
                  <div className="flex flex-col gap-10 mt-[72px] ">
                    <div>
                      <h1 className="text-[40px] font-bold">Dashboard - 18/07/2025</h1>
                    </div>
                    <div className="border border-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-white mb-4">
                        {t("dashboard.commonEventsTitle")}
                      </h3>

                      <EventCountsChart data={insightsData} />
                    </div>

                    <div className="flex flex-row w-full gap-6">
                      <div className="flex-1 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-white mb-4">
                          {t("dashboard.sourceIPCountsTitle")}
                        </h3>

                        <SourceIPCountsChart data={insightsData} />
                      </div>
                      <div className="flex-1 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-white mb-4">
                          {t("dashboard.resourceCountsTitle")}
                        </h3>

                        <ResourceCountsChart data={insightsData} />
                      </div>
                    </div>

                    <div className="border border-gray-700 rounded-lg p-6 max-w-md">
                      <h3 className="text-lg font-bold text-white mb-4">
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
