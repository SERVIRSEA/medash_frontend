import React, { useState, useEffect } from 'react';
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
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    riceBMDataAtom,
    riceBMDataLoadingAtom,
    updateTriggerAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';

const RiceAreaBMChart = () => {
    const [chartData, setChartData] = useAtom(riceBMDataAtom);
    const [loading, setLoading] = useAtom(riceBMDataLoadingAtom);
    const [error, setError] = useState(null);
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [updateTrigger] = useAtom(updateTriggerAtom);

    useEffect(() => { 
        const fetchData = async () => {
            try {
                setError(null);
                setLoading(true);
                const action = 'get-landcover-baselinemeasure-area';
                const params = {
                    'area_type': area_type,
                    'area_id': area_id,
                    'refLow': refLow,
                    'refHigh': refHigh,
                    'studyLow': studyLow,
                    'studyHigh': studyHigh,
                    'type': 'rice'
                }
                const key = JSON.stringify(params);
                const data = await Fetcher(action, params);
                // console.log(data)
                setChartData(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [area_type, area_id, refLow, refHigh, studyLow, studyHigh, updateTrigger]);

    if (loading) return <><LoadingCard /></>;
    if (error) return <div>Error: {error}</div>;

    const options = {
        chart: {
            type: 'column'
        },
        title: false,
        xAxis: {
            categories: ['Baseline Area', 'Measure Area']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Area (Ha)'
            }
        },
        tooltip: {
            formatter: function () {
                return this.x + ": " + this.y.toFixed(2) + " Ha";
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                pointWidth: 25,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Rice Area',
            data: [
                chartData.baselineArea || 0,
                chartData.measureArea || 0
            ],
            color: "#2b5154"
        }]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default RiceAreaBMChart;
