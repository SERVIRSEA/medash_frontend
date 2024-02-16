import React, { useState } from 'react';
import CustomModal from './CustomModal';
import DroughtInfoTable from '../tables/DroughtInfoTable';

const DroughtModal = ({ isOpen, onClose }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Learn About Drought Indices">
            <DroughtInfoTable />
        </CustomModal>
    );
};

export default DroughtModal;