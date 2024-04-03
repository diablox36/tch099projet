<!DOCTYPE html>
<html lang="en">
<head>
  <title>Projet 2</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <style>
  .fakeimg {
    height: 200px;
    background: #aaa;
  }
  </style>
</head>
<body>

<div class="p-5 bg-primary text-white text-center">
  <h1>TCH099 Projet intégrateur en informatique - Gr. 05</h1>
  <p>Projets de session</p> 
</div>

<div class="container mt-5">
  <div class="row">
    <div class="col-sm-12 doc">
      <a class="fs-1" href="https://equipe500.tch099.ovh/projet2/LocAppart">Site Web</a>

	    <h2>Documentation API</h2>
      <h3>Méthodes GET</h3>
      <a href="https://equipe500.tch099.ovh/projet2/api/utilisateur">projet2/api/utilisateur</a><br>
      <p>Retourne la liste de tous les utilisateurs</p>
      <a href="https://equipe500.tch099.ovh/projet2/api/utilisateur/email">projet2/api/utilisateur/email</a><br>
      <p>Retourne les informations de l'utilisateur ayant l'adresse courriel $email</p>
      <a href="https://equipe500.tch099.ovh/projet2/api/getpropriete">projet2/api/getpropriete</a><br>
      <p>Retourne la liste de toutes les propriétés</p>
      <a href="https://equipe500.tch099.ovh/projet2/api/getproprietebyid/id">projet2/api/getproprietebyid/id</a><br>
      <p>Retourne les informations de la propriété ayant l'id $id</p>
      <a href="https://equipe500.tch099.ovh/projet2/api/getproprietebyemail/email">projet2/api/getproprietebyemail/email</a><br>
      <p>Retourne les informations des propriétés de l'utilisateur ayant l'adresse courriel $email</p>
      <a href="https://equipe500.tch099.ovh/projet2/api/getallimages">projet2/api/getallimages</a><br>
      <p>Retourne la liste de toutes les images de toutes les propriétés</p>
      <a href="https://equipe500.tch099.ovh/projet2/api/getimage/id">projet2/api/getimage/id</a><br>
      <p>Retourne les images de la propriété ayant l'id $id</p>
      <a href="https://equipe500.tch099.ovh/projet2/api/getfirstimage/id">projet2/api/getfirstimage/id</a><br>
      <p>Retourne la première image de la propriété ayant l'id $id</p>
      <a href="https://equipe500.tch099.ovh/projet2/api/supprimerpropriete/id">projet2/api/supprimerpropriete/id</a><br>
      <p>Supprime la propriété ayant l'id $id</p>

      <h3>Méthodes POST</h3>
      <a href="https://equipe500.tch099.ovh/projet2/api/ajouterpropriete">projet2/api/ajouterpropriete</a><br>
      <p>Ajoute une propriété avec les paramètres suivant:</p>
      <ul>
        <li>adresse</li>
        <li>nb_chambres</li>
        <li>prix</li>
        <li>animaux</li>
        <li>fumeur</li>
        <li>stationnement</li>
        <li>description</li>
        <li>proprietaire_adresse_courriel</li>
      </ul>
      <a href="https://equipe500.tch099.ovh/projet2/api/ajouterutilisateur">projet2/api/ajouterutilisateur</a><br>
      <p>Ajoute un utilisateur avec les paramètres suivant:</p>
      <ul>
        <li>adresse_courriel</li>
        <li>mot_de_passe</li>
        <li>nom</li>
        <li>prenom</li>
        <li>telephone</li>
        <li>type_compte</li>
      </ul>
      <a href="https://equipe500.tch099.ovh/projet2/api/utilisateurvalide">projet2/api/utilisateurvalide</a><br>
      <p>Vérifie si les informations passées en paramètre correspond à un utilisateur valide:</p>
      <ul>
        <li>adresse_courriel</li>
        <li>mot_de_passe</li>
      </ul>
      <p>Retourne un message 'valide' et le type du compte si l'utilisateur est valide, 'invalide' sinon</p>
    </div>
  </div>
</div>

<div class="mt-5 p-4 bg-dark text-white text-center">
  <p>&copy; 2024 École de Technologie Supérieure, Montréal</p>
</div>
</body>
</html>
