var incidentDiv = document.createElement('div');
incidentDiv.id = 'incidentDropdown';

var iframe = document.createElement('iframe');
iframe.src = '/topbar-incidents';
iframe.width = '200vw';
iframe.height = '208vh';
iframe.style.position = 'fixed';
iframe.style.zIndex = '1000';
iframe.style.left = '85%';
incidentDiv.appendChild(iframe);

var erpElement = document.getElementById('erp');

incidentDiv.classList.add('slide-in');

erpElement.insertBefore(incidentDiv, erpElement.firstChild);


