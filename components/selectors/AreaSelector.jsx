import React from 'react';
import Dropdown from '../dropdown/Dropdown';


const AreaSelector = ()=> {
    const style = {
        position: 'absolute',
        top: '10px',
        right: '80px',
        width: '350px',
        zIndex: 1000,
        background: '#eee',
        borderRadius: '8px',
        border: '1px solid #93c5fd',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    }
    return (
        <div style={style}>
            <Dropdown />
        </div>
    )
}

export default AreaSelector;