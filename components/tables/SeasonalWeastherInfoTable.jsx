import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const SeasonalWeastherInfoTable = () => {
    return (
        <Table size='small'>
            <TableBody sx={{borderTop: '1px solid #757575'}}>
                <TableRow>
                    <TableCell><b>Product</b></TableCell>
                    <TableCell><b>Description</b></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Rainfall Anomaly (next 3 months): Forecasted (mm)</TableCell>
                    <TableCell>
                        <b>Overview:</b> This provides the prediction of anomaly of rainfall during the next 3 months period in mm/month. 1991-2020 period is considered as the baseline period.<br />
                        <b>Data Source:</b> North American Multi-Model Ensemble (NMME).<br />
                        <b>Resolution:</b> 5km (through RHEAS model)<br />
                        <b>Frequency of updating:</b> Every month
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Temperature Anomaly (next 3 months): Forecasted (C)</TableCell>
                    <TableCell>
                        <b>Overview:</b> This provides the prediction of anomaly of 2m air temperature during the next 3 months period in deg C. 1991-2020 period is considered as the baseline period.<br />
                        <b>Data Source:</b> North American Multi-Model Ensemble (NMME).<br />
                        <b>Resolution:</b> 5km (through RHEAS model)<br />
                        <b>Frequency of updating:</b> Every month
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default SeasonalWeastherInfoTable;
