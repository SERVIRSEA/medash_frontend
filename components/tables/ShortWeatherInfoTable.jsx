import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const ShortWeatherInfoTable = () => {
    return (
        <Table size='small'>
            <TableBody sx={{borderTop: '1px solid #757575'}}>
                <TableRow>
                    <TableCell><b>Product</b></TableCell>
                    <TableCell><b>Description</b></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Accumulated Rainfall (past 7 days) (mm)</TableCell>
                    <TableCell>
                        <b>Overview:</b> This provides the total rainfall received during the past 7 days in mm.<br />
                        <b>Data Source:</b> IMERG (Integrated Multi-satellitE Retrievals for GPM) – 1day early<br />
                        <b>Resolution:</b> 10km<br />
                        <b>Frequency of updating:</b> Every day
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Average temperature (past 7 days) (C)</TableCell>
                    <TableCell>
                        <b>Overview:</b> This provides the average 2m air temperature during the past 7 days in deg C.<br />
                        <b>Data Source:</b> NCEP GFS Reanalysis (0.25) through Weather Research and Forecasting (WRF) model.<br />
                        <b>Resolution:</b> 5km<br />
                        <b>Frequency of updating:</b> Every day
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Accumulated Rainfall (next 7 days): Forecasted (mm)</TableCell>
                    <TableCell>
                        <b>Overview:</b> This provides the prediction of total rainfall likely to receive during the next 7 days in mm.<br />
                        <b>Data Source:</b> NCEP Global Ensemble Forecast System (GEFS) (0.50) through Weather Research and Forecasting (WRF) model.<br />
                        <b>Resolution:</b> 5km<br />
                        <b>Frequency of updating:</b> Every day
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Average temperature (next 7 days): Forecasted (C)</TableCell>
                    <TableCell>
                        <b>Overview:</b> This provides the predicted average 2m air temperature during the next 7 days in deg C.<br />
                        <b>Data Source:</b> NCEP Global Ensemble Forecast System (GEFS) (0.50) through Weather Research and Forecasting (WRF) model.<br />
                        <b>Resolution:</b> 5km<br />
                        <b>Frequency of updating:</b> Every day
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default ShortWeatherInfoTable;
