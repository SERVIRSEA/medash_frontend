import * as React from 'react';
import { useAtom } from 'jotai';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RiceMap from '../maps/RiceMap';
import RubberMap from '../maps/RubberMap';
import RiceLineChart from '../charts/RiceLineChart';
import RubberLineChart from '../charts/RubberLineChart';
import { 
    selectedYearRiceAtom,
    selectedYearRubberAtom,
    measureMaxYearAtom,
    areaNameAtom
} from '@/state/atoms';
import RiceAreaBMChart from '../charts/RiceAreaBMChart';
import RubberAreaBMChart from '../charts/RubberAreaBMChart';

export default function CropTabs() {
    const [value, setValue] = React.useState(0);
    const [max] = useAtom(measureMaxYearAtom);
    const [, setSelectedYearRice] = useAtom(selectedYearRiceAtom);
    const [, setSelectedYearRubber] = useAtom(selectedYearRubberAtom);
    const [selectedArea] = useAtom(areaNameAtom);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue == 0){
            setSelectedYearRice(max)
            setSelectedYearRubber(null);
        } else {
            setSelectedYearRice(null)
            setSelectedYearRubber(max);
        }
    };

    return (
        <Box m={0} p={0} sx={{overflowY: "scroll", height: "calc(100vh - 175px)"}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Rice" {...a11yProps(0)} />
                    <Tab label="Rubber" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pt={2} pb={0} mb={0}>
                Selected Area: {selectedArea}
            </Typography>
            <CustomTabPanel value={value} index={0}>
                <RiceMap />
                <br />
                <RiceLineChart />
                <RiceAreaBMChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <RubberMap />
                <br />
                <RubberLineChart />
                <RubberAreaBMChart />
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