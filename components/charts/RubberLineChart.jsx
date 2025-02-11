import React, {useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import Highcharts from '@/utils/highcharts-setup'
import HighchartsReact from 'highcharts-react-official';
import { 
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    rubberChartAtom,
    rubberChartDataLoadingAtom,
    updateTriggerAtom,
    maxRetryAttemptsAtom,
    rubberAreaTextAtom,
    areaNameAtom,
    geojsonDataAtom
} from '@/state/atoms';
import LoadingCard from '../loaders/LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';
import { rubberService } from '@/services';

const RubberLineChart = () => {
    const [geojsonData] = useAtom(geojsonDataAtom);
    const [chartData, setChartData] = useAtom(rubberChartAtom);
    const [loading, setLoading] = useAtom(rubberChartDataLoadingAtom);
    const [error, setError] = useState(null);

    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    const [updateTrigger, setUpdateTrigger] = useAtom(updateTriggerAtom);
    const [attempts, setAttempts] = useState(0);
    const [RetryMaxAttempts] = useAtom(maxRetryAttemptsAtom);
    const [, setRubberAreaText] = useAtom(rubberAreaTextAtom);

    useEffect(() => {
        const fetchRubberChartDataWithRetry = async () => {
            while (attempts < RetryMaxAttempts) {
                try {
                    setError(null);
                    setLoading(true);
                    const action = 'get-landcover-rubber-line-data';
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'start_year': studyLow,
                        'end_year': studyHigh,
                        'lc_type': 'rubber'
                    };
                    if (geojsonData) {
                        const geojsonString = JSON.stringify(geojsonData);
                        params.geom = geojsonString;
                    }
                    const key = JSON.stringify(params);
                    
                    // const data = await Fetcher(action, params);
                    const chartData = await rubberService.getChart(params, 'LINE');

                    let rubberData = {};
                    if (['country', 'province', 'district', 'protected_area'].includes(area_type)) { // 'district', 'protected_area'
                        // const parsedData = JSON.parse(data);
                        // rubberData = parsedData;
                        // setChartData(parsedData);
                        rubberData = chartData.data
                    } else {
                        const formatRubberData = (data) => {
                            return Object.keys(data).reduce((acc, year) => {
                                acc[year] = data[year].rubber;
                            return acc;
                            }, {});
                        };
                        
                        rubberData = formatRubberData(chartData.data);
                    }

                    setChartData(rubberData);

                    if (Object.keys(rubberData).length > 0) {
                        const startYear = Object.keys(rubberData)[0]; // Automatically get the first year
                        const endYear = Object.keys(rubberData).pop(); // Automatically get the last year
                        const startYearArea = rubberData[startYear];
                        const endYearArea = rubberData[endYear];
                        const change = endYearArea - startYearArea;
                        const changeDirection = change > 0 ? "increased" : "decreased";
                        const changeWord = change > 0 ? "growth" : "reduction";
                        const absoluteChange = Math.abs(change);
                        const percentageChange = (absoluteChange / startYearArea) * 100;
                        // Find the year with the most rice plantation
                        let yearWithMostRubber = startYear;
                        let maxRubberArea = startYearArea;
                        for (const [year, area] of Object.entries(rubberData)) {
                            if (area > maxRubberArea) {
                                yearWithMostRubber = year;
                                maxRubberArea = area;
                            }
                        }
                        // Check if all values are 0
                        const allZero = Object.values(rubberData).every(value => value === 0);
                        let paragraph = '';
                        if (allZero) {
                            paragraph = `There is no rubber plantations in ${selectedArea}`;
                        } else {
                            paragraph = `From ${startYear} to ${endYear}, in ${selectedArea}, Rubber plantations ${changeDirection} ${absoluteChange.toLocaleString()} ha, equivalent to a ${changeWord} of ${percentageChange.toFixed(2)}% in rubber plantations since ${startYear}.
                            The most rubber plantations recorded in a year for ${selectedArea} was in ${yearWithMostRubber}, with an amount of ${maxRubberArea.toLocaleString()} ha.`;
                        }
                        setRubberAreaText(paragraph);
                    } else {
                        setRubberAreaText(`There is no rubber plantations in ${selectedArea}`);
                    }



                    setLoading(false);
                    setAttempts(0);
                    return; // Break out of the loop if successful
                } catch (error) {
                    // Retry if it's a network error
                    if (error.isAxiosError && error.code === 'ECONNABORTED') {
                        // Increment attempts
                        setAttempts(prevAttempts => prevAttempts + 1);
                        console.warn(`Retry attempt ${attempts + 1}`);
                        // Introduce a 10-second delay before the next attempt
                        await new Promise(resolve => setTimeout(resolve, 10000));
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
            // Execute fetchRubberChartDataWithRetry
            fetchRubberChartDataWithRetry();
        } else {
            // Initial fetch
            fetchRubberChartDataWithRetry();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area_type, area_id, studyLow, studyHigh, setChartData, setUpdateTrigger, attempts, updateTrigger, RetryMaxAttempts]);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const data = chartData;

    const chartTitle = "RUBBER IN";

    // Configuring the Highcharts
    const options = {
        chart: {
            type: 'spline',
            marginRight: 30  
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
            }
        },
        series: [{
            name: 'Estimated Total Area of Rubber Field',
            data: Object.values(data)
        }],
        plotOptions: {
            series: {
                color: "#99e600"
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
                    // marginRight: '20px',
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

export default RubberLineChart;