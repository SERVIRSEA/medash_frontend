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

import { Fetcher } from '@/fetchers/Fetcher';
import { 
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    eviLineChartAtom,
    eviLineChartDataLoadingAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';

const EVILineChart = () => {
    const [eviLineChartData, setEviLineChartData] = useAtom(eviLineChartAtom);
    const [loading, setLoading] = useAtom(eviLineChartDataLoadingAtom);
    const [error, setError] = useState(null);

    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);

    useEffect(() => { 
        const fetchEVILineChartData = async () => {
            try {
                const params = {
                    'area_type': area_type,
                    'area_id': area_id,
                    'refLow': refLow,
                    'refHigh': refHigh,
                    'studyLow': studyLow,
                    'studyHigh': studyHigh
                }
                const key = JSON.stringify(params);
                const action = 'get-evi-line';

                const data = await Fetcher(action, params);
                setEviLineChartData(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setLoading(false);
            }
        }
        fetchEVILineChartData();
    }, []);

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
            y: -25
        },
        series: [{
            data: eviLineChartData.timeSeries,
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