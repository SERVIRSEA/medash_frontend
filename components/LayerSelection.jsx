import React from 'react';
import { useAtom } from 'jotai';
import StreetviewIcon from '@mui/icons-material/Streetview';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { protectedAreaVisibilityAtom, provinceVisibilityAtom, districtVisibilityAtom} from '@/state/atoms';

export default function LayerSelection(){
    const [visiblePALayer, setVisiblePALayer] = useAtom(protectedAreaVisibilityAtom);
    const [visibleProvinceLayer, setVisibleProvinceLayer] = useAtom(provinceVisibilityAtom);
    const [visibleDistrictLayer, setVisibleDistrictLayer] = useAtom(districtVisibilityAtom);
    
    const handlePALayerOnOff = ()=> {
        setVisiblePALayer(true);
        setVisibleProvinceLayer(false);
        setVisibleDistrictLayer(false);
    }
    
    const handleProvinceLayerOnOff = ()=> {
        setVisiblePALayer(false);
        setVisibleProvinceLayer(true);
        setVisibleDistrictLayer(false);
    }
    
    const handleDistrictLayerOnOff = ()=> {
        setVisiblePALayer(false);
        setVisibleProvinceLayer(false);
        setVisibleDistrictLayer(true);
    }
    return(
        <div>
            <Grid container spacing={2} pt={1}>
                <Grid item xs sx={{cursor: 'pointer'}} onClick={handlePALayerOnOff}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <StreetviewIcon />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography variant="caption" lineHeight={1} pt={1}>PROTECTED AREA</Typography>
                    </div>
                </Grid>
                <Grid item xs sx={{cursor: 'pointer'}} onClick={handleProvinceLayerOnOff}>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <StreetviewIcon />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography variant="caption" lineHeight={1} pt={1}>ADM PROVINCE</Typography>
                    </div>
                </Grid>
                <Grid item xs sx={{cursor: 'pointer'}} onClick={handleDistrictLayerOnOff}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <StreetviewIcon />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography variant="caption" lineHeight={1} pt={1}>ADM DISTRICT</Typography>
                    </div>
                </Grid>
                <Grid item xs sx={{color: 'text.disabled', cursor: 'not-allowed'}}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <StreetviewIcon />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography variant="caption" lineHeight={1} pt={1}>DRAW / UPLOAD</Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
