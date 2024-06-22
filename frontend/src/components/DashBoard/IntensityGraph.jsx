import { useMediaQuery } from "@mui/material";
import { useContext } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const IntensityGraph = () => {
  const ismobile = useMediaQuery("(min-width:600px)");
  const Filterdata = useSelector((state) => state.DashBoardData.visualData); //console.log(state.userData);
  console.log(Filterdata);
  const mode = useSelector((state) => state.mode);

  let sectors = new Set();
  Filterdata &&
    Filterdata.forEach((item) => {
      if (item.sector !== "" && !sectors.has(item.sector)) {
        sectors.add(item.sector);
      }
    });
  console.log(sectors);
  let endyear = new Set();

  Filterdata &&
    Filterdata.forEach((item) => {
      if (item.end_year !== "" && !endyear.has(item.end_year)) {
        endyear.add(item.end_year);
      }
    });

  const endYearData = [...endyear]
    .filter((i) => i !== null)
    .sort((a, b) => a - b);
  // console.log(endYearData);

  const intensityData = endYearData.map(
    (item) =>
      Filterdata &&
      Filterdata.filter((data) => data.end_year === item).reduce(
        (acc, curr) => {
          const intensity = parseFloat(curr.intensity) || 0;
          return acc + intensity;
        },
        100
      )
  );

  const likelihoodData = endYearData.map(
    (item) =>
      Filterdata &&
      Filterdata.filter((data) => data.end_year === item).reduce(
        (acc, curr) => {
          const likelihood = parseFloat(curr.likelihood) || 0;
          return acc + likelihood;
        },
        100
      )
  );
  const relevenceData = endYearData.map(
    (item) =>
      Filterdata &&
      Filterdata.filter((data) => data.end_year === item).reduce(
        (acc, curr) => {
          const relevance = parseFloat(curr.relevance) || 0;
          return acc + relevance;
        },
        100
      )
  );
  console.log(ismobile);
  const options = {
    chart: {
      id: "Intensity",
      type: "area",
      stacked: false,
      theme: mode === "light" ? "light" : "dark",
      toolbar: {
        show: !ismobile ? false: true,
        style: {
          // fontSize: "20px",
          color: "#fff",
        },
      },
    },

    dataLabels: {
      enabled: false,
      // style: {
      //   color,
      // },
    },
    title: {
      text: "Analysis of Likelihood,Intensity & Relevance",
      align: "left",
      style: {
        fontSize: "18px", // Optional: Adjust font size if needed
        color: mode === "light" ? "#000" : "#fff", // Change text color of title
      },
    },
    subtitle: {
      text: "Based On End-Year",
      align: "left",
      style: {
        fontSize: "14px",
        color: mode === "light" ? "#000" : "#fff", // Change text color of title
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#AA77FF", "#AABFEE"],
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: mode === "light" ? "light" : "dark",
      // colors: mode === "light" ? "#5733FF" : "#000",
    },
    xaxis: {
      categories: endYearData,
      show: true,
      labels: {
        show: ismobile ? true : false,
        style: {
          colors: mode === "light" ? "#000" : "#fff",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: mode === "light" ? "#000" : "#fff",
        },
      },
    },
  };

  const series = [
    {
      name: "Intensity",
      data: intensityData,
    },
    {
      name: "likelihood",
      data: likelihoodData,
    },
    {
      name: "Relevance",
      data: relevenceData,
    },
  ];
  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width="100%"
      height={"100%"}
    />
  );
};

export default IntensityGraph;
