const btnLogin = document.querySelector("#login")
const txtEmail = document.querySelector("#email")
const txtPassword = document.querySelector("#password")

btnLogin.addEventListener('click', async (event) => {
    event.preventDefault()

    const user = {
        adresse_courriel: txtEmail.value,
        mot_de_passe: txtPassword.value
    }
    console.log(user)

    const response = await fetch('https://equipe500.tch099.ovh/projet2/api/userexist', {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(user)
    })
    const txt = await response.json();
    console.log(txt)
})

// location.replace("./login.html")


//     event.preventDefault();
//     const form = document.querySelector('form');
//     const message = document.querySelector(".erreur");

//     let formData = new FormData(form);
//     let userType = formData.get("#proprietaire").checked ? "propriétaire" : "locataire"

//     let connectingUser = {
//         email: formData.get("email"),
//         password: formData.get("password")
//     }

//     user = getUser(connectingUser.email);

//     if (user != false && user.mot_de_passe == connectingUser.password) {
//         //implmenter connexion et autre truc du genre
//         location.replace("./index.html");
//     }
//     else {
//         message.textContent = "Email invalide!"
//     }
// })

// async function getUser(email) {
//     const response = await fetch('https://equipe500.tch099.ovh/projet2/api/getutilisateur/' + email);

//     return response != [] ? response.json() : false

// }

