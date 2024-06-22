import React from "react";
import IntensityGraph from "./IntensityGraph";
import { useSelector } from "react-redux";
import DonutChartTopic from "./DonutchartTopic";
import RadialchartPestle from "./RadialchartPestle";
import CountryChart from "./CountryChart";
import RegionPolarChart from "./RegionPolarChart";

function DashBoardCharts() {
  const mode = useSelector((state) => state.mode);
  return (
    <>
      <div className="w-full flex flex-col mt-8 gap-6">
        <div
          className={`w-full h-[500px] graphmorph lg:w-full ${
            mode === "light" ? "bg-white text-black" : "bg-slate-800 text-white"
          } rounded-xl border border-[#e5d3ff] p-3 shadow-md`}
        >
          <IntensityGraph />
        </div>
        <div className="flex flex-col lg:flex-row  gap-6">
          <div
            className={`w-full h-[400px] lg:h-[500px] lg:w-1/2 ${
              mode === "light"
                ? "bg-white text-black"
                : "bg-slate-800 text-white"
            } rounded-xl border border-[#e5d3ff] p-3 shadow-md`}
          >
            <div className="w-full h-full mt-3">
              <DonutChartTopic />
            </div>
          </div>
          <div
            className={`w-full h-[400px]  lg:h-[500px] lg:w-1/2 ${
              mode === "light"
                ? "bg-white text-black"
                : "bg-slate-800 text-white"
            } rounded-xl border border-[#e5d3ff] p-3 shadow-md`}
          >
            <div className="w-full h-full mt-3">
              <RadialchartPestle />
            </div>
          </div>
        </div>

        <div className="flex  flex-col lg:flex-row  gap-6">
          <div
            className={`w-full lg:w-5/12 h-[400px] lg:h-[500px]  ${
              mode === "light"
                ? "bg-white text-black"
                : "bg-slate-800 text-white"
            } rounded-xl border border-[#e5d3ff] p-3 shadow-md`}
          >
            <div className="w-full h-full mt-3">
              <RegionPolarChart />
            </div>
          </div>
          <div
            className={`w-full  h-[400px] lg:w-7/12 lg:h-[500px]  ${
              mode === "light"
                ? "bg-white text-black"
                : "bg-slate-800 text-white"
            } rounded-xl border border-[#e5d3ff] p-3 shadow-md`}
          >
            <div className="w-full h-full mt-3">
            <h1 className="font-semibold text-lg">Country</h1>
            <p
              className={`${
                mode === "light" ? "text-gray-500" : "text-gray-200"
              } text-sm`}
            >
              Country Associated With The Insight
            </p>
              <CountryChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoardCharts;
