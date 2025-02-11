import React, {useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import Highcharts from '@/utils/highcharts-setup'
import HighchartsReact from 'highcharts-react-official';
import { 
    minYearGLADAlert,
    maxYearGLADAlert,
    areaTypeAtom,
    areaIdAtom,
    gladAlertChartAtom,
    gladAlertChartDataLoadingAtom,
    updateTriggerAtom,
    maxRetryAttemptsAtom,
    geojsonDataAtom
} from '@/state/atoms';
import LoadingCard from '../loaders/LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';
import { gladService } from '@/services';

const GLADAlertChart = () => {
    const [geojsonData] = useAtom(geojsonDataAtom);
    const [chartData, setChartData] = useAtom(gladAlertChartAtom);
    const [loading, setLoading] = useAtom(gladAlertChartDataLoadingAtom);
    const [error, setError] = useState(null);
    const [studyLow] = useAtom(minYearGLADAlert);
    const [studyHigh] = useAtom(maxYearGLADAlert);
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
                    const action = 'get-glad-alert-chart-data';
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'start_year': studyLow,
                        'end_year': studyHigh
                        // 'studyLow': studyLow,
                        // 'studyHigh': studyHigh
                    };
                    if (geojsonData) {
                        const geojsonString = JSON.stringify(geojsonData);
                        params.geom = geojsonString;
                    }
                    const chartData = await gladService.getChart(params);
                    // const data = await Fetcher(action, params);
                    setChartData(chartData.data);
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
                        await new Promise(resolve => setTimeout(resolve, 100000));
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
    }, [area_type, area_id, studyLow, studyHigh, setChartData, setUpdateTrigger, attempts, updateTrigger, RetryMaxAttempts]);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const data = Object.entries(chartData).map(([year, totalArea]) => ({ year, totalArea }));
    
    const years = data.map(item => item.year);
    const totalAreaData = data.map(item => item.totalArea);

    const chartTitle = "TOTAL AREA OF GLAD ALERT SYSTEM";

    // Configuring the Highcharts
    const options = {
        chart: {
            type: 'column',
            height: 250,
            marginRight: 20,
        },
        title: false,
		subtitle: false,
        tooltip: {
            formatter: function () {
                const formattedNumber = Math.round(this.point.y).toLocaleString();
                return 'Area in Hectare: ' +  formattedNumber ;
            }
        },
        xAxis: {
            categories: years,
            title: {
                text: 'Year'
            }
        },
        yAxis: {
            title: false, 
            // tickPositions: [0, 25000, 50000, 75000, 100000, 125000]
        },
        series: [{
            data: totalAreaData
        }],
        plotOptions: {
            column: {
                pointPadding: 0.1, 
                groupPadding: 0.1, 
                color: '#a31545'
            }
        },
        legend: {
            enabled: false 
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
    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default GLADAlertChart;