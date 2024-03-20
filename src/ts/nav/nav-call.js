var navigationOpened = false;
function openNavigation() {
    if (!navigationOpened) {
        var scriptElement = document.createElement('script');
        scriptElement.src = '/ts/nav/navigation.js';
        document.body.appendChild(scriptElement);
        navigationOpened = true;
    }
    else {
        document.getElementById('navigation-div').remove();
        navigationOpened = false;
    }
}
window.addEventListener('message', function (event) {
    if (event.data === 'openNavigation') {
        openNavigation();
    }
});
