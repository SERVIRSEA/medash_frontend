import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    selectedYearForestExtentAtom,
    forestExtentApiAtom, 
    forestExtentVisibilityAtom,
} from '@/state/atoms';

export default function ForestExtentLayer() {
    const [selectedYearForestExtent] = useAtom(selectedYearForestExtentAtom);
    const [forestExtentMap] = useAtom(forestExtentApiAtom);
    const [showForestExtentLayer] = useAtom(forestExtentVisibilityAtom);
    
    

    return ( 
        <>
            {showForestExtentLayer &&
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={forestExtentMap}
                />
            }
        </>
    )
}