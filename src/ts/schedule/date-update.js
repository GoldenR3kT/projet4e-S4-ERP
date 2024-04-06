"use strict";
const selectedDateInput = document.getElementById('selected-date');
const scheduleMid = document.getElementById('schedule-mid');
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
function updateCalendar() {
    if (!selectedDateInput || !scheduleMid)
        return;
    const selectedDate = new Date(selectedDateInput.value);
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    // Déterminer le jour de la semaine où commence le mois précédent
    let daysFromPreviousMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    // Jour actuel
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    // Mettre à jour les numéros des jours dans le calendrier
    const weeks = scheduleMid.querySelectorAll('.week');
    let dayNumber = 1 - daysFromPreviousMonth; // Le jour du mois précédent qui apparaît dans le calendrier
    weeks.forEach((week) => {
        const days = week.querySelectorAll('.day');
        days.forEach((day, index) => {
            if (dayNumber <= 0 || dayNumber > daysInMonth) {
                // Jours du mois précédent ou du mois suivant
                day.textContent = '';
                day.classList.remove('current-day'); // Retirer la classe current-day
            }
            else {
                // Jours du mois actuel
                day.textContent = dayNumber.toString();
                // Ajouter ou retirer la classe current-day selon si c'est le jour actuel du mois actuel
                if (selectedYear === currentYear && selectedMonth === currentMonth && dayNumber === currentDay) {
                    day.classList.add('current-day');
                }
                else {
                    day.classList.remove('current-day');
                }
            }
            dayNumber++;
        });
    });
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const currentDayOfWeek = daysOfWeek[currentDate.getDay()];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const currentMonthName = months[currentMonth];
    const currentDateString = `${currentDayOfWeek} ${currentDay} ${currentMonthName} ${currentYear}`;
    const dayTitleSelected = document.querySelector('.day-title-selected > p');
    if (dayTitleSelected) {
        dayTitleSelected.textContent = currentDateString;
    }
}
const previousButton = document.getElementById('schedule-previous');
const nextButton = document.getElementById('schedule-next');
if (previousButton && nextButton) {
    previousButton.addEventListener('click', goToPreviousMonth);
    nextButton.addEventListener('click', goToNextMonth);
}
function goToPreviousMonth() {
    if (!selectedDateInput)
        return;
    const currentDate = new Date(selectedDateInput.value);
    currentDate.setMonth(currentDate.getMonth() - 1);
    selectedDateInput.value = currentDate.toISOString().slice(0, 10);
    updateCalendar();
}
function goToNextMonth() {
    if (!selectedDateInput)
        return;
    const currentDate = new Date(selectedDateInput.value);
    currentDate.setMonth(currentDate.getMonth() + 1);
    selectedDateInput.value = currentDate.toISOString().slice(0, 10);
    updateCalendar();
}
updateCalendar();
