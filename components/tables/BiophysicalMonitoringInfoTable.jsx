import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const BiophysicalMonitoringInfoTable = () => {
    return (
        <Table size='small'>
            <TableBody sx={{borderTop: '1px solid #757575'}}>
                <TableRow>
                    <TableCell>Overview</TableCell>
                    <TableCell>The biophysical monitoring layer uses the Enhanced Vegetation Index (EVI) which is calculated using MODIS multispectral data (MOD13Q1) with a pixel resolution of 250 x 250m. The algorithm chooses the best available pixel value from all the acquisitions from the 16 day period. EVI is a measure of relative biomass and is particularly well-suited for high-biomass areas of the globe.</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Resolution</TableCell>
                    <TableCell>250m</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Geographic Coverage</TableCell>
                    <TableCell>Greater Mekong region</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Data Source</TableCell>
                    <TableCell><a href="https://lpdaac.usgs.gov/products/mod13q1v006/">https://lpdaac.usgs.gov/products/mod13q1v006/</a></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Frequency updates</TableCell>
                    <TableCell>16 days</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>URL link to tool</TableCell>
                    <TableCell><a href="http://ecodash-servir.adpc.net/">http://ecodash-servir.adpc.net/</a></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default BiophysicalMonitoringInfoTable;