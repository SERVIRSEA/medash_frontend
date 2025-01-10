import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import Highcharts from '@/utils/highcharts-setup'
import HighchartsReact from 'highcharts-react-official';
import {
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    riceChartAtom,
    riceChartDataLoadingAtom,
    updateTriggerAtom,
    maxRetryAttemptsAtom,
    riceAreaTextAtom,
    areaNameAtom,
    geojsonDataAtom
} from '@/state/atoms';
import LoadingCard from '../loaders/LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';
import { riceService } from '@/services';

const RiceLineChart = () => {
    const [geojsonData] = useAtom(geojsonDataAtom);
    const [chartData, setChartData] = useAtom(riceChartAtom);
    const [loading, setLoading] = useAtom(riceChartDataLoadingAtom);
    const [error, setError] = useState(null);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    const [updateTrigger, setUpdateTrigger] = useAtom(updateTriggerAtom);
    const [attempts, setAttempts] = useState(0);
    const [RetryMaxAttempts] = useAtom(maxRetryAttemptsAtom);
    const [, setRiceAreaText] = useAtom(riceAreaTextAtom);

    useEffect(() => {
        const fetchRiceChartDataWithRetry = async () => {
            while (attempts < RetryMaxAttempts) {
                try {
                    setError(null);
                    setLoading(true);
                    const action = 'get-landcover-rice-line-data';
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'start_year': studyLow,
                        'end_year': studyHigh,
                        'lc_type': 'rice'
                    };
                    if (geojsonData) {
                        const geojsonString = JSON.stringify(geojsonData);
                        params.geom = geojsonString;
                    }
                    const key = JSON.stringify(params);
                    // const data = await Fetcher(action, params);
                    const chartData = await riceService.getChart(params, 'LINE')
                    // console.log(chartData)
                    // let riceData = chartData.data;
                    // setChartData(riceData);
                    let riceData = {};
                    // console.log(data)
                    if (['country', 'province', 'district', 'protected_area'].includes(area_type)) {
                        //  'district', 'protected_area'
                        // const parsedData = JSON.parse(chartData.data);
                        // riceData = parsedData;
                        riceData = chartData.data;
                    } else {
                        const formatRiceData = (data) => {
                            return Object.keys(data).reduce((acc, year) => {
                                acc[year] = data[year].rice;
                            return acc;
                            }, {});
                        };
                        
                        riceData = formatRiceData(chartData.data);
                    }
                    setChartData(riceData);

                    if (Object.keys(riceData).length > 0) {
                        const startYear = Object.keys(riceData)[0]; // Automatically get the first year
                        const endYear = Object.keys(riceData).pop(); // Automatically get the last year
                        const startYearArea = riceData[startYear];
                        const endYearArea = riceData[endYear];
                        const change = endYearArea - startYearArea;
                        const changeDirection = change > 0 ? "increased" : "decreased";
                        const changeWord = change > 0 ? "growth" : "reduction";
                        const absoluteChange = Math.abs(change);
                        const percentageChange = (absoluteChange / startYearArea) * 100;
                        // Find the year with the most rice plantation
                        let yearWithMostRice = startYear;
                        let maxRiceArea = startYearArea;
                        for (const [year, area] of Object.entries(riceData)) {
                            if (area > maxRiceArea) {
                                yearWithMostRice = year;
                                maxRiceArea = area;
                            }
                        }
                        // Check if all values are 0
                        const allZero = Object.values(riceData).every(value => value === 0);
                        let paragraph = '';
                        if (allZero) {
                            paragraph = `There is no rice plantations in ${selectedArea}`;
                        } else {
                            paragraph = `From ${startYear} to ${endYear}, in ${selectedArea},  Rice plantations ${changeDirection} ${absoluteChange.toLocaleString()} ha, equivalent to a ${changeWord} of ${percentageChange.toFixed(2)}% in rice plantations since ${startYear}. 
                        The most rice plantation recorded in a year for ${selectedArea} was in ${yearWithMostRice}, with an amount of ${maxRiceArea.toLocaleString()} ha.`;
                        }
                        setRiceAreaText(paragraph);
                    } else {
                        setRubberAreaText(`There is no rice plantations in ${selectedArea}`);
                    }
                    setLoading(false);
                    setAttempts(0);
                    return; // Break out of the loop if successful
                } catch (error) {
                    // Retry if it's a network error
                    if (error.isAxiosError && error.code === 'ECONNABORTED') {
                        // Increment attempts
                        setAttempts((prevAttempts) => prevAttempts + 1);
                        console.warn(`Retry attempt ${attempts + 1}`);
                        // Introduce a 10-second delay before the next attempt
                        await new Promise((resolve) => setTimeout(resolve, 10000));
                    } else {
                        // Break out of the loop for non-network errors
                        setLoading(false);
                        break;
                    }
                } finally {
                    setLoading(false);
                }
            }

            // Handle max retry attempts reached
            setError('Max retry attempts reached. Please click again on the update button.');
        };

        // Check for updateTrigger to initiate fetch
        if (updateTrigger > 0) {
            // If update trigger occurs, reset attempts to 0
            setAttempts(0);
            // Reset update trigger
            setUpdateTrigger(0);
            // Execute fetchRiceChartDataWithRetry
            fetchRiceChartDataWithRetry();
        } else {
            // Initial fetch
            fetchRiceChartDataWithRetry();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area_type, area_id, studyLow, studyHigh, setChartData, setUpdateTrigger, attempts, updateTrigger, RetryMaxAttempts]);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const data = chartData;

    const chartTitle = "RICE IN";

    // Configuring the Highcharts
    const options = {
        chart: {
            type: 'spline',
            // marginRight: 40  
        },
        title: false,
        subtitle: false,
        tooltip: {
            formatter: function () {
                const formattedNumber = Math.round(this.point.y).toLocaleString();
                return 'Estimated Area: ' + formattedNumber + ' Ha';
            }
        },
        xAxis: {
            categories: Object.keys(data),
            title: {
                text: 'Year'
            }
        },
        yAxis: {
            title: {
                text: 'Total Area (in Hectare)'
            },
            labels: {
                formatter: function () {
                    return (this.value / 1000000) + 'M'; // Convert all labels to millions
                }
            }
        },
        series: [{
            name: 'Estimated Total Area of Rice Field',
            data: Object.values(data),
            // lineWidth: 2,
            // lineColor: '#000000',
        }],
        plotOptions: {
            series: {
                color: "#e6c200"
            }
        },
        // legend: {
        //     labelFormatter: function() {
        //         // Split the string into words, capitalize the first letter of each word, then join them back together.
        //         return this.name.split(' ').map(capitalizeFirstLetter).join(' ');
        //     }
        // },
        credits: {
            enabled: false
        },
        exporting: {
            buttons: {
                contextButton: {
                    align: 'right',
                    verticalAlign: 'top',
                    x: 10,
                    y: -15,
                    menuItems: [
                        'viewFullscreen',
                        'separator',
                        'downloadPNG',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadSVG',
                        'separator',  // A separator line between images and data export
                        'downloadCSV',
                        'downloadXLS'
                    ]
                }
            },
            // Set up custom chart options for exporting
            chartOptions: {
                title: {
                    text: chartTitle
                }
            },
            // This event triggers before exporting, use it to modify options
            beforePrint: function () {
                var chart = this;
                chart.setTitle({ text: chartTitle });
            },
            // This event triggers after exporting, use it to reset changes
            afterPrint: function () {
                var chart = this;
                chart.setTitle({ text: null });  // Reset to original title or no title
            }
        }
    }
    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default RiceLineChart;