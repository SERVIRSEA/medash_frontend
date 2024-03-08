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
    areaTypeAtom,
    areaIdAtom,
    rubberChartAtom,
    rubberChartDataLoadingAtom,
    updateTriggerAtom,
    maxRetryAttemptsAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';

const RubberLineChart = () => {
    const [chartData, setChartData] = useAtom(rubberChartAtom);
    const [loading, setLoading] = useAtom(rubberChartDataLoadingAtom);
    const [error, setError] = useState(null);

    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [updateTrigger, setUpdateTrigger] = useAtom(updateTriggerAtom);
    const [attempts, setAttempts] = useState(0);
    const [RetryMaxAttempts] = useAtom(maxRetryAttemptsAtom);

    useEffect(() => {
        const fetchRubberChartDataWithRetry = async () => {
            while (attempts < RetryMaxAttempts) {
                try {
                    setError(null);
                    setLoading(true);
                    const action = 'get-landcover-rubber-line-data';
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'studyLow': studyLow,
                        'studyHigh': studyHigh
                    };
                    const key = JSON.stringify(params);
                    
                    const data = await Fetcher(action, params);
                    if (['country', 'province', 'district', 'protected_area'].includes(area_type)) { // 'district', 'protected_area'
                        const parsedData = JSON.parse(data);
                        setChartData(parsedData);
                    } else {
                        setChartData(data);
                    }
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
            // Execute fetchRubberChartDataWithRetry
            fetchRubberChartDataWithRetry();
        } else {
            // Initial fetch
            fetchRubberChartDataWithRetry();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area_type, area_id, studyLow, studyHigh, setChartData, setUpdateTrigger, attempts, updateTrigger, RetryMaxAttempts]);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const data = chartData;

    const chartTitle = "LAND COVER IN";

    // Configuring the Highcharts
    const options = {
        chart: {
            type: 'spline',
            // marginRight: 40  
        },
        title: false,
		subtitle: false,
        tooltip: {
            formatter: function () {
                return 'Estimated Area: ' +  this.point.y.toFixed(2) ;
            }
        },
        xAxis: {
            categories: Object.keys(data),
            title: {
                text: 'Year'
            }
        },
        yAxis: {
            title: {
                text: 'Total Area (in Hectare)'
            }
        },
        series: [{
            name: 'Estimated Total Area of Rubber Field',
            data: Object.values(data)
        }],
        plotOptions: {
            series: {
                color: "#99e600"
            }
        },
        // legend: {
        //     labelFormatter: function() {
        //         // Split the string into words, capitalize the first letter of each word, then join them back together.
        //         return this.name.split(' ').map(capitalizeFirstLetter).join(' ');
        //     }
        // },
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

export default RubberLineChart;