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
    rubberVisibilityAtom,
    selectedYearAtom,
    selectedYearRiceAtom,
    selectedYearRubberAtom,
    selectedYearFireAtom,
    forestGainApiAtom,
    forestLossApiAtom,
    landCoverApiAtom,
    fireApiAtom,
    isLoadingAtom,
    riceApiAtom,
    rubberApiAtom,
    bioTextAtom,
    textForestReportAtom,
    forestNetChangeTextAtom,
    forestBaselineLossTextAtom,
    forestStudyLossTextAtom,
    forestLossPercentTextAtom,
    forestCoverGainLossTextAtom,
    riceAreaTextAtom,
    rubberAreaTextAtom,
    fireHotspotTextAtom,
    landcoverTextAtom,
    areaTypeAtom,
    areaIdAtom,
    forestChangesTextAtom,
    riceLegendAtom,
    rubberLegendAtom,
    fireLegendAtom,
    lcLegendAtom,
    forestGainLegendAtom,
    forestLossLegendAtom, 
} from '@/state/atoms';
import EVIPieChart from '../charts/EVIPieChart';
import EVILineChart from '../charts/EVILineChart';
import RiceLineChart from '../charts/RiceLineChart';
import RubberLineChart from '../charts/RubberLineChart';
import FireHotspotChart from '../charts/FireHotspotChart';
import ForestCoverChart from '../charts/ForestCoverChart';
import ForestNonForestChart from '../charts/ForestNonForestChart';
import LandCoverChart from '../charts/LandCoverChart';
import ForestChangesChart from '../charts/ForestChangesChart';
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
    const [textForestChanges] = useAtom(forestChangesTextAtom); 
    
    const [, setRiceMapVisibility] = useAtom(riceVisibilityAtom);
    const [, setRubberMapVisibility] = useAtom(rubberVisibilityAtom);
    const [, setLCMapVisibility] = useAtom(lcVisibilityAtom);
    const [, setFireMapVisibility] = useAtom(fireVisibilityAtom);
    const [, setForestGainMapVisibility] = useAtom(forestGainVisibilityAtom);
    const [, setForestLossMapVisibility] = useAtom(forestLossVisibilityAtom);
    const [, setSelectedYearLC] = useAtom(selectedYearAtom);
    const [, setSelectedYearRice] = useAtom(selectedYearRiceAtom);
    const [, setSelectedYearRubber] = useAtom(selectedYearRubberAtom);
    const [, setSelectedYearFire] = useAtom(selectedYearFireAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [, setFireData] = useAtom(fireApiAtom);
    const [, setRiceData] = useAtom(riceApiAtom);
    const [, setRubberData] = useAtom(rubberApiAtom);
    const [, setForestGainData] = useAtom(forestGainApiAtom);
    const [, setForestLossData] = useAtom(forestLossApiAtom);
    const [, setLandCoverData] = useAtom(landCoverApiAtom);
    const [, setIsVisibleLCLegend] = useAtom(lcLegendAtom);
    const [, setIsVisibleForestGainLegend] = useAtom(forestGainLegendAtom);
    const [, setIsVisibleForestLossLegend] = useAtom(forestLossLegendAtom);
    const [, setIsVisibleRiceLegend] = useAtom(riceLegendAtom);
    const [, setIsVisibleRubberLegend] = useAtom(rubberLegendAtom);
    const [, setIsVisibleFireLegend] = useAtom(fireLegendAtom);
    
    useEffect(() => {
        if(selectedAreaId) {
            if (value === 1) {
                fetchForestGainMap();
                fetchForestLossMap();
            } else if (value == 2) {
                fetchRiceMapData();
                fetchRubberMapData();
            } else if (value === 3) {
                fetchFireMap();
            } else {
                fetchLandcoverMap();
                setLCMapVisibility(true);
                setSelectedYearLC(studyHigh);
            }
          }
    }, [value, selectedAreaId]);

    const handleChange = (event, newValue) => {
        setValue(newValue);

        const visibilityMappings = {
            0: { lcMap: true },
            1: { forestGainMap: true, forestLossMap: true },
            2: { riceMap: true, rubberMap: true },
            3: { fireMap: true }
        };

        const legendMappings = {
            0: { lcLegend: true },
            1: { forestGainLegend: true, forestLossLegend: true },
            2: { riceLegend: true, rubberLegend: true },
            3: { fireLegend: true }
        };

        if (newValue == 0){
            setSelectedYearLC(studyHigh);
        } else if(newValue == 2) {
            setSelectedYearRice(studyHigh);
            setSelectedYearRubber(studyHigh);
        } else if(newValue == 3) {
            setSelectedYearFire(studyHigh);
        } 
        
        const mapVisibility = visibilityMappings[newValue] || {};

        setForestGainMapVisibility(mapVisibility.forestGainMap || false);
        setForestLossMapVisibility(mapVisibility.forestLossMap || false);
        setRiceMapVisibility(mapVisibility.riceMap || false);
        setRubberMapVisibility(mapVisibility.rubberMap || false)
        setLCMapVisibility(mapVisibility.lcMap || false);
        setFireMapVisibility(mapVisibility.fireMap || false);

        const legendVisibility = legendMappings[newValue] || {};

        setIsVisibleLCLegend(legendVisibility.lcLegend || false);
        setIsVisibleForestGainLegend(legendVisibility.forestGainLegend || false);
        setIsVisibleForestLossLegend(legendVisibility.forestLossLegend || false);
        setIsVisibleRiceLegend(legendVisibility.riceLegend || false);
        setIsVisibleRubberLegend(legendVisibility.rubberLegend || false);
        setIsVisibleFireLegend(legendVisibility.fireLegend || false);
        
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
            'year': max,
            'class': 'all'
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

    const fetchRubberMapData = async () => {
        setIsLoading(true);
        const action = 'get-landcover-rubber-map';
        const params = {
            'area_type': selectedAreaType,
            'area_id': selectedAreaId,
            'year': studyHigh,
        };
        try {
            const data = await Fetcher(action, params);
            setRubberData(data);
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
        // 270px
        <Box m={0} p={0} sx={{ overflowY: 'scroll', height: 'calc(100vh - 140px)' }}> 
            <Box m={0} p={0} sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'auto' }}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="report tabs" 
                    sx={{  whiteSpace: 'nowrap' }}
                >
                    <Tab 
                        {...a11yProps(0)} 
                        sx={{ minWidth: 'auto', textTransform: 'none' }} 
                        label={
                            <Typography variant="subtitle2" sx={{ fontSize: '12px', margin: 0, paddingRight: '5px', textAlign: 'center', lineHeight: '1.2' }}>
                                Landcover <br /> & Biophysical Health
                            </Typography>
                        } 
                    />
                    <Tab 
                        {...a11yProps(1)} 
                        sx={{ minWidth: 'auto', textTransform: 'none' }} 
                        label={
                            <Typography variant="subtitle2" sx={{ fontSize: '12px', margin: 0, paddingRight: '5px', textAlign: 'center', lineHeight: '1.2' }}>
                                Forest Monitoring / <br /> Forest Alerts
                            </Typography>
                        } 
                    />
                    <Tab 
                        {...a11yProps(2)} 
                        sx={{ minWidth: 'auto', textTransform: 'none' }} 
                        label={
                            <Typography variant="subtitle2" sx={{ fontSize: '12px', margin: 0, paddingRight: '5px', textAlign: 'center', lineHeight: '1.2' }}>
                                Crop Monitoring
                            </Typography>
                        } 
                    />
                    <Tab 
                        {...a11yProps(3)} 
                        sx={{ minWidth: 'auto', textTransform: 'none' }} 
                        label={
                            <Typography variant="subtitle2" sx={{ fontSize: '12px', margin: 0, paddingRight: '5px', textAlign: 'center', lineHeight: '1.2' }}>
                                Fire Hotspot
                            </Typography>
                        } 
                    />
                </Tabs>
            </Box>
            {/* <Typography variant="body2" sx={{fontSize: '12px'}} pl={1} pt={2} pb={0} mb={0}>
                Selected Area: {selectedArea}
            </Typography> */}
            <CustomTabPanel value={value} index={0}>
            
                <Typography variant="body2" sx={{fontSize: '14px', fontWeight: 'bold'}} p={1}>
                    BIOPHYSICAL HEALTH
                </Typography>

                <Typography variant="body2" sx={{fontSize: '14px'}} pl={1} pb={2} dangerouslySetInnerHTML={{ __html: textBioReport}}>
                </Typography>

                <EVIPieChart />
                
                <EVILineChart />
                

                <Typography variant="body2" sx={{fontSize: '14px', fontWeight: 'bold'}} p={1}>
                    LAND COVER
                </Typography>
                

                <Typography variant="body2" sx={{fontSize: '14px'}} p={1}>
                    Interactive charts and maps below summarize land cover change in {selectedArea} in baseline period ({refLow} to {refHigh}) and evaluation peroid ({studyLow} to {studyHigh}).
                </Typography>
                <Typography variant="body2" sx={{fontSize: '14px'}} p={1}>
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
                <Typography variant="body2" sx={{fontSize: '14px', fontWeight: 'bold'}} pl={1} pb={1}>
                    AREA OF FOREST AND NON-FOREST
                </Typography>

                <Typography variant="body2" sx={{fontSize: '14px'}} p={1}>
                    {textForestReport}
                </Typography>

                <Typography variant="body2" sx={{fontSize: '14px'}} p={1}>
                    {textForestCoverGainLoss}
                </Typography>

                
                <ForestNonForestChart />

                {/* <Typography variant="body2" sx={{fontWeight: 'bold'}} p={1}>
                    THE CHANGE OF FOREST AREA INTO VARIOUS LAND COVERS
                </Typography>
                <Typography variant="body2" sx={{fontSize: '14px'}} pl={1} pb={2}>
                    {textForestChanges}
                </Typography>
                
                <ForestChangesChart /> */}

                <br />
                <Typography variant="body2" sx={{fontWeight: 'bold'}} p={1}>
                    THE CHANGE OF FOREST GAIN AND LOSS
                </Typography>

                <Typography variant="body2" sx={{fontSize: '14px'}} p={1}>
                    {textForestBaselineLoss}
                </Typography>
                <Typography variant="body2" sx={{fontSize: '14px'}} p={1}>
                    {textForestStudyLoss}
                </Typography>
                <Typography variant="body2" sx={{fontSize: '14px'}} p={1}>
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

                <Typography variant="body2" sx={{fontSize: '14px'}} p={1}>
                    {textRiceArea}
                </Typography>
                <RiceLineChart />
                <br />
                <Typography variant="body2" sx={{fontWeight: 'bold'}} p={1}>
                    RUBBER 
                </Typography>

                <Typography variant="body2" sx={{fontSize: '14px'}} p={1}>
                    {textRubberArea}
                </Typography>

                <RubberLineChart />

            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <Typography variant="body2" sx={{fontSize: '14px', fontWeight: 'bold'}} pl={1} pt={1} pb={1}>
                    NUMBER OF FIRE HOTSPOT
                </Typography>

                <Typography variant="body2" sx={{fontSize: '14px'}} p={1}>
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
  