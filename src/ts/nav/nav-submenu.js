"use strict";
let submenuItems = document.querySelectorAll("#navigation > ul > li > a");
document.addEventListener("DOMContentLoaded", function () {
    submenuItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            // @ts-ignore
            let parentLi = event.target.parentNode; // Utiliser event.target.parentNode pour accéder au parent
            let submenu = parentLi.querySelector("ul");
            if (parentLi && submenu) {
                // Vérifie si le menu est déjà ouvert
                let isOpen = parentLi.classList.contains("open");
                // Ferme tous les autres menus ouverts
                let openMenus = document.querySelectorAll("#navigation > ul > li.open");
                openMenus.forEach(function (openMenu) {
                    if (openMenu !== parentLi) {
                        openMenu.classList.remove("open");
                        let openSubmenu = openMenu.querySelector("ul");
                        if (openSubmenu) {
                            openSubmenu.classList.remove("visible");
                            openSubmenu.style.height = '0px';
                        }
                        // Supprimer marginTop des éléments suivants
                        let nextSibling = openMenu.nextElementSibling;
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
                    // @ts-ignore
                    submenu.classList.add("visible");
                    submenu.style.height = submenu.scrollHeight + 'px';
                }
                else {
                    // @ts-ignore
                    submenu.classList.remove("visible");
                    submenu.style.height = '0px';
                }
                // Si le menu est ouvert, ajoute de l'espace
                let nextSibling = parentLi.nextElementSibling;
                if (isOpen) {
                    let submenuHeight = submenu.clientHeight;
                    if (nextSibling) {
                        nextSibling.style.marginTop = submenuHeight + "px";
                    }
                }
                else {
                    if (nextSibling) {
                        nextSibling.style.marginTop = "0";
                    }
                }
            }
        });
    });
});
