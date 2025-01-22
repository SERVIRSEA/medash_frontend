import React from 'react'
import { Grid } from '@mui/material';
import A4PageLayout from './A4PageLayout';
import ReportHeader from './ReportHeader';
import LandCoverPage from './landcover/LandCoverPage';
import FirePage from './fire/FirePage';

const Report = ({ decodedParams }) => {
    const commonParams = decodedParams.common;
    
    const landcoverParams = {
        ...commonParams,
        ...decodedParams.landcover.map
    };

    const fireParams = {
        ...commonParams,
        ...decodedParams.fire.map,
    };
    return (
        <div>
            <A4PageLayout>
                <ReportHeader />
                <Grid container>
                    <LandCoverPage params={landcoverParams}/>
                </Grid>
            </A4PageLayout>
            <A4PageLayout>
                <ReportHeader />
                <Grid container>
                    <FirePage params={fireParams}/>
                </Grid>
            </A4PageLayout>
        </div>
    )
}

export default Report;
