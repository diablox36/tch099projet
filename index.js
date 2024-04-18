const header = document.querySelector("header")
const btnConnexion = document.querySelector("#btnConnexion")
const messageConnexion = document.querySelector(".message")
const nombreAppartementsText = document.querySelector(".nombreAppartements")
const main = document.querySelector("main");
const selectTrier = document.querySelector("#select")
const filtre = document.querySelector(".filtre")
const btn = document.createElement("button")

let listeAppartements = []
let compteConnecter = false
let filtreText = ""

if (sessionStorage.getItem("type_compte") == "locataire") {
  compteConnecter = true

  btn.classList.add("bouton")
  btn.textContent = "Déconnexion"
  btn.addEventListener('click', (event) => {
    compteConnecter = false
    sessionStorage.clear()
    location.reload()
  })
  header.appendChild(btn)
  btnConnexion.style.display = "none"
  messageConnexion.style.display = "none"
}

document.addEventListener('DOMContentLoaded', fetchAppartements("https://equipe500.tch099.ovh/projet2/api/proprietes"))

// Fin du main, début des fonctions
async function fetchAppartements(url) {
  const response = await fetch(url)
  const appartements = await response.json();

  for (const appartement of appartements) {
    const responseImage = await fetch("https://equipe500.tch099.ovh/projet2/api/premiereimage/" + appartement.id)
    const images = await responseImage.json();
    if (images.length > 0) {
      listeAppartements.push([appartement, images[0]['image_url']])
    }
  }
  filtreAppartements()
}

function filtreAppartements() {
  let numAppartements = 0
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild)
  }

  for (const appartement of listeAppartements) {
    if (!compteConnecter && numAppartements >= 12) {
      break
    }
    if (appartement[0].adresse.toLowerCase().includes(filtreText.toLowerCase())
      || appartement[0].arrondissement.toLowerCase().includes(filtreText.toLowerCase())) {
      ajouterAppartement(appartement[0], appartement[1])
      numAppartements++
    }
  }
  nombreAppartementsText.textContent = numAppartements
}

selectTrier.onchange = (event) => {
  let selectText = event.target.value;
  listeAppartements = []
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild)
  }
  console.log(sessionStorage.getItem("courriel"))
  if (selectText === "") {
    fetchAppartements("https://equipe500.tch099.ovh/projet2/api/proprietes")
  }
  else {
    if (selectText != "Favoris") {
      fetchAppartements("https://equipe500.tch099.ovh/projet2/api/ordonnerpropriete/" + selectText);
    }
    else {
      console.log(sessionStorage.getItem("courriel"))
      fetchAppartements("https://equipe500.tch099.ovh/projet2/api/trouverfavoris/" + sessionStorage.getItem("courriel"))
    }
  }
}

filtre.onchange = (event) => {
  filtreText = event.target.value;
  filtreAppartements()
}

function ajouterAppartement(appartement, image_url) {
  let nouveauAppartement = document.createElement("article")
  nouveauAppartement.setAttribute("id", appartement.id)
  if (compteConnecter) {
    nouveauAppartement.addEventListener('click', () => {
      window.location.href = "https://equipe500.tch099.ovh/projet2/LocAppart/details?id=" + appartement.id
    })
  }

  const img = document.createElement("img")
  const description = document.createElement("div")
  const prix = document.createElement("h1")
  const adresse = document.createElement("p")
  const arrondissement = document.createElement("p")

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
