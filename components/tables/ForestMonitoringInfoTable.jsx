import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const ForestMonitoringInfoTable = () => {
  return (
    <Table size='small'>
      <TableBody sx={{borderTop: '1px solid #757575'}}>
        <TableRow>
          <TableCell>Overview</TableCell>
          <TableCell>
            The forest monitoring layer primarily uses annual forest cover time series data. This data is created using Tree Canopy Cover (TCC) and Tree Canopy Height (TCH) layers, which was collated and delivered by the GLAD/UMD team for the Mekong region (Potapov et al. 2019). The data was taken from time-series analysis of Landsat images characterizing forest extent and change. Using FAO forest definition with TCC is equal or greater than 10% and TCH is higher or equal 5m, and the minimum mapping unit is 0.5ha.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Resolution</TableCell>
          <TableCell>30m</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Geographic Coverage</TableCell>
          <TableCell>Greater Mekong region</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Data Source</TableCell>
          <TableCell><a href="https://www.landcovermapping.org/en/about/">https://www.landcovermapping.org/en/about/</a></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Frequency updates</TableCell>
          <TableCell>Annually</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>URL link to tool</TableCell>
          <TableCell><a href="https://www.landcovermapping.org/en/forest-monitor/">https://www.landcovermapping.org/en/forest-monitor/</a></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ForestMonitoringInfoTable;