import { setCookie } from './cookies.js'

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
    if(result['message'] == "valide"){
        setCookie("typeCompte", result['type_compte'])
        
        console.log(result['type_compte'])
        console.log(result['type_compte'] == "locataire")
        console.log(result['type_compte'] == "propriétaire")

        if(result['type_compte'] == "locataire"){
            location.replace("https://equipe500.tch099.ovh/projet2/LocAppart/")
        }
        else if(result['type_compte'] == "proprietaire"){
            console.log("proprietaire")
            location.replace("https://equipe500.tch099.ovh/projet2/LocAppart/proprietaire")
        }
    }
    else if(result['message'] == "invalide"){
        erreur.textContent = "Email ou mot de passe invalide"
        txtPassword.value = ""
    }
    else {
        erreur.textContent = "Erreur dans la demande au serveur"
    }
})


