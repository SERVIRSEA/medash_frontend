import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material';
import { 
    areaTypeAtom, 
    areaIdAtom, 
    areaNameAtom,
    protectedAreaVisibilityAtom, 
    provinceVisibilityAtom, 
    districtVisibilityAtom
 } from '@/state/atoms';

const Dropdown = () => {
    const [, setAreaType] = useAtom(areaTypeAtom);
    const [, setAreaId] = useAtom(areaIdAtom);
    const [, setAreaName] = useAtom(areaNameAtom);
    const [selectedCategory, setSelectedCategory] = useState('country');
    const [selectedItem, setSelectedItem] = useState('');
    const [options, setOptions] = useState([]);
    const [visiblePALayer, setVisiblePALayer] = useAtom(protectedAreaVisibilityAtom);
    const [visibleProvinceLayer, setVisibleProvinceLayer] = useAtom(provinceVisibilityAtom);
    const [visibleDistrictLayer, setVisibleDistrictLayer] = useAtom(districtVisibilityAtom);


    useEffect(() => {
        // Fetch data based on selected category
        axios.get(`${selectedCategory}.json`)
            .then(response => {
                const options = response.data.sort((a, b) => a.name.localeCompare(b.name));
                setOptions(options);
                // Set the default selected item as the first item in the options
                if (options.length > 0) {
                    const defaultSelectedItem = options[0];
                    setSelectedItem(defaultSelectedItem.name);
                    setAreaId(defaultSelectedItem.id);
                    setAreaName(defaultSelectedItem.name);
                } else {
                    setSelectedItem(''); // If no options are available, clear the selected item
                    setAreaId('');
                    setAreaName('');
                }
                setAreaType(selectedCategory);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [selectedCategory, setAreaType, setAreaId, setAreaName]);

    const setVisibilityFalse = function() {
        setVisiblePALayer(false);
        setVisibleProvinceLayer(false);
        setVisibleDistrictLayer(false);
    }

    const handleCategoryChange = (event) => {
        const selectedCategoryValue = event.target.value;
        setSelectedCategory(selectedCategoryValue);
        setVisibilityFalse();
        if (selectedCategoryValue === 'country'){
            setVisibleProvinceLayer(true);
        } else if(selectedCategoryValue === 'province') {
            setVisibleProvinceLayer(true);
        }else if(selectedCategoryValue === 'district') {
            setVisibleDistrictLayer(true);
        }else if(selectedCategoryValue === 'protected_area') {
            setVisiblePALayer(true);
        }
    };

    const handleItemChange = (event) => {
        const selectedItemValue = event.target.value;
        setSelectedItem(selectedItemValue);
        const selectedItem = options.find(option => option.name === selectedItemValue);
        if (selectedItem) {
            setAreaId(selectedItem.id);
            setAreaName(selectedItem.name);
        }
    };

    return (
        <Grid container spacing={2} p={2}>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="areaTypeLabel">Selected Area Type</InputLabel>
                    <Select
                        labelId="areaTypeLabel"
                        id='area_type'
                        value={selectedCategory}
                        label="Selected Area Type"
                        onChange={handleCategoryChange}
                        fullWidth
                        size='small'
                    >
                        <MenuItem value="country">Country</MenuItem>
                        <MenuItem value="province">Provinces</MenuItem>
                        <MenuItem value="district">Districts</MenuItem>
                        <MenuItem value="protected_area">Protected Area</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="areaIdLabel">Selected Area</InputLabel>
                    <Select
                        labelId="areaIdLabel"
                        id='area_id'
                        value={selectedItem}
                        label="Selected Area"
                        onChange={handleItemChange}
                        fullWidth
                        size='small'
                    >
                        {options.map(option => (
                            <MenuItem key={option.id} value={option.name}>{option.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Dropdown;

