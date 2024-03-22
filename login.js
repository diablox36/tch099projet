const buttonLogin = document.querySelector("#login")

buttonLogin.addEventListener('click', (event) => {

    event.preventDefault();
    const form = document.querySelector('form');
    const message = document.querySelector(".erreur");

    let formData = new FormData(form);
    let userType = formData.get("#proprietaire").checked ? "propriétaire" : "locataire"

    let connectingUser = {
        email: formData.get("email"),
        password: formData.get("password")
    }

    user = getUser(connectingUser.email);

    if (user != false && user.mot_de_passe == connectingUser.password) {
        //implmenter connexion et autre truc du genre
        location.replace("./index.html");
    }
    else {
        message.textContent = "Email invalide!"
    }
})

async function getUser(email) {
    const response = await fetch('https://equipe500.tch099.ovh/projet2/api/getutilisateur/' + email);

    return response != [] ? response.json() : false

}

