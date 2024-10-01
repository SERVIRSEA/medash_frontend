import React from "react";
import Basemap from '../basemap/Basemap';
import CustomPopper from '../common/CustomPopper';

export default function BasemapPopper({ open, anchorEl, setOpen }) {
    return (
        <CustomPopper open={open} anchorEl={anchorEl} setOpen={setOpen}>
            <Basemap />
        </CustomPopper>
    );
}
