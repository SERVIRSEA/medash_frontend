import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    forecastTempVisAtom,
    forecastTemperatureDataAtom
} from '@/state/atoms';

export default function ForecastTemperatureLayer() {
    const [tile_url] = useAtom(forecastTemperatureDataAtom);
    const [showLayer] = useAtom(forecastTempVisAtom);
    
    return ( 
        <>
            {showLayer && (
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={tile_url}
                />
            )}
        </>
    )
}