import React from "react";
import LocationControl from "./LocationControl";
import BasemapControl from "./BasemapControl";
import ShareControl from "./ShareControl"; // Import ShareControl
import CompareControl from "./CompareControl"; // Import CompareControl
import LayerControl from "./LayerControl";

export default function MapControls() {
    const containerStyle = {
        position: "absolute",
        top: "230px",
        right: "10px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        background: "#0f172a",
        borderRadius: "4px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    };

    return (
        <div style={containerStyle} onClick={(e) => e.stopPropagation()}>
            <LayerControl />
            <CompareControl /> 
            <ShareControl /> 
            <LocationControl />
            <BasemapControl />
        </div>
    );
}