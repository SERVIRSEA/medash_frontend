import { Box } from "@mui/material";
import { useAtom } from "jotai";
import CustomAccordion from "../common/CustomAccordion";
import LegendContent from "./LegendContent";
import { activeTabAtom } from '@/state/atoms';

const MapLegend = () => {
    const [isCollapse] = useAtom(activeTabAtom);
    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 5,
                // left: 440,
                left: `${isCollapse === 'block' ? '440px' : '90px'}`,
                zIndex: 2,
            }}
        >
            <CustomAccordion 
                title="Map Legend" 
                content={<LegendContent />}              
            />
        </Box>
    );
}

export default MapLegend;