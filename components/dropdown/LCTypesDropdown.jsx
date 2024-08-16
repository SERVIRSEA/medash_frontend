import React from 'react';
import { useAtom } from 'jotai';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { lcTypeAtom } from '@/state/atoms';

const classNames = ['all', 'built-up area', 'mangrove', 'other Plantation', 'water', 'shrub', 'rice', 'cropland', 'grass', 'evergreen', 'deciduous', 'wetland', 'rubber', 'flooded Forest', 'semi-evergreen', 'village', 'others'];
const palette = ['#000', '#E600A9', '#FFFF00', '#c49963', '#004DA8', '#89CD66', '#fefdbd', '#FFD37F', '#D7C29E', '#267300', '#71a405', '#86d8dc', '#AAFF00', '#b3d59f', '#38A800', '#A900E6', '#f0f8ff'];

// Utility function to capitalize the first letter of each class name
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const LCTypesDropdown = () => {
    const [selectedClass, setSelectedClass] = useAtom(lcTypeAtom);

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    return (
        <FormControl fullWidth size="small" sx={{ marginBottom: 2 }}>
            <InputLabel id="select-lc-class" sx={{ fontSize: '12px' }}>LC Type</InputLabel>
            <Select
                labelId="select-lc-class"
                value={selectedClass}
                onChange={handleClassChange}
                displayEmpty
                label="LC Type"
                renderValue={(selected) => {
                    if (!selected) {
                        return <em>Select LC Type</em>;
                    }
                    const index = classNames.indexOf(selected);
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    background: selected === 'all' ? 'linear-gradient(90deg, #E600A9, #FFFF00, #c49963, #004DA8)' : palette[index],
                                    borderRadius: '50%',
                                    marginRight: 1,
                                }}
                            />
                            <span style={{ color: 'black' }}>{capitalizeFirstLetter(selected)}</span>
                        </Box>
                    );
                }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 200,
                        },
                    },
                }}
                inputProps={{ 'aria-label': 'Select LC Type' }}
                sx={{ fontSize: '12px' }}
            >
                {classNames.map((className, index) => (
                    <MenuItem
                        key={className}
                        value={className}
                        sx={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}
                    >
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                background: className === 'all' ? 'linear-gradient(90deg, #E600A9, #FFFF00, #c49963, #004DA8)' : palette[index],
                                borderRadius: '50%',
                                marginRight: 1,
                            }}
                        />
                        <span style={{ color: 'black' }}>{capitalizeFirstLetter(className)}</span>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default LCTypesDropdown;