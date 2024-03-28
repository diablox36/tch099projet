import { getCookie } from './cookies.js'
import { setCookie } from './cookies.js'
import { checkCookie } from './cookies.js'
import { deleteCookie } from './cookies.js'

let listeAppartements = []
const filtre = document.querySelector(".filtre")
filtre.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    location.reload();
  }
})

const header = document.querySelector("header")
const btnConnexion = document.querySelector("#btnConnexion")
const messageConnexion = document.querySelector(".message")

const nombreAppartementsText = document.querySelector(".nombreAppartements")
let nombreAppartements = 0
let compteConnecter = false

if(checkCookie("typeCompte")) {
  if(getCookie("typeCompte") == "locataire") {
    compteConnecter = true

    const btn = document.createElement("button")
    btn.classList.add("bouton")
    btn.textContent = "Déconnexion"
    btn.addEventListener('click', (event) => {
      deleteCookie("typeCompte")
      deleteCookie("id")
      location.replace("https://equipe500.tch099.ovh/projet2/LocAppart/")
    })
    header.appendChild(btn)
    btnConnexion.style.display = "none"
    messageConnexion.style.display = "none"
  }
}


document.addEventListener('DOMContentLoaded', fetchAppartements)

async function fetchAppartements() {
  const response = await fetch("https://equipe500.tch099.ovh/projet2/api/getpropriete")
  const appartements = await response.json();
  
  for (const appartement of appartements) {
    const responseImage = await fetch("https://equipe500.tch099.ovh/projet2/api/getfirstimage/" + appartement.id)
    const images = await responseImage.json();

    if(images.length == 0) {
      listeAppartements.push([appartement, "https://via.placeholder.com/200"])
    }
    else{
      listeAppartements.push([appartement, images[0]['image_url']])
    }
  }
  filterAppartement()
}

function filterAppartement() {
  for (const appartement of listeAppartements) {
    if (appartement[0].adresse.toLowerCase().includes(filtre.value.toLowerCase()) || appartement[0].arrondissement.toLowerCase().includes(filtre.value.toLowerCase())) {
      if(!compteConnecter && nombreAppartements < 12) {
        ajouterAppartement(appartement[0], appartement[1])
      }
      else if(compteConnecter) {
        ajouterAppartement(appartement[0], appartement[1])
      }
      nombreAppartements++
    }
    nombreAppartementsText.textContent = nombreAppartements
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
  if(compteConnecter) {
    nouveauAppartement.addEventListener('click', function(event) {
      const id = this.getAttribute('id')
      window.location.href = "https://equipe500.tch099.ovh/projet2/LocAppart/details?id=" + id
    })
  }
  img.src = image_url
  img.classList.add("imgMaison")
  prix.textContent = appartement.prix + "$ / mois"
  adresse.textContent = appartement.adresse
  arrondissement.textContent = appartement.arrondissement

  description.classList.add("description")
  description.appendChild(prix)
  description.appendChild(adresse)
  description.appendChild(arrondissement)

  nouveauAppartement.appendChild(img);
  nouveauAppartement.appendChild(description);

  main.appendChild(nouveauAppartement);
}
