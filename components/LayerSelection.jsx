import React, { useState } from 'react';
import { useAtom } from 'jotai';
import StreetviewIcon from '@mui/icons-material/Streetview';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Modal } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { protectedAreaVisibilityAtom, provinceVisibilityAtom, districtVisibilityAtom} from '@/state/atoms';
import DrawTabs from './tabs/DrawTabs';

export default function LayerSelection(){
    const [visiblePALayer, setVisiblePALayer] = useAtom(protectedAreaVisibilityAtom);
    const [visibleProvinceLayer, setVisibleProvinceLayer] = useAtom(provinceVisibilityAtom);
    const [visibleDistrictLayer, setVisibleDistrictLayer] = useAtom(districtVisibilityAtom);
    const [openModal, setOpenModal] = useState(false);

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

    // Function to handle opening modal
    const handleOpenModal = () => {
        setOpenModal(true);
    }

    // Function to handle closing modal
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return(
        <div>
            <Grid container spacing={2} pt={1}>
                <Grid item xs sx={{cursor: 'pointer'}} onClick={handlePALayerOnOff}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <StreetviewIcon fontSize='12px' />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography variant="caption" lineHeight={1} pt={1} sx={{ fontSize: '12px' }}>Protected Area</Typography>
                    </div>
                </Grid>
                <Grid item xs sx={{cursor: 'pointer'}} onClick={handleProvinceLayerOnOff}>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <StreetviewIcon fontSize='12px' />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography variant="caption" lineHeight={1} pt={1} sx={{ fontSize: '12px' }}>Province Boundary</Typography>
                    </div>
                </Grid>
                <Grid item xs sx={{cursor: 'pointer'}} onClick={handleDistrictLayerOnOff}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <StreetviewIcon fontSize='12px' />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography variant="caption" lineHeight={1} pt={1} sx={{ fontSize: '12px' }}>District Boundary</Typography>
                    </div>
                </Grid>
                <Grid item xs sx={{color: 'text.dark', cursor: 'pointer'}} onClick={handleOpenModal}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <StreetviewIcon fontSize='12px' />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography variant="caption" lineHeight={1} pt={1} sx={{ fontSize: '12px' }}>Draw / Upload</Typography>
                    </div>
                </Grid>
            </Grid>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div style={{
                    backgroundColor: '#fff',
                    padding: 20,
                    outline: 'none', // Remove outline
                    borderRadius: 8, // Add border radius for a rounded look
                }}>
                    <div>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Define Area (Under Development)</Typography>
                        {/* <IconButton onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton> */}
                        <DrawTabs />
                    </div>
                    
                </div>
            </Modal>
        </div>
    )
}
