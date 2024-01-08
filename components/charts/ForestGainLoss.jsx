import React, {useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { 
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    forestGainLossAreaAtom,
    updateTriggerAtom,
} from '@/state/atoms';
import { Fetcher } from '@/fetchers/Fetcher';
import Typography from '@mui/material/Typography';

const ForestGainLoss = () => {
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [gainLossData, setGainLossData] = useAtom(forestGainLossAreaAtom);
    const [updateTrigger] = useAtom(updateTriggerAtom);

    useEffect(() => { 
        const fetchData = async () => {
            try {
                const action = 'get-forest-gainloss-area';
                const params = {
                    'area_type': area_type,
                    'area_id': area_id,
                    'studyLow': studyLow,
                    'studyHigh': studyHigh
                }
                const data = await Fetcher(action, params);
                setGainLossData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            }
        }
        fetchData();
    }, [area_type, area_id, studyLow, studyHigh, updateTrigger]);

    return (
        <>
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={2}>
                Compare the area of forest change between the baseline period ({refLow} - {refHigh}) and the measuring period ({studyLow} - {studyHigh})
            </Typography>
            <Typography variant="body2">
                Gain compared to the baseline <span style={{color: 'green', fontWeight: 'bold'}}>{gainLossData.forestgain}</span>
            </Typography>
            <Typography variant="body2">
                Loss compared to the baseline <span style={{color: 'red', fontWeight: 'bold'}}>{gainLossData.forestloss}</span>
            </Typography>
        </>
    )
}

export default ForestGainLoss