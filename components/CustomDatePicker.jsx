import React, { useState, useEffect, useRef } from 'react';
import './CustomCalendar.css';
import { useAtom } from 'jotai';
import { selectedDroughtDateAtom } from '@/state/atoms';

const CustomDatePicker = ({ availableDates }) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    // const [activeDate, setActiveDate] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);
    const [activeDate, setActiveDate] = useAtom(selectedDroughtDateAtom);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        if (availableDates && availableDates.length > 0) {
            setActiveDate(availableDates[availableDates.length - 1]);
        }
    }, [availableDates, setActiveDate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [calendarRef]);

    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const isDateAvailable = (date) => {
        return availableDates.includes(date);
    };

    const handleDayClick = (date) => {
        if (isDateAvailable(date)) {
            setActiveDate(date); // Update active date internally
            setShowCalendar(false); // Hide the calendar after selecting a date
        }
    };

    const generateCalendarDays = () => {
        const days = [];
        const totalDays = daysInMonth(selectedYear, selectedMonth);
    
        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isAvailable = isDateAvailable(dateStr);
            const isActive = dateStr === activeDate;
            const dayClass = isAvailable ? 'clickable' : 'disabled';
            const activeClass = isActive ? 'active' : '';
        
            days.push(
                <div key={day} className={`date-item ${dayClass} ${activeClass}`} onClick={() => handleDayClick(dateStr)}>
                    {day}
                </div>
            );
        }
        return days;
    };
  
    return (
        <div id="customCalendar">
            <input 
                type="text" 
                value={activeDate} 
                onClick={() => setShowCalendar(!showCalendar)}
                style={{fontSize: '14px'}}
                readOnly
            />
            {availableDates && showCalendar && (
                <div id="calendarWrapper" ref={calendarRef}>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        style={{
                            marginRight: '8px',
                            padding: '8px',
                            fontSize: '14px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                            cursor: 'pointer',
                        }}
                    >
                        {Array.from({ length: 21 }, (_, i) => currentYear - 10 + i).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                        style={{
                            padding: '8px',
                            fontSize: '14px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                            cursor: 'pointer',
                        }}
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index}>{month}</option>
                        ))}
                    </select>
                    <div id="calendar">
                        {generateCalendarDays()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;
