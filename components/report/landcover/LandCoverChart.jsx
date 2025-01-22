"use client";
import React, { useEffect, useState } from "react";
import Highcharts from "@/utils/highcharts-setup";
import HighchartsReact from "highcharts-react-official";
import { landcoverService } from "@/services";
import { Typography } from "@mui/material";

const LandCoverChart = ({ chartParams, contentType }) => {
  const { areaType, areaId, refLow, refHigh, studyLow, studyHigh } = chartParams || {};
  const [data, setData] = useState({});
  const [landcoverText, setLandcoverText] = useState("");
  const [error, setError] = useState(null);

  const fetchChartData = async () => {
    try {
      const params = {
        area_type: areaType,
        area_id: areaId,
        start_year: refLow,
        end_year: studyHigh,
        lc_type: "all",
      };
      const fetchData = await landcoverService.getChart(params);
      const period1Data = filterData(fetchData.data, refLow, refHigh);
      const period2Data = filterData(fetchData.data, studyLow, studyHigh);
      setData({ period1: period1Data, period2: period2Data });
      setError(null);
    } catch (error) {
      setError("Failed to load chart data.");
    }
  };

  const filterData = (data, startYear, endYear) => {
    const filteredData = {};
    for (let year = startYear; year <= endYear; year++) {
      if (data.hasOwnProperty(year.toString())) {
        filteredData[year] = data[year];
      }
    }
    return filteredData;
  };

  const colors = {
    built: "#E600A9",
    mangrove: "#FFFF00",
    otherPlantation: "#c49963",
    water: "#004DA8",
    shrub: "#89CD66",
    rice: "#fefdbd",
    cropland: "#FFD37F",
    grass: "#D7C29E",
    evergreen: "#267300",
    deciduous: "#71a405",
    wetland: "#86d8dc",
    rubber: "#AAFF00",
    floodedForest: "#b3d59f",
    semi: "#38A800",
    village: "#A900E6",
    others: "#f0f8ff",
  };

  // Generate text summary for the data
  const generateText = (lcChartData) => {
    if (lcChartData && lcChartData.period1 && lcChartData.period2) {
      const dataPeriod2 = lcChartData.period2;
      const years = Object.keys(dataPeriod2);
      const startYear = years[0];
      const endYear = years[years.length - 1];

      // Calculate agriculture land and urban area data
      const agricultureLandStart = dataPeriod2[startYear]["cropland"] + dataPeriod2[startYear]["rice"] || 0;
      const agricultureLandEnd = dataPeriod2[endYear]["cropland"] + dataPeriod2[endYear]["rice"] || 0;
      const agricultureChange = agricultureLandEnd - agricultureLandStart;
      let agriculturePercentageChange = 0;
      let agricultureText = `Agricultural land including all crop types (cropland and rice) have expanded to cover ${agricultureLandEnd.toLocaleString()} ha.`;
      if (agricultureLandStart > 0) {
        agriculturePercentageChange = (agricultureChange / agricultureLandStart) * 100;
        agricultureText = `Agricultural land including all crop types (cropland and rice) have changed from ${agricultureLandStart.toLocaleString()} ha to ${agricultureLandEnd.toLocaleString()} ha, 
        equivalent to ${agriculturePercentageChange.toFixed(2)}% of its land area.`;
      }


      const urbanAreasStart = dataPeriod2[startYear]["built"] + dataPeriod2[startYear]["village"] || 0;
      const urbanAreasEnd = dataPeriod2[endYear]["built"] + dataPeriod2[endYear]["village"] || 0;
      const urbanChange = urbanAreasEnd - urbanAreasStart || 0;
      let urbanPercentageChange = 0;
      const changeDirection = urbanChange > 0 ? "expansion" : "decrease";
      let urbanText = `Urban areas (built-up and village class) have developed to cover ${urbanAreasEnd.toLocaleString()} ha.`;
      if (urbanAreasStart > 0) {
        urbanPercentageChange = (urbanChange / urbanAreasStart) * 100;
        urbanText = `Urban areas (built-up and village class) have changed from ${urbanAreasStart.toLocaleString()} ha to ${urbanAreasEnd.toLocaleString()} ha, equivalent to ${urbanPercentageChange.toFixed(2)}% ${changeDirection} during the measurement period.`;
      }

      const paragraph = `Interactive charts and maps below summarize land cover change in ${areaId} in baseline period (${refLow} to ${refHigh}) and evaluation period (${studyLow} to ${studyHigh}).<br /> <br />
      In the period ${startYear} - ${endYear}, ${agricultureText}<br />${urbanText}`;
    
      setLandcoverText(paragraph);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [areaType, areaId, refLow, refHigh, studyLow, studyHigh]);

  useEffect(() => {
    if (data.period1 && data.period2) {
      generateText(data);
    }
  }, [data]);

  const generateChartOptions = (dataPeriod) => {
    const categories = dataPeriod ? Object.keys(dataPeriod) : [];
    const firstKey = categories.length > 0 ? categories[0] : null;

    return {
      chart: {
        type: "column",
        marginRight: 40,
      },
      title: false,
      legend: false,
      xAxis: {
        categories: categories,
        crosshair: true,
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yAxis: {
        title: {
          text: null,
        },
        labels: {
          formatter: function () {
            return `${this.value / 1000000}Mha`;
          },
          style: {
            fontSize: "12px",
          },
        },
      },
      plotOptions: {
        column: {
          stacking: "normal",
          pointWidth: 15,
          borderWidth: 0,
        },
      },
      series: firstKey
        ? Object.keys(dataPeriod[firstKey] || {}).map((category) => ({
            name: category,
            data: categories.map((year) => (dataPeriod[year]?.[category] || 0)),
            color: colors[category],
          }))
        : [],
      credits: {
        enabled: false,
      },
      exporting: false,
    };
  };

  const renderDynamicContent = () => {
    if (error) return <p>{error}</p>;
    switch (contentType) {
      case "baseline":
        return (
            <div>
                <Typography variant='body1' p={1} sx={{ fontWeight: 'bold' }}>Land cover for baseline period ({refLow} - {refHigh})</Typography>
                <HighchartsReact highcharts={Highcharts} options={generateChartOptions(data.period1)} />
            </div>
        );
      case "measure":
        return (
            <div>
                <Typography variant='body1' p={1} sx={{ fontWeight: 'bold' }}>Land cover for evaluation period ({studyLow} - {studyHigh})</Typography>
                <HighchartsReact highcharts={Highcharts} options={generateChartOptions(data.period2)} />
            </div>
        );
      case "text":
        return landcoverText ? <div dangerouslySetInnerHTML={{ __html: landcoverText }} /> : <p>Loading text...</p>;
      default:
        return <p>No content available.</p>;
    }
  };

  return <div>{renderDynamicContent()}</div>;
};

export default React.memo(LandCoverChart);
