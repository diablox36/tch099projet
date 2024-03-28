import { deleteCookie } from './cookies.js'

const btnDeconnexion = document.querySelector("#deconnexion")

btnDeconnexion.addEventListener('click', (event) => {
    deleteCookie("typeCompte")
    location.replace("https://equipe500.tch099.ovh/projet2/LocAppart/")
})


