import React from 'react';
import HolidaysForm from '../components/HolidaysForm';

function HolidayCreate() {
    const addNewHoliday = (newHoliday) => {
        console.log('New holiday added:', newHoliday);
    };

    return (
        <div>
            <HolidaysForm addNewHoliday={addNewHoliday} />
        </div>
    );
}

export default HolidayCreate;
