import React, { useState } from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { Box, Tooltip } from '@mui/material';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import InfoIcon from '@mui/icons-material/Info';
import LayerNameLegendControl from '../LayerNameLegendControl';
import FireLegend from '../legend/FireLegend';
import FireInfoModal from '../modals/FireInfoModal';
import { 
    measureMinYearAtom,
    measureMaxYearAtom,
    areaNameAtom
} from '@/state/atoms';
import FireMap from '../maps/FireMap';
import FireHotspotChart from '../charts/FireHotspotChart';

export default function FireHotspotPanel(){
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    const [isFireOpen, setIsFireOpen] = useState(false);
    const [isFireHotspotOpen, setIsFireHotspotInfoOpen] = useState(false);

    const handleOpenFireInfoModal = () => {
        setIsFireHotspotInfoOpen(true);
    };

    const handleCloseFireModal = () => {
        setIsFireHotspotInfoOpen(false);
    }

    const handleFireClick = () => {
        setIsFireOpen(!isFireOpen);
    };

    return(
        <Box sx={{overflowY: "scroll", height: "calc(100vh - 175px)"}} pt={1} pl={1}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '13px', display: 'inline', marginRight: '4px' }}>MAP LAYERS</Typography>
            <FireInfoModal isOpen={isFireHotspotOpen} onClose={handleCloseFireModal} />
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                Selected Area: {selectedArea}
            </Typography>
            <Box sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '12px', display: 'inline', marginRight: '4px' }}>Fire Hotspot</Typography>
                <Tooltip title="Click to view layer info." arrow>
                    <InfoIcon onClick={handleOpenFireInfoModal} sx={{ pt: '2px', cursor: 'pointer' }} /> 
                </Tooltip>
            </Box>
            {/* <LayerNameLegendControl
                title="Fire Hotspot Map"
                icon={<LegendToggleIcon />}
                tooltipTitle="Click to show fire hotspot legend"
                onClick={handleFireClick}
            />
            {isFireOpen  && ( <FireLegend /> )} */}
            <FireMap />
            <br />
            <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}} pb={1}>
                NUMBER OF FIRE HOTSPOT
            </Typography>
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={2}>
                From {studyLow} To {studyHigh}
            </Typography>
            <FireHotspotChart />
        </Box>
    )
}