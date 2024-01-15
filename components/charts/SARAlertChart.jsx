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
    minYearSARAlert,
    maxYearSARAlert,
    areaTypeAtom,
    areaIdAtom,
    sarAlertChartAtom,
    sarAlertChartDataLoadingAtom,
    updateTriggerAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';

const SARAlertChart = () => {
    const [chartData, setChartData] = useAtom(sarAlertChartAtom);
    const [loading, setLoading] = useAtom(sarAlertChartDataLoadingAtom);
    const [error, setError] = useState(null);
    const [updateTrigger] = useAtom(updateTriggerAtom);
    const [studyLow] = useAtom(minYearSARAlert);
    const [studyHigh] = useAtom(maxYearSARAlert);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);

    useEffect(() => { 
        const fetchSARChartData = async () => {
            try {
                setError(null);
                setLoading(true);
                const action = 'get-sar-alert-chart-data';
                const params = {
                    'area_type': area_type,
                    'area_id': area_id,
                    'studyLow': studyLow,
                    'studyHigh': 2022
                }
                const data = await Fetcher(action, params);
                setChartData(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setLoading(false);
            }
        }
        fetchSARChartData();
    }, [area_type, area_id, studyLow, studyHigh, updateTrigger]);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const data = Object.entries(chartData).map(([year, totalArea]) => ({ year, totalArea }));

    const years = data.map(item => item.year);
    const totalAreaData = data.map(item => item.totalArea);

    const chartTitle = "TOTAL AREA OF SAR ALERT SYSTEM";

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
                return 'Area in Hectare: ' +  this.point.y.toFixed(0) ;
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
            // tickPositions: [0, 2500, 5000, 7500, 10000, 12500]
        },
        series: [{
            data: totalAreaData
        }],
        plotOptions: {
            column: {
                pointPadding: 0.1, 
                groupPadding: 0.1, 
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

export default SARAlertChart;