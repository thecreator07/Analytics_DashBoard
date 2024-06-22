// icons
import { GrGroup } from "react-icons/gr";
import { LuPackageCheck } from "react-icons/lu";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaEarthAsia } from "react-icons/fa6";
import { TbFilter } from "react-icons/tb";
import { useEffect, useState } from "react";
// import IntensityGraph from "../components/IntensityGraph";
// import PiechartPESTLE from "../components/PiechartPESTLE";
// import CountryGraph from "../components/CountryGraph";
// import DonutRegion from "../components/DonutRegion";
// import { UserContext } from "../context/userContext";
// import { fetc, fetchUserData } from "../api/userAPI"
// import { SECTOR_FILTER_VALUES } from "../utils/constants";
import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData, fetchSearchData } from "../Api/fetchApi";
import { setallData, setDashBoardData, setsearchData } from "../state/sliceReducer";
import { SECTORS } from "../utils/constant";
import { useMediaQuery } from "@mui/material";
import { Select } from "antd";
import { useStyleRegister } from "antd/es/theme/internal";
import DashBoardCharts from "../components/DashBoard/DashBoardCharts";
// visualize
const Search = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const ismobile = useMediaQuery('(min-width:"600px")');
  const [country, setcountry] = useState("");
  const [endYear, setendYear] = useState("");
  const [pestle, setpestle] = useState("");
  const [end_year, setEndYear] = useState("");
  const [sector, setsector] = useState("");
  //   const [filter, setfilter] = useState(false);
  const [search, setsearch] = useState("");
  const mobileView = useMediaQuery("(min-width:600px)");
  console.log(mobileView);

  const fetchAndSetSearchData = async (data) => {
    try {
      const { results } = await fetchSearchData(data);
      console.log(results);
      dispatch(setsearchData({ searchData: results }));
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
  const SearchData = useSelector((state) => state.searchData);
  const getAllDAta = useSelector((state) => state.allData);
  console.log(SearchData);
  //   console.log("search", search?search:"");
  const pages=3
  const handleSearch = () => {
    fetchAndSetSearchData({
      query: search||null,
      page: pages||1,
      fetch: {
        sector: sector || "",
        country: country || "",
        pestle: pestle || "",
        end_year: end_year || "",
      },
    });
  };

  const handlePestle = (e) => {
    const { value } = e.target;
    setpestle(value);
    // console.log(e);
    fetchAndSetSearchData({
      end_year: end_year || "",
      country: country || "",
      sector: sector || "",
      pestle: value,
    });
  };
  const handleSector = (e) => {
    setsector(e.target.value);
    setcountry("");

    setpestle("");

    setendYear("");

    fetchAndSetSearchData({
      sector: e.target.value,
      country: "",
      pestle: "",

      end_year: "",
    });
  };
  const handlecountry = (e) => {
    setcountry(e.target.value);
    fetchAndSetSearchData({
      sector: sector || "",
      country: e.target.value,
      pestle: pestle || "",

      end_year: endYear || "",
    });
  };

  const handleEndYear = (e) => {
    setEndYear(e.target.value);
    fetchAndSetSearchData({
      sector: sector || "",
      country: country || "",
      pestle: pestle || "",

      end_year: e.target.value,
    });
  };

  //   const handlefilterButton = (e) => {
  //     e.preventDefault();
  //     console.log(filter);
  //     if (filter) {
  //       setsector("");
  //       setcountry("");

  //       setpestle("");

  //       setendYear("");

  //       fetchAndSetSearchData({
  //         sector: e.target.value,
  //         country: "",
  //         pestle: "",

  //         end_year: "",
  //       });
  //     }
  //     setfilter(!filter);
  //   };
  //   const Filterdata = useSelector((state) => state.DashBoardData.visualData);

  // console.log("Filterdata", Filterdata);
  // let sectorData = new Set()
  let pestleData = new Set();
  let countryData = new Set();
  let endYearData = new Set();
  let sectorData = new Set();
  if (getAllDAta) {
    getAllDAta.map((value) => {
      if (value.sector !== "" && !sectorData.has(value))
        sectorData.add(value.sector);
      if (value.pestle !== "" && !pestleData.has(value))
        pestleData.add(value.pestle);
      if (value.country !== "" && !countryData.has(value))
        countryData.add(value.country);
      if (value.end_year !== "" && !endYearData.has(value))
        endYearData.add(value.end_year);
    });
  }

  const pestleArr = [...pestleData];
  const countryArr = [...countryData];
  const sectorArr = [...sectorData];
  const endYearArr = [...endYearData];
  // console.log("Pestle", pestleArr);
  useEffect(() => {
    fetchAndSetSearchData();
    fetchwholedata();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full p-3 md:py-4 md:p-8 h-full overflow-x-auto">
        <div className="flex gap-5">
          <input
            type="text"
            onChange={(e) => setsearch(e.target.value)}
            className="p-2.5 rounded-3xl focus:outline-none outline-none "
          />
          <button
            onClick={handleSearch}
            type="button"
            className="px-8 rounded-3xl text-base font-semibold bg-white"
          >
            search
          </button>
        </div>
        <div
          //   style={{ display: filter ? "" : "none" }}
          className="w-full flex flex-wrap py-3 gap-4 text-sm"
        >
          {sectorArr.length > 0 && (
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
              </div>
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
        </div>

        <div className="w-full">{/* <DashBoardCharts /> */}</div>
      </div>
    </div>
  );
};

export default Search;
