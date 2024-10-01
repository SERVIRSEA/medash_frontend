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
    riceBMDataAtom,
    riceBMDataLoadingAtom,
    updateTriggerAtom,
    maxRetryAttemptsAtom,
    geojsonDataAtom
} from '@/state/atoms';
import LoadingCard from '../loaders/LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';
import { riceService } from '@/services';

const RiceAreaBMChart = () => {
    const [geojsonData] = useAtom(geojsonDataAtom);
    const [chartData, setChartData] = useAtom(riceBMDataAtom);
    const [loading, setLoading] = useAtom(riceBMDataLoadingAtom);
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
                    const action = 'get-landcover-baselinemeasure-area';
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'ref_low': refLow,
                        'ref_high': refHigh,
                        'study_low': studyLow,
                        'study_high': studyHigh,
                        'lc_type': 'rice'
                    };
                    if (geojsonData) {
                        const geojsonString = JSON.stringify(geojsonData);
                        params.geom = geojsonString;
                    }
                    const key = JSON.stringify(params);
                    const chartData = await riceService.getChart(params, 'BAR')
                    // console.log(chartData.data)
                    // const data = await Fetcher(action, params);
                    setChartData(chartData.data);
                    setLoading(false);
                    setAttempts(0);
                    return; // Break out of the loop if successful
                } catch (error) {
                    // Retry if it's a network error
                    if (error.isAxiosError && error.code === 'ECONNABORTED') {
                        // Increment attempts
                        setAttempts((prevAttempts) => prevAttempts + 1);
                        console.warn(`Retry attempt ${attempts + 1}`);
                        // Introduce a 10-second delay before the next attempt
                        await new Promise((resolve) => setTimeout(resolve, 10000));
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
    }, [area_type, area_id, refLow, refHigh, studyLow, studyHigh, setChartData, setUpdateTrigger, attempts, updateTrigger, RetryMaxAttempts]);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const options = {
        chart: {
            type: 'column'
        },
        title: false,
        xAxis: {
            categories: ['Baseline Period', 'Evaluation Period']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Area (Ha)'
            }
        },
        tooltip: {
            formatter: function () {
                const formattedNumber = Math.round(this.point.y).toLocaleString();
                return this.x + ': ' + formattedNumber + ' Ha';
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
            name: 'Rice Area',
            data: [
                chartData.baseline_area.rice || 0,
                chartData.evaluation_area.rice || 0
            ],
            color: "#FFF000"
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
                        'separator',  // A separator line between images and data export
                        'downloadCSV',
                        'downloadXLS'
                    ]
                }
            }
        }
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default RiceAreaBMChart;
