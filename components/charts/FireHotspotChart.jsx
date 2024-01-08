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
    fireChartAtom,
    fireChartDataLoadingAtom,
    updateTriggerAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';

const FireHotspotChart = () => {
    const [chartData, setChartData] = useAtom(fireChartAtom);
    const [loading, setLoading] = useAtom(fireChartDataLoadingAtom);
    const [error, setError] = useState(null);

    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [updateTrigger] = useAtom(updateTriggerAtom);

    useEffect(() => { 
        const fetchFireChartData = async () => {
            try {
                setLoading(true);
                const action = 'get-burned-area-chart-data';
                const params = {
                    'area_type': area_type,
                    'area_id': area_id,
                    'studyLow': studyLow,
                    'studyHigh': studyHigh
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
        fetchFireChartData();
    }, [area_type, area_id, studyLow, studyHigh, updateTrigger]);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const data = chartData;

    const years = Object.keys(data);
    const numberFireData = years.map(year => data[year].number_fire);
    const totalAreaData = years.map(year => data[year].total_area);

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