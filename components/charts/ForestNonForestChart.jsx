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
}
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
    forestCoverGainLossTextAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';

const ForestNonForestChart = () => {
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
                        'studyLow': studyLow,
                        'studyHigh': studyHigh
                    };
                    const data = await Fetcher(action, params);

                    const forestData = data;
                    //  generate text reporting
                    const startYear = studyLow.toString();
                    const endYear = studyHigh.toString();
                    
                    let previousYearForest = forestData[startYear].forest;
                    let maxLossYear = studyLow, maxGainYear = studyLow;
                    let maxLoss = 0, maxGain = 0;
                    let totalLoss = 0;
                    let totalGain = 0;
               
                    Object.keys(forestData).reduce((acc, year) => {
                        const currentYearForest = forestData[year].forest;
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
                    const forestLoss = forestData[endYear].forest - forestData[startYear].forest;
                    // Determine the word based on total change
                    const changeType = forestLoss > 0 ? "increase" : "decrease";
                    const LossDirection = forestLoss > 0 ? "gain" : "loss";
                    const LossPercentDirection = forestLoss > 0 ? "gaining" : "reduction";
                    const percentageReduction = (forestLoss / forestData[startYear].forest) * 100;

                    setForestCoverStudyHigh(data[endYear].forest);
          
                    // Check if all 'forest' values are 0
                    const allForestZero = Object.values(forestData).every(entry => entry.forest === 0);
                    let paragraph = '';
                    let paragraphForestGainLoss = '';
                    if (allForestZero) {
                        paragraph = `There is no forest area in ${selectedArea} in evaluation period (${startYear} to ${endYear})`;
                        paragraphForestGainLoss = ``;
                    
                    } else {
                        paragraph = `From ${startYear} to ${endYear}, ${selectedArea} experienced a ${changeType} in forest cover, with ${totalLoss.toFixed(2)} hectares lost, while simultaneously gaining ${Math.abs(totalGain.toFixed(2))} hectares in tree cover. This resulted in a net forest cover ${LossDirection} of ${Math.abs(forestLoss).toFixed(2)} hectares, a ${Math.abs(percentageReduction).toFixed(2)}% ${LossPercentDirection} relative to the forest cover in ${startYear}.`;
                        paragraphForestGainLoss = `The year ${maxLossYear} recorded the largest annual decrease, with ${maxLoss.toFixed(2)} hectares of forest lost. Conversely, ${maxGainYear} marked the most significant gain, with ${maxGain.toFixed(2)} hectares of new forest cover.`;
                    
                    }
                    setTextForestReport(paragraph);
                    setForestCoverGainLossText(paragraphForestGainLoss);

                    setChartData(data);
                    setAttempts(0);
                    setLoading(false);
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
    }, [area_type, area_id, studyLow, studyHigh, setChartData, setUpdateTrigger, updateTrigger, attempts, RetryMaxAttempts]);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const processedData = Object.entries(chartData).map(([year, data]) => ({
        year,
        forest: data.forest,
        nonForest: data.noneForest
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
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y} Ha'
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
            color: '#138D75',
        }],
        legend: {
            enabled: true,
            itemStyle: {
                fontSize: '12px' 
            }
        },
        exporting: {
            buttons: {
                contextButton: {
                    align: 'right',      
                    verticalAlign: 'top', 
                    marginTop: '100px',
                    x: 10, 
                    y: -12, 
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