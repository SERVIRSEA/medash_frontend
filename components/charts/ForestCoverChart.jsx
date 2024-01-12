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
    minYearForestGain,
    maxYearForestGain,
    areaTypeAtom,
    areaIdAtom,
    forestNonForestChartDataAtom,
    forestNonForestChartLoadingAtom,
    updateTriggerAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';

const ForestCoverChart = () => {
    const [chartData, setChartData] = useAtom(forestNonForestChartDataAtom);
    const [loading, setLoading] = useAtom(forestNonForestChartLoadingAtom);
    const [error, setError] = useState(null);
    const [updateTrigger] = useAtom(updateTriggerAtom);
    const [studyLow] = useAtom(minYearForestGain);
    const [studyHigh] = useAtom(maxYearForestGain);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);

    useEffect(() => { 
        const fetchChartData = async () => {
            try {
                setError(null);
                setLoading(true);
                const action = 'get-forest-nonforest-chart-data';
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
        fetchChartData();
    }, [area_type, area_id, studyLow, studyHigh, updateTrigger]);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const processedData = Object.entries(chartData).map(([year, data]) => ({
        year,
        forest: data.forest,
        nonForest: data.noneForest
    }));

    const years = processedData.map(item => item.year);
    const forestData = processedData.map(item => item.forest);
    const nonForestData = processedData.map(item => item.nonForest);

    const chartTitle = "AREA OF FOREST AND NON-FOREST";

    // Configuring the Highcharts
    const options = {
        chart: {
            type: 'column',
            height: 280,
        },
        title: false,
        xAxis: {
            categories: years,
            title: false,
        },
        yAxis: {
            min: 0,
            title: false,
            // title: {
            //     text: 'Area (Hectares)'
            // }
        },
        tooltip: {
            pointFormat: '{series.name}: {point.y} Ha'
        },
        plotOptions: {
            column: {
                pointPadding: 0.0, 
                groupPadding: 0.0, 
                color: '#d95252'
            }
        },
        series: [{
            name: 'Forest',
            data: forestData,
            color: '#138D75'
        }],
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

export default ForestCoverChart;