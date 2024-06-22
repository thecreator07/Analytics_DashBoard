import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useSelector } from "react-redux";

const CountryChart = () => {
  const Filterdata = useSelector((state) => state.DashBoardData.visualData);
  const mode = useSelector((state) => state.mode);
  const [data, setData] = useState([["Country", "Name"]]);

  const options = {
    region: "world",
    colorAxis: {
      colors: ["#BEADFA", "#BEADFA"],
    },
    datalessRegionColor: "#80FF80",
    defaultColor: "#414141",
    backgroundColor: mode === "dark" ? "" : "#fff",
  };

  useEffect(() => {
    let countrySet = new Set();

    Filterdata &&
      Filterdata.forEach((item) => {
        if (!countrySet.has(item.country)) {
          countrySet.add(item.country);
        }
      });

    const countryArr = [...countrySet];

    countryArr.forEach((item) => {
      setData((d) => [...d, [item, item]]);
    });

    //console.log(data);
  }, [Filterdata]);

  return (
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
          },
        },
      ]}
      chartType="GeoChart"
      data={data}
      width="100%"
      options={options}
    />
  );
};

export default CountryChart;
