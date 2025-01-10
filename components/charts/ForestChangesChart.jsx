import React, {useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import Highcharts from '@/utils/highcharts-setup'
import HighchartsReact from 'highcharts-react-official';
import { Typography } from '@mui/material';
import { Fetcher } from '@/fetchers/Fetcher';
import { 
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    areaNameAtom,
    forestChangesChartAtom,
    forestChangesDataLoadingAtom,
    updateTriggerAtom,
    maxRetryAttemptsAtom,
    forestChangesTextAtom,
    geojsonDataAtom
} from '@/state/atoms';
import LoadingCard from '../loaders/LoadingCard';

const ForestChangesChart = () => {
    const [geojsonData] = useAtom(geojsonDataAtom);
    const [forestChangeChartData, setForestChangesChartData] = useAtom(forestChangesChartAtom);
    const [loading, setLoading] = useAtom(forestChangesDataLoadingAtom);
    const [error, setError] = useState(null);
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    const [updateTrigger, setUpdateTrigger] = useAtom(updateTriggerAtom);
    const [attempts, setAttempts] = useState(0);
    const [RetryMaxAttempts] = useAtom(maxRetryAttemptsAtom);
    const [, setForestChangesText] = useAtom(forestChangesTextAtom); 

    useEffect(() => {
        const fetchDataWithRetry = async () => {
            while (attempts < RetryMaxAttempts) {
                try {
                    setError(null);
                    setLoading(true);
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'studyLow': studyLow,
                        'studyHigh': studyHigh
                    };
                    if (geojsonData) {
                        const geojsonString = JSON.stringify(geojsonData);
                        params.geom = geojsonString;
                    }
                    const key = JSON.stringify(params);
                    const action = 'get-forestchange-chart';
                    const data = await Fetcher(action, params);
                    
                    // Calculate the sum of each category
                    const sumByCategory = {};
                    Object.values(data).forEach(yearData => {
                    Object.keys(yearData).forEach(category => {
                        if (!sumByCategory[category]) {
                        sumByCategory[category] = 0;
                        }
                        sumByCategory[category] += yearData[category];
                    });
                    });
                    // Find the maximum sum and corresponding category
                    let maxCategory = '';
                    let maxSum = 0;
                    Object.keys(sumByCategory).forEach(category => {
                    if (sumByCategory[category] > maxSum) {
                        maxSum = sumByCategory[category];
                        maxCategory = category;
                    }
                    });

                      // Step 1: Calculate the total forest loss for each year and find the year with the max total forest loss
                      let yearlyLosses = {};
                      Object.entries(data).forEach(([year, data]) => {
                        yearlyLosses[year] = Object.values(data).reduce((acc, value) => acc + value, 0);
                      });
                      
                      let [maxLossYear, maxTotalLoss] = Object.entries(yearlyLosses).reduce((acc, curr) => curr[1] > acc[1] ? curr : acc, ['', 0]);
                      
                      // Step 2: Find the area of the corresponding category in the year of maximum total forest loss
                      let maxYearData = data[maxLossYear];
                      let [maxLandcover, maxLCSum] = Object.entries(maxYearData).reduce((acc, curr) => curr[1] > acc[1] ? curr : acc, ['', 0]);
                      
                      // Step 3: Calculate the percentage of the max category relative to the total area of that year
                      const percentage = ((maxLCSum / maxTotalLoss) * 100).toFixed(2);
                      
                    const summaryTemplate = `From ${studyLow} to ${studyHigh}, the ${maxCategory.replace(/_/g, ' ')} class is the largest contributor to the forest loss in ${selectedArea}. In ${maxLossYear}, the year with the highest forest loss, ${maxLandcover.replace(/_/g, ' ')} contributed the most to forest loss, with ${maxLCSum} hectares. This represents ${percentage}% of the total forest loss of ${maxTotalLoss.toFixed(2)} hectares.`;

                    setForestChangesText(summaryTemplate);  
                    // const parsedData = JSON.parse(data);
                    setForestChangesChartData(data);
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
            // Execute fetchDataWithRetry
            fetchDataWithRetry();
        } else {
            // Initial fetch
            fetchDataWithRetry();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area_type, area_id, studyLow, studyHigh, setForestChangesChartData, setUpdateTrigger, attempts, updateTrigger, RetryMaxAttempts]);


    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const chartTitle = "LAND COVER IN";

    const colors = {
        'built': '#E600A9',
        'mangrove': '#FFFF00',
        'otherPlantation': '#c49963',
        'water': '#004DA8',
        'shrub': '#89CD66',
        'rice': '#fefdbd',
        'cropland': '#FFD37F',
        'grass': '#D7C29E',
        'evergreen': '#267300',
        'deciduous': '#71a405',
        'wetland': '#86d8dc',
        'rubber': '#AAFF00',
        'floodedForest': '#b3d59f',
        'semievergreen': '#38A800',
        'village': '#A900E6',
        'others': '#f0f8ff'
    };

    // Check if forestChangeChartData is defined before accessing its properties
    if (forestChangeChartData) {
        // Get an array of the land cover types for period1
        const dataPeriod1 = forestChangeChartData;
        const categories = Object.keys(forestChangeChartData[studyLow] || {});

        // Build the series data for period1
        const seriesPeriod1 = categories.map(category => {
            return {
                name: category,
                data: Object.keys(forestChangeChartData).map(year => {
                    const categoryData = forestChangeChartData[year][category];
                    return categoryData !== undefined ? categoryData : 0;
                }),
                color: colors[category]
            };
        });

        // Configuring the Highcharts for period1
        const chartOptions = {
            chart: {
                type: 'column',
                marginRight: 40  
            },
            title: false,
            subtitle: false,
            xAxis: {
                categories: Object.keys(forestChangeChartData),
                crosshair: true,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            yAxis: {
                // min: 0,
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return (this.value / 1000000) + 'Mha';
                    },
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    // Function to capitalize the first letter of each word
                    function capitalizeFirstLetter(string) {
                        return string.replace(/\b\w/g, function (char) {
                            return char.toUpperCase();
                        });
                    }
                    return capitalizeFirstLetter(this.series.name) + " (" + this.point.y + " Ha)";
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    pointPadding: 0.2,
                    pointWidth: 6,
                    borderWidth: 0
                }
            },
            series: seriesPeriod1,
            credits: {
                enabled: false
            },
            legend: {
                // labelFormatter: function() {
                //     // Split the string into words, capitalize the first letter of each word, then join them back together.
                //     return this.name.split(' ').map(capitalizeFirstLetter).join(' ');
                // },
                labelFormatter: function() {
                    // Define a function to capitalize the first letter of each word
                    function capitalizeFirstLetter(str) {
                        return str.charAt(0).toUpperCase() + str.slice(1);
                    }
                    // Replace "built" with "built-up" and "semi" with "semi-evergreen" before formatting the label
                    var name = this.name.replace('built', 'built-up area').replace('semievergreen', 'semi-evergreen');
                    
                    // Split the string into words, capitalize the first letter of each word, then join them back together.
                    return name.split(' ').map(capitalizeFirstLetter).join(' ');
                },
                itemStyle: {
                    fontSize: '12px' 
                }
            },
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

        return (
            <div>
                <Typography variant='body2' p={1} sx={{ fontWeight: 500, fontSize: '12px' }}>Forest and land cover change from {studyLow} to {studyHigh}</Typography>
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </div>
        );
    }
}

export default ForestChangesChart;