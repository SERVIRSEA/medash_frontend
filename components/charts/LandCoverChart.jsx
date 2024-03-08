import React, {useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
// Exporting(Highcharts);
// ExportData(Highcharts);
if (typeof Highcharts === 'object') {
    Exporting(Highcharts);
    ExportData(Highcharts);
}import { Typography } from '@mui/material';
import { Fetcher } from '@/fetchers/Fetcher';
import { 
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    landCoverChartAtom,
    lcChartDataLoadingAtom,
    // minYearLandCover,
    // maxYearLandCover,
    updateTriggerAtom,
    maxRetryAttemptsAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';

const LandCoverChart = () => {
    const [lcChartData, setLCChartData] = useAtom(landCoverChartAtom);
    const [loading, setLoading] = useAtom(lcChartDataLoadingAtom);
    const [error, setError] = useState(null);
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [updateTrigger, setUpdateTrigger] = useAtom(updateTriggerAtom);
    const [attempts, setAttempts] = useState(0);
    const [RetryMaxAttempts] = useAtom(maxRetryAttemptsAtom);

    useEffect(() => {
        const fetchDataWithRetry = async () => {
            while (attempts < RetryMaxAttempts) {
                try {
                    setError(null);
                    setLoading(true);
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'studyLow': refLow,
                        'studyHigh': studyHigh
                    };
                    const key = JSON.stringify(params);
                    const action = 'get-landcover-chart';
                    const data = await Fetcher(action, params);
                    // console.log(data)
                    if (['country', 'province', 'district', 'protected_area'].includes(area_type)) {
                        const parsedData = JSON.parse(data);
                        // setLCChartData(parsedData);
                        const period1Data = filterData(parsedData, refLow, refHigh);
                        const period2Data = filterData(parsedData, studyLow, studyHigh);
                        setLCChartData({ period1: period1Data, period2: period2Data });
                    } else {
                        // setLCChartData(data);
                        const period1Data = filterData(data, refLow, refHigh);
                        const period2Data = filterData(data, studyLow, studyHigh);
                        setLCChartData({ period1: period1Data, period2: period2Data });
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
            // Execute fetchDataWithRetry
            fetchDataWithRetry();
        } else {
            // Initial fetch
            fetchDataWithRetry();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area_type, area_id, studyLow, studyHigh, setLCChartData, setUpdateTrigger, attempts, updateTrigger, RetryMaxAttempts]);

    const filterData = (data, startYear, endYear) => {
        const filteredData = {};
        for (let year = startYear; year <= endYear; year++) {
            if (data.hasOwnProperty(year.toString())) {
                filteredData[year] = data[year];
            }
        }
        return filteredData;
    };

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const chartTitle = "LAND COVER IN";

    // const colors = {
    //     'evergreen': '#267300',
    //     'semi-evergreen': '#38A800',
    //     'deciduous': '#70A800',
    //     'mangrove': '#00A884',
    //     'flooded forest': '#B4D79E',
    //     'rubber': '#AAFF00',
    //     'other plantations': '#F5F57A',
    //     'rice': '#FFFFBE',
    //     'cropland': '#FFD37F',
    //     'surface water': '#004DA8',
    //     'grassland': '#D7C29E',
    //     'woodshrub': '#89CD66',
    //     'built-up area': '#E600A9',
    //     'village': '#A900E6',
    //     'other': '#6f6f6f'
    // };

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
        'semi': '#38A800',
        'village': '#A900E6',
        'others': '#f0f8ff'
    };

    // Check if lcChartData is defined before accessing its properties
    if (lcChartData && lcChartData.period1 && lcChartData.period2) {
        // Get an array of the land cover types for period1
        const dataPeriod1 = lcChartData.period1;
        const categoriesPeriod1 = Object.keys(dataPeriod1[refLow] || {});

        // Build the series data for period1
        const seriesPeriod1 = categoriesPeriod1.map(category => {
            return {
                name: category,
                data: Object.keys(dataPeriod1).map(year => {
                    const categoryData = dataPeriod1[year][category];
                    return categoryData !== undefined ? categoryData : 0;
                }),
                color: colors[category]
            };
        });

        // Get an array of the land cover types for period2
        const dataPeriod2 = lcChartData.period2;
        const categoriesPeriod2 = Object.keys(dataPeriod2[studyLow] || {});

        // Build the series data for period2
        const seriesPeriod2 = categoriesPeriod2.map(category => {
            return {
                name: category,
                data: Object.keys(dataPeriod2).map(year => {
                    const categoryData = dataPeriod2[year][category];
                    return categoryData !== undefined ? categoryData : 0;
                }),
                color: colors[category]
            };
        });
    
    

        // Configuring the Highcharts for period1
        const optionsPeriod1 = {
            chart: {
                type: 'column',
                marginRight: 40  
            },
            title: false,
            subtitle: false,
            xAxis: {
                categories: Object.keys(dataPeriod1),
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
                    var name = this.name.replace('built', 'built-up area').replace('semi', 'semi-evergreen');
                    
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

        // Configuring the Highcharts for period2
        const optionsPeriod2 = {
            chart: {
                type: 'column',
                marginRight: 40  
            },
            title: false,
            subtitle: false,
            xAxis: {
                categories: Object.keys(dataPeriod2),
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
            series: seriesPeriod2,
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
                    var name = this.name.replace('built', 'built-up area').replace('semi', 'semi-evergreen');
                    
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
                <Typography variant='body2' p={1} sx={{ fontWeight: 500, fontSize: '12px' }}>Land cover for baseline period ({refLow} - {refHigh})</Typography>
                <HighchartsReact highcharts={Highcharts} options={optionsPeriod1} />
                <Typography variant='body2' p={1} sx={{ fontWeight: 500, fontSize: '12px' }}>Land cover for measure period ({studyLow} - {studyHigh})</Typography>
                <HighchartsReact highcharts={Highcharts} options={optionsPeriod2} />
            </div>
        );
    }
}

export default LandCoverChart;