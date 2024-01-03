import * as React from 'react';
import { useAtom } from 'jotai';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { 
    measureMinYearAtom,
    measureMaxYearAtom,
    areaNameAtom 
} from '@/state/atoms';
import EVIPieChart from '../charts/EVIPieChart';
import EVILineChart from '../charts/EVILineChart';
import RiceLineChart from '../charts/RiceLineChart';
import RubberLineChart from '../charts/RubberLineChart';
import FireHotspotChart from '../charts/FireHotspotChart';
import ForestCoverChart from '../charts/ForestCoverChart';
import ForestNonForestChart from '../charts/ForestNonForestChart';

export default function ReportTabs() {
    const [value, setValue] = React.useState(0);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [selectedArea] = useAtom(areaNameAtom);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box m={0} p={0} sx={{ overflowY: 'scroll', height: 'calc(100vh - 175px)' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="report tabs" sx={{ width: '100%' }}>
                <Tab label="Biophysical" {...a11yProps(0)} sx={{ fontSize: '12px', margin: 0, paddingRight: '5px', minWidth: 'auto' }} />
                <Tab label="Crop" {...a11yProps(1)} sx={{ fontSize: '12px', margin: 0, paddingRight: '5px', minWidth: 'auto' }} />
                <Tab label="Fire" {...a11yProps(2)} sx={{ fontSize: '12px', margin: 0, paddingRight: '5px', minWidth: 'auto' }} />
                <Tab label="Forest" {...a11yProps(3)} sx={{ fontSize: '12px', margin: 0, paddingRight: '5px', minWidth: 'auto' }} />
                </Tabs>
            </Box>
            <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pt={2} pb={0} mb={0}>
                Selected Area: {selectedArea}
            </Typography>
            <CustomTabPanel value={value} index={0}>
                <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}} p={1}>
                    BIOPHYSICAL HEALTH
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pb={2}>
                    From {studyLow} To {studyHigh}
                </Typography>
                <EVIPieChart />
                <br />
                <EVILineChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <RiceLineChart />
                <br />
                <RubberLineChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}} pl={1} pt={1} pb={1}>
                    NUMBER OF FIRE HOTSPOT
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pb={2}>
                    From {studyLow} To {studyHigh}
                </Typography>
                <FireHotspotChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}} pl={1} pb={1}>
                    AREA OF FOREST COVER
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pb={2}>
                From {studyLow} To {studyHigh}
                </Typography>
                <ForestCoverChart />
                <br />
                <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}} pl={1} pb={1}>
                    AREA OF FOREST AND NON-FOREST
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pb={2}>
                    From {studyLow} To {studyHigh}
                </Typography>
                <ForestNonForestChart />
            </CustomTabPanel>
        </Box>
    );
}

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
  