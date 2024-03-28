let listeAppartements = []
const filtre = document.querySelector(".filtre")
filtre.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    location.reload();
  }
});
const nombreAppartementsText = document.querySelector(".nombreAppartements")
let nombreAppartements = 0

document.addEventListener('DOMContentLoaded', fetchAppartements)

async function fetchAppartements() {
  const response = await fetch("https://equipe500.tch099.ovh/projet2/api/getpropriete")
  const appartements = await response.json();
  
  for (const appartement of appartements) {
    const responseImage = await fetch("https://equipe500.tch099.ovh/projet2/api/getfirstimage/" + appartement.id)
    const images = await responseImage.json();

    if(images[0]['image_url'] == undefined) {
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
      ajouterAppartement(appartement[0], appartement[1])
      nombreAppartements++
    }
    nombreAppartementsText.textContent = nombreAppartements
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
    window.location.href = "https://equipe500.tch099.ovh/projet2/LocAppart/details?id=" + id
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
