import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    forestGainApiAtom, 
    forestGainVisibilityAtom,
} from '@/state/atoms';

export default function ForestGainLayer() {
    const [forestGainMap] = useAtom(forestGainApiAtom);
    const [showForestGainLayer] = useAtom(forestGainVisibilityAtom);
    
    return ( 
        <>
            {showForestGainLayer && 
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={forestGainMap}
                />
            }
        </>
    )
}