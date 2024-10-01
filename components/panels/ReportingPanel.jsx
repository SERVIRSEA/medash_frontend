import React from 'react';
import { useAtom } from 'jotai';
import ReportTabs from '../tabs/ReportTabs';
import Dropdown from '../dropdown/Dropdown';

export default function ReportingPanel(){
    return (
        <>
            {/* <Dropdown /> */}
            <ReportTabs />
        </>
    )
}