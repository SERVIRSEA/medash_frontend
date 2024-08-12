import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
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
    updateTriggerAtom
} from '@/state/atoms';

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
    const[, setGlobalAreaName] = useAtom(areaNameAtom);
    const [, setSelectedYear] = useAtom(selectedYearAtom);
    const [, setUpdateTrigger] = useAtom(updateTriggerAtom);

    const handleClick = () => {
        setGlobalAreaType(area_type);
        setGlobalAreaName(area_name);
        setGlobalAreaId(area_id);
        setGlobalRefLow(refLow);
        setGlobalRefHigh(refHigh);
        setGlobalStudyLow(studyLow);
        setGlobalStudyHigh(studyHigh);
        setSelectedYear(studyHigh);
        setUpdateTrigger((prev) => prev + 1);
    };
    return (
        <Tooltip title="Click to update map and statistics based on selected periods and area." arrow>
            <Button variant="contained" mt={5} onClick={handleClick} size='small' sx={{fontSize: '12px'}}>Update Map</Button>
        </Tooltip>
    );
};

export default UpdateMapButton;