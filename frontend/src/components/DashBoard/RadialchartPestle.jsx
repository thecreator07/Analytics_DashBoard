import { useMediaQuery } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

function RadialchartPestle() {
  const filteredData = useSelector((state) => state.DashBoardData.visualData);
  const mode = useSelector((state) => state.mode);
  const ismobile = useMediaQuery('(min-width:600px)');

  let PestleSet = new Set();

  filteredData &&
    filteredData.forEach((item) => {
      if (item.pestle !== "" && !PestleSet.has(item.pestle)) {
        PestleSet.add(item.pestle);
      }
    });

  const Label = [...PestleSet].map((item) =>
    item !== "" ? item : "None"
  );

  //console.log(donutLabel)

  const Series = [...PestleSet].map((item) => {
    return (
      filteredData && filteredData.filter((data) => data.pestle === item).length
    );
  });

  const options = {
    labels: Label,
    
    dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          colors: ["#fff"],
        },
      },
      title: {
        text: "Pestles",
        align: "left",
        style: {
          fontSize: "18px", // Optional: Adjust font size if needed
          color: mode === "light" ? "#000" : "#fff", // Change text color of title
        },
      },
      subtitle: {
        text: "That could impact Ecosystem",
        align: "left",
        style: {
          fontSize: "14px",
          color: mode === "light" ? "#000" : "#fff", // Change text color of title
        },
      },
      legend: {
        show:!ismobile?false: true,
      },
      stroke: {
        show: false,
        width: 0,
        colors: ["transparent"],
      }
  };

  return (
    <Chart
      type="pie"
      options={options}
      series={Series}
      height={"100%"}
    />
  );
}

export default RadialchartPestle;
