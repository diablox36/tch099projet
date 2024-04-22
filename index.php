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
        <a href="https://equipe500.tch099.ovh/projet2/api/proprietes">projet2/api/proprietes</a><br>
        <p>Retourne la liste de toutes les propriétés ordonnées par leur id</p>
        <a href="https://equipe500.tch099.ovh/projet2/api/proprieteparid/id">projet2/api/proprieteparid/id</a><br>
        <p>Retourne les informations de la propriété ayant l'id $id</p>
        <a href="https://equipe500.tch099.ovh/projet2/api/proprieteparcourriel/email">projet2/api/proprieteparcourriel/email</a><br>
        <p>Retourne les informations des propriétés de l'utilisateur ayant l'adresse courriel $email</p>
        <a href="https://equipe500.tch099.ovh/projet2/api/toutesimages">projet2/api/toutesimages</a><br>
        <p>Retourne la liste de toutes les images de toutes les propriétés</p>
        <a href="https://equipe500.tch099.ovh/projet2/api/images/$id">projet2/api/images/#id</a><br>
        <p>Retourne les images de la propriété ayant l'id $id</p>
        <a href="https://equipe500.tch099.ovh/projet2/api/premiereimage/$id">projet2/api/premiereimage/$id</a><br>
        <p>Retourne la première image de la propriété ayant l'id $id</p>
        <a href="https://equipe500.tch099.ovh/projet2/api/supprimerpropriete/id">projet2/api/supprimerpropriete/id</a><br>
        <p>Supprime la propriété ayant l'id $id</p>
        <a href="https://equipe500.tch099.ovh/projet2/api/supprimerimage/$idImage">projet2/api/supprimerimage/$idImage</a><br>
        <p>Supprime l'image ayant l'id $idImage</p>
        <a href="https://equipe500.tch099.ovh/projet2/api/supprimerimagespropriete/$idPropriete">projet2/api/supprimerimagespropriete/$idPropriete</a><br>
        <p>Supprime toutes les images de la propriété ayant l'id $idPropriete</p>
        <a href="https://equipe500.tch099.ovh/projet2/api/ordonnerpropriete/prixCroissant">projet2/api/ordonnerpropriete/prixCroissant</a><br>
        <a href="https://equipe500.tch099.ovh/projet2/api/ordonnerpropriete/prixDecroissant">projet2/api/ordonnerpropriete/prixDecroissant</a><br>
        <a href="https://equipe500.tch099.ovh/projet2/api/ordonnerpropriete/arrondissementCroissant">projet2/api/ordonnerpropriete/arrondissementCroissant</a><br>
        <a href="https://equipe500.tch099.ovh/projet2/api/ordonnerpropriete/arrondissementDecroissant">projet2/api/ordonnerpropriete/arrondissementDecroissant</a><br>
        <p>Retourne la liste de toutes les propriétés ordonnées selon la méthode choisie</p>
        <a href="https://equipe500.tch099.ovh/projet2/api/retirerfavoris">projet2/api/retirerfavoris</a><br>
        <p>Supprime un favoris de la liste de favoris d'un utilisateur</p>
        <a
          href="https://equipe500.tch099.ovh/projet2/api/trouverfavoris/$courriel">projet2/api/trouverfavoris/$courriel</a><br>
        <p>Retourne la liste des propriétés favorites d'un utilisateur ayant le courriel $courriel</p>

        <h3>Méthodes POST</h3>
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
        <a href="https://equipe500.tch099.ovh/projet2/api/ajouterpropriete">projet2/api/ajouterpropriete</a><br>
        <p>Ajoute une propriété avec les paramètres suivant:</p>
        <ul>
          <li>prix</li>
          <li>adresse</li>
          <li>arrondissement</li>
          <li>nb_chambres</li>
          <li>superficie</li>
          <li>animaux</li>
          <li>fumeur</li>
          <li>stationnement</li>
          <li>description</li>
          <li>proprietaire_adresse_courriel</li>
        </ul>
        <p>Retourne le message 'success' et l'id de la propriété ajoutée</p>
        <a href="https://equipe500.tch099.ovh/projet2/api/updatepropriete">projet2/api/updatepropriete</a><br>
        <p>Met à jour la propriété avec les paramètres suivant:</p>
        <ul>
          <li>prix</li>
          <li>adresse</li>
          <li>arrondissement</li>
          <li>nb_chambres</li>
          <li>superficie</li>
          <li>animaux</li>
          <li>fumeur</li>
          <li>stationnement</li>
          <li>description</li>
          <li>id</li>
        </ul>
        <a href="https://equipe500.tch099.ovh/projet2/api/ajouterimage">projet2/api/ajouterimage</a><br>
        <p>Ajoute une image avec les paramètres suivant</p>
        <ul>
          <li>image_url</li>
          <li>propriete_id</li>
        </ul>
        <a href="https://equipe500.tch099.ovh/projet2/api/updateimage">projet2/api/updateimage</a><br>
        <p>Met à jour une image d'une propriété avec les paramètres suivant</p>
        <ul>
          <li>image_id</li>
          <li>image_url</li>
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
        <a href="https://equipe500.tch099.ovh/projet2/api/ajouterfavoris">projet2/api/ajouterfavoris</a><br>
        <p>Ajoute un favoris à la liste de favoris d'un utilisaateur avec les paramètres suivant:</p>
        <ul>
          <li>adresse_courriel</li>
          <li>adresse_propriété</li>
        </ul>
        <p>Retourne un message 'valide' et le type du compte si l'utilisateur est valide, 'invalide' sinon</p>
        <a href="https://equipe500.tch099.ovh/projet2/api/estFavoris">projet2/api/estFavoris</a><br>
        <p>Vérifie si la propriété passé en paramètre est fevorite d'un utilisateur</p>
        <p>Retourne un message 'estFavoris' si la propriété fait partie des favoris de l'utilisateur, 'pasFavoris' sinon
        </p>
      </div>
    </div>
  </div>

  <div class="mt-5 p-4 bg-dark text-white text-center">
    <p>&copy; 2024 École de Technologie Supérieure, Montréal</p>
  </div>
</body>

</html>