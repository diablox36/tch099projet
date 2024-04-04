const parametreUrl = new URLSearchParams(window.location.search)
let id = parametreUrl.get('id')
const maxNumberOfImages = 6
let oldImages 
id = 1

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
    const response = await fetch("https://equipe500.tch099.ovh/projet2/api/proprieteparid/" + id)
    const appartements = await response.json();

    const responseImage = await fetch("https://equipe500.tch099.ovh/projet2/api/images/" + id)
    oldImages = await responseImage.json();
    afficherInformation(appartements[0])
}
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

function afficherInformation(appartement) {

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
    
    for (let i = 0; i < oldImages.length; i++) {
        const image = document.querySelector(`#image${i}`)
        image.value = oldImages[i]['image_url']
    }
}

const btnRetour = document.querySelector('#retour')
btnRetour.addEventListener('click', async (event) => {
    event.preventDefault();

    let updatepropriete = {
        adresse: adresse.value,
        nb_chambres: nombreChambres.value,
        superficie: superficie.value,
        prix: prix.value,
        arrondissement: arrondissement.value,
        animaux: animauxOui.checked ? 1 : 0,
        fumeur: fumeurOui.checked ? 1 : 0,
        stationnement: stationnement.value,
        description: description.value,
        id: id,
    }

    await fetch('https://equipe500.tch099.ovh/projet2/api/updatepropriete', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatepropriete)
    })

    let newImages = []
    for (let i = 0; i < maxNumberOfImages; i++) {
        const image = document.querySelector(`#image${i}`)
        if (image.value != ""){
            newImages.push(image.value)
        }
    }

    if(newImages.length >= oldImages.length) {
        for (let i = 0; i < newImages.length; i++) {
            if (i < oldImages.length) {
                // Update existing image
                await fetch('https://equipe500.tch099.ovh/projet2/api/updateimage', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image_url: newImages[i], image_id: oldImages[i]['image_id'] })
                });
            } else {
                // Add new images
                await fetch('https://equipe500.tch099.ovh/projet2/api/ajouterimage', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image_url: newImages[i], propriete_id: id })
                });
            }   
        }
    } else {
        for (let i = 0; i < oldImages.length; i++) {
            if (i < newImages.length) {
                // Update existing image
                await fetch('https://equipe500.tch099.ovh/projet2/api/updateimage', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image_url: newImages[i], image_id: oldImages[i]['image_id'] })
                });
            } else {
                // Delete extra images
                await fetch('https://equipe500.tch099.ovh/projet2/api/supprimerimage/' + oldImages[i]['image_id'])
            }
        }
    }
    location.replace("https://equipe500.tch099.ovh/projet2/LocAppart/proprietaire")
})