import { useMediaQuery } from "@mui/material";
import { useContext } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const RegionPolarChart = () => {
  const filteredData = useSelector((state) => state.DashBoardData.visualData);
  const mode = useSelector((state) => state.mode);
  const ismobile = useMediaQuery('(min-width:600px)');
  let regionSet = new Set();

  filteredData &&
    filteredData.forEach((item) => {
      if (item.region !== "" && !regionSet.has(item.region)) {
        regionSet.add(item.region);
      }
    });

  const donutLabel = [...regionSet].map((item) =>
    item !== "" ? item : "None"
  );


  const pieSeries = [...regionSet].map((item) => {
    return (
      filteredData && filteredData.filter((data) => data.region === item).length
    );
  });

  const options = {
    labels: donutLabel,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    legend: {
      show: !ismobile ? false : true,
      colors: mode === "light" ? "#000" : "#fff",
    //   position:"bottom",
      style: {
        fontSize: "14px",
        // color: mode === "light" ? "#000" : "#fff",
      },
    },
    title: {
      text: "Regions",
      align: "left",
      style: {
        fontSize: "18px",
        color: mode === "light" ? "#000" : "#fff",
      },
    },
    subtitle: {
      text: "Which may influence & Empower Insight",
      align: "left",
      style: {
        fontSize: "14px",
        color: mode === "light" ? "#000" : "#fff",
      },
    },
    stroke: {
      show: false,
      width: 0,
      colors: ["transparent"],
    },
  };

  return (
    <Chart
      type="polarArea"
      options={options}
      series={pieSeries}
      height={"100%"}
    />
  );
};

export default RegionPolarChart;
