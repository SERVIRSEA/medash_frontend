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
    maxRetryAttemptsAtom,
    landcoverTextAtom,
    activeMenuAtom,
    geojsonDataAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';
import { getLandcoverChart } from '@/services/landcoverService';

const LandCoverChart = () => {
    const [menuId] = useAtom(activeMenuAtom);
    const [geojsonData] = useAtom(geojsonDataAtom);
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
    const [, setLandcoverText] = useAtom(landcoverTextAtom); 

    useEffect(() => {
        const fetchDataWithRetry = async () => {
            while (attempts < RetryMaxAttempts) {
                try {
                    setError(null);
                    setLoading(true);
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'start_year': refLow,
                        'end_year': studyHigh
                    };
                    if (geojsonData) {
                        const geojsonString = JSON.stringify(geojsonData);
                        params.geom = geojsonString;
                    }
                    const key = JSON.stringify(params);
                    // const action = 'get-landcover-chart';
                    // const data = await Fetcher(action, params);
                    
                    const fetchData = await getLandcoverChart(params);
                    
                    const period1Data = filterData(fetchData.data, refLow, refHigh);
                    const period2Data = filterData(fetchData.data, studyLow, studyHigh);
                    setLCChartData({ period1: period1Data, period2: period2Data });
                    
                    // console.log(fetchData);
                    // if (['country', 'province', 'district', 'protected_area'].includes(area_type)) {
                    //     const parsedData = fetchData.data; 
                    //     const period1Data = filterData(parsedData, refLow, refHigh);
                    //     const period2Data = filterData(parsedData, studyLow, studyHigh);
                    //     setLCChartData({ period1: period1Data, period2: period2Data });
                    // } else {
                    //     // setLCChartData(data);
                    //     const period1Data = filterData(data, refLow, refHigh);
                    //     const period2Data = filterData(data, studyLow, studyHigh);
                    //     setLCChartData({ period1: period1Data, period2: period2Data });
                    // }

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
    

        // get the start and end years from the data
        const landCoverData= dataPeriod2
        const years = Object.keys(landCoverData);
        const startYear = years[0];
        const endYear = years[years.length - 1];

        // Calculate agriculture land and urban area data
        const agricultureLandStart = landCoverData[startYear]["cropland"] + landCoverData[startYear]["rice"]  || 0;
        const agricultureLandEnd = landCoverData[endYear]["cropland"] + landCoverData[endYear]["rice"]  || 0;
        const agricultureChange = agricultureLandEnd - agricultureLandStart;
        let agriculturePercentageChange = 0;
        let agricultureText = `agricultural land including all crop types (crop land and rice) have expanded to cover ${agricultureLandEnd.toLocaleString()} ha.`
        if (agricultureLandStart > 0) {
            agriculturePercentageChange = (agricultureChange / agricultureLandStart) * 100;
            agricultureText = `agricultural land including all crop types (crop land and rice) have changed from ${agricultureLandStart.toLocaleString()} ha to ${agricultureLandEnd.toLocaleString()} ha, 
            equivalent of ${agriculturePercentageChange.toFixed(2)}% of its land area. `
        }

        const urbanAreasStart = landCoverData[startYear]["built"] + landCoverData[startYear]["village"]  || 0;
        const urbanAreasEnd = landCoverData[endYear]["built"] + landCoverData[endYear]["village"]  || 0;
        const urbanChange = urbanAreasEnd - urbanAreasStart || 0;

        // Check if urbanAreasStart is 0 to avoid division by zero
        let urbanPercentageChange = 0;
        const changeDirection = urbanChange > 0 ? "expansion" : "decrease";
        let urbanText = `Urban areas (built up and village class) have develop to cover ${urbanAreasEnd.toLocaleString()} ha.`;
        if (urbanAreasStart > 0) {
            urbanPercentageChange = (urbanChange / urbanAreasStart) * 100;
            urbanText = `Urban areas (built up and village class) have changed from ${urbanAreasStart.toLocaleString()} ha to ${urbanAreasEnd.toLocaleString()} ha, equivalent to ${urbanPercentageChange.toFixed(2)}% ${changeDirection} during the measurement period.
            `
        }
        
        const paragraph = `In the period ${startYear} - ${endYear}, ${agricultureText} ${urbanText}`;
        setLandcoverText(paragraph)

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
                    const formattedNumber = Math.round(this.point.y).toLocaleString();
                    return capitalizeFirstLetter(this.series.name) + " (" + formattedNumber + " Ha)";
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    // pointPadding: 10,
                    pointWidth: menuId === 7 ? 35 : 15,
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
                    fontSize: menuId === 7 ? '12px' : '8px', 
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                buttons: {
                    contextButton: {
                        align: 'right',      
                        verticalAlign: 'top', 
                        x: 0,
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

        // Configuring the Highcharts for period2
        const optionsPeriod2 = {
            chart: {
                type: 'column',
                marginRight: 40,
                // width: 500  
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
                    const formattedNumber = Math.round(this.point.y).toLocaleString();
                    return capitalizeFirstLetter(this.series.name) + " (" + formattedNumber + " Ha)";
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    // pointPadding: 1,
                    pointWidth: menuId === 7 ? 15 : 7,
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
                    fontSize: menuId === 7 ? '12px' : '8px', 
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                buttons: {
                    contextButton: {
                        align: 'right',      
                        verticalAlign: 'top', 
                        x: 0,
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

        return (
            <div>
                <Typography variant='body2' p={1} sx={{ fontWeight: 500, fontSize: '12px' }}>Land cover for baseline period ({refLow} - {refHigh})</Typography>
                <HighchartsReact highcharts={Highcharts} options={optionsPeriod1} />
                <Typography variant='body2' p={1} sx={{ fontWeight: 500, fontSize: '12px' }}>Land cover for evaluation period ({studyLow} - {studyHigh})</Typography>
                <HighchartsReact highcharts={Highcharts} options={optionsPeriod2} />
            </div>
        );
    }
}

export default LandCoverChart;