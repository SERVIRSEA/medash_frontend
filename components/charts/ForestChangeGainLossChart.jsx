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
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    forestChangeGainLossAreaAtom,
    forestChangeLoadingAtom,
    updateTriggerAtom,
    maxRetryAttemptsAtom,
    areaNameAtom,
    forestCoverStudyHighAtom,
    forestNetChangeTextAtom,
    forestBaselineLossTextAtom,
    forestStudyLossTextAtom,
    forestLossPercentTextAtom,
    geojsonDataAtom
} from '@/state/atoms';


import LoadingCard from '../LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';
import { forestGainLossService } from '@/services';

const ForestChangeGainLossChart = () => {
    const [geojsonData] = useAtom(geojsonDataAtom);
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    const [changeData, setChangeData] = useAtom(forestChangeGainLossAreaAtom);
    const [loading, setLoading] = useAtom(forestChangeLoadingAtom);
    const [error, setError] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useAtom(updateTriggerAtom);
    const [attempts, setAttempts] = useState(0);
    const [RetryMaxAttempts] = useAtom(maxRetryAttemptsAtom);
    const [forestCoverStudyHigh] = useAtom(forestCoverStudyHighAtom);
    const [, setForestNetChange] = useAtom(forestNetChangeTextAtom);
    const [, setForestBaselineLoss] = useAtom(forestBaselineLossTextAtom);
    const [, setForestStudyLoss] = useAtom(forestStudyLossTextAtom);
    const [, setForestLossPercent] = useAtom(forestLossPercentTextAtom);

    useEffect(() => {
        const fetchChartDataWithRetry = async () => {
            while (attempts < RetryMaxAttempts) {
                try {
                    setError(null);
                    setLoading(true);
                    const action = 'get-forest-change-gainloss-chart-data';
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'ref_low': refLow,
                        'ref_high': refHigh,
                        'study_low': studyLow,
                        'study_high': studyHigh
                    };
                    if (geojsonData) {
                        const geojsonString = JSON.stringify(geojsonData);
                        params.geom = geojsonString;
                    }

                    const chartData = await forestGainLossService.getChart(params);
                    const data = chartData.data;
                    // const data = await Fetcher(action, params);
                    // console.log(data)
                    // set time waiting for forestCoverStudyHigh
                    setTimeout(()=>{
                        const treeCoverArea = forestCoverStudyHigh; // Total tree cover area at the beginning
                        const baselineNetLoss = data.statsRefLoss;
                        const studyNetLoss = data.statsStudyLoss;
                        // Calculating net change in forest loss
                        const netLossChange = baselineNetLoss - studyNetLoss;
                        // Determine the word based on total change
                        const changeWord = netLossChange < 0 ? "increase" : "decrease";
                        const changeIndicating = netLossChange > 0 ? "improving" : "worsening";

                        // Calculating percentage
                        const percentageOfForestLoss = Math.abs((Math.abs(netLossChange) / baselineNetLoss) * 100).toFixed(2);
                        
                        let paragraph1 = ``
                        if (baselineNetLoss > 0) {
                            paragraph1 = `Baseline Period (${refLow}-${refHigh}): Total net forest loss of ${baselineNetLoss.toLocaleString()} ha`
                        } else {
                            paragraph1 = `Baseline Period (${refLow}-${refHigh}): No net forest loss occurred.`
                        }
                        setForestBaselineLoss(paragraph1)

                        let paragraph2 = ``
                        if (studyNetLoss > 0) {
                            paragraph2 = `Measurement Period (${studyLow}-${studyHigh}): Total net forest loss of ${studyNetLoss.toLocaleString()} ha.`
                        } else {
                            paragraph2 = `Baseline Period (${studyLow}-${studyHigh}): No net forest loss occurred.`
                        }
                        setForestStudyLoss(paragraph2)

                        let paragraph3 = ``
                        if (percentageOfForestLoss > 0) {
                            paragraph3 = `The measurement period experienced a ${percentageOfForestLoss}% ${changeWord} in net forest loss compared to the baseline, indicating ${changeIndicating} deforestation.`
                        } else {
                            paragraph3 = `During the measurement period, there was no decrease in net forest loss compared to the baseline`
                        }
                        setForestLossPercent(paragraph3)

                        // Calculating net change in tree cover
                        const netChange = Math.abs(data.statsStudyGain - data.statsStudyLoss);
                        // Calculating percentage of net gain of total tree cover area
                        const percentageOfChange = Math.abs((netChange / treeCoverArea) * 100).toFixed(2);
                        // paragraph in forest gain and loss reporting
                        const paragraph4 = `From ${studyLow} to ${studyHigh}, ${selectedArea} experienced a net change of ${netChange.toLocaleString()} ha (${percentageOfChange}%) in tree cover.`
                        setForestNetChange(paragraph4)

                    },2000)


                    setChangeData(data);
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
            // Execute fetchChartDataWithRetry
            fetchChartDataWithRetry();
        } else {
            // Initial fetch
            fetchChartDataWithRetry();
        }
    }, [area_type, area_id, refLow, refHigh, studyLow, studyHigh, setChangeData, setLoading, setUpdateTrigger, attempts, updateTrigger, RetryMaxAttempts]);

    const data = {
        statsRefLoss: changeData.stats_ref_loss || 0,
        statsStudyLoss: changeData.stats_study_loss || 0,
        statsRefGain: changeData.stats_ref_gain || 0,
        statsStudyGain: changeData.stats_study_gain || 0
    };
    

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    // Format data for Highcharts
    const lossData = [data.statsRefLoss, data.statsStudyLoss];
    const gainData = [data.statsRefGain, data.statsStudyGain];

    const options = {
        chart: {
            type: 'column'
        },
        title: false,
        subtitle: false,
        xAxis: {
            categories: [
                'Baseline Period',
                'Evaluation Period'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            }
        },
        tooltip: {
            formatter: function () {
                const formattedNumber = Math.round(this.point.y).toLocaleString();
                return this.series.name + " (" + formattedNumber + ") Ha";
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                pointWidth: 25,
                borderWidth: 0
            }
        },
        // plotOptions: {
        //     column: {
        //         grouping: true,
        //         shadow: false,
        //         borderWidth: 0
        //     }
        // },
        series: [{
            name: 'Loss',
            data: [data.statsRefLoss, data.statsStudyLoss],
            color: '#fdb827'

        }, {
            name: 'Gain',
            data: [data.statsRefGain, data.statsStudyGain],
            color: '#16a34a'

        }],
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
                        'separator',  
                        'downloadCSV',
                        'downloadXLS'
                    ]
                }
            }
        }
    };


    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default ForestChangeGainLossChart