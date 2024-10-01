import React, { useState } from 'react';
import CustomModal from '../common/CustomModal';
import SeasonalWeastherInfoTable from '../tables/SeasonalWeastherInfoTable';

const SeasonalWeatherModal = ({ isOpen, onClose }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Know About Seasonal Weather Products">
            <SeasonalWeastherInfoTable />
        </CustomModal>
    );
};

export default SeasonalWeatherModal;