import React, { useState } from 'react';
import CustomModal from '../common/CustomModal';
import ForestAlertInfoTable from '../tables/ForestAlertInfoTable';

const ForestAlertModal = ({ isOpen, onClose }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Forest Alert">
            <ForestAlertInfoTable />
        </CustomModal>
    );
};

export default ForestAlertModal;