import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Typography } from '@mui/material/styles/createTypography';
import { 
    eviVisibilityAtom,
    lcVisibilityAtom, 
    forestGainVisibilityAtom,
    forestLossVisibilityAtom,
    forestExtentVisibilityAtom,
    riceVisibilityAtom, 
    rubberVisibilityAtom,
    fireVisibilityAtom,
    gladAlertVisibilityAtom,
    sarAlertVisibilityAtom
} from '@/state/atoms';

const Legend = () => {
    const [eviVisibility] = useAtom(eviVisibilityAtom);
    const lcVisibility = useAtom(lcVisibilityAtom);
    const forestGainVisibility = useAtom(forestGainVisibilityAtom);
    const forestLossVisibility = useAtom(forestLossVisibilityAtom);
    const forestExtentVisibility = useAtom(forestExtentVisibilityAtom);
    const riceVisibility = useAtom(riceVisibilityAtom);
    const rubberVisibility = useAtom(rubberVisibilityAtom);
    const fireVisibility = useAtom(fireVisibilityAtom);
    const gladAlertVisibility = useAtom(gladAlertVisibilityAtom);
    const sarAlertVisibility = useAtom(sarAlertVisibilityAtom);
    
    // Define the CSS styles as constants
    const legendContainerStyle = {
        position: 'absolute',
        bottom: '20px', 
        right: '20px', 
        background: 'white',
        padding: '10px',
        zIndex: '1000', 
    };

    return (
        <div style={legendContainerStyle}>
            <h3 >Legend</h3>
            {eviVisibility && (
                <img src="evi-legend.png" width="80px" alt="EVI" />
            )}
        </div>
    )
}

export default Legend