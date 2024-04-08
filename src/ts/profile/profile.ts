async function voirinfos() {
    console.log("test");
    const response = await fetch(`/voirInfosEmployeProfil/1`);
    const energies = await response.json();
    console.log(energies);
}

document.addEventListener("DOMContentLoaded", function () {
    voirinfos();
});