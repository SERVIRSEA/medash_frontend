import React from 'react';
import { atom, useAtom } from 'jotai';
import Image from 'next/image'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';

import BiophysicalPanel from './panels/BiophysicalPanel';
import ForestMonitoringPanel from './panels/ForestMonitoringPanel';
import CropMonitoringPanel from './panels/CropMonitoringPanel';
import ForestAlertPanel from './panels/ForestAlertPanel';
import FireHotspotPanel from './panels/FireHotspotPanel';
import MapLayersPanel from './panels/MapLayersPanel';
import ReportingPanel from './panels/ReportingPanel';
import DroughtMonitoringPanel from './panels/DroughtMonitoringPanel';
import { 
    menuTitleAtom,
    activeTabAtom,
    activeMenuAtom,
    activeTabPanelAtom,
    eviVisibilityAtom,
    lcVisibilityAtom, 
    forestGainVisibilityAtom,
    forestLossVisibilityAtom,
    forestExtentVisibilityAtom,
    riceVisibilityAtom, 
    rubberVisibilityAtom,
    fireVisibilityAtom,
    gladAlertVisibilityAtom,
    sarAlertVisibilityAtom,
    sarfdasAlertVisibilityAtom,
    pastRainfallVisAtom,
    pastTempVisAtom,
    forecastRainfallVisAtom,
    forecastTempVisAtom,
    seasonalRainfallVisAtom,
    seasonalTempVisAtom,
    droughtVisAtom,

    legendPanelAtom,
    eviLegendAtom,
    lcLegendAtom,
    forestGainLegendAtom,
    forestLossLegendAtom, 
    forestCoverLegendAtom,
    riceLegendAtom,
    rubberLegendAtom,
    gladAlertLegendAtom,
    combineAlertLegendAtom,
    fireLegendAtom,
    shortTermWeatherLegendAtom,
    longTermWeatherLegendAtom,
    droughtLegendAtom
} from '@/state/atoms';

