const parametreUrl = new URLSearchParams(window.location.search)
const id = parametreUrl.get('id')

document.addEventListener('DOMContentLoaded', fetchLocation)

async function fetchLocation() {
    const response = await fetch("https://equipe500.tch099.ovh/projet2/api/proprieteparid/" + id)
    const appartements = await response.json();

    const responseImage = await fetch("https://equipe500.tch099.ovh/projet2/api/premiereimage/" + id)
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
    prix.textContent = appartement.prix + "$ / mois"
    adresse.textContent = appartement.adresse
    arrondissement.textContent = appartement.arrondissement
    nombreChambres.textContent = appartement.nb_chambres + " chambres"
    superficie.textContent = appartement.superficie + " m²"
    animaux.textContent = appartement.animaux ? "Oui" : "Non"
    fumeur.textContent = appartement.fumeur ? "Oui" : "Non"
    stationnement.textContent = appartement.stationnement + " stationnement(s)"
    description.textContent = appartement.description
    courrielProprietaire.textContent = appartement.proprietaire_adresse_courriel
    courrielProprietaire.href = "mailto:" + appartement.proprietaire_adresse_courriel + "?subject=Au sujet de l'appartement sur " + appartement.adresse

    if (sessionStorage.getItem("type_compte") == "locataire") {
        const btnAjoutFav = document.createElement("button")
        btnAjoutFav.textContent = "Ajouter comme Favoris"
        btnAjoutFav.classList.add("bouton")
        btnAjoutFav.classList.add("boutonBleu")
        document.querySelector(".boutonFavoris").appendChild(btnAjoutFav)
        btnAjoutFav.addEventListener("click", async () => {
            console.log("allo")
            const nouveauFav = {
                courriel: sessionStorage.getItem("id"),
                adresse: adresse
            }
            await fetch('https://equipe500.tch099.ovh/projet2/api/ajouterfavoris',
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(nouveauFav)
                })
        })
    }
}