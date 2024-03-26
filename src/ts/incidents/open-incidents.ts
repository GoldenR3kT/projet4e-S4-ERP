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
    iframe.style.top = '0vh';
    iframe.style.transition = 'top 0.5s ease';
    incidentDiv.appendChild(iframe);

    erpElement = document.getElementById('erp');
    erpElement?.insertBefore(incidentDiv, erpElement.firstChild);
    void iframe.offsetHeight;
    iframe.style.top = '10vh';
    iframe.setAttribute('scrolling', 'no');


}





function openIncidents() {
    if (!incidentsOpened) {
        createIncidents();
        incidentsOpened = true;
    }
    else {
        document.getElementById('incidentDropdown')?.remove();
        incidentsOpened = false;
    }
}

window.addEventListener('message', function(event) {
    if (event.data === 'openIncidents') {
        openIncidents();
    }
});