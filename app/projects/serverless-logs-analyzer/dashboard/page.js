import React from "react";
import Navbar from "../../../components/util/ProjectsNavbar";
import Footer from "../Footer";
import { MenuProvider } from "../../../context/MenuContext";
import EventCountsChart from "./EventCountsChart.js";
import insightsData from "../../../data/insights_cloudtrail.json";

export default function DashboardPage() {
  return (
    <MenuProvider>
      <div className="relative">
        <Navbar />
        <div className="bg-[#0d0e12] min-h-screen w-full">
          <div className="">
            <div
              className="px-8 relative flex flex-col max-w-[824px] w-full text-[#d5d7db]"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              <div className="container  xl:px-4 px-8 relative mt-8 z-10 mb-[154px]">
                <div className="flex flex-col">
                  <div className="flex flex-col gap-10 mt-[72px] ">
                    <div>
                      <h1 className="text-[40px] font-bold">Dashboard</h1>
                    </div>
                    <h3 className="text-lg font-bold text-white">Eventos mais frequentes</h3>
                    <div className="bg-white rounded-lg p-4">
                   
                      <EventCountsChart data={insightsData} />
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
