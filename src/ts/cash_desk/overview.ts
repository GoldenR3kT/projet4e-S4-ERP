
const printButton= document.getElementById('print-ticket-button') as HTMLButtonElement;
const noprint= document.getElementById('no-print-ticket-button') as HTMLButtonElement;

printButton.addEventListener('click', () => {
    window.print();
    window.location.href = '/cash_desk';
});

noprint.addEventListener('click', () => {
    window.print();
    window.location.href = '/cash_desk';
});