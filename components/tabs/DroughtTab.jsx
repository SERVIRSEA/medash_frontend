import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ShortTermWeatherMap from '../maps/ShortTermWeatherMap';
import SeasonalWeatherMap from '../maps/SeasonalWeatherMap';
import DroughtMap from '../maps/DroughtMap';
import DroughtCalender from '../DroughtCalender';
import LayerNameLegendControl from '../LayerNameLegendControl';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import DroughtLegend from '../legend/DroughtLegend';
import InfoIcon from '@mui/icons-material/Info';
import DroughtModal from '../modals/DroughtModal';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box sx={{ pt: 3, pr: 1 }}>
                <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function DroughtTab() {
    const [value, setValue] = useState(0);
    const [isLandCoverOpen, setIsLandCoverOpen] = useState(false);
    const [isDroughtOpen, setIsDroughtOpen] = useState(false);
    const [isDroughtModalOpen, setIsDroughtModalOpen] = useState(false);

    const handleDroughtClick = () => {
        setIsDroughtOpen(!isDroughtOpen);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpenDroughtModal = () => {
        setIsDroughtModalOpen(true);
    };

    const handleCloseDroughtModal = () => {
        setIsDroughtModalOpen(false);
    }

    return (
        <Box m={0} p={0} sx={{ overflowY: "scroll", height: "calc(100vh - 175px)", width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
                >
                    <Tab label="Short-Term Weather" {...a11yProps(0)} sx={{ whiteSpace: 'normal', maxWidth: '140px', fontSize: '12px' }} />
                    <Tab label="Seasonal Weather" {...a11yProps(1)} sx={{ whiteSpace: 'normal', maxWidth: '30px', fontSize: '12px' }} />
                    <Tab label="Drought" {...a11yProps(2)} sx={{ whiteSpace: 'normal', minWidth: 'auto', fontSize: '12px' }} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ShortTermWeatherMap />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <SeasonalWeatherMap />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Box pl={2} sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'inline', marginRight: '4px' }}>MAP LAYERS</Typography>
                    <InfoIcon onClick={handleOpenDroughtModal} sx={{ p: '2px', cursor: 'pointer' }} /> 
                </Box>
                <DroughtModal isOpen={isDroughtModalOpen} onClose={handleCloseDroughtModal} />
                <Box pl={2} pr={2} pb={1}>
                    <LayerNameLegendControl
                        title="Drought Index Map"
                        icon={<LegendToggleIcon />}
                        tooltipTitle="Click to show drought legend"
                        onClick={handleDroughtClick}
                    />
                </Box>
                <DroughtCalender />
                <DroughtMap />
                <Box pl={2} pr={2} pb={1}>
                    {isDroughtOpen  && ( <DroughtLegend /> )}
                </Box>
            </CustomTabPanel>
        </Box>
    );
}