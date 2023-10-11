import { atom } from 'jotai';

// State for sidebar expand/collapse
export const sidebarAtom = atom(0);

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
export const measureMinYearAtom = atom(2000);
export const measureMaxYearAtom = atom(2020);
export const tempBaselineMinYearAtom = atom(2000);
export const tempBaselineMaxYearAtom = atom(2008);
export const tempMeasureMinYearAtom = atom(2000);
export const tempMeasureMaxYearAtom = atom(2020);

// State for selected admin area
export const areaTypeAtom = atom('country'); // Use when trigger update map button click
export const areaIdAtom = atom('Cambodia');
export const areaNameAtom = atom('Cambodia');
export const tempAreaTypeAtom = atom('country'); // Use before trigger update map button click
export const tempAreaIdAtom = atom('Cambodia');
export const tempAreaNameAtom = atom('Cambodia');

// State for land cover map
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

// State for land cover rubber map
export const selectedYearRubberAtom = atom(null); 
export const rubberApiAtom = atom('');
export const rubberVisibilityAtom = atom(false);
export const rubberYearlyMapDataStoreAtom = atom({});

// Land cover rubber chart data state
export const rubberChartAtom = atom([]);
export const rubberChartDataLoadingAtom = atom(true);

// Basemap state
export const basemapAtom = atom('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FtYWxoMjciLCJhIjoiY2t3b2Roc2M3MDF2bDJ2cDY0ZmppdXl0MCJ9.Gn5rUJgaap_KDcnhyROMzQ');

export const selectedFeatureAtom = atom(null);