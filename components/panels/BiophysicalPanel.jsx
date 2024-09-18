import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Typography, Box, IconButton, Tooltip } from '@mui/material';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import InfoIcon from '@mui/icons-material/Info';
import EVIMap from '../maps/EVIMap';
import LandCoverMap from '../maps/LandCoverMap';
import EVIPieChart from '../charts/EVIPieChart';
import EVILineChart from '../charts/EVILineChart';
import LandCoverChart from '../charts/LandCoverChart';
import LayerNameLegendControl from '../LayerNameLegendControl';
import EVILegend from '../legend/EVILegend';
import LandCoverLegend from '../legend/LandCoverLegend';
import BioInfoModal from '../modals/BioInfoModal';
import LandCoverInfoModal from '../modals/LandCoverInfoModal';
import { measureMinYearAtom, measureMaxYearAtom, areaNameAtom, minYearLandCover, maxYearLandCover, lcLegendAtom, eviLegendAtom} from '@/state/atoms';

export default function BiophysicalPanel(){
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    const [minYLC] = useAtom(minYearLandCover);
    const [maxYLC] = useAtom(maxYearLandCover);
    const [isBioModalOpen, setIsBioLayerInfoOpen] = useState(false);
    const [isLCModalOpen, setIsLCLayerInfoOpen] = useState(false);
    const [isLandCoverOpen, setIsLandCoverOpen] = useAtom(lcLegendAtom);
    const [isEviOpen, setIsEviOpen] = useAtom(eviLegendAtom);

    const handleLandCoverClick = () => {
        setIsLandCoverOpen(!isLandCoverOpen);
    };
    
    const handleEviClick = () => {
        setIsEviOpen(!isEviOpen);
    };

    const handleOpenBioLayerInfoModal = () => {
        setIsBioLayerInfoOpen(true);
    };

    const handleCloseBioModal = () => {
        setIsBioLayerInfoOpen(false);
    }

    const handleOpenLCLayerInfoModal = () => {
        setIsLCLayerInfoOpen(true);
    };

    const handleCloseLCModal = () => {
        setIsLCLayerInfoOpen(false);
    }

    return(
        <Box p={1} sx={{overflowY: "scroll", height: "calc(100vh - 175px)"}}>
            <Typography variant="body2" sx={{fontWeight: 'bold', fontSize: '13px'}}>
                MAP LAYERS 
            </Typography>
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                Selected Area: {selectedArea}
            </Typography>
            <Box sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: 'bold' }} pt={1}>
                    Enhanced Vegetation Index (EVI)
                </Typography>
                <Tooltip title="Click to view layer info." arrow>
                    <InfoIcon onClick={handleOpenBioLayerInfoModal} sx={{ pt: '8px', cursor: 'pointer' }} /> 
                </Tooltip>
            </Box>
            <EVIMap />
            <Box sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: 'bold' }} pt={1}>
                    Land Cover
                </Typography>
                <Tooltip title="Click to view layer info." arrow>
                    <InfoIcon onClick={handleOpenLCLayerInfoModal} sx={{ pt: '8px', cursor: 'pointer' }} /> 
                </Tooltip>
            </Box>
            <LandCoverMap />
            <br />
            <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold', display: 'inline', marginRight: '4px' }}>BIOPHYSICAL HEALTH</Typography>
            <BioInfoModal isOpen={isBioModalOpen} onClose={handleCloseBioModal} />
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={2}>
                From {studyLow} To {studyHigh}
            </Typography>
            <EVIPieChart /> 
            
            <EVILineChart />
            <Typography variant="body2"  sx={{ fontSize: '12px', fontWeight: 'bold', display: 'inline', marginRight: '4px' }}>LAND COVER</Typography>
            <LandCoverInfoModal isOpen={isLCModalOpen} onClose={handleCloseLCModal} />
            <LandCoverChart />
        </Box>
    )
}