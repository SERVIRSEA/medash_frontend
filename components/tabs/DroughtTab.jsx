import React, {useState} from 'react';
import { useAtom } from 'jotai';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import ShortTermWeatherMap from '../maps/ShortTermWeatherMap';
import SeasonalWeatherMap from '../maps/SeasonalWeatherMap';
import DroughtMap from '../maps/DroughtMap';
import DroughtCalender from '../calender/DroughtCalender';
import LayerNameLegendControl from '../LayerNameLegendControl';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import DroughtLegend from '../legend/DroughtLegend';
import ShortTermWeatherLegend from '../legend/ShortTermWeatherLegend';
import SeasonalWeatherLegend from '../legend/SeasonalWeatherLegend';
import InfoIcon from '@mui/icons-material/Info';
import DroughtModal from '../modals/DroughtModal';
import ShortWeatherModal from '../modals/ShortWeatherModal';
import SeasonalWeatherModal from '../modals/SeasonalWeatherModal';
import { 
    areaNameAtom,
    pastRainfallVisAtom,
    pastTempVisAtom,
    forecastRainfallVisAtom,
    forecastTempVisAtom,
    seasonalRainfallVisAtom,
    seasonalTempVisAtom,
    droughtVisAtom,
    droughtLegendAtom,
    shortTermWeatherLegendAtom,
    longTermWeatherLegendAtom
} from '@/state/atoms';

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
            <Box sx={{ pt: 1, pr: 1 }}>
                <Typography sx={{fontSize: '12px'}}>{children}</Typography>
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
    const [selectedArea] = useAtom(areaNameAtom);
    const [value, setValue] = useState(0);
    const [isShortModalOpen, setIsShortModalOpen] = useState(false);
    const [isSeasonalModalOpen, setIsSeasonalModalOpen] = useState(false);
    const [isDroughtModalOpen, setIsDroughtModalOpen] = useState(false);
    const [, setPastRainfallMapVis] = useAtom(pastRainfallVisAtom);
    const [, setPastTempMapVis] = useAtom(pastTempVisAtom);
    const [, setForecastRainfallMapVis] = useAtom(forecastRainfallVisAtom);
    const [, setForecastTempMapVis] = useAtom(forecastTempVisAtom);
    const [, setSeasonalRainfallMapVis] = useAtom(seasonalRainfallVisAtom);
    const [, setSeasonalTempMapVis] = useAtom(seasonalTempVisAtom);
    const [, setDroughtMapVis] = useAtom(droughtVisAtom);
    const [, setIsShortTermLegend] = useAtom(shortTermWeatherLegendAtom);
    const [, setIsSeasonalLegend] = useAtom(longTermWeatherLegendAtom);
    const [, setIsDroughtLegend] = useAtom(droughtLegendAtom);

    // const handleShortClick = () => {
    //     setIsShortWeatherOpen(!isShortWeatherOpen);
    // };

    const handleOpenShortModal = () => {
        setIsShortModalOpen(true);
    };

    const handleCloseShortModal = () => {
        setIsShortModalOpen(false);
    }

    // const handleSeasonalClick = () => {
    //     setIsSeasonalOpen(!isSeasonalOpen);
    // };

    const handleOpenSeasonalModal = () => {
        setIsSeasonalModalOpen(true);
    };

    const handleCloseSeasonalModal = () => {
        setIsSeasonalModalOpen(false);
    }

    // const handleDroughtClick = () => {
    //     setIsDroughtOpen(!isDroughtOpen);
    // };

    const handleOpenDroughtModal = () => {
        setIsDroughtModalOpen(true);
    };

    const handleCloseDroughtModal = () => {
        setIsDroughtModalOpen(false);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);

        switch (newValue) {
            case 0: // ShortTerm tab
                setPastRainfallMapVis(false);
                setPastTempMapVis(false);
                setForecastRainfallMapVis(false);
                setForecastTempMapVis(true);
                setSeasonalRainfallMapVis(false);
                setSeasonalTempMapVis(false);
                setDroughtMapVis(false);
                setIsShortTermLegend(true);
                setIsSeasonalLegend(false);
                setIsDroughtLegend(false);
                break;
            case 1: // Seasonal tab
                setPastRainfallMapVis(false);
                setPastTempMapVis(false);
                setForecastRainfallMapVis(false);
                setForecastTempMapVis(false);
                setSeasonalRainfallMapVis(false);
                setSeasonalTempMapVis(true);
                setDroughtMapVis(false);
                setIsShortTermLegend(false);
                setIsSeasonalLegend(true);
                setIsDroughtLegend(false);
                break;
            case 2: // Drought tab
                setPastRainfallMapVis(false);
                setPastTempMapVis(false);
                setForecastRainfallMapVis(false);
                setForecastTempMapVis(false);
                setSeasonalRainfallMapVis(false);
                setSeasonalTempMapVis(false);
                setDroughtMapVis(true);
                setIsShortTermLegend(false);
                setIsSeasonalLegend(false);
                setIsDroughtLegend(true);
                break;
            default:
                break;
        }
    };

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
            
            <CustomTabPanel value={value} index={0} pt={0} mt={0}>
                <Box pl={1} sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'inline', marginRight: '4px', fontSize: '12px' }}>MAP LAYERS</Typography>
                    <Tooltip title="Click to view layer info." arrow>
                        <InfoIcon onClick={handleOpenShortModal} sx={{ p: '2px', cursor: 'pointer' }} /> 
                    </Tooltip>
                </Box>
                <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pt={0} pb={0} mb={0}>
                    Selected Area: {selectedArea}
                </Typography>
                <ShortWeatherModal isOpen={isShortModalOpen} onClose={handleCloseShortModal} />
                <Box pl={1} pt={1}>
                    <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: 'bold' }} pt={1}>
                        Short-Term Weather Map
                    </Typography>
                    {/* <LayerNameLegendControl
                        title="Short-Term Weather Map"
                        icon={<LegendToggleIcon />}
                        tooltipTitle="Click to show map legend"
                        onClick={handleShortClick}
                    /> */}
                </Box>
                <ShortTermWeatherMap />
                {/* <Box pl={2} pr={2} pb={1}>
                    {isShortWeatherOpen  && ( <ShortTermWeatherLegend /> )}
                </Box> */}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Box pl={1} sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'inline', marginRight: '4px', fontSize: '12px' }}>MAP LAYERS</Typography>
                    <Tooltip title="Click to view layer info." arrow>
                        <InfoIcon onClick={handleOpenSeasonalModal} sx={{ p: '2px', cursor: 'pointer' }} /> 
                    </Tooltip>
                </Box>
                <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pt={0} pb={0} mb={0}>
                    Selected Area: {selectedArea}
                </Typography>
                <SeasonalWeatherModal isOpen={isSeasonalModalOpen} onClose={handleCloseSeasonalModal} />
                <Box pl={1} pt={1}>
                    <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: 'bold' }} pt={1}>
                        Seasonal Weather Map
                    </Typography>
                    {/* <LayerNameLegendControl
                        title="Seasonal Weather Map"
                        icon={<LegendToggleIcon />}
                        tooltipTitle="Click to show map legend"
                        onClick={handleSeasonalClick}
                    /> */}
                </Box>
                <SeasonalWeatherMap />
                {/* <Box pl={2} pr={2} pb={1}>
                    {isSeasonalOpen  && ( <SeasonalWeatherLegend /> )}
                </Box> */}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Box pl={2} sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'inline', marginRight: '4px', fontSize: '12px' }}>MAP LAYERS</Typography>
                    <Tooltip title="Click to view layer info." arrow>
                        <InfoIcon onClick={handleOpenDroughtModal} sx={{ p: '2px', cursor: 'pointer' }} /> 
                    </Tooltip>
                </Box>
                <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pt={0} pb={0} mb={0}>
                    Selected Area: {selectedArea}
                </Typography>
                <DroughtModal isOpen={isDroughtModalOpen} onClose={handleCloseDroughtModal} />
                <Box pl={2} pr={2} pb={1} pt={1}>
                    {/* <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: 'bold' }} pt={1}>
                        Drought Index Map
                    </Typography> */}
                    {/* <LayerNameLegendControl
                        title="Drought Index Map"
                        icon={<LegendToggleIcon />}
                        tooltipTitle="Click to show drought legend"
                        onClick={handleDroughtClick}
                    /> */}
                </Box>
                <DroughtCalender />
                <DroughtMap />
                {/* <Box pl={2} pr={2} pb={1}>
                    {isDroughtOpen  && ( <DroughtLegend /> )}
                </Box> */}
            </CustomTabPanel>
        </Box>
    );
}