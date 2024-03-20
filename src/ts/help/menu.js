document.addEventListener("DOMContentLoaded", function() {
    const helpButtons = document.querySelectorAll('.help-button');

    helpButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetMenu = document.getElementById(targetId);

            if (targetMenu) {

                const allMenus = document.querySelectorAll('.help-menu');
                allMenus.forEach(menu => {
                    menu.classList.remove('active');
                });


                targetMenu.classList.add('active');
            }


            const addHelpSection = document.getElementById('add_help');
            addHelpSection.style.display = 'none';
        });
    });

    const buttonAddHelp = document.getElementById('button_add_help');
    const addHelpSection = document.getElementById('add_help');

    buttonAddHelp.addEventListener('click', function() {

        const activeMenu = document.querySelector('.help-menu.active');
        if (activeMenu) {
            activeMenu.classList.remove('active');
        }


        addHelpSection.style.display = 'block';
    });
});
