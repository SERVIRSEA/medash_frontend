import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const FireInfoTable = () => {
  return (
    <Table size='small'>
      <TableBody sx={{borderTop: '1px solid #757575'}}>
        <TableRow>
          <TableCell>Overview</TableCell>
          <TableCell>
            The information shows the active fire/hotspot of the Fire Information for Resource Management System (FIRMS). This system was developed to provide near real-time active fire locations to natural resource managers that faced challenges obtaining timely satellite-derived fire information. Data displayed in this tool is the Earth Engine version of the Fire Information for Resource Management System (FIRMS) dataset containing the LANCE fire detection product in rasterized form. The near real-time (NRT) active fire locations are processed by LANCE using the standard MODIS MOD14/MYD14 Fire and Thermal Anomalies product. Pixel displayed as a fire hotspot in this tool achieves 90% confidence of the LANCE fire detection model.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Resolution</TableCell>
          <TableCell>1000-m</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Geographic Coverage</TableCell>
          <TableCell>Global</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Data Source</TableCell>
          <TableCell><a href="https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms">https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms</a></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Frequency updates</TableCell>
          <TableCell>
            NASA&apos;s Fire Information for Resource Management System (FIRMS) distributes Near Real-Time (NRT) active fire data within 3 hours
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>URL link to tool</TableCell>
          <TableCell><a href="https://firms.modaps.eosdis.nasa.gov/">https://firms.modaps.eosdis.nasa.gov/</a></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default FireInfoTable;
