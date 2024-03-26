var navigationOpened = false;
const navigationDiv = document.createElement('div');
navigationDiv.id = 'navigation-div';
let iframe = document.createElement('iframe');
let erpElement = document.getElementById('erp');

function createNavigation(){
    iframe.src = '/navigation';
    iframe.width = '18%';
    iframe.height = '100%';
    iframe.style.position = 'fixed';
    iframe.style.zIndex = '1000';
    iframe.style.left = '0vw';
    navigationDiv.appendChild(iframe);
    navigationDiv.classList.add('slide-in');
    erpElement?.insertBefore(navigationDiv, erpElement.firstChild);
}


function openNavigation() {
    if (!navigationOpened) {
        createNavigation();
        navigationOpened = true;
    }
    else {
        document.getElementById('navigation-div')?.remove();
        navigationOpened = false;
    }
}

window.addEventListener('message', function(event) {
    if (event.data === 'openNavigation') {
        openNavigation();
    }
});