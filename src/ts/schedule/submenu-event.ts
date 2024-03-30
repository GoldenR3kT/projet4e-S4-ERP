document.addEventListener('DOMContentLoaded', function() {
    const addPromotionButton = document.getElementById('add-promotion');

    // @ts-ignore
    addPromotionButton.addEventListener('click', function() {
        const idArticleInput = document.getElementById('id-article');
        const dateStartInput = document.getElementById('date-start-promo');
        const dateEndInput = document.getElementById('date-end-promo');
        const promotionPercentageInput = document.getElementById('promotion-pourcentage');

        // Récupérer les valeurs des champs de formulaire
        // @ts-ignore
        const idArticle = idArticleInput.value;
        // @ts-ignore
        const dateStart = dateStartInput.value;
        // @ts-ignore
        const dateEnd = dateEndInput.value;
        // @ts-ignore
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
        // @ts-ignore
        idArticleInput.value = '';
        // @ts-ignore
        dateStartInput.value = '';
        // @ts-ignore
        dateEndInput.value = '';
        // @ts-ignore
        promotionPercentageInput.value = '';

        // Initialiser les menus après l'ajout de nouveaux éléments
        initializePromotionMenus();
    });
});

// @ts-ignore
function initializePromotionMenus() {
    const promotionItems = document.querySelectorAll('.promotion-item');

    promotionItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const promotionMenu = item.nextElementSibling;
            const isOpen = promotionMenu?.classList.contains('visible');

            if (!isOpen && promotionMenu) {
                closeAllPromotionMenus();
                promotionMenu.classList.add('visible');
                item.classList.add('open');
                promotionMenu.classList.add('style-open');
                adjustMenuHeight(promotionMenu);
                adjustSiblingElements(item.parentElement, true);
            } else {
                closeAllPromotionMenus();
                adjustSiblingElements(item.parentElement, false);
            }
        });
    });
}

// @ts-ignore
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

// @ts-ignore
function adjustMenuHeight(menu: Element) {
    // @ts-ignore
    menu.style.height = 'auto';
    const menuHeight = menu.scrollHeight;
    // @ts-ignore
    menu.style.height = '50px'; // Réduire la hauteur du menu à 50px pour l'exemple
}

// @ts-ignore
function adjustSiblingElements(parentElement: unknown, isOpen: boolean) {
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