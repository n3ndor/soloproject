const BASE_URL = 'http://localhost:8000/api';

export const createBooking = async (data) => {
    const response = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // pass your token here
            'auth-token': localStorage.getItem('usertoken'),
        },
        body: JSON.stringify(data)
    });
    return response.json();
};

// Similarly, you can create other methods like getBookings, updateBooking, deleteBooking
