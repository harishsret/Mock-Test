// book.js
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('doctorId');
    const response = await fetch(`/api/availability?doctorId=${doctorId}`);
    const availability = await response.json();
    
    const timeslotSelect = document.getElementById('timeslot');
    availability.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        timeslotSelect.appendChild(option);
    });

    document.getElementById('bookingForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const timeslot = timeslotSelect.value;
        const bookingResponse = await fetch(`/api/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ doctorId, timeslot })
        });

        const result = await bookingResponse.json();
        alert(result.message);
    });
});
