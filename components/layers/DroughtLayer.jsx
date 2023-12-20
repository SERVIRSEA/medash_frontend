import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    droughtVisAtom, 
    droughtMapDataAtom
} from '@/state/atoms';

export default function DroughtLayer() {
    const [droughtMap] = useAtom(droughtMapDataAtom);
    const [showDroughtLayer] = useAtom(droughtVisAtom);
    
    return ( 
        <>
            {showDroughtLayer && (
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={droughtMap}
                />
            )}
        </>
    )
}