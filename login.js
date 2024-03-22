const buttonLogin = document.querySelector("#login")

buttonLogin.addEventListener('click', (event) => {

    event.preventDefault();
    let form = document.querySelector('form');
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
        message = document.querySelector("#message_erreur");
        message.innerHTML = "Email invalide!"
    }
})


document.querySelector("#register").addEventListener('click', (event) => {
    event.preventDefault();
    location.replace("./inscription.html");
})

async function getUser(email) {
    const response = await fetch('https://equipe500.tch099.ovh/projet2/api/getutilisateur/' + email);

    return response != [] ? response.json() : false

}

