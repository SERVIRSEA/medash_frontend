import React, { useState } from "react";
import { useAtom } from "jotai";
import ShareIcon from "@mui/icons-material/Share";
import TooltipIconButton from "../common/TooltipIconButton";
import SharePopper from "../poppers/SharePopper";
import { sharePopperAtom } from "@/state";

const ShareControl = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useAtom(sharePopperAtom);

    const handleShareClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => !prev);
    };

    return (
        <>
            <TooltipIconButton
                title="Share"
                onClick={handleShareClick}
                icon={<ShareIcon style={{ color: "#fff" }} />}
            />
            <SharePopper open={open} anchorEl={anchorEl} setOpen={setOpen} />
        </>
    );
};

export default ShareControl;
