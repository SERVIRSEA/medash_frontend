import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import Button from '@mui/material/Button';
import { 
    areaTypeAtom, 
    areaIdAtom, 
    tempAreaTypeAtom,
    tempAreaIdAtom,
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    tempBaselineMinYearAtom, 
    tempBaselineMaxYearAtom,
    tempMeasureMinYearAtom,
    tempMeasureMaxYearAtom,
    tempAreaNameAtom,
    areaNameAtom,
    selectedYearAtom,
    landCoverApiAtom,
    lcYearlyGEEDataAtom,
    eviPieChartAtom,
    eviLineChartAtom,
    landCoverChartAtom,
    eviPieChartDataLoadingAtom,
    eviLineChartDataLoadingAtom,
    lcChartDataLoadingAtom
} from '@/state/atoms';
import { fetchLandCoverMap } from '@/fetchers/landCoverMapFetcher';
import { eviLineChartFetcher } from '@/fetchers/eviLineChartFetcher';
import { eviPieChartFetcher } from '@/fetchers/eviPieChartFetcher';
import { landCoverStatsFetcher } from '@/fetchers/landCoverStatsFetcher';

const UpdateMapButton = () => {
    const [area_type] = useAtom(tempAreaTypeAtom);
    const [area_name] = useAtom(tempAreaNameAtom);
    const [area_id] = useAtom(tempAreaIdAtom);
    const [refLow] = useAtom(tempBaselineMinYearAtom);
    const [refHigh] = useAtom(tempBaselineMaxYearAtom);
    const [studyLow] = useAtom(tempMeasureMinYearAtom);
    const [studyHigh] = useAtom(tempMeasureMaxYearAtom);
    const [, setGlobalAreaType] = useAtom(areaTypeAtom);
    const [, setGlobalAreaId] = useAtom(areaIdAtom);
    const [, setGlobalRefLow] = useAtom(baselineMinYearAtom);
    const [, setGlobalRefHigh] = useAtom(baselineMaxYearAtom);
    const [, setGlobalStudyLow] = useAtom(measureMinYearAtom);
    const [, setGlobalStudyHigh] = useAtom(measureMaxYearAtom);
    const [, setLandCoverData] = useAtom(landCoverApiAtom);
    const [, setEviPieChartData] = useAtom(eviPieChartAtom);
    const [, setEviLineChartData] = useAtom(eviLineChartAtom);
    const [, setLCChartData] = useAtom(landCoverChartAtom);
    const [, setLoadingEVIPieChart] = useAtom(eviPieChartDataLoadingAtom);
    const [, setLoadingEVILineChart] = useAtom(eviLineChartDataLoadingAtom);
    const [, setLoadingLCChart] = useAtom(lcChartDataLoadingAtom);
    const[, setGlobalAreaName] = useAtom(areaNameAtom);
    const [mapDataStore, setMapDataStore] = useAtom(lcYearlyGEEDataAtom);
    const [, setSelectedYear] = useAtom(selectedYearAtom);

    // Update landcover map
    const fetchLatestLandCoverMap = async () => {
        const year = studyHigh; 
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year
        };
        const key = JSON.stringify(params);
        if (mapDataStore[key]){
            setLandCoverData(mapDataStore[key]);
        } else {
            try {
                const data = await fetchLandCoverMap(params);
                setLandCoverData(data);
                setMapDataStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            }
        }
    }

    // Update evi pie chart
    const updateEviPieChart = async () => {
        try {
            setLoadingEVIPieChart(true);
            const params = {
                'area_type': area_type,
                'area_id': area_id,
                'refLow': refLow,
                'refHigh': refHigh,
                'studyLow': studyLow,
                'studyHigh': studyHigh
            }
            const key = JSON.stringify(params);

            const data = await eviPieChartFetcher(params);
            // console.log(data)
            const graphDataEVI = [];
            let className = ['Large improvement', 'improvement', 'No Change', 'Under Stress', 'Severe stress'];
            let classColor = ['#264653','#2A9D8F','#E9C46A','#F4A261','#E76F51'];
            let total_area_evi = 0;
            for (var i=0; i< className.length; i++) {
                graphDataEVI.push({ name: className[i], y: data[i], color: classColor[i]});
                total_area_evi = total_area_evi + data[i];
            }
            setEviPieChartData(graphDataEVI);
            setLoadingEVIPieChart(false);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching data:', error);
            setLoadingEVIPieChart(false);
            throw error; 
        } finally {
            setLoadingEVIPieChart(false);
        }
    }

    // Update evi line chart
    const updateEviLineChart = async ()=> {
        try {
            setLoadingEVILineChart(true);
            const params = {
                'area_type': area_type,
                'area_id': area_id,
                'refLow': refLow,
                'refHigh': refHigh,
                'studyLow': studyLow,
                'studyHigh': studyHigh
            }
            const key = JSON.stringify(params);

            const data = await eviLineChartFetcher(params);
            setEviLineChartData(data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching data:', error);
            setLoadingEVILineChart(false);
            throw error; 
        } finally {
            setLoadingEVILineChart(false);
        }
    }

    // Update landcover chart
    const updateLCChart = async () => {
        try {
            setLoadingLCChart(true);
            const params = {
                'area_type': area_type,
                'area_id': area_id,
                'studyLow': studyLow,
                'studyHigh': studyHigh
            }
            const key = JSON.stringify(params);

            const data = await landCoverStatsFetcher(params);
            // console.log(data)
            setLCChartData(data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching data:', error);
            setLoadingLCChart(false);
            throw error; 
        } finally {
            setLoadingLCChart(false);
        }
    }

    const handleClick = () => {
        setGlobalAreaType(area_type);
        setGlobalAreaName(area_name);
        setGlobalAreaId(area_id);
        setGlobalRefLow(refLow);
        setGlobalRefHigh(refHigh);
        setGlobalStudyLow(studyLow);
        setGlobalStudyHigh(studyHigh);
        setSelectedYear(studyHigh);
        fetchLatestLandCoverMap();
        updateEviPieChart();
        updateEviLineChart();
        updateLCChart();
    };
    return <Button variant="contained" mt={5} onClick={handleClick}>Update Map</Button>;
};

export default UpdateMapButton;