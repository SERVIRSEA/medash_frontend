import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    selectedYearFireAtom,
    fireApiAtom, 
    fireVisibilityAtom,
} from '@/state/atoms';

export default function FireLayer() {
    const [selectedYearFire] = useAtom(selectedYearFireAtom);
    const [fireMap] = useAtom(fireApiAtom);
    const [showFireLayer] = useAtom(fireVisibilityAtom);
    return ( 
        <>
            {selectedYearFire && showFireLayer && 
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={fireMap}
                />
            }
        </>
    )
}