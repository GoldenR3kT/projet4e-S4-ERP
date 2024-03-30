"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const ticketItems = document.querySelectorAll('.ticket-list-scrollable p');
    const invoiceItems = document.querySelectorAll('.invoice-list-scrollable p');
    const selectionText = document.getElementById('ask-choose-invoice');
    const selectedContainer = document.getElementById('ticket-or-invoice-selected');
    ticketItems.forEach(function (item) {
        item.addEventListener('click', function () {
            clearSelections(ticketItems);
            clearOtherSelections(invoiceItems);
            item.classList.add('selected');
            updateSelectionText(item.textContent);
        });
    });
    invoiceItems.forEach(function (item) {
        item.addEventListener('click', function () {
            clearSelections(invoiceItems);
            clearOtherSelections(ticketItems);
            item.classList.add('selected');
            updateSelectionText(item.textContent);
        });
    });
    function clearSelections(items) {
        items.forEach(function (item) {
            item.classList.remove('selected');
        });
    }
    function clearOtherSelections(items) {
        items.forEach(function (item) {
            item.classList.remove('selected');
        });
    }
    function updateSelectionText(text) {
        // @ts-ignore
        selectionText.style.display = 'none';
        // @ts-ignore
        selectedContainer.innerHTML = `<p>${text}</p>`;
        // @ts-ignore
        selectedContainer.classList.add('visible');
    }
});
