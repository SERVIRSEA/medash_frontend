import React from "react";
import CustomPopper from "../common/CustomPopper";
import AdminLayerToggle from '../layer-toggles/AdminLayerToggle';

export default function LayerPopper({ open, anchorEl, setOpen }) {
    return (
        <CustomPopper open={open} anchorEl={anchorEl} setOpen={setOpen}>
            <AdminLayerToggle />
        </CustomPopper>
    );
}
