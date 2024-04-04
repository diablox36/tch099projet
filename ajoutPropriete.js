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
const maxNumberOfImages = 6

document.querySelector("#enregistrer").addEventListener('click', async (event) => {
    let propriete = {
        prix: prix.value,
        adresse: adresse.value,
        arrondissement: arrondissement.value,
        superficie: superficie.value,
        nb_chambres: nombreChambres.value,
        fumeur: fumeurOui.checked ? 1 : 0,
        animaux: animauxOui.checked ? 1 : 0,
        stationnement: stationnement.value,
        description: description.value,
        proprietaire_adresse_courriel: sessionStorage.getItem('courriel')
    }
    console.log(propriete)

    const response = await fetch('https://equipe500.tch099.ovh/projet2/api/ajouterpropriete', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propriete)
    })
    let result;
    if (response.ok) {
        const text = await response.text();
        console.log('Response text:', text);
        result = await response.json();
        console.log(result);
    } else {
        console.log('Response was not ok', response);
    }
    console.log(result)

    for (let i = 1; i <= maxNumberOfImages; i++) {
        let image = document.querySelector(`#image${i}`)
        console.log(image.value)
        console.log(image.value != "")
        console.log(image.value > 0)
        
        if (image.value) {
            console.log("test")

            await fetch('https://equipe500.tch099.ovh/projet2/api/ajouterimage', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image_url: image.value })
            })
        }
    }
})