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
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    landCoverChartAtom,
    lcChartDataLoadingAtom,
    minYearLandCover,
    maxYearLandCover
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';

const LandCoverChart = () => {
    const [lcChartData, setLCChartData] = useAtom(landCoverChartAtom);
    const [loading, setLoading] = useAtom(lcChartDataLoadingAtom);
    const [error, setError] = useState(null);

    const [studyLow] = useAtom(minYearLandCover);
    const [studyHigh] = useAtom(maxYearLandCover);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);

    useEffect(() => { 
        const fetchLCChartData = async () => {
            try {
                const params = {
                    'area_type': area_type,
                    'area_id': area_id,
                    'studyLow': studyLow,
                    'studyHigh': studyHigh
                }
                const key = JSON.stringify(params);
                const action = 'get-landcover-chart';
                const data = await Fetcher(action, params);
                setLCChartData(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setLoading(false);
            }
        }
        fetchLCChartData();
    }, []);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const chartTitle = "LAND COVER IN";

    const colors = {
        'evergreen': '#267300',
        'semi-evergreen': '#38A800',
        'deciduous': '#70A800',
        'mangrove': '#00A884',
        'flooded forest': '#B4D79E',
        'rubber': '#AAFF00',
        'other plantations': '#F5F57A',
        'rice': '#FFFFBE',
        'cropland': '#FFD37F',
        'surface water': '#004DA8',
        'grassland': '#D7C29E',
        'woodshrub': '#89CD66',
        'built-up area': '#E600A9',
        'village': '#A900E6',
        'other': '#6f6f6f'
    };

    // Get an array of the land types
    const data = lcChartData;
    const categories = Object.keys(data[studyLow]);

    // Build the series data
    const series = categories.map(category => {
        return {
            name: category,
            data: Object.keys(data).map(year => data[year][category]),
            color: colors[category]
        };
    });

    // Configuring the Highcharts
    const options = {
        chart: {
            type: 'column',
            marginRight: 40  
        },
        title: false,
		subtitle: false,
        xAxis: {
            categories: Object.keys(data),
            crosshair: true
        },
        yAxis: {
            // min: 0,
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return (this.value / 1000000) + 'Mha';
                }
            }
        },
        tooltip: {
            formatter: function () {
                return this.series.name + " (" + this.point.y + " hectare)";
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                pointPadding: 0.2,
                pointWidth: 6,
                borderWidth: 0
            }
        },
        series: series,
        legend: {
            labelFormatter: function() {
                // Split the string into words, capitalize the first letter of each word, then join them back together.
                return this.name.split(' ').map(capitalizeFirstLetter).join(' ');
            }
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

export default LandCoverChart;