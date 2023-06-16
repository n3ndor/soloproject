const BASE_URL = 'http://localhost:8000/api';

export const createBooking = async (data) => {
    const response = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('usertoken'),
        },
        body: JSON.stringify(data)
    });
    return response.json();
};
