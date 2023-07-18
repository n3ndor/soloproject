
export const createBooking = async (data) => {
    const response = await fetch(`${REACT_APP_API_URL}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('usertoken'),
        },
        body: JSON.stringify(data)
    });
    return response.json();
};
