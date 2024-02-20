import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    forecastRainfallVisAtom,
    forecastRainfallDataAtom
} from '@/state/atoms';

export default function ForecastRainfallLayer() {
    const [tile_url] = useAtom(forecastRainfallDataAtom);
    const [showLayer] = useAtom(forecastRainfallVisAtom);
    
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