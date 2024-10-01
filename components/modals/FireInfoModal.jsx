import React, { useState } from 'react';
import CustomModal from '../common/CustomModal';
import FireInfoTable from '../tables/FireInfoTable';

const FireInfoModal = ({ isOpen, onClose }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Fire / Burned Area">
            <FireInfoTable />
        </CustomModal>
    );
};

export default FireInfoModal;