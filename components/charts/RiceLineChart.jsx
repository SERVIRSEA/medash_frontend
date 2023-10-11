import React, {useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
Exporting(Highcharts);
ExportData(Highcharts);
import { 
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    riceChartAtom,
    riceChartDataLoadingAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';
import { fetchData } from '@/fetchers/fetchData';

const RiceLineChart = () => {
    const [chartData, setChartData] = useAtom(riceChartAtom);
    const [loading, setLoading] = useAtom(riceChartDataLoadingAtom);
    const [error, setError] = useState(null);

    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);

    useEffect(() => { 
        const fetchRiceChartData = async () => {
            try {
                const action = 'get-landcover-rice-line-data';
                const params = {
                    'area_type': area_type,
                    'area_id': area_id,
                    'studyLow': studyLow,
                    'studyHigh': studyHigh
                }
                const key = JSON.stringify(params);

                const data = await fetchData(action, params);
                // console.log(data)
                setChartData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
                setLoading(false);
                throw error; 
            } finally {
                setLoading(false);
            }
        }
        fetchRiceChartData();
    }, []);

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
            name: 'Estimated Total Area of Rice Field',
            data: Object.values(data)
        }],
        plotOptions: {
            series: {
                color: "#2b5154"
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

export default RiceLineChart;