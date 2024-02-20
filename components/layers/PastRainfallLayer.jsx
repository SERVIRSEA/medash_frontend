import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    pastRainfallVisAtom,
    pastRainfallDataAtom
} from '@/state/atoms';

export default function PastRainfallLayer() {
    const [tile_url] = useAtom(pastRainfallDataAtom);
    const [showLayer] = useAtom(pastRainfallVisAtom);
    
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