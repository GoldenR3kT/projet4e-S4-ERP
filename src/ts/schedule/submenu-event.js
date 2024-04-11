"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const addPromotionButton = document.getElementById('add-promotion');
    // @ts-ignore
    addPromotionButton.addEventListener('click', function () {
        const idArticleInput = document.getElementById('id-article');
        const dateStartInput = document.getElementById('date-start-promo');
        const dateEndInput = document.getElementById('date-end-promo');
        const promotionPercentageInput = document.getElementById('promotion-pourcentage');
        // Récupérer les valeurs des champs de formulaire
        const idArticle = idArticleInput.value;
        const dateStart = dateStartInput.value;
        const dateEnd = dateEndInput.value;
        const promotionPercentage = promotionPercentageInput.value;
        // Créer un nouvel élément ul avec les valeurs
        const newPromotionItem = document.createElement('ul');
        newPromotionItem.classList.add('promotion-item');
        newPromotionItem.textContent = `${idArticle}`;
        const newPromotionMenu = document.createElement('ul');
        newPromotionMenu.classList.add('promotion-menu');
        newPromotionMenu.innerHTML = `
            <li>
                <span>Debut: ${dateStart}</span><span>Fin: ${dateEnd}</span>
            </li>
            <li>Employé(e): ${promotionPercentage}</li>
        `;
        // Ajouter le nouvel élément à la liste .promotion-list
        const promotionList = document.querySelector('.promotion-list');
        const newListItem = document.createElement('li');
        newListItem.appendChild(newPromotionItem);
        newListItem.appendChild(newPromotionMenu);
        // @ts-ignore
        promotionList.appendChild(newListItem);
        // Réinitialiser les champs de formulaire
        idArticleInput.value = '';
        dateStartInput.value = '';
        dateEndInput.value = '';
        promotionPercentageInput.value = '';
        // Initialiser les menus après l'ajout de nouveaux éléments
        initializePromotionMenus();
    });
});
function initializePromotionMenus() {
    const promotionItems = document.querySelectorAll('.promotion-item');
    promotionItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const promotionMenu = item.nextElementSibling;
            const isOpen = promotionMenu === null || promotionMenu === void 0 ? void 0 : promotionMenu.classList.contains('visible');
            if (!isOpen && promotionMenu) {
                closeAllPromotionMenus();
                promotionMenu.classList.add('visible');
                item.classList.add('open');
                promotionMenu.classList.add('style-open');
                adjustMenuHeight(promotionMenu);
                adjustSiblingElements(item.parentElement, true);
            }
            else {
                closeAllPromotionMenus();
                adjustSiblingElements(item.parentElement, false);
            }
        });
    });
}
function closeAllPromotionMenus() {
    const allPromotionMenus = document.querySelectorAll('.promotion-menu');
    const allPromotionItems = document.querySelectorAll('.promotion-item');
    allPromotionMenus.forEach(menu => {
        menu.classList.remove('visible');
        menu.classList.remove('style-open');
        // @ts-ignore
        menu.style.height = '0px'; // Réinitialiser la hauteur
    });
    allPromotionItems.forEach(item => {
        item.classList.remove('open');
        item.classList.remove('style-open');
    });
}
function adjustMenuHeight(menu) {
    // @ts-ignore
    menu.style.height = 'auto';
    const menuHeight = menu.scrollHeight;
    // @ts-ignore
    menu.style.height = '50px';
}
// @ts-ignore
function adjustSiblingElements(parentElement, isOpen) {
    // @ts-ignore
    const siblings = Array.from(parentElement.parentElement.children);
    const index = siblings.indexOf(parentElement);
    // Réinitialiser tous les décalages
    siblings.forEach(sibling => {
        // @ts-ignore
        sibling.style.transform = 'translateY(0)';
    });
    // Appliquer le décalage uniquement pour le nouveau menu ouvert
    if (isOpen) {
        for (let i = index + 1; i < siblings.length; i++) {
            const sibling = siblings[i];
            // @ts-ignore
            sibling.style.transform = 'translateY(50px)';
        }
    }
}
initializePromotionMenus();
