import React, { useState } from "react";
import CompareIcon from "@mui/icons-material/Compare";
import TooltipIconButton from "../common/TooltipIconButton";
import CustomDialog from "../common/CustomDialog"; // Change import to CustomDialog
import SplitPane from "../compare/SplitPane";

const CompareControl = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const leftMapData = {
        center: [51.505, -0.09], // Example coordinates for the left map
        zoom: 13,
        tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '© OpenStreetMap contributors',
      };
    
      const rightMapData = {
        center: [51.51, -0.1], // Example coordinates for the right map
        zoom: 13,
        tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '© OpenStreetMap contributors',
      };

    return (
        <>
            <TooltipIconButton
                title="Compare"
                onClick={handleOpen}
                icon={<CompareIcon style={{ color: "#fff" }} />}
            />
            <CustomDialog
                open={open}            
                onClose={handleClose}  
                title="Compare Maps (Under Development)"    
                content={<SplitPane leftMapData={leftMapData} rightMapData={rightMapData}/>} 
                width="100%" 
                icon = {<CompareIcon sx={{ color: '#fff' }} />}
            />
        </>
    );
};

export default CompareControl;
