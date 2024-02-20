import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const DroughtInfoTable = () => {
    return (
        <Table size='small'>
            <TableBody sx={{borderTop: '1px solid #757575'}}>
                <TableRow>
                    <TableCell><b>Index</b></TableCell>
                    <TableCell><b>Description</b></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>CDI</TableCell>
                    <TableCell>
                        <b>Overview:</b> The Combine Drought Index (CDI) is calculated using SPI3, the anomalies of the fraction of Absorbed Photosynthetically Active Radiation (fAPAR) and soil suction (pF). Four warning categories are available as Watch: Precipitation deficit, Warning: Soil moisture deficit, Alert 1: Vegetation stress following precipitation deficit, Alert 2: Vegetation stress following precipitation/soil moisture deficit. (Acknowledge reference: <a href="https://goo.gl/1dBSVe">https://goo.gl/1dBSVe</a>)<br />
                        <b>Data Source:</b> CHIRPS, CHIRP, GPM-IMERG, NCEP, NMME, SMAP, SMOS, MODIS through Regional Hydrological Extreme Assessment (RHEAS) model.<br />
                        <b>Resolution:</b> 5km<br />
                        <b>Frequency of updating:</b> Every 2 weeks
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Standardized Precipitation Index (SPI) – 3months</TableCell>
                    <TableCell>
                        <b>Overview:</b> The Standardized Precipitation Index (SPI) is a widely used meteorological drought index that provides a measure of meteorological drought based on precipitation data. It was developed to standardize precipitation anomalies, making it possible to compare drought conditions across different regions with varying climates. The SPI is calculated for different time scales, typically ranging from 1 to 12 months or even longer. SPI-3 is commonly used for monitoring and detecting short-term drought conditions. It provides information on precipitation deficits over a 3-month period, helping to identify emerging drought situations. SPI-3 can also be used in the insurance industry to assess and manage the risk associated with short-term drought events. It provides valuable information for setting insurance premiums and developing risk mitigation strategies.<br />
                        <b>Data Source:</b> CHIRPS, CHIRP, GPM-IMERG, NCEP, NMME, SMAP, SMOS, MODIS through Regional Hydrological Extreme Assessment (RHEAS) model.<br />
                        <b>Resolution:</b> 5km<br />
                        <b>Frequency of updating:</b> Every 2 weeks
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Soil Moisture</TableCell>
                    <TableCell>
                        <b>Overview:</b> It shows soil total moisture content [mm] in 0-10 cm soil layer.<br />
                        <b>Data Source:</b> CHIRPS, CHIRP, GPM-IMERG, NCEP, NMME, SMAP, SMOS, MODIS through Regional Hydrological Extreme Assessment (RHEAS) model.<br />
                        <b>Resolution:</b> 5km<br />
                        <b>Frequency of updating:</b> Every 2 weeks
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Rainfall</TableCell>
                    <TableCell>
                        <b>Overview:</b> It shows rainfall in mm.<br />
                        <b>Data Source:</b> CHIRPS, CHIRP, GPM-IMERG, NCEP, NMME, SMAP, SMOS, MODIS through Regional Hydrological Extreme Assessment (RHEAS) model.<br />
                        <b>Resolution:</b> 5km<br />
                        <b>Frequency of updating:</b> Every 2 weeks
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Surface Temperature</TableCell>
                    <TableCell>
                        <b>Overview:</b> It shows the 2m-temperature in deg C.<br />
                        <b>Data Source:</b> CHIRPS, CHIRP, GPM-IMERG, NCEP, NMME, SMAP, SMOS, MODIS through Regional Hydrological Extreme Assessment (RHEAS) model.<br />
                        <b>Resolution:</b> 5km<br />
                        <b>Frequency of updating:</b> Every 2 weeks
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Relative Humidity</TableCell>
                    <TableCell>
                        <b>Overview:</b> It shows the relative humidity in %.<br />
                        <b>Data Source:</b> CHIRPS, CHIRP, GPM-IMERG, NCEP, NMME, SMAP, SMOS, MODIS through Regional Hydrological Extreme Assessment (RHEAS) model.<br />
                        <b>Resolution:</b> 5km<br />
                        <b>Frequency of updating:</b> Every 2 weeks
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default DroughtInfoTable;
