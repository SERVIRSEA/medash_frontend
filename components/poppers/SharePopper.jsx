import React from "react";
import CustomPopper from "../common/CustomPopper";
import ShareList from "../share/ShareList";

export default function SharePopper({ open, anchorEl, setOpen }) {
    return (
        <CustomPopper open={open} anchorEl={anchorEl} setOpen={setOpen}>
            <ShareList />
        </CustomPopper>
    );
};
