"use strict";
var incidentsOpened = false;
function openIncidents() {
    var _a;
    if (!incidentsOpened) {
        var scriptElement = document.createElement('script');
        scriptElement.src = '/ts/incidents/create-menu-incidents.js';
        document.body.appendChild(scriptElement);
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
