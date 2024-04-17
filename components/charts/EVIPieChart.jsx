import React, {useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';

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
    areaNameAtom,
    eviPieChartDataLoadingAtom,
    eviPieChartAtom,
    updateTriggerAtom,
    maxRetryAttemptsAtom,
    bioTextAtom
} from '@/state/atoms';
import LoadingCard from '../LoadingCard';

const EVIPieChart = () => {
    const [eviPieChartData, setEviPieChartData] = useAtom(eviPieChartAtom);
    const [loading, setLoading] = useAtom(eviPieChartDataLoadingAtom);
    const [error, setError] = useState(null);
    const [RetryMaxAttempts] = useAtom(maxRetryAttemptsAtom);
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    const [updateTrigger, setUpdateTrigger] = useAtom(updateTriggerAtom);
    const [attempts, setAttempts] = useState(0);
    const [, setBioText] = useAtom(bioTextAtom); 

    useEffect(() => {
        const fetchEVIPieChartDataWithRetry = async () => {
            while (attempts < RetryMaxAttempts) {
                try {
                    setError(null);
                    setLoading(true);
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'refLow': refLow,
                        'refHigh': refHigh,
                        'studyLow': studyLow,
                        'studyHigh': studyHigh
                    };
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

                    // get the number of large improvement of biophysical health
                    const largeImprove = graphDataEVI.find(item => item.name === 'Large improvement').y;
                    const largeImproveNumber = largeImprove;
                    const largeImprovePct = (largeImprove/total_area_evi) * 100;

                    // get the number of improvement of biophysical health
                    const underStress = graphDataEVI.find(item => item.name === 'Under Stress').y;
                    const underStressNumber = underStress;
                    const underStressPct = (underStress/total_area_evi) * 100;


                    // get the number of under stress of biophysical health
                    const improvement = graphDataEVI.find(item => item.name === 'improvement').y;
                    const improvementNumber = improvement;
                    const improvementPct = (improvement / total_area_evi) * 100;

                    // get the number of severe stress of biophysical health
                    const severeStress = graphDataEVI.find(item => item.name === 'Severe stress').y;
                    const severeStressNumber = severeStress;
                    const severeStressPct = (severeStress/total_area_evi) * 100;
      
                    let largeImprovementText = largeImproveNumber > 0 ? `<li> <b style="color:#264653">large improvement</b> of ${largeImproveNumber.toLocaleString()} ha equal to  ${largeImprovePct.toFixed(2)}%; </li>` : ``;
                    let improvementText = improvementNumber > 0 ?  `<li> <b style="color:#2A9D8F">improvement</b> of ${improvementNumber.toLocaleString()} ha equal to ${improvementPct.toFixed(2)}%; </li>` : ``;
                    let underStressText = underStressNumber > 0 ?  `<li> <b style="color:#F4A261">under stress</b> of ${underStressNumber.toLocaleString()} ha, equal to ${underStressPct.toFixed(2)}%; </li>` : ``;
                    let severeStressText = severeStressNumber > 0 ?  `<li> <b style="color:#E76F51">severe stress</b> of ${severeStressNumber.toLocaleString()} ha, equal to ${severeStressPct.toFixed(2)}%; </li>` : ``;
                    
                    const paragraph = `The biophysical health of ${selectedArea} compare between baseline period (${refLow}-${refHigh}) and evaluation period (${studyLow}-${studyHigh}).
                    <ul>
                        ${largeImprovementText}
                        ${improvementText}
                        ${underStressText}
                        ${severeStressText}
                    </ul>`
                    
                    setBioText(paragraph);
        
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
            // Execute fetchEVIPieChartDataWithRetry
            fetchEVIPieChartDataWithRetry();
        } else {
            // Initial fetch
            fetchEVIPieChartDataWithRetry();
        }
    }, [area_id, area_type, refLow, refHigh, studyLow, studyHigh, setEviPieChartData, setLoading, setUpdateTrigger, attempts, updateTrigger, RetryMaxAttempts]);

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
                    'separator',  
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