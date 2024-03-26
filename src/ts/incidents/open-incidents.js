"use strict";
var incidentsOpened = false;
const incidentDiv = document.createElement('div');
incidentDiv.id = 'incidentDropdown';
function createIncidents() {
    iframe = document.createElement('iframe');
    iframe.src = '/topbar-incidents';
    iframe.width = '195vw';
    iframe.height = '206vh';
    iframe.style.position = 'fixed';
    iframe.style.zIndex = '1000';
    iframe.style.left = '90vw';
    iframe.setAttribute('scrolling', 'no');
    incidentDiv.appendChild(iframe);
    erpElement = document.getElementById('erp');
    incidentDiv.classList.add('slide-in');
    erpElement === null || erpElement === void 0 ? void 0 : erpElement.insertBefore(incidentDiv, erpElement.firstChild);
}
function openIncidents() {
    var _a;
    if (!incidentsOpened) {
        createIncidents();
        incidentsOpened = true;
    }
    else {
        (_a = document.getElementById('incidentDropdown')) === null || _a === void 0 ? void 0 : _a.remove();
        incidentsOpened = false;
    }
}
window.addEventListener('message', function (event) {
    if (event.data === 'openIncidents') {
        openIncidents();
    }
});
