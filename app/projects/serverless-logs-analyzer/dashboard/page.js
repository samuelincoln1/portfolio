import React from "react";
import Navbar from "../../../components/util/ProjectsNavbar";
import Footer from "../Footer";
import { MenuProvider } from "../../../context/MenuContext";
import EventCountsChart from "./EventCountsChart.js";
import ResourceCountsChart from "./ResourceCountsChart.js";
import AccountCountsChart from "./AccountCountsChart.js";
import SourceIPCountsChart from "./SourceIPCountsChart.js";

import insightsData from "../../../data/insights_cloudtrail.json";

export default function DashboardPage() {
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
                      <h1 className="text-[40px] font-bold">Dashboard</h1>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">
                        Eventos mais frequentes
                      </h3>
                      <div className="bg-white rounded-lg p-4">
                        <EventCountsChart data={insightsData} />
                      </div>
                    </div>

                    <div className="mt-5">
                      <h3 className="text-lg font-bold text-white mb-4">
                        Principais IPs de origem
                      </h3>
                      <div className="bg-white rounded-lg p-4">
                        <SourceIPCountsChart data={insightsData} />
                      </div>
                    </div>
                    <div className="flex flex-row w-full">
                      <div className="flex-1 mr-6">
                        <h3 className="text-lg font-bold text-white mb-4">
                          Contagem de recursos por tipo
                        </h3>
                        
                          <ResourceCountsChart data={insightsData} />
                      
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-4">
                          Contagem de contas por tipo
                        </h3>
                        <div className="bg-white rounded-lg p-4">
                          <AccountCountsChart data={insightsData} />
                        </div>
                      </div>
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
