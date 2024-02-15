import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const ForestAlertInfoTable = () => {
  return (
    <Table size='small'>
      <TableBody sx={{borderTop: '1px solid #757575'}}>
        <TableRow>
          <TableCell>Overview</TableCell>
          <TableCell>
            The forest alert layer uses the GLAD Alert product from UMD, based on the definition of ‘forest’ being - ‘5-m tall trees with a canopy closure exceeding 30%’. An alert is defined as any Landsat pixel that experiences a canopy loss in excess of 50% cover. The alert system is designed to complement a current annual global forest cover loss product that is based on a calendar year update, first prototyped using Landsat-7 data (2000-2019), annually updated thereafter. Source: <a href="http://www.globalforestwatch.org/">http://www.globalforestwatch.org/</a> and <a href="http://earthenginepartners.appspot.com/science-2013-global-forest">http://earthenginepartners.appspot.com/science-2013-global-forest</a>.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Included in this system</TableCell>
          <TableCell>
            The SAR Alert System (SARAS) is a near real-time forest alert system using Synthetic Aperture Radar (SAR). The system is developed by SERVIR-Mekong in partnership with the USAID Greening Prey Lang Project and the Applied Science Team from Oregon State University. The system relies on the newest technologies in the field of cloud computing and artificial intelligence.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Resolution</TableCell>
          <TableCell>30m</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Geographic Coverage</TableCell>
          <TableCell>Global</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Data Source</TableCell>
          <TableCell><a href="https://glad.umd.edu/dataset/glad-forest-alerts">https://glad.umd.edu/dataset/glad-forest-alerts</a></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Frequency updates</TableCell>
          <TableCell>16 days</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>URL link to tool</TableCell>
          <TableCell><a href="https://www.globalforestwatch.org/map/">https://www.globalforestwatch.org/map/</a></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ForestAlertInfoTable;
