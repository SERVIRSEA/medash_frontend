import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    eviVisibilityAtom,
    eviApiAtom,
} from '@/state/atoms';

export default function EVILayer() {
    const [eviMap] = useAtom(eviApiAtom);
    const [showEviLayer] = useAtom(eviVisibilityAtom);
    
    return ( 
        <>
            {showEviLayer && (
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={eviMap}
                />
            )}
        </>
    )
}