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
    minYearForestGain, 
    maxYearForestGain, 
    lcVisibilityAtom, 
    forestGainVisibilityAtom,
    forestLossVisibilityAtom,
    riceVisibilityAtom, 
    fireVisibilityAtom,
    selectedYearAtom,
    selectedYearRiceAtom,
    selectedYearFireAtom,
    forestGainApiAtom,
    forestLossApiAtom,
    landCoverApiAtom,
    fireApiAtom,
    isLoadingAtom,
    riceApiAtom,
    bioTextAtom,
    textForestReportAtom,
    forestNetChangeTextAtom,
    forestGainTextAtom,
    forestBaselineLossTextAtom,
    forestStudyLossTextAtom,
    forestLossPercentTextAtom,
    forestCoverGainLossTextAtom,
    riceAreaTextAtom,
    rubberAreaTextAtom,
    fireHotspotTextAtom,
    landcoverTextAtom,
    areaTypeAtom,
    areaIdAtom
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
    const [min] = useAtom(minYearForestGain);
    const [max] = useAtom(maxYearForestGain);
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [textBioReport] = useAtom(bioTextAtom); 
    const [textLandCover] = useAtom(landcoverTextAtom); 
    const [textForestReport] = useAtom(textForestReportAtom);
    const [textForestNetChange] = useAtom(forestNetChangeTextAtom);
    const [textForestGain] = useAtom(forestGainTextAtom);
    const [textForestBaselineLoss] = useAtom(forestBaselineLossTextAtom);
    const [textForestStudyLoss] = useAtom(forestStudyLossTextAtom);
    const [textForestLossPercent] = useAtom(forestLossPercentTextAtom); 
    const [textForestCoverGainLoss] = useAtom(forestCoverGainLossTextAtom); 
    const [textRiceArea] = useAtom(riceAreaTextAtom); 
    const [textRubberArea] = useAtom(rubberAreaTextAtom); 
    const [textFireHotspot] = useAtom(fireHotspotTextAtom); 
    const [selectedAreaType] = useAtom(areaTypeAtom); 
    const [selectedAreaId] = useAtom(areaIdAtom);
    const [selectedArea] = useAtom(areaNameAtom); 

    
    
    const [, setRiceMapVisibility] = useAtom(riceVisibilityAtom);
    const [, setLCMapVisibility] = useAtom(lcVisibilityAtom);
    const [, setFireMapVisibility] = useAtom(fireVisibilityAtom);
    const [, setForestGainMapVisibility] = useAtom(forestGainVisibilityAtom);
    const [, setForestLossMapVisibility] = useAtom(forestLossVisibilityAtom);
    const [, setSelectedYearLC] = useAtom(selectedYearAtom);
    const [, setSelectedYearRice] = useAtom(selectedYearRiceAtom);
    const [, setSelectedYearFire] = useAtom(selectedYearFireAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [, setFireData] = useAtom(fireApiAtom);
    const [, setRiceData] = useAtom(riceApiAtom);
    const [, setForestGainData] = useAtom(forestGainApiAtom);
    const [, setForestLossData] = useAtom(forestLossApiAtom);
    const [, setLandCoverData] = useAtom(landCoverApiAtom);


    useEffect(() => {
        // Set LC Map visibility to true when component mounts
        setLCMapVisibility(true);
        setSelectedYearLC(studyHigh);

    }, []);

    useEffect(() => {
        if(selectedAreaId) {
            if (value === 1) {
                fetchForestGainMap();
                fetchForestLossMap();
            } else if (value == 2) {
                fetchRiceMapData();
            } else if (value === 3) {
                fetchFireMap();
            } else {
                fetchLandcoverMap();
            }
          }
    }, [value, selectedAreaId]);

    const handleChange = (event, newValue) => {
        setValue(newValue);

        const visibilityMappings = {
            0: { lcMap: true },
            1: { forestGainMap: true, forestLossMap: true },
            2: { riceMap: true },
            3: { fireMap: true },
        };

        if (newValue == 0){
            setSelectedYearLC(studyHigh);
        } else if(newValue == 2) {
            setSelectedYearRice(studyHigh);
        } else if(newValue == 3) {
            setSelectedYearFire(studyHigh);
        } 
        
        const mapVisibility = visibilityMappings[newValue] || {};

        setForestGainMapVisibility(mapVisibility.forestGainMap || false);
        setForestLossMapVisibility(mapVisibility.forestLossMap || false);
        setRiceMapVisibility(mapVisibility.riceMap || false);
        setLCMapVisibility(mapVisibility.lcMap || false);
        setFireMapVisibility(mapVisibility.fireMap || false);
    };

    const fetchForestGainMap = async () => {
        setIsLoading(true);
        const action = 'get-forest-gain-map';
        const params = {
            'area_type': selectedAreaType,
            'area_id': selectedAreaId,
            'studyLow': min,
            'studyHigh': max,
        };
        try {
            const data = await Fetcher(action, params);
            setForestGainData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; 
        } finally {
            setIsLoading(false);
        }
    }

    const fetchLandcoverMap = async () => {
        setIsLoading(true);
        const action = 'get-landcover-map';
        const params = {
            'area_type': selectedAreaType,
            'area_id': selectedAreaId,
            'year': max
        };
        try {
            const data = await Fetcher(action, params);
            setLandCoverData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; 
        } finally {
            setIsLoading(false);
        }
    }

    const fetchForestLossMap = async () => {
        setIsLoading(true);
        const params = {
            'area_type': selectedAreaType,
            'area_id': selectedAreaId,
            'studyLow': min,
            'studyHigh': max,
        };
        const action = 'get-forest-loss-map';
        try {
            const data = await Fetcher(action, params);
            setForestLossData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; 
        } finally {
            setIsLoading(false);
        }
    }

    const fetchRiceMapData = async () => {
        setIsLoading(true);
        const action = 'get-landcover-rice-map';
        const params = {
            'area_type': selectedAreaType,
            'area_id': selectedAreaId,
            'year': studyHigh,
        };
        try {
            const data = await Fetcher(action, params);
            setRiceData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFireMap = async () => {
        setIsLoading(true);
        const action = 'get-burned-area';
        const params = {
            'area_type': selectedAreaType,
            'area_id': selectedAreaId,
            'year': studyHigh
        };
        try {
            const data = await Fetcher(action, params);
            setFireData(data);
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
                    BIOPHYSICAL HEALTH
                </Typography>

                <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pb={2}>
                    {textBioReport}
                </Typography>

                <EVIPieChart />
                <br />
                <EVILineChart />
                <br />

                <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}} p={1}>
                    LAND COVER
                </Typography>
                

                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    Interactive charts and maps below summarize land cover change in {selectedArea} in baseline peroid ({refLow} to {refHigh}) and evaluation peroid ({studyLow} to {studyHigh}). 
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    {textLandCover}
                </Typography>

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

                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    {textForestReport}
                </Typography>

                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    {textForestGain}
                </Typography>

                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    {textForestCoverGainLoss}
                </Typography>

                
                <ForestNonForestChart />
                <br />
                <Typography variant="body2" sx={{fontWeight: 'bold'}} p={1}>
                    THE CHANGE OF FOREST GAIN AND LOSS
                </Typography>

                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    {textForestBaselineLoss}
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    {textForestStudyLoss}
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    {textForestLossPercent}
                </Typography>

                {/* <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                    {textForestNetChange}
                </Typography> */}

                {/* <ForestGainLoss /> */}
                 <br />
                <ForestChangeGainLossChart />



            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>

                <Typography variant="body2" sx={{fontWeight: 'bold'}} p={1}>
                    RICE 
                </Typography>

                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    {textRiceArea}
                </Typography>
                <RiceLineChart />
                <br />
                <Typography variant="body2" sx={{fontWeight: 'bold'}} p={1}>
                    RUBBER 
                </Typography>

                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    {textRubberArea}
                </Typography>

                <RubberLineChart />

            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}} pl={1} pt={1} pb={1}>
                    NUMBER OF FIRE HOTSPOT
                </Typography>

                <Typography variant="body2" sx={{fontSize: '12px'}} p={1}>
                    {textFireHotspot}
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
  