import React from 'react'
import { TileLayer } from 'react-leaflet'

const CreateLayer = ({tileUrl='https://earthengine.googleapis.com/v1/projects/earthengine-legacy/maps/2107f74295117b3ea3e268d3f9fa5262-b3521618c546d122a2819c5a3e004605/tiles/{z}/{x}/{y}'}) => {
    return (
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={tileUrl}
        />
    )
}

export default CreateLayer;
