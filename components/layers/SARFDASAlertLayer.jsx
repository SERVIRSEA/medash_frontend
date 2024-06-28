import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    selectedYearSARFDASAtom,
    sarfdasApiAtom, 
    sarfdasAlertVisibilityAtom,
} from '@/state/atoms';

const SARFDASAlertLayer = () => {
    const [selectedYearSARFDASAlert] = useAtom(selectedYearSARFDASAtom);
    const [sarfdasAlertMap] = useAtom(sarfdasApiAtom);
    const [showSARFDASAlertLayer] = useAtom(sarfdasAlertVisibilityAtom);
    
    return ( 
        <>
            {selectedYearSARFDASAlert && showSARFDASAlertLayer && 
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={sarfdasAlertMap}
                />
            }
        </>
    )
}

export default SARFDASAlertLayer;