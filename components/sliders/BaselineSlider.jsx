import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useAtom } from 'jotai';
import { tempBaselineMinYearAtom, tempBaselineMaxYearAtom } from '@/state/atoms';

export default function BaselineSlider() {
    // Get the atom values and setters using useAtom
    const [minYear, setMinYear] = useAtom(tempBaselineMinYearAtom);
    const [maxYear, setMaxYear] = useAtom(tempBaselineMaxYearAtom);

    // Event handler for when the slider values change
    const handleSliderChange = (event, newValue) => {
        setMinYear(newValue[0]);
        setMaxYear(newValue[1]);
    };
    return(
        <Box sx={{ paddingTop: '25px', paddingLeft: "15px", paddingRight: "15px"}}>
            <Slider
                value={[minYear, maxYear]}
                onChange={handleSliderChange}
                valueLabelDisplay="on"
                sx={{
                  '& .MuiSlider-valueLabel': {
                    fontSize: '8px',
                  },
                }}
                min={2003}
                max={2022}
                step={1}
                marks
                size='small'
            />
        </Box>
    )
}