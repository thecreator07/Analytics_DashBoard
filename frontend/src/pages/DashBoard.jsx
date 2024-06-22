// icons
import { GrGroup } from "react-icons/gr";
import { LuPackageCheck } from "react-icons/lu";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaEarthAsia } from "react-icons/fa6";
import { TbFilter } from "react-icons/tb";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchVisualData, fetchAllData } from "../Api/fetchApi";
import { setallData, setDashBoardData } from "../state/sliceReducer";
import { SECTORS } from "../utils/constant";
import { useMediaQuery } from "@mui/material";

import DashBoardCharts from "../components/DashBoard/DashBoardCharts";
// visualize
const DashBoard = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const ismobile = useMediaQuery('(min-width:"600px")')
  const [country, setcountry] = useState("");
  const [topic, settopic] = useState("");
  const [endYear, setendYear] = useState("");
  const [source, setsource] = useState("");
  const [pestle, setpestle] = useState("");
  // const [countryFilterTerm, setCountryFilterTerm] = useState("");
  const [end_year, setEndYear] = useState("");
  const [region, setregion] = useState("");
  const [sector, setsector] = useState("");
  const [filter, setfilter] = useState(false);
  // const [endYearFilterTerm, setEndYearFilterTerm] = useState("");
  const mobileView = useMediaQuery("(min-width:600px)");
  console.log(mobileView);
  // console.log(window.location.origin);

  const fetchAndSetDashboardData = async (d) => {
    try {
      const { data, dashBoardData } = await fetchVisualData(d);
      dispatch(setDashBoardData({ listData: data, visualData: dashBoardData }));
    } catch (error) {
      console.error("Error during fetching data:", error);
    }
  };

  const fetchwholedata = async () => {
    try {
      const { totalData } = await fetchAllData();
      // console.log("totalData", totalData);
      dispatch(setallData({ allData: totalData }));
    } catch (error) {
      console.error("Error during fetching data:", error);
    }
  };
  const overAllDAta = useSelector((state) => state.allData);
  // console.log("alldata", overAllDAta);
  const result = useSelector((state) => state.DashBoardData.listData);

  // console.log(pestle);
  const handlePestle = (e) => {
    const { value } = e.target;
    setpestle(value);
    // console.log(e);
    fetchAndSetDashboardData({
      end_year: end_year || "",
      country: country || "",
      sector: sector || "",
      pestle: value,
    });
  };
  const handleSector = (e) => {
    setsector(e.target.value);
    setcountry("");
    settopic("");
    setpestle("");
    setregion("");
    setendYear("");
    setsource("");
    fetchAndSetDashboardData({
      sector: e.target.value,
      country: "",
      pestle: "",
      topic: "",
      end_year: "",
      source: "",
      region: "",
    });
  };
  const handlecountry = (e) => {
    setcountry(e.target.value);
    fetchAndSetDashboardData({
      sector: sector || "",
      country: e.target.value,
      pestle: pestle || "",
      topic: topic || "",
      end_year: endYear || "",
      source: source || "",
      region: region || "",
    });
  };
  const handletopic = (e) => {
    settopic(e.target.value);
    fetchAndSetDashboardData({
      sector: sector || "",
      country: country || "",
      pestle: pestle || "",
      topic: e.target.value,
      end_year: endYear || "",
      source: source || "",
      region: region || "",
    });
  };
  const handleEndYear = (e) => {
    setEndYear(e.target.value);
    fetchAndSetDashboardData({
      sector: sector || "",
      country: country || "",
      pestle: pestle || "",
      topic: topic || "",
      end_year: e.target.value,
      source: source || "",
      region: region || "",
    });
  };
  const handleSource = (e) => {
    setsource(e.target.value);
    fetchAndSetDashboardData({
      sector: sector || "",
      country: country || "",
      pestle: pestle || "",
      topic: topic || "",
      end_year: endYear || "",
      source: e.target.value,
      region: region || "",
    });
  };
  const handleRegion = (e) => {
    setregion(e.target.value);
    fetchAndSetDashboardData({
      sector: sector || "",
      country: country || "",
      pestle: pestle || "",
      topic: topic || "",
      end_year: endYear || "",
      source: source || "",
      region: e.target.value,
    });
  };
  const handlefilterButton = (e) => {
    e.preventDefault();
    console.log(filter);
    if (filter) {
      setsector("");
      setcountry("");
      settopic("");
      setpestle("");
      setregion("");
      setendYear("");
      setsource("");
      fetchAndSetDashboardData({
        sector: e.target.value,
        country: "",
        pestle: "",
        topic: "",
        end_year: "",
        source: "",
        region: "",
      });
    }
    setfilter(!filter);
  };
  const Filterdata = useSelector((state) => state.DashBoardData.visualData);

  // console.log("Filterdata", Filterdata);
  // let sectorData = new Set()
  let pestleData = new Set();
  let countryData = new Set();
  let topicData = new Set();
  let sourceData = new Set();
  let regionData = new Set();
  let endYearData = new Set();
  console.log(pestleData);
  if (overAllDAta) {
    overAllDAta.map((value) => {
      if (value.pestle !== "" && !pestleData.has(value))
        pestleData.add(value.pestle);
      if (value.country !== "" && !countryData.has(value))
        countryData.add(value.country);
      if (value.topic !== "" && !topicData.has(value))
        topicData.add(value.topic);
      if (value.source !== "" && !sourceData.has(value))
        sourceData.add(value.source);
      if (value.region !== "" && !regionData.has(value))
        regionData.add(value.region);
      if (value.end_year !== "" && !endYearData.has(value))
        endYearData.add(value.end_year);
    });
  }

  const pestleArr = [...pestleData];
  const countryArr = [...countryData];
  const topicArr = [...topicData];
  const sourceArr = [...sourceData];
  const regionArr = [...regionData];
  const endYearArr = [...endYearData];
  // console.log("Pestle", pestleArr);
  useEffect(() => {
    fetchAndSetDashboardData();
    fetchwholedata();

  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full p-3 md:py-4 md:p-8 h-full overflow-x-auto">
        <div
          // key={selectType.id}
          className="flex flex-col "
          style={{ width: mobileView ? "15%" : "100%" }}
        >
          <label
            className={`text-base ${
              mode === "light" ? "text-blue-700" : "text-blue-50"
            } `}
          >
            Sector
          </label>
          <div className="flex gap-4 md:gap-16 ">
            <select
              className="neomorph bg-inherit h-full w-full md:w-auto focus:outline-none outline-none border  p-2.5 rounded-lg text-sm cursor-pointer"
              value={sector}
              onChange={handleSector}
              placeholder="Sector"
            >
              {SECTORS.map((i, index) => (
                <option key={index} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <button
              className="neomorph bg-inherit h-full hover:bg-slate-300 w-full md:w-auto focus:outline-none outline-none border px-4 py-2 rounded-lg text-base font-semibold cursor-pointer"
              onClick={handlefilterButton}
            >
              {filter ? "Remove" : "Add"}&nbsp;Filters
            </button>
          </div>
        </div>
        <div
          style={{ display: filter ? "" : "none" }}
          className="w-full flex flex-wrap py-3 gap-4 text-sm"
        >
          {countryArr.length > 0 && (
            <div
              className="flex flex-col "
              style={{ width: mobileView ? "15%" : "100%" }}
            >
              <label
                className={`text-base ${
                  mode === "light" ? "text-blue-700" : "text-blue-50"
                } `}
              >
                Country
              </label>
              <select
                className="neomorph bg-inherit h-full w-full md:w-auto focus:outline-none outline-none border  p-2.5 rounded-lg text-sm cursor-pointer"
                value={country}
                onChange={handlecountry}
                placeholder="Pestles"
              >
                {countryArr.map((i, index) => (
                  <option key={index} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          )}

          {topicArr.length > 0 && (
            <div
              className="flex flex-col "
              style={{ width: mobileView ? "15%" : "100%" }}
            >
              <label
                className={`text-base ${
                  mode === "light" ? "text-blue-700" : "text-blue-50"
                } `}
              >
                Topic
              </label>
              <select
                className="neomorph bg-inherit h-full w-full md:w-auto focus:outline-none outline-none border  p-2.5 rounded-lg text-sm cursor-pointer"
                value={topic}
                onChange={handletopic}
                placeholder="Pestles"
              >
                {topicArr.map((i, index) => (
                  <option key={index} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          )}

          {endYearArr.length > 0 && (
            <div
              className="flex flex-col "
              style={{ width: mobileView ? "15%" : "100%" }}
            >
              <label
                className={`text-base ${
                  mode === "light" ? "text-blue-700" : "text-blue-50"
                } `}
              >
                EndYear
              </label>
              <select
                className="neomorph bg-inherit h-full w-full md:w-auto focus:outline-none outline-none border  p-2.5 rounded-lg text-sm cursor-pointer"
                value={endYear}
                onChange={handleEndYear}
                placeholder="Pestles"
              >
                {endYearArr.map((i, index) => (
                  <option key={index} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          )}

          {sourceArr.length > 0 && (
            <div
              className="flex flex-col "
              style={{ width: mobileView ? "15%" : "100%" }}
            >
              <label
                className={`text-base ${
                  mode === "light" ? "text-blue-700" : "text-blue-50"
                } `}
              >
                Source
              </label>
              <select
                className="neomorph bg-inherit h-full w-full md:w-auto focus:outline-none outline-none border  p-2.5 rounded-lg text-sm cursor-pointer"
                value={source}
                onChange={handleSource}
                placeholder="Pestles"
              >
                {sourceArr.map((i, index) => (
                  <option key={index} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          )}
          {regionArr.length > 0 && (
            <div
              className="flex flex-col "
              style={{ width: mobileView ? "15%" : "100%" }}
            >
              <label
                className={`text-base ${
                  mode === "light" ? "text-blue-700" : "text-blue-50"
                } `}
              >
                Region
              </label>
              <select
                className="neomorph bg-inherit h-full w-full md:w-auto focus:outline-none outline-none border  p-2.5 rounded-lg text-sm cursor-pointer"
                value={region}
                onChange={handleRegion}
                placeholder="Pestles"
              >
                {regionArr.map((i, index) => (
                  <option key={index} value={i}>
                    `${i}`
                  </option>
                ))}
              </select>
            </div>
          )}
          {pestleArr.length > 0 && (
            <div
              className="flex flex-col "
              style={{ width: mobileView ? "15%" : "100%" }}
            >
              <label
                className={`text-base ${
                  mode === "light" ? "text-blue-700" : "text-blue-50"
                } `}
              >
                Pestle
              </label>
              <select
                className="neomorph bg-inherit h-full w-full md:w-auto focus:outline-none outline-none border  p-2.5 rounded-lg text-sm cursor-pointer"
                value={pestle}
                onChange={handlePestle}
                placeholder="Pestles"
              >
                {pestleArr.map((i, index) => (
                  <option key={index} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="w-full flex gap-3 flex-col md:flex-row mb-6 mt-3">
          {result &&
            result.map((value, index) => (
              <div
                key={index}
                className={`w-full md:w-auto md:flex-1 p-2.5 rounded-md shadow border-gray-300  h-auto ${
                  mode === "light" ? "bg-white" : "bg-slate-800"
                } items-center relative overflow-hidden`}
              >
                <div
                  style={{ color: mode === "light" ? "black" : "white" }}
                  className=" w-fit flex items-center justify-center text-black"
                >
                  {value.id === 1 && <LuPackageCheck size={35} />}
                  {value.id === 2 && <BiSolidShoppingBags size={35} />}
                  {value.id === 3 && <GrGroup size={35} />}
                  {value.id === 4 && <FaEarthAsia size={35} />}
                </div>
                <div className="w-fit ">
                  <p
                    className={`text-lg font-semibold ${
                      mode === "light" ? "text-gray-700" : "text-gray-200"
                    }`}
                  >
                    {value.value.length}
                  </p>
                  <p
                    className={`text-xl font-semibold ${
                      mode === "light" ? "text-gray-800" : "text-gray-50"
                    }`}
                  >
                    Total {value.name}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="w-full">
          <DashBoardCharts />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
