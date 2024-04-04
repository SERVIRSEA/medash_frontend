import { atom } from 'jotai';

// Initial selected atom
export const menuTitleAtom = atom("Biophysical Monitoring");
export const activeTabAtom = atom("block");
export const activeMenuAtom = atom(0);
export const activeTabPanelAtom = atom(0);

// State for sidebar expand/collapse
export const sidebarAtom = atom(0);
export const maxRetryAttemptsAtom = atom(100);

// State for loading map data
export const mapInstanceAtom = atom(null);
export const isLoadingAtom = atom(false);

// State for EVI Map
export const eviApiAtom = atom(''); // store gee layer in this state
export const eviVisibilityAtom = atom(false); // set visibility of evi map by default
export const eviMapStoreAtom = atom({});

// EVI chart data state
export const eviLineChartAtom = atom([]);
export const eviPieChartAtom = atom([]);
export const eviLineChartDataLoadingAtom = atom(true);
export const eviPieChartDataLoadingAtom = atom(true);

// Land cover chart data state
export const landCoverChartAtom = atom([]);
export const lcChartDataLoadingAtom = atom(true);

// Forest changes chart data state
export const forestChangesChartAtom = atom([]);
export const forestChangesDataLoadingAtom = atom(true);

// State for fetch admin data
export const protectedAreaDataAtom = atom(false); 
export const provinceDataAtom = atom(false);
export const districtDataAtom = atom(false);

// State for visibility of admin data
export const protectedAreaVisibilityAtom = atom(false);
export const provinceVisibilityAtom = atom(true);
export const districtVisibilityAtom = atom(false);

// State for time period selection
export const baselineMinYearAtom = atom(2000);
export const baselineMaxYearAtom = atom(2008);
export const measureMinYearAtom = atom(2010);
export const measureMaxYearAtom = atom(2023);
export const tempBaselineMinYearAtom = atom(2000);
export const tempBaselineMaxYearAtom = atom(2008);
export const tempMeasureMinYearAtom = atom(2010);
export const tempMeasureMaxYearAtom = atom(2023);

// State for selected admin area
export const areaTypeAtom = atom('country'); // Use when trigger update map button click
export const areaIdAtom = atom('Cambodia');
export const areaNameAtom = atom('Cambodia');
export const tempAreaTypeAtom = atom('country'); // Use before trigger update map button click
export const tempAreaIdAtom = atom('Cambodia');
export const tempAreaNameAtom = atom('Cambodia');

// State for land cover map
export const minYearLandCover = atom(2000);
export const maxYearLandCover = atom(2023);
export const selectedYearAtom = atom(null); // For year switches 
export const landCoverApiAtom = atom(''); // Store land cover gee data url for map visualization
export const lcVisibilityAtom = atom(true);
export const lcYearlyGEEDataAtom = atom({}); // Store yearly gee fetched url for next time use without refetching

// State for land cover rice map
export const selectedYearRiceAtom = atom(null); 
export const riceApiAtom = atom('');
export const riceVisibilityAtom = atom(false);
export const riceYearlyMapDataStoreAtom = atom({});

// Land cover rice chart data state
export const riceChartAtom = atom([]);
export const riceChartDataLoadingAtom = atom(true);
export const riceBMDataAtom = atom([]);
export const riceBMDataLoadingAtom = atom(true);

// State for land cover rubber map
export const selectedYearRubberAtom = atom(null); 
export const rubberApiAtom = atom('');
export const rubberVisibilityAtom = atom(false);
export const rubberYearlyMapDataStoreAtom = atom({});

// Land cover rubber chart data state
export const rubberChartAtom = atom([]);
export const rubberChartDataLoadingAtom = atom(true);
export const rubberBMDataAtom = atom([]);
export const rubberBMDataLoadingAtom = atom(true);

// State for Forest Gain map
export const minYearForestGain = atom(2000);
export const maxYearForestGain = atom(2023);
export const forestGainApiAtom = atom('');
export const forestGainVisibilityAtom = atom(true);
export const forestGainMapDataStoreAtom = atom({});

// State for Forest Loss map
export const minYearForestLoss = atom(2000);
export const maxYearForestLoss = atom(2023);
export const forestLossApiAtom = atom('');
export const forestLossVisibilityAtom = atom(false);
export const forestLossMapDataStoreAtom = atom({});

