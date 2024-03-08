import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { 
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    areaNameAtom,
    lcVisibilityAtom, 
    forestGainVisibilityAtom,
    forestLossVisibilityAtom,
    riceVisibilityAtom, 
    fireVisibilityAtom,
    selectedYearAtom,
    selectedYearRiceAtom,
    selectedYearFireAtom,
    fireApiAtom,
    isLoadingAtom,
    fireYearlyMapDataStoreAtom
} from '@/state/atoms';
import EVIPieChart from '../charts/EVIPieChart';
import EVILineChart from '../charts/EVILineChart';
import RiceLineChart from '../charts/RiceLineChart';
import RubberLineChart from '../charts/RubberLineChart';
import FireHotspotChart from '../charts/FireHotspotChart';
import ForestCoverChart from '../charts/ForestCoverChart';
import ForestNonForestChart from '../charts/ForestNonForestChart';
import LandCoverChart from '../charts/LandCoverChart';
import ForestChangeGainLossChart from '../charts/ForestChangeGainLossChart';
import ForestGainLoss from '../charts/ForestGainLoss';
import { Fetcher } from "@/fetchers/Fetcher";

export default function ReportTabs() {
    const [value, setValue] = useState(0);
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    const [, setRiceMapVisibility] = useAtom(riceVisibilityAtom);
    const [, setLCMapVisibility] = useAtom(lcVisibilityAtom);
    const [, setFireMapVisibility] = useAtom(fireVisibilityAtom);
    const [, setForestGainMapVisibility] = useAtom(forestGainVisibilityAtom);
    const [, setForestLossMapVisibility] = useAtom(forestLossVisibilityAtom);
    const [, setSelectedYearLC] = useAtom(selectedYearAtom);
    const [, setSelectedYearRice] = useAtom(selectedYearRiceAtom);
    const [, setSelectedYearFire] = useAtom(selectedYearFireAtom);
    const [, setFireMapStore] = useAtom(fireYearlyMapDataStoreAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [fireData, setFireData] = useAtom(fireApiAtom);

    useEffect(() => {
        // Set LC Map visibility to true when component mounts
        setLCMapVisibility(true);
        setSelectedYearLC(studyHigh);
    }, []);

    useEffect(() => {
        if (value === 3 && !fireData) {
            fetchFireMap();
        }
    }, [value, fireData]);

    const handleChange = (event, newValue) => {
        setValue(newValue);

        const visibilityMappings = {
            0: { lcMap: true },
            1: { forestGainMap: true, forestLossMap: true },
            2: { riceMap: true },
            3: { fireMap: true },
        };

        if (newValue == 0){
            setSelectedYearLC(studyHigh)
        } else if(newValue == 2) {
            setSelectedYearRice(studyHigh)
        } 

        const mapVisibility = visibilityMappings[newValue] || {};

        setForestGainMapVisibility(mapVisibility.forestGainMap || false);
        setForestLossMapVisibility(mapVisibility.forestLossMap || false);
        setRiceMapVisibility(mapVisibility.riceMap || false);
        setLCMapVisibility(mapVisibility.lcMap || false);
        setFireMapVisibility(mapVisibility.fireMap || false);
    };

    const fetchFireMap = async () => {
        setIsLoading(true);
        const action = 'get-burned-area';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': studyHigh
        };
        // const key = JSON.stringify(params);
        try {
            const data = await Fetcher(action, params);
            setFireData(data);
            console.log(data)
            // setFireMapStore(prev => ({ ...prev, [key]: data }));
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; 
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Box m={0} p={0} sx={{ overflowY: 'scroll', height: 'calc(100vh - 270px)' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="report tabs" sx={{ width: '100%' }}>
                    <Tab 
                        {...a11yProps(0)} 
                        sx={{ minWidth: 'auto' }} 
                        label={
                            <Typography variant="subtitle2" sx={{ fontSize: '12px', margin: 0, paddingRight: '5px', textAlign: 'center', lineHeight: '1.2' }}>
                                Land cover <br /> and Biophysical health
                            </Typography>
                        } 
                    />
                    <Tab 
                        {...a11yProps(1)} 
                        sx={{ minWidth: 'auto' }} 
                        label={
                            <Typography variant="subtitle2" sx={{ fontSize: '12px', margin: 0, paddingRight: '5px', textAlign: 'center', lineHeight: '1.2' }}>
                                Forest monitoring / <br /> forest alerts
                            </Typography>
                        } 
                    />
                    <Tab 
                        {...a11yProps(2)} 
                        sx={{ minWidth: 'auto' }} 
                        label={
                            <Typography variant="subtitle2" sx={{ fontSize: '12px', margin: 0, paddingRight: '5px', textAlign: 'center', lineHeight: '1.2' }}>
                                Crop monitoring
                            </Typography>
                        } 
                    />
                    <Tab 
                        {...a11yProps(3)} 
                        sx={{ minWidth: 'auto' }} 
                        label={
                            <Typography variant="subtitle2" sx={{ fontSize: '12px', margin: 0, paddingRight: '5px', textAlign: 'center', lineHeight: '1.2' }}>
                                Fire hotspot
                            </Typography>
                        } 
                    />
                </Tabs>
            </Box>
            {/* <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pt={2} pb={0} mb={0}>
                Selected Area: {selectedArea}
            </Typography> */}
            <CustomTabPanel value={value} index={0}>
                <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}} p={1}>
                    LAND COVER
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    In {studyLow}, Cambodia (selected region) had XX  Mha of natural forest, extending over XX% of its land area. 
                    In {studyHigh}, it lost XX ha of forest. 
                    In XX% of forest lost, there are XX% has been converted to agriculture land.
                    In the period  {studyLow} - {studyHigh}, Agriculture land includes all crop types have changed from from XX ha to XX ha, equivalent of XX% of its land area. 
                    Urban areas have changed from XX ha to XX ha, equivalent of XX% of its land area.
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    Interactive charts and maps below summarize land cover change in Cambodia (selected region)  From XXXX (Starting year of evaluation) To XXXX(Ending year of evaluation period) . 
                </Typography>

                <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}} p={1}>
                    BIOPHYSICAL HEALTH
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pb={2}>
                    From {studyLow} To {studyHigh}
                </Typography>
                <EVIPieChart />
                <br />
                <EVILineChart />
                <br />
                <LandCoverChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {/* <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}} pl={1} pb={1}>
                    AREA OF FOREST COVER
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pb={2}>
                From {studyLow} To {studyHigh}
                </Typography>
                <ForestCoverChart />
                <br /> */}
                <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}} pl={1} pb={1}>
                    AREA OF FOREST AND NON-FOREST
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pb={2}>
                    From {studyLow} To {studyHigh}
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    From {studyLow} to {studyHigh}, {selectedArea} lost XXX ha of forest cover, equivalent to XXX% decrease in forest cover since {studyLow}. The most forest loss recorded in a year for {selectedArea} was in XXXX, with XXXX ha forest cover loss in a year.
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    In the period of {studyLow} to {studyHigh} the max landcover overlap with forest loss is the most contributor to the forest loss in {selectedArea} with of category of max SUM of forest loss overlap with land cover ha, equivalent of percentage of deforestation of previous value / total area of interest % of total total area of interest area.
                </Typography>
                <ForestNonForestChart />
                <br />
                <Typography variant="body2" sx={{fontWeight: 'bold'}} pb={1}>
                    THE CHANGE OF FOREST GAIN AND LOSS
                </Typography>
                <ForestGainLoss />
                 <br />
                <ForestChangeGainLossChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <RiceLineChart />
                <br />
                <RubberLineChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}} pl={1} pt={1} pb={1}>
                    NUMBER OF FIRE HOTSPOT
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pb={2}>
                    From {studyLow} To {studyHigh}
                </Typography>
                <FireHotspotChart />
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
  