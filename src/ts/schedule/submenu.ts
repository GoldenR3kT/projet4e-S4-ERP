document.addEventListener('DOMContentLoaded', function() {
    const addPromotionButton = document.getElementById('add-promotion');

    // @ts-ignore

    addPromotionButton.addEventListener('click', function() {
        const idArticleInput = document.getElementById('id-article');
        const dateStartInput = document.getElementById('date-start-promo');
        const dateEndInput = document.getElementById('date-end-promo');
        const promotionPercentageInput = document.getElementById('promotion-pourcentage');

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
        newPromotionItem.textContent = `Article ${idArticle}`;

        const newPromotionMenu = document.createElement('ul');
        newPromotionMenu.classList.add('promotion-menu');
        newPromotionMenu.innerHTML = `
            <li>
                <span>Debut: ${dateStart}</span><span>Fin: ${dateEnd}</span>
            </li>
            <li>Solde: ${promotionPercentage}%</li>
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
