import React, { useState } from 'react';
import CustomModal from '../common/CustomModal';
import ForestMonitoringInfoTable from '../tables/ForestMonitoringInfoTable';

const ForestMonitoringModal = ({ isOpen, onClose }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Forest Layer">
            <ForestMonitoringInfoTable />
        </CustomModal>
    );
};

export default ForestMonitoringModal;