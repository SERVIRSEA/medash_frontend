import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    selectedYearAtom,
    landCoverApiAtom,
    lcVisibilityAtom,
} from '@/state/atoms';

export default function LandCoverLayer() {
    const [selectedYearLC] = useAtom(selectedYearAtom);
    const [landCoverMap] = useAtom(landCoverApiAtom);
    const [showLCMap] = useAtom(lcVisibilityAtom);
    
    return ( 
        <>
            {selectedYearLC && showLCMap && 
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={landCoverMap}
                />
            }
        </>
    )
}