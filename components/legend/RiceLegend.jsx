import React from 'react'
import { useAtom } from 'jotai'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend'
import { rubberLegendAtom } from '@/state/atoms'

const RiceLegend = () => {
    const [isVisible] = useAtom(rubberLegendAtom);

    return (
        <Box pt={0} pl={2} pb={isVisible ? 0 : 1}>
            {/* <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>Rice Map Legend</Typography> */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ColorLegend color={"#FFFFBE"} text={"Rice"} hasBorder={true} />
            </Box>
        </Box>
    )
}

export default RiceLegend