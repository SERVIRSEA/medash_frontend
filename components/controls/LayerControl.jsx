import React, { useState } from "react";
import { useAtom } from "jotai";
import LayersIcon from '@mui/icons-material/Layers';
import TooltipIconButton from "../common/TooltipIconButton";
import { layerPanelPopperAtom } from "@/state";
import LayerPopper from "../poppers/LayerPopper";

const LayerControl = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useAtom(layerPanelPopperAtom);

    const handleLayerClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => !prev);
    };

    return (
        <>
            <TooltipIconButton
                title="Layer Panel"
                onClick={handleLayerClick}
                icon={<LayersIcon style={{ color: "#fff" }} />}
            />
            <LayerPopper open={open} anchorEl={anchorEl} setOpen={setOpen} />
        </>
    );
};

export default LayerControl;