function Sidebar(){
    const [sideNav, setActiveSideNav] = useAtom(activeTabAtom);
    const [selectedIndex, setSelectedIndex] = useAtom(activeMenuAtom);
    const [navContent, setActiveNavContent] = useAtom(activeTabPanelAtom);
    const [menuTitle, setMenuTitle] = useAtom(menuTitleAtom);
    const [, setRiceMapVisibility] = useAtom(riceVisibilityAtom);
    const [, setLCMapVisibility] = useAtom(lcVisibilityAtom);
    const [, setRubberMapVisibility] = useAtom(rubberVisibilityAtom);
    const [, setFireMapVisibility] = useAtom(fireVisibilityAtom);
    const [, setGLADAlertMapVisibility] = useAtom(gladAlertVisibilityAtom);
    const [, setSARAlertMapVisibility] = useAtom(sarAlertVisibilityAtom);
    const [, setSARFDASAlertMapVisibility] = useAtom(sarfdasAlertVisibilityAtom);
    const [, setForestExtentMapVisibility] = useAtom(forestExtentVisibilityAtom);
    const [, setForestGainMapVisibility] = useAtom(forestGainVisibilityAtom);
    const [, setForestLossMapVisibility] = useAtom(forestLossVisibilityAtom);
    const [, setEviMapVisibility] = useAtom(eviVisibilityAtom);
    const [, setDroughtMapVisibility] = useAtom(droughtVisAtom)
    const [, setPastRainfallMapVis] = useAtom(pastRainfallVisAtom);
    const [, setPastTempMapVis] = useAtom(pastTempVisAtom);
    const [, setForecastRainfallMapVis] = useAtom(forecastRainfallVisAtom);
    const [, setForecastTempMapVis] = useAtom(forecastTempVisAtom);
    const [, setSeasonalRainfallMapVis] = useAtom(seasonalRainfallVisAtom);
    const [, setSeasonalTempMapVis] = useAtom(seasonalTempVisAtom);
    
    const [, setIsVisibleEVILegend] = useAtom(eviLegendAtom);
    const [, setIsVisibleLCLegend] = useAtom(lcLegendAtom);
    const [, setIsVisibleForestGainLegend] = useAtom(forestGainLegendAtom);
    const [, setIsVisibleForestLossLegend] = useAtom(forestLossLegendAtom);
    const [, setIsVisibleForestCoverLegend] = useAtom(forestCoverLegendAtom);
    const [, setIsVisibleRiceLegend] = useAtom(riceLegendAtom);
    const [, setIsVisibleRubberLegend] = useAtom(rubberLegendAtom);
    const [, setIsGladAlertLegend] = useAtom(gladAlertLegendAtom);
    const [, setIsCombineAlertLegend] = useAtom(combineAlertLegendAtom);
    const [, setIsVisibleFireLegend] = useAtom(fireLegendAtom);
    const [, setIsShortTermLegend] = useAtom(shortTermWeatherLegendAtom);
    const [, setIsLongTermLegend] = useAtom(longTermWeatherLegendAtom);
    const [, setIsDroughtLegend] = useAtom(droughtLegendAtom);
    const [, setLegendPanel] = useAtom(legendPanelAtom);
  
    const sidebarStyle = {
        background: "#eff6ff",
        color: "#000",
        width: '80px',
        height: "calc(100% - 100px)",
        position: 'fixed',
        overflowY: 'scroll'
    }

    const menuItemStyle = {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
        flexDirection: "column",
        gap: "4px" 
    };

    const titleStyle = {
        textAlign: 'left',
        fontSize: '14px',
        margin: 0,
        paddingLeft: '10px',
    };

    const closeAndTitleContainerStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "10px",
        borderBottom: "1px solid #000",
    };

    const contentContainerStyle = {
        background: "#fff",
        color: "#000",
        // width: "350px",
        width: selectedIndex === 7 ? "700px" : "350px",
        height: "calc(100% - 15px)",
        position: "fixed",
        marginLeft: "80px",
        zIndex: 999,
    };

    const closeIconStyle = {
        paddingRight: '10px',
        textAlign: 'right',
    };

    const menuItems = [
        {
          name: 'Biophysical',
          icon: '/assets/icons/menu/biophysical-monitoring-green.png',//BiophysicalIcon,
          text: 'Biophysical Monitoring',
          panel: <BiophysicalPanel />,
        },
        {
          name: 'Forest',
          icon: '/assets/icons/menu/forest-monitoring-green.png', // ForestMontIcon,
          text: 'Forest Monitoring',
          panel: <ForestMonitoringPanel />,
        },
        {
          name: 'Crop',
          icon: '/assets/icons/menu/crop.png', //CropMontIcon,
          text: 'Crop Monitoring',
          panel: <CropMonitoringPanel />,
        },
        {
            name: 'Forest Alert',
            icon: '/assets/icons/menu/forest-alert-green.png', //ForestIcon,
            text: 'Forest Alert',
            panel: <ForestAlertPanel />,
        },
        {
          name: 'Fire Hotspot',
          icon: '/assets/icons/menu/fire-burned-green.png', //FireHotspotIcon,
          text: 'Fire Hotspot',
          panel: <FireHotspotPanel />,
        },
        {
            name: 'Drought Monitoring',
            icon: '/assets/icons/menu/drought.jpg', //FireHotspotIcon,
            text: 'Drought Monitoring',
            panel: <DroughtMonitoringPanel />,
        },
        {
          name: 'Map Layers',
          icon: '/assets/icons/menu/map-layers-green.png', //BasemapLayerIcon,
          text: 'Basemap',
          panel: <MapLayersPanel />,
        },
        {
          name: 'Reporting',
          icon: '/assets/icons/menu/report.png', //ReportIcon,
          text: 'Reporting',
          panel: <ReportingPanel />,
        },
    ];

    function contentBelowTitle(navContent) {
        // Check if the index is within the range of the array
        if (navContent >= 0 && navContent < menuItems.length) {
            // Return the corresponding panel component
            return menuItems[navContent].panel;
        }
        return null;
    }

    const allMap = {
        eviMap: false, lcMap: false, forestGainMap: false, forestLossMap: false, forestExtentMap: false,
        riceMap: false, rubberMap: false, gladMap: false, sarMap: false, sarfdasMap: false,
        fireMap: false, pastRainMap: false, frcstRainMap: false, pastTempMap: false,
        frcstTempMap: false, sesRainMap: false, sesTempMap: false, droughtMap: false
    };

    const mapVisibilityMappings = {
        0: { ...allMap, eviMap: false, lcMap: true },
        1: { ...allMap, forestGainMap: true, forestLossMap: true },
        2: { ...allMap, riceMap: true, rubberMap: true },
        3: { ...allMap, gladMap: true },
        4: { ...allMap, fireMap: true },
        5: { ...allMap, frcstTempMap: true },
        7: { ...allMap, lcMap: true }
    };

    const baseLegend = {
        eviLegend: false, lcLegend: false, forestGainLegend: false, forestLossLegend: false, forestCoverLegend: false,
        riceLegend: false, rubberLegend: false, gladAlertLegend: false, combineAlertLegend: false, fireLegend: false,
        shortTermLegend: false, longTermLegend: false, droughtLegend: false
    };
    
    const legendMappings = {
        0: { ...baseLegend, lcLegend: true },
        1: { ...baseLegend, forestGainLegend: true, forestLossLegend: true },
        2: { ...baseLegend, riceLegend: true },
        3: { ...baseLegend, gladAlertLegend: true },
        4: { ...baseLegend, fireLegend: true },
        5: { ...baseLegend, shortTermLegend: true },
        // 6: { ...baseLegend },
        7: { ...baseLegend, lcLegend: true }
    };
      
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setActiveSideNav('block');
        setActiveNavContent(index);
        setMenuTitle(menuItems[index].text);

        const mapVisibility = mapVisibilityMappings[index] || {};

        setEviMapVisibility(mapVisibility.eviMap || false)
        setRiceMapVisibility(mapVisibility.riceMap || false);
        setRubberMapVisibility(mapVisibility.rubberMap || false);
        setLCMapVisibility(mapVisibility.lcMap || false);
        setFireMapVisibility(mapVisibility.fireMap || false);
        setGLADAlertMapVisibility(mapVisibility.gladMap || false);
        setSARAlertMapVisibility(mapVisibility.sarMap || false);
        setSARFDASAlertMapVisibility(mapVisibility.sarfdasMap || false)
        setForestExtentMapVisibility(mapVisibility.forestExtentMap || false)
        setForestGainMapVisibility(mapVisibility.forestGainMap || false);
        setForestLossMapVisibility(mapVisibility.forestLossMap || false);
        setDroughtMapVisibility(mapVisibility.droughtMap || false);
        setPastRainfallMapVis(mapVisibility.pastRainMap || false);
        setPastTempMapVis(mapVisibility.pastTempMap || false);
        setForecastRainfallMapVis(mapVisibility.frcstRainMap || false);
        setForecastTempMapVis(mapVisibility.frcstTempMap || false);
        setSeasonalRainfallMapVis(mapVisibility.sesRainMap || false);
        setSeasonalTempMapVis(mapVisibility.sesTempMap || false);

        const legendVisibility = legendMappings[index] || {};
    
        setIsVisibleEVILegend(legendVisibility.eviLegend || false);
        setIsVisibleLCLegend(legendVisibility.lcLegend || false);
        setIsVisibleForestGainLegend(legendVisibility.forestGainLegend || false);
        setIsVisibleForestLossLegend(legendVisibility.forestLossLegend || false);
        setIsVisibleForestCoverLegend(legendVisibility.forestCoverLegend || false);
        setIsVisibleRiceLegend(legendVisibility.riceLegend || false);
        setIsVisibleRubberLegend(legendVisibility.rubberLegend || false);
        setIsGladAlertLegend(legendVisibility.gladAlertLegend || false);
        setIsCombineAlertLegend(legendVisibility.combineAlertLegend || false);
        setIsVisibleFireLegend(legendVisibility.fireLegend || false);
        setIsShortTermLegend(legendVisibility.shortTermLegend || false);
        setIsLongTermLegend(legendVisibility.longTermLegend || false);
        setIsDroughtLegend(legendVisibility.droughtLegend || false);
    };

    const handleCloseClick = () => {
        setActiveSideNav(!sideNav);
    };
    
    return(
        <div>
            <div style={sidebarStyle}>
                <List component="nav" aria-label="items" sx={{padding: 0, margin:0}}>
                    {menuItems.map((item, index) => (
                        <ListItemButton
                            key={item.name}
                            sx={{ 
                            justifyContent: "center", 
                            paddingBottom: "6px", 
                            paddingTop:"6px",
                            backgroundColor: selectedIndex === index ? '#bfdbfe' : 'initial',
                                '&.Mui-selected': {
                                    backgroundColor: '#bfdbfe !important',
                                    borderRight: '3px solid #1e40af'
                                },
                                '&:hover': {
                                    backgroundColor: selectedIndex === index ? '#bfdbfe' : '#bfdbfe',
                                    borderRight: '3px solid #1e40af'
                                }
                            }}
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index)}
                        >
                        <div style={menuItemStyle}>
                            {/* eslint-disable-next-line */}
                            <img src={item.icon} width={25} height={25} alt={item.text} />
                            <p  
                                style={{
                                    textAlign: "center",
                                    fontSize: "10px",
                                    // padding: "0px",
                                    margin: "0px",
                                    lineHeight: "1.25"
                                }}
                            >
                                {item.text.split('\n').map((t, i) => <React.Fragment key={i}>{t}<br /></React.Fragment>)}
                            </p>
                        </div>
                        </ListItemButton>
                    ))}
                </List>
            </div>
            
            <div style={{...contentContainerStyle, display: sideNav ? 'block' : 'none'}}>
                <div style={closeAndTitleContainerStyle}>
                    <h3 style={titleStyle}>{menuTitle}</h3>
                    <div onClick={handleCloseClick} style={closeIconStyle}>
                        <FirstPageIcon style={{ marginTop: '10px', fontSize: '20px', cursor: 'pointer' }} />
                    </div>
                </div>
                {contentBelowTitle(navContent)}
            </div>
        </div>
    )
}

