"use strict";
var navigationOpened = false;
function openNavigation() {
    var _a;
    if (!navigationOpened) {
        var scriptElement = document.createElement('script');
        scriptElement.src = '/ts/nav/navigation.js';
        document.body.appendChild(scriptElement);
        navigationOpened = true;
    }
    else {
        (_a = document.getElementById('navigation-div')) === null || _a === void 0 ? void 0 : _a.remove();
        navigationOpened = false;
    }
}
window.addEventListener('message', function (event) {
    if (event.data === 'openNavigation') {
        openNavigation();
    }
});
