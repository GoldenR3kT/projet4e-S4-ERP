const incidentDiv = document.createElement('div');
incidentDiv.id = 'incidentDropdown';

const iframe = document.createElement('iframe');

iframe.src = '/topbar-incidents';
iframe.width = '195vw';
iframe.height = '206vh';
iframe.style.position = 'fixed';
iframe.style.zIndex = '1000';
iframe.style.left = '90vw';
iframe.setAttribute('scrolling', 'no');

incidentDiv.appendChild(iframe);

const erpElement = document.getElementById('erp');

incidentDiv.classList.add('slide-in');

erpElement?.insertBefore(incidentDiv, erpElement.firstChild);


