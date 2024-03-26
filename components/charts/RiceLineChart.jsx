import React, {useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';

if (typeof Highcharts === 'object') {
    Exporting(Highcharts);
    ExportData(Highcharts);
}
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
    areaNameAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';

const RiceLineChart = () => {
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
                        'studyLow': studyLow,
                        'studyHigh': studyHigh
                    };
                    const key = JSON.stringify(params);
                    const data = await Fetcher(action, params);

                    let riceData = {};
                    // console.log(data)
                    if (['country', 'province', 'district', 'protected_area'].includes(area_type)) {
                        //  'district', 'protected_area'
                        const parsedData = JSON.parse(data);
                        riceData = parsedData;
                        setChartData(parsedData);
                    } else {
                        riceData = data;
                        setChartData(data);
                    }

                    const startYear = Object.keys(riceData)[0]; // Automatically get the first year
                    const endYear = Object.keys(riceData).pop(); // Automatically get the last year
                    const startYearArea = riceData[startYear];
                    const endYearArea = riceData[endYear];
                    const change = endYearArea - startYearArea;
                    const changeDirection = change > 0 ? "increase" : "decrease";
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
                    const paragraph = `From ${startYear} to ${endYear}, in ${selectedArea},  Rice plantation ${changeDirection} ${absoluteChange.toFixed(2)} ha, equivalent ${changeWord} of ${percentageChange.toFixed(2)}% in rice plantation since ${startYear}. 
                    The most rice plantation recorded in a year for ${selectedArea} was in ${yearWithMostRice}, with ${maxRiceArea.toFixed(2)} ha.`;
                    setRiceAreaText(paragraph);
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

    const chartTitle = "LAND COVER IN";

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
                return 'Estimated Area: ' +  this.point.y.toFixed(2) ;
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
        exporting: {
            buttons: {
                contextButton: {
                    align: 'right',      
                    verticalAlign: 'top', 
                    marginBottom: '10px',
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