export default Sidebar;


// import React from 'react';
// import { atom, useAtom } from 'jotai';
// import Image from 'next/image'
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import Tooltip from '@mui/material/Tooltip';
// import FirstPageIcon from '@mui/icons-material/FirstPage';

// import BiophysicalIcon from '../public/images/icons/menu/biophysical-monitoring-green.png'
// import ForestMontIcon from '../public/images/icons/menu/forest-monitoring-green.png'
// import CropMontIcon from '../public/images/icons/menu/crop.png'
// import ForestAlertIcon from '../public/images/icons/menu/forest-alert-green.png'
// import FireHotspotIcon from '../public/images/icons/menu/fire-burned-green.png'
// import ReportIcon from '../public/images/icons/menu/report.png'
// import BasemapLayerIcon from '../public/images/icons/menu/map-layers-green.png'
// import BiophysicalPanel from './panels/BiophysicalPanel';
// import ForestMonitoringPanel from './panels/ForestMonitoringPanel';
// import CropMonitoringPanel from './panels/CropMonitoringPanel';
// import ForestAlertPanel from './panels/ForestAlertPanel';
// import FireHotspotPanel from './panels/FireHotspotPanel';
// import MapLayersPanel from './panels/MapLayersPanel';
// import ReportingPanel from './panels/ReportingPanel';
// import { lcVisibilityAtom, riceVisibilityAtom, rubberVisibilityAtom } from '@/state/atoms';

