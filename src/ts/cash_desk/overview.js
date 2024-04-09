"use strict";
const printButton = document.getElementById('print-ticket-button');
const noprint = document.getElementById('no-print-ticket-button');
printButton.addEventListener('click', () => {
    window.print();
    window.location.href = '/cash_desk';
});
noprint.addEventListener('click', () => {
    window.print();
    window.location.href = '/cash_desk';
});
