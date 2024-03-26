"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var incidentsOpened = false;
function openIncidents() {
    if (!incidentsOpened) {
        var scriptElement = document.createElement('script');
        scriptElement.src = '/ts/incidents/create-menu-incidents.js';
        document.body.appendChild(scriptElement);
        incidentsOpened = true;
    }
    else {
        document.getElementById('incidentDropdown')?.remove();
        incidentsOpened = false;
    }
}
window.addEventListener('message', function (event) {
    if (event.data === 'openIncidents') {
        openIncidents();
    }
});
