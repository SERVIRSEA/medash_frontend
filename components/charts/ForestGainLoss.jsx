import React, {useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import Highcharts from '@/utils/highcharts-setup'
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
    maxRetryAttemptsAtom,
    forestChangeGainLossAreaAtom,
    geojsonDataAtom
} from '@/state/atoms';
import { Fetcher } from '@/fetchers/Fetcher';
import Typography from '@mui/material/Typography';

const ForestGainLoss = () => {
    const [geojsonData] = useAtom(geojsonDataAtom);
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [changeData, setChangeData] = useAtom(forestChangeGainLossAreaAtom);
    const [gainLossData, setGainLossData] = useAtom(forestGainLossAreaAtom);
    const [updateTrigger, setUpdateTrigger] = useAtom(updateTriggerAtom);
    const [attempts, setAttempts] = useState(0);
    const [RetryMaxAttempts] = useAtom(maxRetryAttemptsAtom);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataWithRetry = async () => {
            while (attempts < RetryMaxAttempts) {
                try {
                    setLoading(true);
                    const action = 'get-forest-gainloss-area';
                    const params = {
                        'area_type': area_type,
                        'area_id': area_id,
                        'studyLow': studyLow,
                        'studyHigh': studyHigh
                    };
                    if (geojsonData) {
                        const geojsonString = JSON.stringify(geojsonData);
                        params.geom = geojsonString;
                    }
                    const data = await Fetcher(action, params);
                    setGainLossData(data);
                    setAttempts(0);
                    setLoading(false);
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
            // Execute fetchDataWithRetry
            fetchDataWithRetry();
        } else {
            // Initial fetch
            fetchDataWithRetry();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area_type, area_id, studyLow, studyHigh, setGainLossData, setUpdateTrigger, updateTrigger, attempts, RetryMaxAttempts]);

    return (
        <>
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={2}>
                Compare the area of forest change between the baseline period ({refLow} - {refHigh}) and the evaluation period ({studyLow} - {studyHigh})
            </Typography>
            {/* <Typography variant="body2">
                Gain compared to the baseline <span style={{color: '#16a34a', fontWeight: 'bold'}}>{Math.round(gainLossData.forestgain).toLocaleString()} Ha</span>
            </Typography>
            <Typography variant="body2">
                Loss compared to the baseline <span style={{color: '#d69102', fontWeight: 'bold'}}>{Math.round(gainLossData.forestloss).toLocaleString()} Ha</span>
            </Typography> */}
            <Typography variant="body2">
                Gain compared to the baseline <span style={{color: '#16a34a', fontWeight: 'bold'}}>{Math.round(changeData.stats_study_gain - changeData.stats_ref_gain).toLocaleString()} Ha</span>
            </Typography>
            <Typography variant="body2">
                Loss compared to the baseline <span style={{color: '#d69102', fontWeight: 'bold'}}>{Math.round(changeData.stats_study_loss - changeData.stats_ref_loss).toLocaleString()} Ha</span>
            </Typography>
        </>
    )
}

export default ForestGainLoss