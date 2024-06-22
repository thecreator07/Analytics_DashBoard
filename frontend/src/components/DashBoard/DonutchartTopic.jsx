import { useMediaQuery } from "@mui/material";
import { useContext } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const DonutChartTopic = () => {
  const filteredData = useSelector((state) => state.DashBoardData.visualData);
  const mode = useSelector((state) => state.mode);
  const ismobile=useMediaQuery('(min-width:600px)')
  let topicSet = new Set();

  filteredData &&
    filteredData.forEach((item) => {
      if (item.topic !== "" && !topicSet.has(item.topic)) {
        topicSet.add(item.topic);
      }
    });

  const donutLabel = [...topicSet].map((item) => (item !== "" ? item : "None"));

  //console.log(donutLabel)

  const pieSeries = [...topicSet].map((item) => {
    return (
      filteredData && filteredData.filter((data) => data.topic === item).length
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
      show:!ismobile? false:true,
      colors:mode === "light" ? "#000" : "#fff",
    //   position:"bottom",
      style: {
        fontSize: "14px",
        // color: mode === "light" ? "#000" : "#fff",
      },
    },
    title: {
      text: "Topics",
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
    <Chart type="donut" options={options} series={pieSeries} height={"100%"} />
  );
};

export default DonutChartTopic;
