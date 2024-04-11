const btnLogin = document.querySelector("#login")
const txtEmail = document.querySelector("#email")
const txtPassword = document.querySelector("#password")
const erreur = document.querySelector(".erreur")

btnLogin.addEventListener('click', async (event) => {
    event.preventDefault()

    const user = {
        adresse_courriel: txtEmail.value,
        mot_de_passe: txtPassword.value
    }
    console.log(user)

    const response = await fetch('https://equipe500.tch099.ovh/projet2/api/utilisateurvalide', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
    const result = await response.json();
    if (result['message'] == "valide") {
        sessionStorage.setItem('type_compte', result['type_compte'])
        console.log(sessionStorage.getItem('type_compte'))
        sessionStorage.setItem('courriel', result['adresse_courriel'])

        if (result['type_compte'] == "locataire") {
            // location.replace("https://equipe500.tch099.ovh/projet2/LocAppart/")
        }
        else if (result['type_compte'] == "propriétaire") {
            console.log("proprietaire")
            location.replace("https://equipe500.tch099.ovh/projet2/LocAppart/proprietaire")
        }
    }
    else if (result['message'] == "invalide") {
        erreur.textContent = "Email ou mot de passe invalide"
        txtPassword.value = ""
    }
    else {
        erreur.textContent = "Erreur dans la demande au serveur"
    }
})


