import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

const LandCoverInfoTable = () => {
  return (
    <Table size='small'>
      <TableBody sx={{borderTop: '1px solid #757575'}}>
        <TableRow>
          <TableCell>Overview</TableCell>
          <TableCell>
            The Cambodia national Land Cover time series (2000 - 2020) was developed through a collaborative effort led by SERVIR-Mekong using the Regional Land Cover Monitoring System approach (Saah et al. 2020). The maps were developed under the auspices of the REDD+ task team and the FCPF project in Cambodia to support the FREL. For this purpose, RLCMS was customized to meet CambodiaNASA&apos;s land cover typologies. An uncertainty assessment was integrated into the assemblage process. These maps were developed using Landsat annual composites and training data collected by MOE.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Resolution</TableCell>
          <TableCell>30m</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Geographic Coverage</TableCell>
          <TableCell>Cambodia</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Data Source</TableCell>
          <TableCell>Landsat 5, 7, 8, 9. Reference data distributed by MOE, partner agencies and crowd sources from Collect Earth Online.</TableCell> {/* Update this with your data source */}
        </TableRow>
        <TableRow>
          <TableCell>Frequency updates</TableCell>
          <TableCell>Annually</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>URL link to tool</TableCell>
          <TableCell><a href="https://landcovermapping.org/">https://landcovermapping.org/</a></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default LandCoverInfoTable;
