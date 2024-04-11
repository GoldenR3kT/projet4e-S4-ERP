let incidentsOpened = false;
let incidentDiv: HTMLElement | null = null;
let iframeIncident: HTMLIFrameElement | null = null;

const erpElementI = document.getElementById('erp') as HTMLElement;

function createIncidents() {
    incidentDiv = document.createElement('div');
    iframeIncident = document.createElement('iframe');
    iframeIncident.src = '/topbar-incidents';
    iframeIncident.width = '195vw';
    iframeIncident.height = '206vh';
    iframeIncident.style.position = 'fixed';
    iframeIncident.style.zIndex = '1000';
    iframeIncident.style.left = '90vw';
    iframeIncident.style.top = '0vh';
    iframeIncident.style.transition = 'top 0.5s ease';
    incidentDiv.appendChild(iframeIncident);
    erpElementI?.insertBefore(incidentDiv, erpElementI.firstChild);
    void iframeIncident.offsetHeight;
    iframeIncident.style.top = '8vh';
    iframeIncident.setAttribute('scrolling', 'no');
}

function openIncidents() {
    if (!incidentsOpened) {
        createIncidents();
        if (incidentDiv) {
            incidentDiv.id = 'incidentDropdown';
            incidentDiv.classList.add('slide-in');
        }
        if (iframeIncident) {
            iframeIncident.width = '155vw';
            iframeIncident.height = '200vh';
            iframeIncident.style.left = '90%';
        }
        incidentsOpened = true;
    } else {
        if (incidentDiv) {
            incidentDiv.remove();
        }
        incidentsOpened = false;
        incidentDiv = null;
        iframeIncident = null;
    }
}

window.addEventListener('message', function(event) {
    if (event.data === 'openIncidents') {
        openIncidents();
    }
});
