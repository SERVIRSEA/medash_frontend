import React, { useState, useEffect } from 'react';
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
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    rubberBMDataAtom,
    rubberBMDataLoadingAtom,
    updateTriggerAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';

const RetryMaxAttempts = 5;

const RubberAreaBMChart = () => {
    const [chartData, setChartData] = useAtom(rubberBMDataAtom);
    const [loading, setLoading] = useAtom(rubberBMDataLoadingAtom);
    const [error, setError] = useState(null);
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [, setUpdateTrigger] = useAtom(updateTriggerAtom);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        const fetchDataWithRetry = async () => {
            while (attempts < RetryMaxAttempts) {
                try {
                    setError(null);
                    setLoading(true);
                    const action = 'get-landcover-baselinemeasure-area';
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'refLow': refLow,
                        'refHigh': refHigh,
                        'studyLow': studyLow,
                        'studyHigh': studyHigh,
                        'type': 'rubber'
                    };
                    const key = JSON.stringify(params);
                    const data = await Fetcher(action, params);
                    setChartData(data);
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
        fetchDataWithRetry();
    }, [area_type, area_id, refLow, refHigh, studyLow, studyHigh, setChartData, setLoading, setUpdateTrigger, attempts]);

    // useEffect(() => { 
    //     const fetchData = async () => {
    //         try {
    //             setError(null);
    //             setLoading(true);
    //             const action = 'get-landcover-baselinemeasure-area';
    //             const params = {
    //                 'area_type': area_type,
    //                 'area_id': area_id,
    //                 'refLow': refLow,
    //                 'refHigh': refHigh,
    //                 'studyLow': studyLow,
    //                 'studyHigh': studyHigh,
    //                 'type': 'rubber'
    //             }
    //             const key = JSON.stringify(params);
    //             const data = await Fetcher(action, params);
    //             // console.log(data)
    //             setChartData(data);
    //         } catch (error) {
    //             setError(error.message);
    //             console.error('Error fetching data:', error);
    //             throw error; 
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchData();
    // }, [area_type, area_id, refLow, refHigh, studyLow, studyHigh, updateTrigger]);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const options = {
        chart: {
            type: 'column'
        },
        title: false,
        xAxis: {
            categories: ['Baseline Area', 'Measure Area']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Area (Ha)'
            }
        },
        tooltip: {
            formatter: function () {
                return this.x + ": " + this.y.toFixed(2) + " Ha";
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                pointWidth: 25,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Rubber Area',
            data: [
                chartData.baselineArea || 0,
                chartData.measureArea || 0
            ],
            color: "#2b5154"
        }]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default RubberAreaBMChart;
