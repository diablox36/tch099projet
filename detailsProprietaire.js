const parametreUrl = new URLSearchParams(window.location.search)
const id = parametreUrl.get('id')

const btnSupprimer = document.querySelector("#supprimer")
btnSupprimer.addEventListener('click', async (event) => {
    const response = await fetch("https://equipe500.tch099.ovh/projet2/api/supprimerpropriete/" + id)
    const result = await response.json();

    if (result['message'] == "success") {
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
const image = document.querySelector("img")
const prix = document.querySelector("#prix")
const adresse = document.querySelector("#adresse")
const arrondissement = document.querySelector("#arrondissement")
const nombreChambres = document.querySelector("#nombreChambres")
const superficie = document.querySelector("#superficie")
const fumeurOui = document.querySelector("#fumeurOui")
const fumeurNon = document.querySelector("#fumeurNon")
const animauxOui = document.querySelector("#animauxOui")
const animauxNon = document.querySelector("#animauxNon")
const stationnement = document.querySelector("#stationnement")
const description = document.querySelector("#description")
const courrielProprietaire = document.querySelector("#courrielProprietaire")

function afficherInformation(appartement, image_url) {

    image.src = image_url
    image.alt = appartement.adresse
    prix.value = appartement.prix
    adresse.value = appartement.adresse
    arrondissement.value = appartement.arrondissement
    nombreChambres.value = appartement.nb_chambres
    superficie.value = appartement.superficie
    if (appartement.fumeur) {
        fumeurOui.checked = true
        fumeurNon.checked = false
    }
    else {
        fumeurOui.checked = false
        fumeurNon.checked = true
    }
    if (appartement.animaux) {
        animauxOui.checked = true
        animauxNon.checked = false
    }
    else {
        animauxOui.checked = false
        animauxNon.checked = true
    }
    stationnement.value = appartement.stationnement
    description.value = appartement.description
    courrielProprietaire.textContent = appartement.proprietaire_adresse_courriel
}

const btnRetour = document.querySelector('#retour')
btnRetour.addEventListener('click', async (event) => {
    event.preventDefault();

    let update = {
        adresse: adresse.value,
        nb_chambres: nombreChambres.value.split(' ')[0],
        superficie: superficie.value.split(' ')[0],
        prix: prix.value.split('$')[0],
        arrondissement: arrondissement,
        animaux: animauxOui.checked ? 1 : 0,
        fumeur: fumeurOui.checked ? 1 : 0,
        stationnement: stationnement.value.split(' ')[0],
        description: description.value,
        id: id
    }

    await fetch('https://equipe500.tch099.ovh/projet2/api/updatepropriete',
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(update)
        })

    location.replace("https://equipe500.tch099.ovh/projet2/LocAppart/proprietaire")
})