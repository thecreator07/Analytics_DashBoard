// icons

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllData, fetchSearchData } from "../Api/fetchApi";
import { setallData, setsearchData } from "../state/sliceReducer";
import { SECTORS } from "../utils/constant";
import { Pagination, useMediaQuery } from "@mui/material";
import AnalyticTable from "../components/Search/AnalyticTable";

// visualize
const Search = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const ismobile = useMediaQuery('(min-width:"600px")');
  const [pageChange, setPageChange] = useState(1);
  const [country, setcountry] = useState("");
  const [endYear, setendYear] = useState("");
  const [pestle, setpestle] = useState("");
  //   const [end_year, setEndYear] = useState("");
  const [sector, setsector] = useState("");
  //   const [filter, setfilter] = useState(false);
  const [search, setsearch] = useState("");
  const mobileView = useMediaQuery("(min-width:600px)");
  console.log(mobileView);

  const fetchAndSetSearchData = async (data) => {
    try {
      const { results } = await fetchSearchData(data);
      console.log("results", results);
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
  console.log("searchData", SearchData);
  //   console.log("search", search?search:"");
  let page;
  const handleSearch = () => {
    fetchAndSetSearchData({
      query: search || "",
      page: pageChange || 1,
      fetch: {
        sector: sector || "",
        country: country || "",
        pestle: pestle || "",
        end_year: parseInt(endYear) || "",
      },
    });
  };

  const handleFilter = () => {
    fetchAndSetSearchData({
      query: search || "",
      page: pageChange || 1,
      fetch: {
        sector: sector || "",
        country: country || "",
        pestle: pestle || "",
        end_year: parseInt(endYear) || "",
      },
    });
  };
  const handlePageChange = (e, value) => {
    setPageChange(value);
    fetchAndSetSearchData({
      query: search || "",
      page: value || 1,
      fetch: {
        sector: sector || "",
        country: country || "",
        pestle: pestle || "",
        end_year: parseInt(endYear) || "",
      },
    });
  };

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
  console.log(endYearArr);
  useEffect(() => {
    handleSearch();
    // fetchAndSetSearchData();
    fetchwholedata();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full p-3 md:py-4 md:p-8 h-full overflow-x-auto">
        <div className="flex md:flex-row flex-col gap-5">
          <input
            style={{
              color: mode === "light" ? "black" : "white",
              backgroundColor: mode === "light" ? "white" : "black",
            }}
            type="text"
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Energy oil China"
            className="px-4 rounded-3xl border focus:outline-none outline-none "
          />
          <button
            onClick={handleSearch}
            type="button"
            className="px-8 py-2.5 rounded-3xl text-base font-semibold bg-white"
          >
            Search
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
                  style={{
                    color: mode === "light" ? "black" : "white",
                    backgroundColor: mode === "light" ? "white" : "black",
                  }}
                  className="h-full w-full md:w-auto focus:outline-none outline-none border  p-2.5 rounded-lg text-sm cursor-pointer"
                  value={sector}
                  onChange={(e) => setsector(e.target.value)}
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
                style={{
                  color: mode === "light" ? "black" : "white",
                  backgroundColor: mode === "light" ? "white" : "black",
                }}
                className="h-full w-full md:w-auto focus:outline-none outline-none border  p-2.5 rounded-lg text-sm cursor-pointer"
                value={pestle}
                onChange={(e) => setpestle(e.target.value)}
                placeholder="Pestle"
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
                style={{
                  color: mode === "light" ? "black" : "white",
                  backgroundColor: mode === "light" ? "white" : "black",
                }}
                className=" h-full w-full md:w-auto focus:outline-none outline-none border  p-2.5 rounded-lg text-sm cursor-pointer"
                value={country}
                onChange={(e) => setcountry(e.target.value)}
                placeholder="Country"
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
                style={{
                  color: mode === "light" ? "black" : "white",
                  backgroundColor: mode === "light" ? "white" : "black",
                }}
                className=" h-full w-full md:w-auto focus:outline-none outline-none border  p-2.5 rounded-lg text-sm cursor-pointer"
                value={endYear}
                onChange={(e) => setendYear(e.target.value)}
                placeholder="EndYear"
              >
                {endYearArr.map((i, index) => (
                  <option key={index} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex flex-col w-full md:w-auto justify-end">
            <button
              onClick={handleFilter}
              type="button"
              className="px-8 py-2.5 rounded-lg text-base font-semibold bg-white w-full md:w-auto"
            >
              filter
            </button>
          </div>
        </div>

        <div className="w-full">
          <AnalyticTable page={page} />
          <div className="w-full mt-3 p-3 ">
            <Pagination
              color="secondary"
              showFirstButton
              showLastButton
              count={SearchData?.totalPages ? SearchData?.totalPages : 0}
              variant="outlined"
              shape="rounded"
              page={SearchData?.page ? SearchData?.page : 0}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
