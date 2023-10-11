import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useAtom } from 'jotai';
import { tempMeasureMinYearAtom, tempMeasureMaxYearAtom } from '@/state/atoms';

export default function MeasureSlider() {
    // Get the atom values and setters using useAtom
    const [minYear, setMinYear] = useAtom(tempMeasureMinYearAtom);
    const [maxYear, setMaxYear] = useAtom(tempMeasureMaxYearAtom);

    // Event handler for when the slider values change
    const handleSliderChange = (event, newValue) => {
        setMinYear(newValue[0]);
        setMaxYear(newValue[1]);
    };
    return(
        <Box sx={{ paddingTop: '35px', paddingLeft: "15px", paddingRight: "15px"}}>
            <Slider
                value={[minYear, maxYear]}
                onChange={handleSliderChange}
                valueLabelDisplay="on"
                valueLabelStyle={{ fontSize: 10 }}
                min={2000}
                max={2030}
                step={1}
                marks
            />
        </Box>
    )
}