// State for Forest Extent map
export const selectedYearForestExtentAtom = atom(null); 
export const forestExtentApiAtom = atom('');
export const forestExtentVisibilityAtom = atom(false);
export const forestExtentMapDataStoreAtom = atom({});

// State for Forest Extent map
export const forestNonForestChartDataAtom = atom({});
export const forestNonForestChartLoadingAtom = atom(true);

// State for Forest change 
export const forestGainLossAreaAtom = atom({});
export const forestChangeGainLossAreaAtom = atom({});
export const forestChangeLoadingAtom = atom(true);

// State for GLAD Alert map
export const minYearGLADAlert = atom(2018);
export const maxYearGLADAlert = atom(2023);
export const selectedYearGLADAlertAtom = atom(null); 
export const gladAlertApiAtom = atom('');
export const gladAlertVisibilityAtom = atom(false);
export const gladAlertYearlyMapDataStoreAtom = atom({});

// GLAD chart data state
export const gladAlertChartAtom = atom([]);
export const gladAlertChartDataLoadingAtom = atom(true);

// State for SAR Alert map
export const minYearSARAlert = atom(2018);
export const maxYearSARAlert = atom(2023);
export const selectedYearSARAlertAtom = atom(null); 
export const sarAlertApiAtom = atom('');
export const sarAlertVisibilityAtom = atom(false);
export const sarAlertYearlyMapDataStoreAtom = atom({});

// SAR chart data state
export const sarAlertChartAtom = atom([]);
export const sarAlertChartDataLoadingAtom = atom(true);

// State for fire map
export const selectedYearFireAtom = atom(null); 
export const fireApiAtom = atom('');
export const fireVisibilityAtom = atom(false);
export const fireYearlyMapDataStoreAtom = atom({});

// Fire chart data state
export const fireChartAtom = atom([]);
export const fireChartDataLoadingAtom = atom(true);

// Basemap state
export const basemapAtom = atom('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}');

export const selectedFeatureAtom = atom(null);

// update 
export const updateTriggerAtom = atom(0);
export const drawControlAtom= atom(false);

// Guiding modal
export const guidingModalAtom = atom(true);

// Drought index selector
export const selectedDroughtIndexAtom = atom('ndvi');
export const selectedDroughtDateAtom = atom('');

// Alert state
export const alertOpenAtom = atom(false);
export const alertMessageAtom = atom('');

// Drought monitoring state
export const weatherDataStoreAtom = atom({});
export const pastRainfallVisAtom = atom(false);
export const pastTempVisAtom = atom(false);
export const forecastRainfallVisAtom = atom(false);
export const forecastTempVisAtom = atom(true);
export const seasonalRainfallVisAtom = atom(false);
export const seasonalTempVisAtom = atom(false);
export const pastRainfallDataAtom = atom('');
export const forecastRainfallDataAtom = atom ('');
export const seasonalRainfallDataAtom = atom('');
export const pastTemperatureDataAtom = atom('');
export const forecastTemperatureDataAtom = atom('');
export const seasonalTemperatureDataAtom = atom('');
export const droughtVisAtom = atom(false);
export const droughtMapDataAtom = atom('');
export const droughtMapDataStoreAtom = atom({});


// selected area type and area id
export const selectedAreaTypeAtom = atom();
export const selectedAreaIdAtom = atom();

// Reporting state
export const studyLowForestArea = atom('');
export const studyHighForestArea = atom('');

// Reporting landcover
export const landcoverTextAtom = atom('');
export const forestChangesTextAtom = atom('');


// Reporting biophysical health state
export const bioTextAtom = atom('');

// Reporting forest tab
export const textForestReportAtom = atom('');
export const forestCoverStudyHighAtom = atom('');
export const forestCoverGainLossTextAtom = atom('');
export const forestNetChangeTextAtom = atom('');
export const forestGainTextAtom = atom('');
export const forestBaselineLossTextAtom = atom('');
export const forestStudyLossTextAtom = atom('');
export const forestLossPercentTextAtom = atom('');

// Reporting crop monitoring
export const riceAreaTextAtom = atom('');
export const rubberAreaTextAtom = atom('');

// Reporting fire hotspot
export const fireHotspotTextAtom = atom('');