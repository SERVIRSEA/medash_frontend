import { useAtom } from 'jotai';
import { TileLayer } from 'react-leaflet';
import { basemapAtom} from '@/state';

export default function BasemapLayer() {
    const [basemap] = useAtom(basemapAtom);
    
    return ( 
        <>
            <TileLayer url={basemap} />
        </>
    )
}

