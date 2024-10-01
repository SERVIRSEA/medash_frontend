import React from 'react'
import { useAtom } from 'jotai'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend'
import { rubberLegendAtom } from '@/state/atoms'

const RiceLegend = () => {
    const [isVisible] = useAtom(rubberLegendAtom);

    return (
        <Box>
            {/* <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>Rice Map Legend</Typography> */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ColorLegend color={"#FFFFBE"} text={"Rice"} hasBorder={true} />
            </Box>
        </Box>
    )
}

export default RiceLegend