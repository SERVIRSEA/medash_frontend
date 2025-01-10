import React, {useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import Highcharts from '@/utils/highcharts-setup'
import HighchartsReact from 'highcharts-react-official';
import { 
    measureMinYearAtom,
    measureMaxYearAtom,
    minYearForestGain,
    maxYearForestGain,
    areaTypeAtom,
    areaIdAtom,
    forestNonForestChartDataAtom,
    forestNonForestChartLoadingAtom,
    updateTriggerAtom,
    maxRetryAttemptsAtom,
    textForestReportAtom,
    areaNameAtom,
    forestCoverStudyHighAtom,
    forestCoverGainLossTextAtom,
    geojsonDataAtom
} from '@/state/atoms';
import LoadingCard from '../loaders/LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';
import { forestCoverService } from '@/services';

const ForestNonForestChart = () => {
    const [geojsonData] = useAtom(geojsonDataAtom);
    const [chartData, setChartData] = useAtom(forestNonForestChartDataAtom);
    const [loading, setLoading] = useAtom(forestNonForestChartLoadingAtom);
    const [error, setError] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useAtom(updateTriggerAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    const [attempts, setAttempts] = useState(0);
    const [RetryMaxAttempts] = useAtom(maxRetryAttemptsAtom);
    const [, setTextForestReport] = useAtom(textForestReportAtom);
    const [, setForestCoverStudyHigh] = useAtom(forestCoverStudyHighAtom);
    const [, setForestCoverGainLossText] = useAtom(forestCoverGainLossTextAtom);


    useEffect(() => {
        const fetchDataWithRetry = async () => {
            while (attempts < RetryMaxAttempts) {
                try {
                    setError(null);
                    setLoading(true);
                    const action = 'get-forest-nonforest-chart-data';
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'start_year': studyLow,
                        'end_year': studyHigh
                    };
                    if (geojsonData) {
                        const geojsonString = JSON.stringify(geojsonData);
                        params.geom = geojsonString;
                    }
                    // const data = await Fetcher(action, params);
                    const chartData = await forestCoverService.getChart(params);
                    
                    const forestData = chartData.data;
                    //  generate text reporting
                    const startYear = studyLow.toString();
                    let endYear = studyHigh.toString();

                    // If endYear is not available in the data, use the last year available
                    if (!forestData[endYear]) {
                        // Get the list of years from the data keys and find the latest year
                        const availableYears = Object.keys(forestData);
                        endYear = availableYears[availableYears.length - 1]; // Last year in the data
                    }
                    
                    let previousYearForest = forestData[startYear].forest;
                    let maxLossYear = studyLow, maxGainYear = studyLow;
                    let maxLoss = 0, maxGain = 0;
                    let totalLoss = 0;
                    let totalGain = 0;
               
                    Object.keys(forestData).reduce((acc, year) => {
                        const currentYearForest = forestData[year].forest_area_ha;
                        const delta = currentYearForest - previousYearForest;
                        if (delta < 0) {
                            totalLoss += Math.abs(delta);
                        } else {
                            totalGain += delta;
                        }
                        if (delta < 0 && Math.abs(delta) > maxLoss) {
                            maxLoss = Math.abs(delta);
                            maxLossYear = year;
                        } else if (delta > 0 && delta > maxGain) {
                            maxGain = delta;
                            maxGainYear = year;
                            
                        }
                        acc.loss += Math.min(0, delta);
                        acc.gain += Math.max(0, delta);
                        previousYearForest = currentYearForest;
                        return acc;
                    }, { loss: 0, gain: 0 });

                    // Calculate the total forest cover loss start year to end year
                    const forestLoss = forestData[endYear].forest_area_ha - forestData[startYear].forest_area_ha;
                    // Determine the word based on total change
                    const changeType = forestLoss > 0 ? "increase" : "decrease";
                    const LossDirection = forestLoss > 0 ? "gain" : "loss";
                    const LossPercentDirection = forestLoss > 0 ? "gaining" : "reduction";
                    const percentageReduction = (forestLoss / forestData[startYear].forest) * 100;

                    setForestCoverStudyHigh(forestData[endYear].forest_area_ha);
          
                    // Check if all 'forest' values are 0
                    const allForestZero = Object.values(forestData).every(entry => entry.forest === 0);
                    let paragraph = '';
                    let paragraphForestGainLoss = '';
                    if (allForestZero) {
                        paragraph = `There is no forest area in ${selectedArea} in evaluation period (${startYear} to ${endYear})`;
                        paragraphForestGainLoss = ``;
                    
                    } else {
                        paragraph = `From ${startYear} to ${endYear}, ${selectedArea} experienced a ${changeType} in forest cover, with ${totalLoss.toLocaleString()} hectares lost, while simultaneously gaining ${Math.abs(totalGain).toLocaleString()} hectares in tree cover. This resulted in a net forest cover ${LossDirection} of ${Math.abs(forestLoss).toLocaleString()} hectares, a ${Math.abs(percentageReduction).toFixed(2)}% ${LossPercentDirection} relative to the forest cover in ${startYear}.`;
                        paragraphForestGainLoss = `The year ${maxLossYear} recorded the largest annual decrease, with ${maxLoss.toLocaleString()} hectares of forest lost. Conversely, ${maxGainYear} marked the most significant gain, with ${maxGain.toLocaleString()} hectares of new forest cover.`;
                    
                    }
                    setTextForestReport(paragraph);
                    setForestCoverGainLossText(paragraphForestGainLoss);

                    setChartData(forestData);
                    setAttempts(0);
                    setLoading(false);
                    return; // Break out of the loop if successful
                } catch (error) {
                    console.log(error)
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
    }, [area_type, area_id, studyLow, studyHigh, setChartData, setUpdateTrigger, updateTrigger, attempts, RetryMaxAttempts]);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const processedData = Object.entries(chartData).map(([year, data]) => ({
        year,
        forest: data.forest_area_ha,
        nonForest: data.non_forest_area_ha
    }));

    const years = processedData.map(item => item.year);
    const forestData = processedData.map(item => item.forest);
    const nonForestData = processedData.map(item => item.nonForest);

    const chartTitle = "AREA OF FOREST AND NON-FOREST";

    // Configuring the Highcharts
    const options = {
        chart: {
            type: 'bar',
            height: 300,
        },
        title: false,
        xAxis: {
            categories: years,
            title: false,
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        },
        yAxis: {
            min: 0,
            title: false,
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
            // title: {
            //     text: 'Area (Hectares)'
            // },
        },
        tooltip: {
            formatter: function () {
                const formattedNumber = Math.round(this.point.y).toLocaleString();
                
                return '<b>' + this.x + '</b><br/>' + this.series.name + ": " + formattedNumber + " Ha";
            }
        },
        plotOptions: {
            bar: {
                pointPadding: 0.1, 
                groupPadding: 0.2, 
                // pointWidth: 8,
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'Non-Forest',
            data: nonForestData,
            color: '#919F94'
        },
        {
            name: 'Forest',
            data: forestData,
            color: '#15803d',
        }],
        legend: {
            enabled: true,
            itemStyle: {
                fontSize: '12px' 
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

export default ForestNonForestChart;