import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    selectedYearRiceAtom,
    riceApiAtom, 
    riceVisibilityAtom,
} from '@/state/atoms';

export default function RiceLayer() {
    const [selectedYearRice] = useAtom(selectedYearRiceAtom);
    const [riceMap] = useAtom(riceApiAtom);
    const [showRiceLayer] = useAtom(riceVisibilityAtom);
    
    return ( 
        <>
            {selectedYearRice && showRiceLayer && 
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={riceMap}
                />
            }
        </>
    )
}