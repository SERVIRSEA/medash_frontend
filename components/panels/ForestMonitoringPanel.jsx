import React, { useState } from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { Box, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import ForestGainMap from '../maps/ForestGainMap';
import ForestLossMap from '../maps/ForestLossMap';
import ForestExtentMap from '../maps/ForestExtentMap';
import ForestNonForestChart from '../charts/ForestNonForestChart';
import ForestCoverChart from '../charts/ForestCoverChart';
import ForestChangeGainLossChart from '../charts/ForestChangeGainLossChart';
import ForestGainLoss from '../charts/ForestGainLoss';
import LayerNameLegendControl from '../LayerNameLegendControl';
import ForestGainLossLegend from '../legend/ForestGainLossLegend';
import ForestCoverLegend from '../legend/ForestCoverLegend';
import ForestMonitoringModal from '../modals/ForestMonitoringModal';
import { 
    measureMinYearAtom,
    measureMaxYearAtom,
    areaNameAtom
} from '@/state/atoms';

export default function ForestMonitoringPanel(){
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    const [isGainLossOpen, setIsGainLossOpen] = useState(false);
    const [isForestCoverOpen, setIsForestCoverOpen] = useState(false);
    const [isForestMonOpen, setIsForestMonLayerInfoOpen] = useState(false);
    
    const handleGainLossClick = () => {
        setIsGainLossOpen(!isGainLossOpen);
    };

    const handleForestCoverClick = () => {
        setIsForestCoverOpen(!isForestCoverOpen);
    }

    const handleOpenFMLayerInfoModal = () => {
        setIsForestMonLayerInfoOpen(true);
    };

    const handleCloseFMModal = () => {
        setIsForestMonLayerInfoOpen(false);
    }
    
    return (
        <>
            <Box p={1} sx={{overflowY: "scroll", height: "calc(100vh - 175px)"}}>
                <Box sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'inline', marginRight: '4px', fontSize: '13px'}}>MAP LAYERS</Typography>
                    <Tooltip title="Click to view layer info." arrow>
                        <InfoIcon onClick={handleOpenFMLayerInfoModal} sx={{ p: '2px', cursor: 'pointer' }} /> 
                    </Tooltip>
                </Box>
                <ForestMonitoringModal isOpen={isForestMonOpen} onClose={handleCloseFMModal} />
                <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                    Selected Area: {selectedArea}
                </Typography>
                <Typography variant="body2" pb={1} sx={{ fontSize: '12px', fontWeight: 'bold' }} pt={1}>
                    Forest Gain & Loss Map
                </Typography>
                <ForestGainMap />
                <ForestLossMap />
                <Typography variant="body2" pt={2} sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                    Forest Cover Map
                </Typography>
                <ForestExtentMap />
                <br />
                
                <Typography variant="body2" sx={{fontWeight: 'bold', fontSize: '12px'}} pb={1}>
                    AREA OF FOREST AND NON-FOREST
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} pb={2}>
                    From {studyLow} To {studyHigh}
                </Typography>
                {/* <ForestNonForestChart /> */}
                <br />
                <Typography variant="body2" sx={{fontWeight: 'bold', fontSize: '12px'}} pb={1}>
                    THE CHANGE OF FOREST GAIN AND LOSS
                </Typography>
                {/* <ForestGainLoss /> */}
                 <br />
                {/* <ForestChangeGainLossChart /> */}
            </Box>
        </>
    )
}