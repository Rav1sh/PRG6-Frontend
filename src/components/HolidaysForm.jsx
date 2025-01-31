import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function HolidaysForm({ addNewHoliday, initialData }) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        country: '',
        city: '',
        review: '',
    });

    // If editing mode update formData
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (initialData && initialData.id) {
            addNewHoliday(formData);
        } else {
            createHoliday(); // POST 
        }
    };

    async function createHoliday() {
        try {
            const response = await fetch('http://145.24.222.75:8000/holidays/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            addNewHoliday(data);
            navigate(`/holidays/` + data.id);
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    }

    return (
        <div className="mt-10">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg">
            <div>
                <label htmlFor="country" className="block text-xl font-semibold text-white">Country:</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="city" className="block text-xl font-semibold text-white">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="review" className="block text-xl font-semibold text-white">Review:</label>
                <input
                    type="text"
                    id="review"
                    name="review"
                    value={formData.review}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
                Verzenden
            </button>
        </form>
        </div>
    );
}
export default HolidaysForm