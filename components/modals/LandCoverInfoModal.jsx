import React, { useState } from 'react';
import CustomModal from '../common/CustomModal';
import LandCoverInfoTable from '../tables/LandCoverInfoTable';

const LandCoverInfoModal = ({ isOpen, onClose }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Land Cover Layer">
            <LandCoverInfoTable />
        </CustomModal>
    );
};

export default LandCoverInfoModal;

