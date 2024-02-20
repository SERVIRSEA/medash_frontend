import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    seasonalRainfallVisAtom,
    seasonalRainfallDataAtom
} from '@/state/atoms';

export default function SeasonalRainfallLayer() {
    const [tile_url] = useAtom(seasonalRainfallDataAtom);
    const [showLayer] = useAtom(seasonalRainfallVisAtom);
    
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