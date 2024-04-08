"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", function () {
    const announceButton = document.getElementById("announce-button");
    if (announceButton !== null) {
        announceButton.addEventListener("click", function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const nameInput = document.getElementById("name");
                    const levelSelect = document.getElementById("level");
                    const descriptionInput = document.getElementById("description");
                    if (nameInput && levelSelect && descriptionInput) {
                        const name = nameInput.value;
                        const level = levelSelect.value;
                        const description = descriptionInput.value;
                        console.log(name, level, description);
                        const response = yield fetch('/declarerIncident', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                nom: name,
                                description: description,
                                niveau: level,
                                idEmploye: 1,
                                date: getCurrentDate(),
                                heure: getCurrentTime()
                            })
                        });
                        const responseData = yield response.json();
                        console.log(responseData.message);
                    }
                }
                catch (error) {
                    console.error("Une erreur s'est produite lors de la déclaration de l'incident :", error);
                }
            });
        });
    }
    else {
        console.error("Element with ID 'announce-button' not found.");
    }
});
function getCurrentDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}
function getCurrentTime() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
}
function redirectionIncidents() {
    const w = window.top;
    if (w) {
        w.location.href = "/incidents";
    }
}
