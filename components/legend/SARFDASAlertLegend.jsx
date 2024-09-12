import React from 'react'
import { useAtom } from 'jotai'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend'
import { gladAlertLegendAtom } from '@/state/atoms'

const SARFDASAlertLegend = () => {
    const [isVisible] = useAtom(gladAlertLegendAtom);
    return (
        <Box pt={0} pl={2} pb={isVisible ? 0 : 1}>
            {/* <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>SARFDAS Alert Legend</Typography> */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ColorLegend color={"red"} text={"SARFDAS Alert"} />
            </Box>
        </Box>
    )
}

export default SARFDASAlertLegend;