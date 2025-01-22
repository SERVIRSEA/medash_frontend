"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

const A4PageLayout = ({ children }) => {
    // A4 dimensions in pixels (at 96 DPI, which is standard for web browsers)
    const a4Width = 794; // Width of A4 in pixels
    const a4Height = 1123; // Height of A4 in pixels

    return (
        <Box
            sx={{
                width: `${a4Width}px`,
                height: `${a4Height}px`,
                border: "1px solid #ddd",
                padding: "20px",
                margin: "20px auto",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
            }}
        >
            {children}
        </Box>
    );
};

export default A4PageLayout;