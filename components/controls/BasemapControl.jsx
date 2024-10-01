import React, { useState } from "react";
import { useAtom } from "jotai";
import PublicIcon from "@mui/icons-material/Public";
import TooltipIconButton from "../common/TooltipIconButton";
import BasemapPopper from "../poppers/BasemapPopper";
import { basemapPopperAtom } from "@/state";

const BasemapControl = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useAtom(basemapPopperAtom);

    const handleBasemapClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => !prev);
    };

    return (
        <>
            <TooltipIconButton
                title="Basemap"
                onClick={handleBasemapClick}
                icon={<PublicIcon style={{ color: "#fff" }} />}
                showDivider={false}
            />
            <BasemapPopper open={open} anchorEl={anchorEl} setOpen={setOpen} />
        </>
    );
};

export default BasemapControl;
