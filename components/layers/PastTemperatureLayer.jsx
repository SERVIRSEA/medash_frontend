import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    pastTempVisAtom,
    pastTemperatureDataAtom
} from '@/state/atoms';

export default function PastTemperatureLayer() {
    const [tile_url] = useAtom(pastTemperatureDataAtom);
    const [showLayer] = useAtom(pastTempVisAtom);
    
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