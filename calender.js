const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.querySelector('.close');
const timeslotsContainer = document.getElementById('timeslots');
const start_date = document.getElementById('start_date');
const end_date = document.getElementById('end_date');
// Show modal
openModalBtn.addEventListener('click', function () {
    modal.style.display = 'block';
});

// Hide modal when close button is clicked
closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});

// Generate timeslots for Tuesday (assuming the day is fixed)
for (let i = 0; i < 12; i++) {
    const startTime = i.toString().padStart(1, '0') + ':00';
    const endTime = (i + 1).toString().padStart(1, '0') + ':00';

    const timeslot = document.createElement('div');
    timeslot.classList.add('timeslot');
    if (startTime == start_date.innerText && endTime == end_date.innerText) {
        timeslot.classList.add('selected');
    }
    timeslot.textContent = `From ${startTime} to ${endTime}`;
    timeslot.setAttribute('data-start', startTime);
    timeslot.setAttribute('data-end', endTime);
    timeslot.addEventListener('click', toggleSelection);

    timeslotsContainer.appendChild(timeslot);
}

function toggleSelection() {
    start_date.innerText = this.getAttribute('data-start');
    end_date.innerText = this.getAttribute('data-end');

    // Deselect all other timeslots
    const allTimeslots = document.querySelectorAll('.timeslot');
    allTimeslots.forEach(slot => slot.classList.remove('selected'));
    closeModalBtn.dispatchEvent(new MouseEvent('click'))
    // Select the clicked timeslot
    this.classList.toggle('selected');
}