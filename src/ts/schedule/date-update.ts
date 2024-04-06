const selectedDateInput: HTMLInputElement | null = document.getElementById('selected-date') as HTMLInputElement;
const scheduleMid: HTMLElement | null = document.getElementById('schedule-mid') as HTMLElement;

// Définir la date du jour dans l'élément input de date
if (selectedDateInput) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Mois actuel
    const formattedMonth = month < 10 ? '0' + month : month.toString();
    const day = currentDate.getDate(); // Jour actuel
    const formattedDay = day < 10 ? '0' + day : day.toString();
    selectedDateInput.value = `${year}-${formattedMonth}-${formattedDay}`;
}


if (selectedDateInput && scheduleMid) {
    selectedDateInput.addEventListener('change', updateCalendar);
}

function updateCalendar(): void {
    if (!selectedDateInput || !scheduleMid) return;

    const selectedDate: Date = new Date(selectedDateInput.value);
    const selectedMonth: number = selectedDate.getMonth();
    const selectedYear: number = selectedDate.getFullYear();
    const daysInMonth: number = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth: number = new Date(selectedYear, selectedMonth, 1).getDay();

    // Déterminer le jour de la semaine où commence le mois précédent
    let daysFromPreviousMonth: number = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Jour actuel
    const currentDate: Date = new Date();
    const currentDay: number = currentDate.getDate();
    const currentMonth: number = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();

    // Mettre à jour les numéros des jours dans le calendrier
    const weeks: NodeListOf<HTMLDivElement> = scheduleMid.querySelectorAll('.week');
    let dayNumber: number = 1 - daysFromPreviousMonth; // Le jour du mois précédent qui apparaît dans le calendrier

    weeks.forEach((week: HTMLDivElement) => {
        const days: NodeListOf<HTMLDivElement> = week.querySelectorAll('.day');
        days.forEach((day: HTMLDivElement, index: number) => {
            if (dayNumber <= 0 || dayNumber > daysInMonth) {
                // Jours du mois précédent ou du mois suivant
                day.textContent = '';
                day.classList.remove('current-day'); // Retirer la classe current-day
            } else {
                // Jours du mois actuel
                day.textContent = dayNumber.toString();

                // Ajouter ou retirer la classe current-day selon si c'est le jour actuel du mois actuel
                if (selectedYear === currentYear && selectedMonth === currentMonth && dayNumber === currentDay) {
                    day.classList.add('current-day');
                } else {
                    day.classList.remove('current-day');
                }
            }
            dayNumber++;
        });
    });

    const daysOfWeek: string[] = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const currentDayOfWeek: string = daysOfWeek[currentDate.getDay()];

    const months: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const currentMonthName: string = months[currentMonth];

    const currentDateString: string = `${currentDayOfWeek} ${currentDay} ${currentMonthName} ${currentYear}`;
    const dayTitleSelected: HTMLElement | null = document.querySelector('.day-title-selected > p');
    if (dayTitleSelected) {
        dayTitleSelected.textContent = currentDateString
    }
}



const previousButton: HTMLButtonElement | null = document.getElementById('schedule-previous') as HTMLButtonElement;
const nextButton: HTMLButtonElement | null = document.getElementById('schedule-next') as HTMLButtonElement;

if (previousButton && nextButton) {
    previousButton.addEventListener('click', goToPreviousMonth);
    nextButton.addEventListener('click', goToNextMonth);
}

function goToPreviousMonth(): void {
    if (!selectedDateInput) return;
    const currentDate: Date = new Date(selectedDateInput.value);
    currentDate.setMonth(currentDate.getMonth() - 1);
    selectedDateInput.value = currentDate.toISOString().slice(0, 10);
    updateCalendar();
}

function goToNextMonth(): void {
    if (!selectedDateInput) return;
    const currentDate: Date = new Date(selectedDateInput.value);
    currentDate.setMonth(currentDate.getMonth() + 1);
    selectedDateInput.value = currentDate.toISOString().slice(0, 10);
    updateCalendar();
}


updateCalendar();

