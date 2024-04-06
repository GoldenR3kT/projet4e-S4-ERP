"use strict";
var navigationOpened = false;
const navigationDiv = document.createElement('div');
navigationDiv.id = 'navigation-div';
let iframe = document.createElement('iframe');
let erpElement = document.getElementById('erp');
function createNavigation() {
    iframe.src = '/navigation';
    iframe.width = '18%';
    iframe.height = '100%';
    iframe.style.position = 'fixed';
    iframe.style.zIndex = '1000';
    iframe.style.left = '-15%';
    iframe.style.transition = 'left 0.5s ease'; // Ajoutez une transition au style left
    navigationDiv.appendChild(iframe);
    erpElement === null || erpElement === void 0 ? void 0 : erpElement.insertBefore(navigationDiv, erpElement.firstChild);
    void iframe.offsetWidth;
    iframe.style.left = '0';
}
function openNavigation() {
    var _a;
    if (!navigationOpened) {
        createNavigation();
        navigationOpened = true;
    }
    else {
        iframe.style.transition = 'left 0.5s ease';
        iframe.style.left = '-15%';
        void iframe.offsetWidth;
        (_a = document.getElementById('navigation-div')) === null || _a === void 0 ? void 0 : _a.remove();
        navigationOpened = false;
    }
}
window.addEventListener('message', function (event) {
    if (event.data === 'openNavigation') {
        openNavigation();
    }
});
