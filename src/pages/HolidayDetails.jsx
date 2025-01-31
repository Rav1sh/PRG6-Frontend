import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import HolidaysForm from '../components/HolidaysForm';

function HolidayDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [holiday, setHoliday] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        async function fetchHolidayDetails() {
            try {
                const response = await fetch('http://145.24.222.75:8000/holidays/' + id,{
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                });
                const data = await response.json();
                setHoliday(data);
            } catch (error) {
                console.error('Error fetching holiday details:', error);
            }
        }
        fetchHolidayDetails();
    }, [id]);

    async function handleDelete() {
        try {
            const response = await fetch('http://145.24.222.75:8000/holidays/' + id, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error('Failed to delete holiday');
            navigate('/holidays');
        } catch (error) {
            console.error('Error deleting holiday:', error);
        }
    }

    async function handleUpdate(updatedData) {
        try {
            const response = await fetch('http://145.24.222.75:8000/holidays/' + id, {
                method: 'PUT',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            if (!response.ok) throw new Error('Failed to update holiday');
            const updatedHoliday = await response.json();
            setHoliday(updatedHoliday);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating holiday:', error);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            {isEditing ? (
                <HolidaysForm addNewHoliday={handleUpdate} initialData={holiday} />
            ) : (
                holiday && (
                        <>
                            <ul
                                key={holiday.id}
                                className="block max-w-sm p-6 bg-gradient-to-br from-white to-gray-100 border border-gray-300 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 dark:hover:shadow-gray-600 mb-8">
                                <li className="text-3xl font-extrabold text-gray-900 dark:text-white">{holiday.country}</li>
                                <li className="mt-3 text-xl text-gray-700 dark:text-gray-300">{holiday.city}</li>
                                <li className="mt-5 text-lg text-gray-600 dark:text-gray-400 italic">{holiday.review}</li>
                                <li className="mt-5 text-lg text-gray-500 dark:text-gray-400">{holiday.airport}</li>
                            </ul>

                            <div className="flex justify-center gap-4 mt-4">
                                <button
                                    onClick={handleDelete}
                                    className="px-5 py-3 bg-red-500 text-white rounded-xl font-semibold shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300">
                                    Delete
                                </button>

                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-5 py-3 bg-blue-500 text-white rounded-xl font-semibold shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300">
                                    Change
                                </button>
                            </div>
                        </>
                )
            )}
        </div>
    );
}

export default HolidayDetails;