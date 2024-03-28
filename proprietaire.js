import { getCookie } from './cookies.js'
import { setCookie } from './cookies.js'
import { deleteCookie } from './cookies.js'

setCookie("id", "david@hotmail.com")

const btnDeconnexion = document.querySelector("#deconnexion")

btnDeconnexion.addEventListener('click', (event) => {
    deleteCookie("typeCompte")
    location.replace("https://equipe500.tch099.ovh/projet2/LocAppart/")
})

document.addEventListener('DOMContentLoaded', fetchAppartements)

async function fetchAppartements() {
    console.log("fetchAppartements")
  const response = await fetch("https://equipe500.tch099.ovh/projet2/api/getproprietebyemail/" + getCookie("id"))
  const appartements = await response.json();
  console.log(appartements)
  console.log(getCookie("id"))
  
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
  const prix = document.createElement("h1")
  const adresse = document.createElement("p")
  const arrondissement = document.createElement("p")
  const nombreChambres = document.createElement("p")
  const superficie = document.createElement("p")
  const animaux = document.createElement("p")
  const fumeur = document.createElement("p")
  const stationnement = document.createElement("p")
  const description = document.createElement("div")
  const detail = document.createElement("div")
  const detailTitre = document.createElement("h2")

  nouveauAppartement.setAttribute("id", appartement.id)
  nouveauAppartement.addEventListener('click', function(event) {
    const id = this.getAttribute('id')
    window.location.href = "https://equipe500.tch099.ovh/projet2/LocAppart/detailsProprietaire?id=" + id
  });

  detailTitre.textContent = "Détails"

  img.src = image_url
  img.classList.add("imgMaison")
  prix.textContent = appartement.prix + "$ / mois"
  adresse.textContent = appartement.adresse
  arrondissement.textContent = appartement.arrondissement
  nombreChambres.textContent = "Nombre de chambres: " + appartement.nb_chambres
  superficie.textContent = "Superficie: " + appartement.superficie + " m²"
  animaux.textContent = "Animaux: " + (appartement.animaux ? "Oui" : "Non")
  fumeur.textContent = "Fumeur: " + (appartement.fumeur ? "Oui" : "Non")
  stationnement.textContent = "Stationnement: " + (appartement.stationnement ? "Oui" : "Non")

  description.classList.add("description")
  description.appendChild(prix)
  description.appendChild(adresse)
  description.appendChild(arrondissement)

  detail.classList.add("detail")
  detail.appendChild(detailTitre)
  detail.appendChild(superficie)
  detail.appendChild(nombreChambres)
  detail.appendChild(stationnement)
  detail.appendChild(animaux)
  detail.appendChild(fumeur)

  nouveauAppartement.appendChild(img);
  nouveauAppartement.appendChild(description);

  main.appendChild(nouveauAppartement);
}
