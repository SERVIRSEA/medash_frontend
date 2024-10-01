import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

const CustomCheckbox = ({ checked, onChange, label }) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    sx={{
                        padding: 0,
                        '&.Mui-checked': {
                            color: '#1976d2', 
                        },
                    }}
                />
            }
            label={<span style={{ marginLeft: '8px' }}>{label}</span>} 
            sx={{ marginBottom: '4px' }}
        />
    );
};

export default CustomCheckbox;
