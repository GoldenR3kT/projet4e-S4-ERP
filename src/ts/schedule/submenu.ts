document.addEventListener('DOMContentLoaded', function() {
    const addPromotionButton = document.getElementById('add-promotion') as HTMLButtonElement;


    addPromotionButton.addEventListener('click', function() {
        const idArticleInput = document.getElementById('id-article') as HTMLInputElement;
        const dateStartInput = document.getElementById('date-start-promo') as HTMLInputElement;
        const dateEndInput = document.getElementById('date-end-promo') as HTMLInputElement;
        const promotionPercentageInput = document.getElementById('promotion-pourcentage') as HTMLInputElement;


        const idArticle = idArticleInput.value;
        const dateStart = dateStartInput.value;
        const dateEnd = dateEndInput.value;
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
        const promotionList = document.querySelector('.promotion-list') as HTMLUListElement;
        const newListItem = document.createElement('li') as HTMLLIElement;
        newListItem.appendChild(newPromotionItem);
        newListItem.appendChild(newPromotionMenu);
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
