const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.querySelector('.close');
const timeslotsContainer = document.getElementById('timeslots');
const start_date = document.getElementById('start_date');
const end_date = document.getElementById('end_date');
const daysContainer = document.querySelector('.days');
const selected_day = document.getElementById('selected_day');
// Show modal
openModalBtn.addEventListener('click', function () {
    modal.style.display = 'block';
});

// Hide modal when close button is clicked
closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function getCurrentDay() {
    const today = new Date();
    return days[today.getDay()];
}
function toggleDaySelection() {
    const selectedDay = this.getAttribute('data-day');
    selected_day.innerText = selectedDay;
    const current_days = document.querySelectorAll('.day');
    current_days.forEach(x => x.classList.remove('selected'));
    this.classList.toggle('selected');
}
function generateTimeSlots() {
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
        timeslot.addEventListener('click', toggleTimeSlotSelection);

        timeslotsContainer.appendChild(timeslot);
    }
}
function generateDays() {
    for (let i = 0; i < days.length; i++) {
        const day = document.createElement('div');
        day.textContent = days[i];
        day.setAttribute('data-day', days[i]);
        day.classList.add('day');
        day.addEventListener('click', toggleDaySelection);
        daysContainer.appendChild(day);
    }
}


function toggleTimeSlotSelection() {
    start_date.innerText = this.getAttribute('data-start');
    end_date.innerText = this.getAttribute('data-end');

    // Deselect all other timeslots
    const allTimeslots = document.querySelectorAll('.timeslot');
    allTimeslots.forEach(slot => slot.classList.remove('selected'));
    this.classList.toggle('selected');
}
function highlightCurrentDay() {
    const currentDay = getCurrentDay();
    const dayElement = document.querySelector(`.day[data-day="${currentDay}"]`);
    if (dayElement) {
        dayElement.classList.add('selected');
        selected_day.textContent = currentDay;
    }
}
// Function to toggle between AM and PM
function toggleDayTimeType() {
    const dayTimeTypeElement = document.getElementById('day_time_type');
    if (dayTimeTypeElement) {
        dayTimeTypeElement.textContent =
            dayTimeTypeElement.textContent === 'AM' ? 'PM' : 'AM';
    }
}
document.getElementById('day_time_type').addEventListener('click', toggleDayTimeType);
function initCalendarInput() {
    generateDays();
    generateTimeSlots();
    highlightCurrentDay();

}
const calendarConfirmBtn = document.querySelector('.calendar_confirm');
calendarConfirmBtn.addEventListener('click', (ev) => {
    closeModalBtn.dispatchEvent(new MouseEvent('click'))
});
initCalendarInput();