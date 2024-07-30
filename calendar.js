document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.querySelector('.calendar');
    const daysGrid = calendar.querySelector('.days');
    const monthYear = calendar.querySelector('#monthYear');
    const prevBtn = calendar.querySelector('#prevBtn');
    const nextBtn = calendar.querySelector('#nextBtn');
    const datesGrid = calendar.querySelector('.dates');
    const currentTime = calendar.querySelector('#currentTime');

    let currentDate = new Date();

    function generateCalendar() {
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

        monthYear.textContent = currentDate.toLocaleString('en-us', { month: 'long', year: 'numeric' });

        datesGrid.innerHTML = '';

        for (let i = 1; i <= daysInMonth; i++) {
            const date = document.createElement('div');
            date.textContent = i;
            date.classList.add('date');
            if (currentDate.getDate() === i) {
                date.classList.add('selected');
            }
            date.addEventListener('click', function() {
                const selectedDates = datesGrid.querySelectorAll('.date.selected');
                selectedDates.forEach(selectedDate => {
                    selectedDate.classList.remove('selected');
                });
                date.classList.add('selected');
            });
            datesGrid.appendChild(date);
        }
    }

    function updateCalendar(direction) {
        if (direction === 'prev') {
            currentDate.setMonth(currentDate.getMonth() - 1);
        } else if (direction === 'next') {
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        generateCalendar();
    }

    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        currentTime.textContent = `${hours}:${minutes}:${seconds}`;
    }

    generateCalendar();
    updateTime();
    setInterval(updateTime, 1000);

    prevBtn.addEventListener('click', function() {
        updateCalendar('prev');
    });

    nextBtn.addEventListener('click', function() {
        updateCalendar('next');
    });
});
