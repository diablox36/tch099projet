const email = document.querySelector("#email")
const nom = document.querySelector("#nom")
const password = document.querySelector("#password")
const tel = document.querySelector("#tel")
const radio = document.querySelector("#proprietaire")

// Pour enregistrer un nouvel utilisateur
document.querySelector("#inscription").addEventListener('click', async (event) => {
    let utilisateur = {
        adresse_courriel: email.value,
        prenom: nom.value.split(' ')[0],
        nom: nom.value.split(' ')[1],
        mot_de_passe: password.value,
        telephone: tel.value,
        type_compte: radio.checked ? "propriétaire" : "locataire"
    }
    
    await fetch('https://equipe500.tch099.ovh/projet2/api/ajouterutilisateur',
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(utilisateur)
    })
    
    location.replace("./login.html")
})