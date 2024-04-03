const parametreUrl = new URLSearchParams(window.location.search)
const id = parametreUrl.get('id')

const btnSupprimer = document.querySelector("#supprimer")
btnSupprimer.addEventListener('click', async(event) => {
    const response = await fetch("https://equipe500.tch099.ovh/projet2/api/supprimerpropriete/" + id)
    const result = await response.json();

    if(result['message'] == "success"){
        location.replace("https://equipe500.tch099.ovh/projet2/LocAppart/proprietaire")
    }
})

document.addEventListener('DOMContentLoaded', fetchLocation)

async function fetchLocation() {
    const response = await fetch("https://equipe500.tch099.ovh/projet2/api/getproprietebyid/" + id)
    const appartements = await response.json();

    const responseImage = await fetch("https://equipe500.tch099.ovh/projet2/api/getfirstimage/" + id)
    const images = await responseImage.json();

    afficherInformation(appartements[0], images[0]['image_url'])
}

function afficherInformation(appartement, image_url) {
    const image = document.querySelector("img")
    const prix = document.querySelector("#prix")
    const adresse = document.querySelector("#adresse")
    const arrondissement = document.querySelector("#arrondissement")
    const nombreChambres = document.querySelector("#nombreChambres")
    const superficie = document.querySelector("#superficie")
    const animaux = document.querySelector("#animaux")
    const fumeur = document.querySelector("#fumeur")
    const stationnement = document.querySelector("#stationnement")
    const description = document.querySelector("#description")
    const courrielProprietaire = document.querySelector("#courrielProprietaire")
    
    image.src = image_url
    image.alt = appartement.adresse
    prix.value = appartement.prix + "$ / mois"
    adresse.value = appartement.adresse
    arrondissement.value = appartement.arrondissement
    nombreChambres.value = appartement.nb_chambres + " chambres"
    superficie.value = appartement.superficie + " m²"
    animaux.value = appartement.animaux ? "Oui" : "Non"
    fumeur.value = appartement.fumeur ? "Oui" : "Non"
    stationnement.value = appartement.stationnement + " stationnement(s)"
    description.value = appartement.description
    courrielProprietaire.textContent = appartement.proprietaire_adresse_courriel
}

