document.addEventListener('DOMContentLoaded', function() {
    const promotionItems = document.querySelectorAll('.promotion-item');

    promotionItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const menu = item.nextElementSibling;
            // @ts-ignore
            if (menu.style.display === 'block') {
                // @ts-ignore
                menu.style.display = 'none';
            } else {
                // @ts-ignore
                menu.style.backgroundColor = 'green';
                // @ts-ignore
                menu.style.display = 'block';

            }
        });
    });
});
