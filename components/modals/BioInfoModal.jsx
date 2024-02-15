import React, { useState } from 'react';
import BiophysicalMonitoringInfoTable from '../tables/BiophysicalMonitoringInfoTable';
import CustomModal from './CustomModal';

const BioInfoModal = ({ isOpen, onClose }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Biophysical Layer">
            <BiophysicalMonitoringInfoTable />
        </CustomModal>
    );
};

export default BioInfoModal;

