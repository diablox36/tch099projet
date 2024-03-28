import { getCookie } from './cookies.js'
import { deleteCookie } from './cookies.js'

const btnDeconnexion = document.querySelector("#deconnexion")

btnDeconnexion.addEventListener('click', (event) => {
    deleteCookie("typeCompte")
    deleteCookie("id")
    location.replace("https://equipe500.tch099.ovh/projet2/LocAppart/")
})

document.addEventListener('DOMContentLoaded', fetchAppartements)

async function fetchAppartements() {
    const response = await fetch("https://equipe500.tch099.ovh/projet2/api/getproprietebyemail/" + getCookie("id"))
    const appartements = await response.json();
  
    for (const appartement of appartements) {
        const responseImage = await fetch("https://equipe500.tch099.ovh/projet2/api/getfirstimage/" + appartement.id)
        const images = await responseImage.json();

        ajouterAppartement(appartement, images[0]['image_url'])
    }
}

const main = document.querySelector("main");

function ajouterAppartement(appartement, image_url) {
  const nouveauAppartement = document.createElement("article")
  const img = document.createElement("img")
  const description = document.createElement("div")
  const prix = document.createElement("h1")
  const adresse = document.createElement("p")
  const arrondissement = document.createElement("p")

  nouveauAppartement.setAttribute("id", appartement.id)
  nouveauAppartement.addEventListener('click', function(event) {
    const id = this.getAttribute('id')
    window.location.href = "https://equipe500.tch099.ovh/projet2/LocAppart/detailsProprietaire?id=" + id
  });

  img.src = image_url
  img.classList.add("imgMaison")
  prix.textContent = appartement.prix + "$ / mois"
  adresse.textContent = appartement.adresse
  arrondissement.textContent = appartement.arrondissement

  description.classList.add("description")
  description.appendChild(prix)
  description.appendChild(adresse)
  description.appendChild(arrondissement)

  nouveauAppartement.appendChild(img)
  nouveauAppartement.appendChild(description)

  main.appendChild(nouveauAppartement)
}
