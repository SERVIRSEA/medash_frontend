import React, { useState } from 'react';
import CustomModal from '../common/CustomModal';
import DroughtInfoTable from '../tables/DroughtInfoTable';

const DroughtModal = ({ isOpen, onClose }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Know About Drought Indices">
            <DroughtInfoTable />
        </CustomModal>
    );
};

export default DroughtModal;