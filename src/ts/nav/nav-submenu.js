document.addEventListener("DOMContentLoaded", function () {
    var submenuItems = document.querySelectorAll("#navigation > ul > li > a");
    submenuItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            var parentLi = this.parentNode;
            var submenu = parentLi.querySelector("ul");
            // Vérifie si le menu est déjà ouvert
            var isOpen = parentLi.classList.contains("open");
            // Ferme tous les autres menus ouverts
            var openMenus = document.querySelectorAll("#navigation > ul > li.open");
            openMenus.forEach(function (openMenu) {
                if (openMenu !== parentLi) {
                    openMenu.classList.remove("open");
                    var openSubmenu = openMenu.querySelector("ul");
                    if (openSubmenu) {
                        openSubmenu.classList.remove("visible");
                        openSubmenu.style.height = '0px';
                    }
                    // Supprimer marginTop des éléments suivants
                    var nextSibling = openMenu.nextElementSibling;
                    while (nextSibling) {
                        nextSibling.style.marginTop = "0";
                        nextSibling = nextSibling.nextElementSibling;
                    }
                }
            });
            // Inverse l'état ouvert pour le sous-menu actuel
            parentLi.classList.toggle("open");
            isOpen = !isOpen;
            // Cache ou affiche le sous-menu en fonction de l'état ouvert
            if (isOpen) {
                submenu.classList.add("visible");
                submenu.style.height = submenu.scrollHeight + 'px';
            }
            else {
                submenu.classList.remove("visible");
                submenu.style.height = '0px';
            }
            // Si le menu est ouvert, ajoute de l'espace
            var nextSibling = parentLi.nextElementSibling;
            if (isOpen) {
                var submenuHeight = submenu.clientHeight;
                if (nextSibling) {
                    nextSibling.style.marginTop = submenuHeight + "px";
                }
            }
            else {
                if (nextSibling) {
                    nextSibling.style.marginTop = "0";
                }
            }
        });
    });
});
