import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function HolidayCollection() {
    const [isLoading, setIsLoading] = useState(true);
    const [holidays, setHolidays] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8;
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchHolidays(page = 1) {
            try {
                setIsLoading(true);

                const response = await fetch(`http://145.24.222.75:8000/holidays?page=${page}&limit=${limit}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                setHolidays(data.items); 
                setPagination(data.pagination);

            } catch (error) {
                console.error('Error fetching holidays:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchHolidays(currentPage);
    }, [currentPage]); // Re-fetch when currentPage changes

    const handleNextPage = () => {
        if (pagination && pagination._links.next) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (pagination && pagination._links.previous) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div>
            {isLoading ? (
                <div>
                    <h1>Loading....</h1>
                </div>
            ) : (
                <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                            {holidays.map(holiday => (
                                <ul
                                    key={holiday.id}
                                    className="block max-w-sm p-6 bg-gradient-to-br from-white to-gray-100 border border-gray-300 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 dark:hover:shadow-gray-600 mb-8">
                                    <li className="text-3xl font-extrabold text-gray-900 dark:text-white">{holiday.country}</li>
                                    <li className="mt-3 text-xl text-gray-700 dark:text-gray-300">{holiday.city}</li>
                                    <li className="mt-5 text-lg text-gray-600 dark:text-gray-400 italic">{holiday.review}</li>

                                    <button
                                        onClick={() => navigate(`/holidays/` + holiday.id)}
                                        className="mt-6 w-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                                        View Details
                                    </button>
                                </ul>
                            ))}
                        </div>

                    {pagination && (
                            <div className="flex justify-center mt-6 space-x-4">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={!pagination._links.previous}
                                    className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${pagination._links.previous ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}>
                                    Previous
                                </button>

                                <button
                                    onClick={handleNextPage}
                                    disabled={!pagination._links.next}
                                    className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${pagination._links.next ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}>
                                    Next
                                </button>
                            </div>
                    )}
                </>
            )}
        </div>
    );
}

export default HolidayCollection;