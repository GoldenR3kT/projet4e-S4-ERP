let navigationOpened = false;
let navigationDiv2 = document.createElement('div');
navigationDiv2.id = 'navigation-div';
let iframe2 = document.createElement('iframe');
let erpElement2 = document.getElementById('erp') as HTMLElement;

function createNavigation(){
    iframe2.src = '/navigation';
    iframe2.width = '18%';
    iframe2.height = '100%';
    iframe2.style.position = 'fixed';
    iframe2.style.zIndex = '1000';
    iframe2.style.left = '-15%';
    iframe2.style.transition = 'left 0.5s ease';
    navigationDiv2.appendChild(iframe2);
    erpElement2?.insertBefore(navigationDiv2, erpElement2.firstChild);
    void iframe2.offsetWidth;
    iframe2.style.left = '0';

}


function openNavigation() {
    if (!navigationOpened) {
        createNavigation();
        navigationOpened = true;
    }
    else {
        iframe2.style.transition = 'left 0.5s ease';
        iframe2.style.left = '-15%';
        void iframe2.offsetWidth;
        document.getElementById('navigation-div')?.remove();
        navigationOpened = false;
    }
}

window.addEventListener('message', function(event) {
    if (event.data === 'openNavigation') {
        openNavigation();
    }
});