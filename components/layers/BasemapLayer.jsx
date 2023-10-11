import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';
import { basemapAtom} from '@/state/atoms';

export default function BasemapLayer() {
    const [basemap] = useAtom(basemapAtom);
    
    return ( 
        <>
            <TileLayer url={basemap} />
        </>
    )
}

