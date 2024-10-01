import React from "react";
import { useAtom } from "jotai";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import TooltipIconButton from "../common/TooltipIconButton";
import { userLocationAtom } from "@/state";

const LocationControl = () => {
    const [, setUserLocation] = useAtom(userLocationAtom);

    const handleMyLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords; 
                    setUserLocation({ lat: latitude, long: longitude }); 
                },
                (error) => {
                    console.error("Error fetching location:", error.message); 
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser."); 
        }
    };

    const iconStyle = { color: "#fff" };

    return (
        <TooltipIconButton
            title="My Location"
            onClick={handleMyLocationClick}
            icon={<MyLocationIcon style={iconStyle} />}
        />
    );
};

export default LocationControl;