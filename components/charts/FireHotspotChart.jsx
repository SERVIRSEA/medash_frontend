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
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    fireChartAtom,
    fireChartDataLoadingAtom,
    updateTriggerAtom,
    maxRetryAttemptsAtom,
    areaNameAtom,
    fireHotspotTextAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';

const FireHotspotChart = () => {
    const [chartData, setChartData] = useAtom(fireChartAtom);
    const [loading, setLoading] = useAtom(fireChartDataLoadingAtom);
    const [error, setError] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useAtom(updateTriggerAtom);
    const [attempts, setAttempts] = useState(0);
    const [RetryMaxAttempts] = useAtom(maxRetryAttemptsAtom);

    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    const [, setFireHotspotText] = useAtom(fireHotspotTextAtom);

    useEffect(() => {
        const fetchFireChartDataWithRetry = async () => {
            while (attempts < RetryMaxAttempts) {
                try {
                    setError(null);
                    setLoading(true);
                    const action = 'get-burned-area-chart-data';
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'studyLow': studyLow,
                        'studyHigh': studyHigh
                    };

                    const data = await Fetcher(action, params);
  
                    const startOfMeasurement = Object.keys(data)[0];
                    const endOfMeasurement = Object.keys(data).pop();
                    const sumOfHotspot = Object.values(data).reduce((acc, val) => acc + val, 0);
                    const yearWithMostFire = Object.keys(data).reduce((a, b) => data[a] > data[b] ? a : b);
                    const sumOfYearWithMostFire = data[yearWithMostFire];

                    const paragraph = `In ${selectedArea}, there have been ${sumOfHotspot} VIIRS fire alerts reported so far from ${startOfMeasurement} to ${endOfMeasurement} considering high confidence alerts only. The most fires recorded in a year was ${yearWithMostFire}, with ${sumOfYearWithMostFire}.`;
                    setFireHotspotText(paragraph)

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

        // Check for updateTrigger to initiate fetch
        if (updateTrigger > 0) {
            // If update trigger occurs, reset attempts to 0
            setAttempts(0);
            // Reset update trigger
            setUpdateTrigger(0);
            // Execute fetchFireChartDataWithRetry
            fetchFireChartDataWithRetry();
        } else {
            // Initial fetch
            fetchFireChartDataWithRetry();
        }
    }, [area_id, area_type, studyLow, studyHigh, setChartData, setLoading, setUpdateTrigger, attempts, updateTrigger, RetryMaxAttempts]);


    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const data = chartData;

    const years = Object.keys(data);
    const numberFireData = years.map(year => data[year]);

    const chartTitle = "NUMBER OF FIRE HOTSPOT";

    // Configuring the Highcharts
    const options = {
        chart: {
            type: 'column',
            height: 250,
        },
        title: false,
		subtitle: false,
        tooltip: {
            formatter: function () {
                return 'Number of Fire Hotspot: ' +  this.point.y.toFixed(0) ;
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
            // tickPositions: [0, 250, 500, 750]
        },
        series: [{
            data: numberFireData
        }],
        plotOptions: {
            column: {
                pointPadding: 0.0, 
                groupPadding: 0.0, 
                color: '#d95252'
            }
        },
        legend: {
            enabled: false 
        },
        exporting: {
            buttons: {
                contextButton: {
                    align: 'right',      
                    verticalAlign: 'top', 
                    marginBottom: '10px',
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

export default FireHotspotChart;