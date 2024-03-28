import { cookies } from './cookies.js'

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
        erreur.textContent = ""
        console.log(result['type_compte'])
        cookies.setCookie("typeCompte", result['type_compte'])

        //location.replace("./index.html")
    }
    if(result['message'] == "invalide"){
        erreur.textContent = "Email ou mot de passe invalide"
        txtPassword.value = ""
    }
})


