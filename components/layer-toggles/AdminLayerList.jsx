import React from 'react';
import { useAtom } from 'jotai';
import { FormControlLabel, Checkbox, FormGroup, Box } from '@mui/material';
import CustomCheckbox from '../common/CustomCheckbox';
import { 
    provinceVisibilityAtom,
    districtVisibilityAtom,
    protectedAreaVisibilityAtom
} from '@/state/atoms';

const AdminLayerList = () => {
    const [districtLayer, setDistrictLayer] = useAtom(districtVisibilityAtom);
    const [provinceLayer, setProvinceLayer] = useAtom(provinceVisibilityAtom);
    const [protectedAreaLayer, setProtectedAreaLayer] = useAtom(protectedAreaVisibilityAtom);

    return (
        <Box pl={4} pt={2} pb={2} pr={4}> 
            <FormGroup> 
                <CustomCheckbox
                    checked={provinceLayer}
                    onChange={(e) => setProvinceLayer(e.target.checked)}
                    label="Province Layer"
                />
                <CustomCheckbox
                    checked={districtLayer}
                    onChange={(e) => setDistrictLayer(e.target.checked)}
                    label="District Layer"
                />
                <CustomCheckbox
                    checked={protectedAreaLayer}
                    onChange={(e) => setProtectedAreaLayer(e.target.checked)}
                    label="Protected Area Layer"
                />
                {/* <FormControlLabel
                    control={
                        <Checkbox
                            checked={districtLayer}
                            onChange={(e) => setDistrictLayer(e.target.checked)}
                            name="districtLayer"
                            sx={{ padding: 0 }} 
                        />
                    }
                    label={<span style={{ marginLeft: '8px' }}>District Layer</span>}
                    sx={{ marginBottom: '4px' }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={provinceLayer}
                            onChange={(e) => setProvinceLayer(e.target.checked)}
                            name="provinceLayer"
                            sx={{ padding: 0 }} 
                        />
                    }
                    label="Province Layer"
                    sx={{ marginBottom: '4px' }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={protectedAreaLayer}
                            onChange={(e) => setProtectedAreaLayer(e.target.checked)}
                            name="protectedAreaLayer"
                            sx={{ padding: 0 }} 
                        />
                    }
                    label="Protected Area Layer"
                    sx={{ marginBottom: '4px' }}
                /> */}
            </FormGroup>
        </Box>
    );
};

export default AdminLayerList;
