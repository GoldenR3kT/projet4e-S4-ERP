const promotionItems: NodeListOf<Element> = document.querySelectorAll('.promotion-item');

promotionItems.forEach(item => {
    item.addEventListener('click', function() {
        const promotionMenu = item.querySelector('.promotion-menu');

        const isOpen = promotionMenu?.classList.contains('visible');

        closeAllPromotionMenus();

        if (!isOpen && promotionMenu) {
            promotionMenu.classList.add('visible');
            item.classList.add('open');
        }
    });
});

function closeAllPromotionMenus() {
    const allPromotionMenus: NodeListOf<Element> = document.querySelectorAll('.promotion-menu');
    const allPromotionItems: NodeListOf<Element> = document.querySelectorAll('.promotion-item');

    allPromotionMenus.forEach(menu => {
        menu.classList.remove('visible');
    });

    allPromotionItems.forEach(item => {
        item.classList.remove('open');
    });
}
