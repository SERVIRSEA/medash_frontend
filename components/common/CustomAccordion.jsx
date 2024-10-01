import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'; // Drag icon

export default function CustomAccordion({ title, content, rotation=180 }) {
    const [expanded, setExpanded] = useState(false); // Default to false
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Only set the expanded state on the client side
        setExpanded(true); // Set to true as per your requirement
    }, []);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            // Get the new position
            const newY = e.clientY - offset.y;
            const windowHeight = window.innerHeight;

            // Prevent dragging below the bottom of the window
            if (newY < windowHeight - 100) { // 100 is for margin
                setPosition({
                    x: e.clientX - offset.x,
                    y: newY,
                });
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <Box
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            sx={{
                position: 'relative',
                left: position.x,
                top: position.y,
                cursor: isDragging ? 'grabbing' : 'grab',
            }}
        >
            <Accordion expanded={expanded} onChange={handleToggle}>
                <AccordionSummary
                    sx={{ 
                        display: 'flex', 
                        // justifyContent: 'space-between', 
                        alignItems: 'center', 
                        background: '#2563eb', 
                        paddingLeft: 1,
                        minHeight: '40px',   
                        '&.Mui-expanded': {   
                            minHeight: '40px',
                        },
                        '.MuiAccordionSummary-content': {   
                            margin: 0,
                            padding: 0
                        },
                        '.MuiAccordionSummary-content.Mui-expanded': {  
                            margin: 0,
                        }
                    }}
                    expandIcon={
                        <ArrowDownwardIcon 
                            sx={{ 
                                color: '#fafafa', 
                                transform: expanded ? `rotate(${rotation}deg)` : `rotate(${rotation}deg)`, 
                                transition: 'transform 0.3s ease' 
                            }} 
                            fontSize='small'
                        />
                    }
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DragIndicatorIcon 
                            sx={{ 
                                color: '#fafafa', 
                                marginRight: 1,
                            }} 
                        />
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontSize: '14px', 
                                fontWeight: 'bold', 
                                color: '#fafafa' 
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                        {content}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
