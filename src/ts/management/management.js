document.addEventListener("DOMContentLoaded", function() {
        var submitButtonAdded = false;

        var newButton = document.getElementById("new_button").querySelector("button");

        newButton.addEventListener("click", function() {
            var inputElement = document.getElementById("compte_rendu");

            inputElement.placeholder = "Rédiger compte rendu";

            if (submitButtonAdded) {
                var submitButton = document.getElementById("submit");
                if (submitButton) {
                    submitButton.parentNode.removeChild(submitButton);
                    submitButtonAdded = false;
                }
            }

            var submitButton = document.createElement("button");
            submitButton.id = "submit";
            submitButton.textContent = "Valider";
            submitButton.style.marginTop = "5px";
            submitButton.style.backgroundColor = "#0FD274";
            submitButton.style.width = "200px";
            submitButton.style.height = "50px";
            submitButton.style.borderRadius = "10px";

            inputElement.parentNode.insertBefore(submitButton, inputElement.nextSibling);
            submitButtonAdded = true;
        });

        var liElements = document.querySelectorAll("#left_management .scroller ul li");

        liElements.forEach(function(liElement) {
            liElement.addEventListener("click", function() {

                var inputElement = document.getElementById("compte_rendu");

                if (submitButtonAdded) {
                    var submitButton = document.getElementById("submit");
                    if (submitButton) {
                        submitButton.parentNode.removeChild(submitButton);
                        submitButtonAdded = false;
                    }
                }

                var newInputElement = document.createElement("input");
                newInputElement.id = "compte_rendu";
                newInputElement.type = "text";
                newInputElement.placeholder = "Nouvelles informations liées à " + liElement.textContent;

                inputElement.parentNode.replaceChild(newInputElement, inputElement);
            });
        });
});
