import React, { useState } from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { Box, Tooltip } from '@mui/material';
import LayerNameLegendControl from '../LayerNameLegendControl';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import InfoIcon from '@mui/icons-material/Info';
import ForestAlertModal from '../modals/ForestAlertModal';
import { 
    areaNameAtom
} from '@/state/atoms';
import GLADAlertMap from '../maps/GLADAlertMap';
import SARAlertMap from '../maps/SARAlertMap';
import GLADAlertChart from '../charts/GLADAlertChart';
import SARAlertChart from '../charts/SARAlertChart';
import GLADAlertLegend from '../legend/GLADAlertLegend';
import SARAlertLegend from '../legend/SARAlertLegend';
import SARFDASMap from '../maps/SARFDASMap';
import SARFDASAlertLegend from '../legend/SARFDASAlertLegend';
import SARFDASAlertChart from '../charts/SARFDASAlertChart';

export default function ForestAlertPanel(){
    const [selectedArea] = useAtom(areaNameAtom);
    const [isGLADOpen, setIsGLADOpen] = useState(false);
    const [isSAROpen, setIsSAROpen] = useState(false);
    const [isSARFDASOpen, setIsSARFDASOpen] = useState(false);
    const [isForestAlertOpen, setIsForestAlertInfoOpen] = useState(false);

    const handleOpenFALayerInfoModal = () => {
        setIsForestAlertInfoOpen(true);
    };

    const handleCloseFAModal = () => {
        setIsForestAlertInfoOpen(false);
    }

    const handleGLADClick = () => {
        setIsGLADOpen(!isGLADOpen);
    };
    
    const handleSARClick = () => {
        setIsSAROpen(!isSAROpen);
    };

    const handleSARFDASClick = () => {
        setIsSARFDASOpen(!isSARFDASOpen);
    };

    return (
        <Box sx={{overflowY: "scroll", height: "calc(100vh - 175px)"}} pl={1} pt={1}>
            <Box sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'inline', marginRight: '4px', fontSize: '13px' }}>MAP LAYERS</Typography>
                <Tooltip title="Click to view layer info." arrow>
                    <InfoIcon onClick={handleOpenFALayerInfoModal} sx={{ p: '2px', cursor: 'pointer' }} /> 
                </Tooltip>
            </Box>
            <ForestAlertModal isOpen={isForestAlertOpen} onClose={handleCloseFAModal} />
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                Selected Area: {selectedArea}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: 'bold' }} pt={1}>
                Deforestation Area from GLAD Alert System
            </Typography>
            {/* <LayerNameLegendControl
                title="Deforestation Area from GLAD Alert System"
                icon={<LegendToggleIcon />}
                tooltipTitle="Click to show GLAD alert legend"
                onClick={handleGLADClick}
            /> */}
            <GLADAlertMap />
            {/* {isGLADOpen  && ( <GLADAlertLegend /> )} */}
            
            {/* <LayerNameLegendControl
                title="Deforestation Area from SAR Alert System"
                icon={<LegendToggleIcon />}
                tooltipTitle="Click to show SAR alert legend"
                onClick={handleSARClick}
            />
            <br />
            <SARAlertMap />
            {isSAROpen  && ( <SARAlertLegend /> )} */}
            {/* <br /> */}
            <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: 'bold' }} pt={1}>
                Consolidated of GLAD and SAR Alert
            </Typography>
            {/* <LayerNameLegendControl
                title="Consolidated of GLAD and SAR Alert"
                icon={<LegendToggleIcon />}
                tooltipTitle="Click to show SARFDAS alert legend"
                onClick={handleSARFDASClick}
            /> */}
            <SARFDASMap />
            {/* {isSARFDASOpen  && ( <SARFDASAlertLegend /> )} */}
            
            <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold' }} pt={1}>
                TOTAL AREA OF GLAD ALERT SYSTEM 
            </Typography>
            <br />
            <GLADAlertChart />
            <br />
            {/* <Typography variant="body2">
                TOTAL AREA OF SAR ALERT SYSTEM 
            </Typography>
            <br />
            <SARAlertChart /> */}
            <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold' }} pt={1}>
                TOTAL AREA OF CONSOLIDATED GLAD & SAR ALERT SYSTEM 
            </Typography>
            <br />
            <SARFDASAlertChart />
        </Box>
    )
}