// const activeTabAtom = atom("block");
// const activeAtom = atom(0);
// const activeTabPanelAtom = atom(0);

// function Sidebar(){
//     const [sideNav, setActiveSideNav] = useAtom(activeTabAtom);
//     const [selectedIndex, setSelectedIndex] = useAtom(activeAtom);
//     const [navContent, setActiveNavContent] = useAtom(activeTabPanelAtom);
//     const [, setRiceMapVisibility] = useAtom(riceVisibilityAtom);
//     const [, setLCMapVisibility] = useAtom(lcVisibilityAtom);
//     const [, setRubberMapVisibility] = useAtom(rubberVisibilityAtom);
//     // const [, setSelectedYear] = useAtom(selectedYearAtom);
    
//     const sidebarStyle = {
//         background: "#eee",
//         color: "#000",
//         width: '80px',
//         height: "calc(100% - 125px)",
//         position: 'fixed'
//     }

//     const menuItemStyle = {
//         display: 'flex',
//         alignItems: 'center',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         padding: 0
//     }
//     const handleListItemClick = (event, index) => {
//         setSelectedIndex(index);
//         setActiveSideNav('block');
//         setActiveNavContent(index);
//         if (index == 2){
//             setRiceMapVisibility(true);
//             setRubberMapVisibility(true);
//             setLCMapVisibility(false);
//             // setSelectedYear(null);
//         }
//     };
//     const handleCloseClick = () => {
//         setActiveSideNav(!sideNav);
//     };
    
