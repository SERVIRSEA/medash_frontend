import React, {useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
Exporting(Highcharts);
ExportData(Highcharts);
import { Fetcher } from '@/fetchers/Fetcher';
import { 
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    eviPieChartDataLoadingAtom,
    eviPieChartAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';

const EVIPieChart = () => {
    const [eviPieChartData, setEviPieChartData] = useAtom(eviPieChartAtom);
    const [loading, setLoading] = useAtom(eviPieChartDataLoadingAtom);
    const [error, setError] = useState(null);

    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);

    useEffect(() => { 
        const fetchEVIPieChartData = async () => {
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
                const action = 'get-evi-pie';
                const data = await Fetcher(action, params);
                
                const graphDataEVI = [];
                let className = ['Large improvement', 'improvement', 'No Change', 'Under Stress', 'Severe stress'];
                let classColor = ['#264653','#2A9D8F','#E9C46A','#F4A261','#E76F51'];
                let total_area_evi = 0;
                for (var i=0; i< className.length; i++) {
                    graphDataEVI.push({ name: className[i], y: data[i], color: classColor[i]});
                    total_area_evi = total_area_evi + data[i];
                }
                setEviPieChartData(graphDataEVI);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setLoading(false);
            }
        }
        fetchEVIPieChartData();
    }, []);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const options = {
        title: false,
        subtitle: false,
        tooltip: {
            formatter: function () {
                return this.point.name + " (" + this.point.percentage.toFixed(2) + "%)";
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '',
                    style: { fontFamily: 'Roboto Condensed'}
                },
                showInLegend: true,
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'bottom',
            itemMarginTop: 3,
            itemMarginBottom: 3,
            itemStyle: {
                color: '#666666',
                fontWeight: 'normal',
                fontSize: '12px',
                align: 'center',  
                verticalAlign: 'middle',
                layout: 'vertical'     
            },
            labelFormatter: function() {
                return this.name + " (" + this.percentage.toFixed(2) + "%)";
            }
        },
        series: [{
          type: 'pie',
          name: 'Category Share',
          innerSize: '50%',
          data: eviPieChartData
        }],
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

export default EVIPieChart;