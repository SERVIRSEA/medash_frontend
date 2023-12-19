import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ShortTermWeatherMap from '../maps/ShortTermWeatherMap';
import SeasonalWeatherMap from '../maps/SeasonalWeatherMap';
import DroughtMap from '../maps/DroughtMap';

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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
            <CustomTabPanel value={value} index={0}>
                <ShortTermWeatherMap />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <SeasonalWeatherMap />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <DroughtMap />
            </CustomTabPanel>
        </Box>
    );
}