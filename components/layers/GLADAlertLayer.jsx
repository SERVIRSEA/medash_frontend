import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';

import { 
    selectedYearGLADAlertAtom,
    gladAlertApiAtom, 
    gladAlertVisibilityAtom,
} from '@/state/atoms';

const GLADAlertLayer = () => {
    const [selectedYearGLADAlert] = useAtom(selectedYearGLADAlertAtom);
    const [gladAlertMap] = useAtom(gladAlertApiAtom);
    const [showGLADAlertLayer] = useAtom(gladAlertVisibilityAtom);
    
    return ( 
        <>
            {selectedYearGLADAlert && showGLADAlertLayer && 
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={gladAlertMap}
                />
            }
        </>
    )
}

export default GLADAlertLayer