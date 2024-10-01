import React from "react";
import { FormControl, FormLabel, Select, MenuItem, ListItemText, Checkbox } from "@mui/material";

const MultiSelectDropdown = ({ 
    label, 
    options, 
    value, 
    onChange, 
    checkboxColor = "green", 
    menuItemHoverColor = "rgba(0, 0, 0, 0.08)", 
    menuItemClickColor = "rgba(0, 0, 0, 0.1)" 
}) => {
    return (
        <FormControl fullWidth sx={{ my: 2 }}>
            <FormLabel>{label}</FormLabel>
            <Select
                multiple
                value={value}
                onChange={onChange}
                renderValue={(selected) => selected.length === 0 ? "Please select" : selected.join(", ")}
                displayEmpty
                sx={{
                    "& .MuiSelect-select": {
                        color: value.length === 0 ? "rgba(0, 0, 0, 0.38)" : checkboxColor,
                    },
                }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 300,
                        },
                    },
                    sx: {
                        "& .MuiMenuItem-root": {
                            padding: "0px 16px",
                            margin: 0,
                            "&:hover": {
                                backgroundColor: menuItemHoverColor,
                            },
                            "&:active": {
                                backgroundColor: menuItemClickColor,
                            },
                        },
                    },
                }}
            >
                <MenuItem value="" disabled>
                    <em>Please select</em>
                </MenuItem>
                {options.map((option) => (
                <MenuItem key={option} value={option}>
                    <ListItemText primary={option} />
                    <Checkbox 
                    checked={value.indexOf(option) > -1} 
                    sx={{ marginLeft: 'auto', color: checkboxColor, '&.Mui-checked': { color: checkboxColor } }} 
                    />
                </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultiSelectDropdown;