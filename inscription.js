// Pour enregistrer un nouvel utilisateur
document.querySelector("register").addEventListener('click', async (event) => {

    event.preventDefault();
    let form = document.querySelector('form');
    let formData = new FormData(form);

    let newUser = {
        adresse_courriel: formData.get("email"),
        prenom: formData.get("nom").split(' ')[0],
        nom: formData.get("nom").split(' ')[1],
        mot_de_passe: formData.get("password"),
        telephone: formData.get("tel"),
        type_compte: formData.get("proprietaire").checked ? "propriétaire" : "locataire"
    }

    await fetch('https://equipe500.tch099.ovh/projet2/api/ajouterutilisateur',
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })

    location.replace("./login.html")

})