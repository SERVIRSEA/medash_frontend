import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    selectedYearSARAlertAtom,
    sarAlertApiAtom, 
    sarAlertVisibilityAtom,
} from '@/state/atoms';

const SARAlertLayer = () => {
    const [selectedYearSARAlert] = useAtom(selectedYearSARAlertAtom);
    const [sarAlertMap] = useAtom(sarAlertApiAtom);
    const [showSARAlertLayer] = useAtom(sarAlertVisibilityAtom);
    
    return ( 
        <>
            {selectedYearSARAlert && showSARAlertLayer && 
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={sarAlertMap}
                />
            }
        </>
    )
}

export default SARAlertLayer