//     return(
//         <div>
//             <div style={sidebarStyle} >
//                 <List component="nav" aria-label="items">
//                     <ListItemButton 
//                         sx={{justifyContent: "center", paddingBottom: '0px'}}
//                         selected={selectedIndex === 0}
//                         onClick={(event) => handleListItemClick(event, 0)}
//                     >
//                         <div style={menuItemStyle}>
//                             <Image src={BiophysicalIcon} width={30} alt="Biophysicial Monitoring" />
//                             <p style={{textAlign: 'center', fontSize: '10px', padding: '0px'}}>Biophysical<br />Monitoring</p>
//                         </div>
//                     </ListItemButton>
//                     <ListItemButton
//                         sx={{justifyContent: "center", paddingBottom: '0px'}}
//                         selected={selectedIndex === 1}
//                         onClick={(event) => handleListItemClick(event, 1)}
//                     >
//                         <div style={menuItemStyle}>
//                             <Image src={ForestMontIcon} width={30} alt="Forest Monitoring" />
//                             <p style={{textAlign: 'center', fontSize: '10px'}}>Forest<br />Monitoring</p>
//                         </div>
//                     </ListItemButton>
//                     <ListItemButton
//                         sx={{justifyContent: "center", paddingBottom: '0px'}}
//                         selected={selectedIndex === 2}
//                         onClick={(event) => handleListItemClick(event, 2)}
//                     >
//                         <div style={menuItemStyle}>
//                             <Image src={CropMontIcon} width={30} alt="Crop Monitoring" />
//                             <p style={{textAlign: 'center', fontSize: '10px'}}>Crop<br />Monitoring</p>
//                         </div>
//                     </ListItemButton>
//                     <ListItemButton
//                         sx={{justifyContent: "center", paddingBottom: '0px'}}
//                         selected={selectedIndex === 3}
//                         onClick={(event) => handleListItemClick(event, 3)}
//                     >
//                         <div style={menuItemStyle}>
//                             <Image src={ForestAlertIcon} width={30} alt="Forest Alert" />
//                             <p style={{textAlign: 'center', fontSize: '10px'}}>Forest Alert</p>
//                         </div>
//                     </ListItemButton>
//                     <ListItemButton
//                         sx={{justifyContent: "center", paddingBottom: '0px'}}
//                         selected={selectedIndex === 4}
//                         onClick={(event) => handleListItemClick(event, 4)}
//                     >
//                         <div style={menuItemStyle}>
//                             <Image src={FireHotspotIcon} width={30} alt="Fire Hotspot" />
//                             <p style={{textAlign: 'center', fontSize: '10px'}}>Fire Hotspot</p>
//                         </div>
//                     </ListItemButton>
//                     <ListItemButton
//                         sx={{justifyContent: "center", paddingBottom: '0px'}}
//                         selected={selectedIndex === 5}
//                         onClick={(event) => handleListItemClick(event, 5)}
//                     >
//                         <div style={menuItemStyle}>
//                             <Image src={BasemapLayerIcon} width={30} alt="Map Layers" />
//                             <p style={{textAlign: 'center', fontSize: '10px'}}>Map Layers</p>
//                         </div>
//                     </ListItemButton>
//                     <ListItemButton
//                         sx={{justifyContent: "center", paddingBottom: '0px'}}
//                         selected={selectedIndex === 6}
//                         onClick={(event) => handleListItemClick(event, 6)}
//                     >
//                         <div style={menuItemStyle}>
//                             <Image src={ReportIcon} width={30} alt="Reporting" />
//                             <p style={{textAlign: 'center', fontSize: '10px'}}>Reporting</p>
//                         </div>
//                     </ListItemButton>
//                 </List>
//             </div>
//             <div style={{display: sideNav ? 'block' : 'none', background: "#fff", color: "#000", position: "fixed", height: "calc(100% - 125px)", width: "350px", marginLeft: '80px', zIndex:1}}> 
//                 <div onClick={handleCloseClick} style={{paddingRight: '10px',  textAlign: 'right'}} >
//                     <Tooltip title="Close"><FirstPageIcon style={{textAlign: 'right', marginTop: '10px', fontSize: '30px', cursor: 'pointer'}} /></Tooltip>
//                 </div>
//                 <div style={{display: navContent === 0? 'block' : 'none', paddingLeft: '15px'}}>
//                     <BiophysicalPanel />
//                 </div>
//                 <div style={{display: navContent === 1 ? 'block' : 'none', paddingLeft: '15px'}}>
//                     <ForestMonitoringPanel />
//                 </div>
//                 <div style={{display: navContent === 2 ? 'block' : 'none', paddingLeft: '15px'}}>
//                     <CropMonitoringPanel />
//                 </div>
//                 <div style={{display: navContent === 3 ? 'block' : 'none', paddingLeft: '15px'}}>
//                     <ForestAlertPanel />
//                 </div>
//                 <div style={{display: navContent === 4 ? 'block' : 'none', paddingLeft: '15px'}}>
//                     <FireHotspotPanel />
//                 </div>
//                 <div style={{display: navContent === 5 ? 'block' : 'none', paddingLeft: '15px'}}>
//                     <MapLayersPanel />
//                 </div>
//                 <div style={{display: navContent === 6 ? 'block' : 'none', paddingLeft: '15px'}}>
//                     <ReportingPanel />
//                 </div>
//             </div> 
//         </div>
//     )
// }

// export default Sidebar;