document.addEventListener("DOMContentLoaded", function() {
    var submenuItems = document.querySelectorAll("#navigation > ul > li > a");
    submenuItems.forEach(function(item) {
        item.addEventListener("click", function(event) {
            event.preventDefault();
            var parentLi = this.parentNode;
            var submenu = parentLi.querySelector("ul");

            // Vérifie si le menu est déjà ouvert
            var isOpen = parentLi.classList.contains("open");

            // Ferme tous les autres menus ouverts
            var openMenus = document.querySelectorAll("#navigation > ul > li.open");
            openMenus.forEach(function(openMenu) {
                openMenu.classList.remove("open");
                var openSubmenu = openMenu.querySelector("ul");
                openSubmenu.style.height = '0px';
            });

            parentLi.classList.toggle("open", !isOpen);
            submenu.classList.toggle("visible", !isOpen);

            // Si le menu est ouvert, ajoute de l'espace
            if (!isOpen) {
                var submenuHeight = submenu.clientHeight;
                var nextSibling = parentLi.nextElementSibling;
                nextSibling.style.marginTop = "15vh";
            } else {
                var nextSibling = parentLi.nextElementSibling;
                nextSibling.style.marginTop = "0";
            }
        });
    });
});