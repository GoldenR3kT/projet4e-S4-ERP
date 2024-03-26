document.addEventListener("DOMContentLoaded", function() {
    const addEmployeeButton = document.getElementById("add-employee-button");
    const infoEmployeeSection = document.querySelector(".info-employee");

    // Fonction pour gérer le clic sur le bouton "Ajouter un employé"
    function handleAddEmployeeClick(event: { preventDefault: () => void; }) {
        event.preventDefault(); // Pour éviter le comportement par défaut du bouton (rechargement de la page)

        // Construction du formulaire à afficher dans la section info-employee
        const formHTML = `
            <form action="#" method="POST">
                <h2>Ajouter un employé : 
                    <input type="submit" value="Confirmer l'ajout">
                </h2>
                <fieldset>
                    <legend>INFORMATIONS</legend>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="nom">Nom :</label>
                            <input type="text" id="nom" name="nom" required>
                        </div>
                    
                        <div class="input-container">
                            <label for="prenom">Prénom :</label>
                            <input type="text" id="prenom" name="prenom" required>
                        </div>
                    </div>
                    
                    <div class="line-input">
                        <div class="input-container">
                            <label for="tel">Numéro de téléphone :</label>
                            <input type="tel" id="tel" name="tel" required>
                        </div>
                    
                        <div class="input-container">
                            <label for="email">Adresse email :</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                    </div>
                    
                    <div class="line-input">
                        <div class="input-container">
                            <label for="adresse">Adresse :</label>
                            <textarea id="adresse" name="adresse" rows="4" required></textarea>
                        </div>
                    </div>
                    
                    <br><br>
                </fieldset>
        
                <fieldset>
                    <legend>POSTE</legend>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="poste">Poste :</label>
                            <input type="text" id="poste" name="poste" required><br><br>
                        </div>
                        <div class="input-container">
                            <label for="rang">Rang :</label>
                            <input type="text" id="rang" name="rang" required><br><br>
                        </div>
                    </div>
                </fieldset>
            </form>
        `;

        // Affichage du formulaire dans la section info-employee
        if(infoEmployeeSection) {
            infoEmployeeSection.innerHTML = formHTML;
        }
    }

    // Ajout de l'écouteur d'événement sur le clic du bouton "Ajouter un employé"
    addEmployeeButton?.addEventListener("click", handleAddEmployeeClick);
});
