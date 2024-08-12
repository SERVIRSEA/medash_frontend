import React from 'react';
import { useAtom } from 'jotai';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Tooltip } from '@mui/material';
import BaselineSlider from './sliders/BaselineSlider';
import MeasureSlider from './sliders/MeasureSlider';
import LayerSelection from './LayerSelection';
import UpdateMapButton from './UpdateMap';

import { 
    tempAreaNameAtom,
    guidingModalAtom,
} from '@/state/atoms';

export default function DashboardControl() {
    const [selectedArea] = useAtom(tempAreaNameAtom);
    const [, setIsGuidingPanelOpen] = useAtom(guidingModalAtom);
    
    const handleOpenGuidingPanel = () => {
        setIsGuidingPanelOpen(true);
    };

    return (
        <div>
            <Accordion defaultExpanded={false}>
                <Tooltip title="Click to expand/hide the panel to update map." arrow>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.25rem' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                            backgroundColor: '#eee',
                            color: "#000",
                            display: 'flex',
                            alignItems: 'center',
                            py: '2px', 
                            px: '16px', 
                            maxHeight: 50, 
                        }}
                    >
                        <Box sx={{ flex: 1, display: "flex", alignItems: "center", margin: 0, padding: 0 }}>
                            <Typography sx={{ display: "inline", marginRight: "4px", fontSize: "12px" }}>
                                Dashboard Controls
                            </Typography>
                            <Tooltip title="Click to popup the start guidance." arrow>
                                <InfoIcon
                                fontSize="14px"
                                onClick={handleOpenGuidingPanel}
                                sx={{ p: "2px", cursor: "pointer" }}
                                />
                            </Tooltip>
                        </Box>
                    </AccordionSummary>
                </Tooltip>
                <AccordionDetails>
                    <Typography sx={{fontSize: "12px" }}>
                        1. Select a time period for the baseline EVI
                    </Typography>
                    <BaselineSlider />
                    <Typography sx={{fontSize: "12px" }}>
                        2. Select a time period to measure
                    </Typography>
                    <MeasureSlider />
                    <Typography sx={{fontSize: "12px" }}>
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