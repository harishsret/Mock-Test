// search.js
document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const specialty = document.getElementById('specialty').value;
    const location = document.getElementById('location').value;

    const response = await fetch(`/api/search?specialty=${specialty}&location=${location}`);
    const doctors = await response.json();
    
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = doctors.map(doctor => `
        <div>
            <h2>${doctor.name}</h2>
            <p>${doctor.specialty} - ${doctor.location}</p>
            <button onclick="bookAppointment('${doctor.id}')">Book Appointment</button>
        </div>
    `).join('');
});

function bookAppointment(doctorId) {
    window.location.href = `/book?doctorId=${doctorId}`;
}
