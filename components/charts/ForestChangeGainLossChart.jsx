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
    maxRetryAttemptsAtom
} from '@/state/atoms';

import LoadingCard from '../LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';

const ForestChangeGainLossChart = () => {
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [changeData, setChangeData] = useAtom(forestChangeGainLossAreaAtom);
    const [loading, setLoading] = useAtom(forestChangeLoadingAtom);
    const [error, setError] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useAtom(updateTriggerAtom);
    const [attempts, setAttempts] = useState(0);
    const [RetryMaxAttempts] = useAtom(maxRetryAttemptsAtom);

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
                        'refLow': refLow,
                        'refHigh': refHigh,
                        'studyLow': studyLow,
                        'studyHigh': studyHigh
                    };

                    const data = await Fetcher(action, params);
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
        statsRefLoss: changeData.statsRefLoss || 0,
        statsStudyLoss: changeData.statsStudyLoss || 0,
        statsRefGain: changeData.statsRefGain || 0,
        statsStudyGain: changeData.statsStudyGain || 0
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
                'BASELINE PERIOD',
                'MEASURING PERIOD'
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
                return this.series.name + " (" + (this.point.y).toFixed(2) + ")";
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
            name: 'LOSS',
            data: [data.statsRefLoss, data.statsStudyLoss],
            color: 'red'

        }, {
            name: 'GAIN',
            data: [data.statsRefGain, data.statsStudyGain],
            color: 'green'

        }],
    };


    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default ForestChangeGainLossChart