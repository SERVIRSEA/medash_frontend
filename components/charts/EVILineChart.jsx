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
import { eviService } from '@/services';
import { Fetcher } from '@/fetchers/Fetcher';
import { 
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    eviLineChartAtom,
    eviLineChartDataLoadingAtom,
    updateTriggerAtom,
    maxRetryAttemptsAtom,
    geojsonDataAtom
} from '@/state/atoms';
import LoadingCard from '../loaders/LoadingCard';

const EVILineChart = () => {
    const [geojsonData] = useAtom(geojsonDataAtom);
    const [eviLineChartData, setEviLineChartData] = useAtom(eviLineChartAtom);
    const [loading, setLoading] = useAtom(eviLineChartDataLoadingAtom);
    const [error, setError] = useState(null);
    const [RetryMaxAttempts] = useAtom(maxRetryAttemptsAtom);
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [updateTrigger, setUpdateTrigger] = useAtom(updateTriggerAtom);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        const fetchEVILineChartData = async () => {
            while (attempts < RetryMaxAttempts) {
                try {
                    setError(null);
                    setLoading(true);
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'ref_low': refLow,
                        'ref_high': refHigh,
                        'study_low': studyLow,
                        'study_high': studyHigh
                    }
                    if (geojsonData) {
                        const geojsonString = JSON.stringify(geojsonData);
                        params.geom = geojsonString;
                    }
                    const key = JSON.stringify(params);
                    // const action = 'get-evi-line';
                    // const data = await Fetcher(action, params);
                    // const fetchedData = await getEviLine(params);
                    // const data = fetchedData.data;
                    const chartData = await eviService.getChart(params, 'LINE');
                    setEviLineChartData(chartData.data);
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
        }

        // Check for updateTrigger to initiate fetch
        if (updateTrigger > 0) {
            // If update trigger occurs, reset attempts to 0
            setAttempts(0);
            // Reset update trigger
            setUpdateTrigger(0);
            // Execute fetchDataWithRetry
            fetchEVILineChartData();
        } else {
            // Initiall request
            fetchEVILineChartData();
        }
    }, [area_id, area_type, refHigh, refLow, studyHigh, studyLow, setEviLineChartData, setLoading, setUpdateTrigger, attempts, updateTrigger, RetryMaxAttempts]);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const options = {
        title: false,
        subtitle: false,
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                'Cumulative anomaly EVI: ' +  this.point.y.toFixed(2) ;
            }
        },
        yAxis: {
            title: {
                text: 'Cumulative anomaly EVI'
            }
        },
        xAxis: {
            type: 'datetime',
            labels: {
                format: '{value: %Y}' // %Y-%m-%d
            },
            title: {
                text: 'Date'
            }
        },
        plotOptions: {
            series: {
                color: "#2b5154"
            }
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            // y: -25
        },
        series: [{
            data: eviLineChartData.time_series,
            name: 'Biophysical Health',
            color: "#2b5154",
            marker: {
                enabled: false,
                radius: 3
            }
        }],
        credits: {
            enabled: false
        },
        exporting: {
            enabled: true,  // this will enable the exporting functionality
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
            }
        }
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default EVILineChart;