const parametreUrl = new URLSearchParams(window.location.search)
let id = parametreUrl.get('id')
id = 1
let oldImages = null

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

    const responseImage = await fetch("https://equipe500.tch099.ovh/projet2/api/getimage/" + id)
    oldImages = await responseImage.json();
    console.log(oldImages)
    afficherInformation(appartements[0], oldImages)
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
const image1 = document.querySelector("#image1")
const image2 = document.querySelector("#image2")
const image3 = document.querySelector("#image3")
const image4 = document.querySelector("#image4")
const image5 = document.querySelector("#image5")
const image6 = document.querySelector("#image6")
const listeImages = [image1, image2, image3, image4, image5, image6]

function afficherInformation(appartement, images) {

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

    for (let i = 0; i < images.length; i++) {
        listeImages[i].value = images[i]['image_url']
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
    let newImages = []

    await fetch('https://equipe500.tch099.ovh/projet2/api/updatepropriete', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatepropriete)
    })

    //await fetch('https://equipe500.tch099.ovh/projet2/api/supprimerimagespropriete/' + id)

    for (const image of listeImages) {
        if (image.value > 0) {
            await fetch('https://equipe500.tch099.ovh/projet2/api/ajouterimage', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({image_url: image.value, propriete_id: id})
            })
        }
    }
    location.replace("https://equipe500.tch099.ovh/projet2/LocAppart/proprietaire")
})