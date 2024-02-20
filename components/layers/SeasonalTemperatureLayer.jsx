import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    seasonalTempVisAtom,
    seasonalTemperatureDataAtom
} from '@/state/atoms';

export default function SeasonalTemperatureLayer() {
    const [tile_url] = useAtom(seasonalTemperatureDataAtom);
    const [showLayer] = useAtom(seasonalTempVisAtom);
    
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