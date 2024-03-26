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

                    //  generate text reporting
                    const startYear = studyLow.toString();
                    const endYear = studyHigh.toString();
                    setForestCoverStudyHigh(data[endYear].forest);
                    const startYearForestArea = data[startYear].forest;
                    const endYearForestArea = data[endYear].forest;

                    // Calculate the total forest cover loss
                    const totalLoss = startYearForestArea - endYearForestArea;

                    // Determine the word based on total change
                    const changeWord = totalLoss < 0 ? "gained" : "lost";
                    const changeType = totalLoss < 0 ? "increase" : "decrease";

                    // Calculate the absolute percentage change
                    const percentageChange = ((Math.abs(totalLoss) / startYearForestArea) * 100).toFixed(2);

        
                    // Find the year with the maximum forest cover loss
                    let maxLossYear = "";
                    let maxLoss = 0;
                    Object.keys(data).forEach(year => {
                        if (year > startYear) { // Skip the first year for loss calculation
                            const loss = data[year - 1].forest - data[year].forest;
                            if (loss > maxLoss) {
                                maxLoss = loss;
                                maxLossYear = year;
                            }
                        }
                    });

                    const paragraph = `From ${studyLow} to ${studyHigh}, ${selectedArea} ${changeWord} ${Math.abs(totalLoss).toFixed(2)} ha of forest cover, equivalent to ${percentageChange}% decrease in forest cover since ${studyLow}. The most forest loss recorded in a year for ${selectedArea} was in ${maxLossYear}, with ${maxLoss.toFixed(2)} ha forest cover loss in a year.`;
                    setTextForestReport(paragraph);

                    let totalForestGain = 0;
                    let totalForestLoss = 0;
                    let yearOfMostForestGain = '';
                    let valueOfMostForestGain = 0;
                    let yearOfMostForestLoss = '';
                    let valueOfMostForestLoss = 0;

                    Object.keys(data).reduce((previousValue, year) => {
                        const currentForest = data[year].forest;
                        if (previousValue !== 0) {
                            const change = currentForest - previousValue;
                            if (change > 0) {
                                totalForestGain += change;
                                if (change > valueOfMostForestGain) {
                                    valueOfMostForestGain = change;
                                    yearOfMostForestGain = year;
                                }
                            } else {
                                totalForestLoss -= change; // Subtract to add the positive value of the loss
                                if (-change > valueOfMostForestLoss) { // Change is negative for loss, so we negate it
                                    valueOfMostForestLoss = -change;
                                    yearOfMostForestLoss = year;
                                }
                            }
                        }
                        return currentForest;
                    }, 0);

                    const paragraphForestGainLoss = `In the period of 2010 to 2022, ${selectedArea} gained the total amount of ${totalForestGain.toFixed(2)} ha in forest cover but also lost ${totalForestLoss.toFixed(2)} ha. The most recorded amount of forest gain is in ${yearOfMostForestGain} with ${valueOfMostForestGain.toFixed(2)} ha, and the most recorded amount of forest loss is in ${yearOfMostForestLoss} with ${valueOfMostForestLoss.toFixed(2)} ha.`;
                    setForestCoverGainLossText(paragraphForestGainLoss)

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