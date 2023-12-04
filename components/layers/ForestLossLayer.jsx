import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    forestLossApiAtom, 
    forestLossVisibilityAtom,
} from '@/state/atoms';

export default function ForestLossLayer() {
    const [forestLossMap] = useAtom(forestLossApiAtom);
    const [showForestLossLayer] = useAtom(forestLossVisibilityAtom);
    
    return ( 
        <>
            {showForestLossLayer && 
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={forestLossMap}
                />
            }
        </>
    )
}