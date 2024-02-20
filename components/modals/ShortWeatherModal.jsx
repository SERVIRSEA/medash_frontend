import React, { useState } from 'react';
import CustomModal from './CustomModal';
import ShortWeatherInfoTable from '../tables/ShortWeatherInfoTable';

const ShortWeatherModal = ({ isOpen, onClose }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Know About Short Term Weather Products">
            <ShortWeatherInfoTable />
        </CustomModal>
    );
};

export default ShortWeatherModal;