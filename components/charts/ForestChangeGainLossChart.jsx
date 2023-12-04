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
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    forestChangeGainLossAreaAtom,
    forestChangeLoadingAtom
} from '@/state/atoms';

import LoadingCard from '../LoadingCard';
import { Fetcher } from '@/fetchers/Fetcher';

const ForestChangeGainLossChart = () => {
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [changeData, setChangeData] = useAtom(forestChangeGainLossAreaAtom);
    const [loading, setLoading] = useAtom(forestChangeLoadingAtom);
    const [error, setError] = useState(null);
    
    useEffect(() => { 
        const fetchChartData = async () => {
            try {
                setLoading(true);
                const action = 'get-forest-change-gainloss-chart-data';
                const params = {
                    'area_type': area_type,
                    'area_id': area_id,
                    'refLow': refLow,
                    'refHigh': refHigh,
                    'studyLow': studyLow,
                    'studyHigh': studyHigh
                }
                const data = await Fetcher(action, params);
                console.log('change data:', data);
                setChangeData(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setLoading(false);
            }
        }
        fetchChartData();
    }, []);

    const data = {
        statsRefLoss: 759096.21,
        statsStudyLoss: 1436738,
        statsRefGain: 545164.51,
        statsStudyGain: 738093.78
    };

    // Format data for Highcharts
    const lossData = [data.statsRefLoss, data.statsStudyLoss];
    const gainData = [data.statsRefGain, data.statsStudyGain];

    const options = {
        chart: {
            type: 'column'
        },
        title: false,
        subtitle: false,
        xAxis: {
            categories: [
                'BASELINE PERIOD',
                'MEASURING PERIOD'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            }
        },
        tooltip: {
            formatter: function () {
                return this.series.name + " (" + (this.point.y).toFixed(2) + ")";
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                pointWidth: 25,
                borderWidth: 0
            }
        },
        // plotOptions: {
        //     column: {
        //         grouping: true,
        //         shadow: false,
        //         borderWidth: 0
        //     }
        // },
        series: [{
            name: 'LOSS',
            data: [data.statsRefLoss, data.statsStudyLoss],
            color: 'red'

        }, {
            name: 'GAIN',
            data: [data.statsRefGain, data.statsStudyGain],
            color: 'green'

        }],
    };


    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default ForestChangeGainLossChart