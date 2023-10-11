import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    selectedYearRubberAtom,
    rubberApiAtom, 
    rubberVisibilityAtom,
} from '@/state/atoms';

export default function RubberLayer() {
    const [selectedYearRubber] = useAtom(selectedYearRubberAtom);
    const [rubberMap] = useAtom(rubberApiAtom);
    const [showRubberLayer] = useAtom(rubberVisibilityAtom);
    
    return ( 
        <>
            {selectedYearRubber && showRubberLayer && 
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={rubberMap}
                />
            }
        </>
    )
}