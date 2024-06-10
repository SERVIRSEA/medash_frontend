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
import { measureMinYearAtom, measureMaxYearAtom, areaNameAtom, minYearLandCover, maxYearLandCover, landcoverLegendAtom, eviLegendAtom} from '@/state/atoms';

export default function BiophysicalPanel(){
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    const [minYLC] = useAtom(minYearLandCover);
    const [maxYLC] = useAtom(maxYearLandCover);
    const [isBioModalOpen, setIsBioLayerInfoOpen] = useState(false);
    const [isLCModalOpen, setIsLCLayerInfoOpen] = useState(false);
    const [isLandCoverOpen, setIsLandCoverOpen] = useAtom(landcoverLegendAtom);
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
            <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                MAP LAYERS 
            </Typography>
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                Selected Area: {selectedArea}
            </Typography>
            <LayerNameLegendControl
                title="EVI Map"
                icon={<LegendToggleIcon />}
                tooltipTitle="Click to show EVI legend"
                onClick={handleEviClick}
            />
            <EVIMap />
            {isEviOpen  && ( <EVILegend /> )}
            <LayerNameLegendControl
                title="Land Cover Map"
                icon={<LegendToggleIcon />}
                tooltipTitle="Click to show landcover legend"
                onClick={handleLandCoverClick}
            />
            {isLandCoverOpen  && ( <LandCoverLegend /> )}
            <LandCoverMap />
            <br />
            <Box sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold', display: 'inline', marginRight: '4px' }}>BIOPHYSICAL HEALTH</Typography>
                <InfoIcon onClick={handleOpenBioLayerInfoModal} sx={{ p: '2px', cursor: 'pointer' }} /> 
            </Box>
            <BioInfoModal isOpen={isBioModalOpen} onClose={handleCloseBioModal} />
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={2}>
                From {studyLow} To {studyHigh}
            </Typography>
            <EVIPieChart />
            <br />
            <EVILineChart />
            <Box sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold', display: 'inline', marginRight: '4px' }}>LAND COVER</Typography>
                <InfoIcon onClick={handleOpenLCLayerInfoModal} sx={{ p: '2px', cursor: 'pointer' }} /> 
            </Box>
            <LandCoverInfoModal isOpen={isLCModalOpen} onClose={handleCloseLCModal} />
            <LandCoverChart />
        </Box>
    )
}