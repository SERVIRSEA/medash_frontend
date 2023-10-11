import React from 'react';
import { useAtom } from 'jotai';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BaselineSlider from './sliders/BaselineSlider';
import MeasureSlider from './sliders/MeasureSlider';
import LayerSelection from './LayerSelection';
import UpdateMapButton from './UpdateMap';

import { 
    tempAreaNameAtom
} from '@/state/atoms';

export default function DashboardControl() {
    const [selectedArea] = useAtom(tempAreaNameAtom);
    return (
        <div>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{bgcolor: '#eee', color: "#000"}}
                >
                    <Typography>Dashboard Controls</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        1. Select a time period for the baseline EVI
                    </Typography>
                    <BaselineSlider />
                    <Typography>
                        2. Select a time period to measure
                    </Typography>
                    <MeasureSlider />
                    <Typography>
                        3. Choose a polygon selection method
                    </Typography>
                    <LayerSelection />
                    <Typography variant="body2" sx={{fontSize: '12px', paddingTop: '10px', paddingBottom: '10px'}}>
                        Selected Area: {selectedArea}
                    </Typography>
                    <UpdateMapButton />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}