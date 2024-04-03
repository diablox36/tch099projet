<?php
require_once __DIR__.'/router.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$DBuser = 'equipe500';
$DBpass = '+Sdum3RzzBJGQYvo';
$pdo = null;

try {
    $db = 'mysql:host=localhost:3306;dbname=equipe500';
    $pdo = new PDO($db , $DBuser, $DBpass);
} 
catch(PDOException $e) {
    echo "Error: Unable to connect to MySQL. Error:\n $e";
}

get('/projet2', 'index.php');
get('/projet2/LocAppart', 'index.html');
get('/projet2/LocAppart/connexion', 'login.html');
get('/projet2/LocAppart/inscription', 'inscription.html');
get('/projet2/LocAppart/details', 'details.html');
get('/projet2/LocAppart/proprietaire', 'proprietaire.html');
get('/projet2/LocAppart/detailsProprietaire', 'detailsProprietaire.html');


// API

get('/projet2/api/utilisateur', function () {
    global $pdo;

    $req = $pdo->query('SELECT * FROM eq2utilisateur');
    $result = $req->fetchAll(PDO::FETCH_ASSOC);

    header('Content-type: application/json');
    echo json_encode($result);
});

get('/projet2/api/utilisateur/$courriel', function ($courriel) {
    global $pdo;

    $req = $pdo->prepare('SELECT * FROM `eq2utilisateur` WHERE adresse_courriel = :courriel');
    $req->bindParam('courriel', $courriel);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);

    header('Content-type: application/json');
    echo json_encode($result);
});

get('/projet2/api/getpropriete', function () {
    global $pdo;

    $req = $pdo->query('SELECT * FROM eq2propriete');
    $result = $req->fetchAll(PDO::FETCH_ASSOC);

    header('Content-type: application/json');
    echo json_encode($result);
});

get('/projet2/api/getproprietebyid/$id', function ($id) {
    global $pdo;

    $req = $pdo->prepare('SELECT * FROM eq2propriete WHERE id = :id');
    $req->bindParam('id', $id);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);

    header('Content-type: application/json');
    echo json_encode($result);
});

get('/projet2/api/getproprietebyemail/$email', function ($email) {
    global $pdo;

    $req = $pdo->prepare('SELECT * FROM eq2propriete WHERE proprietaire_adresse_courriel = :email');
    $req->bindParam('email', $email);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);

    header('Content-type: application/json');
    echo json_encode($result);
});

get('/projet2/api/getallimages', function () {
    global $pdo;

    $req = $pdo->query('SELECT * FROM eq2image');
    $result = $req->fetchAll(PDO::FETCH_ASSOC);

    header('Content-type: application/json');
    echo json_encode($result);
});

get('/projet2/api/getimage/$id', function ($id) {
    global $pdo;

    $req = $pdo->prepare('SELECT * FROM eq2image WHERE propriete_id = :id');
    $req->bindParam('id', $id);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);

    header('Content-type: application/json');
    echo json_encode($result);
});

get('/projet2/api/getfirstimage/$id', function ($id) {
    global $pdo;

    $req = $pdo->prepare('SELECT * FROM eq2image WHERE propriete_id = :id ORDER BY image_id ASC LIMIT 1');
    $req->bindParam('id', $id);
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);

    header('Content-type: application/json');
    echo json_encode($result);
});

get('/projet2/api/supprimerpropriete/$id', function ($id) {
    global $pdo;

    $req = $pdo->prepare('DELETE FROM eq2propriete WHERE id = :id');
    $req->bindParam('id', $id);
    $req->execute();

    header('Content-type: application/json');
    echo json_encode(['message' => 'success']);
});

post('/projet2/api/ordennerpropriete/$ordre', function($ordre) {
    global $pdo;

    switch($ordre) {
        case "prixCroissant":
            $req = $pdo->query('SELECT * FROM eq2propriete ORDER BY prix ASC');
            $result = $req->fetchAll(PDO::FETCH_ASSOC);
            break;
        case "prixDecroissant":
            $req = $pdo->query('SELECT * FROM eq2propriete ORDER BY prix DESC');
            $result = $req->fetchAll(PDO::FETCH_ASSOC);
            break;
        case "arrondissementCroissant":
            $req = $pdo->query('SELECT * FROM eq2propriete ORDER BY arrondissement ASC');
            $result = $req->fetchAll(PDO::FETCH_ASSOC);
            break;
        case "arrondissementDecroissant":
            $req = $pdo->query('SELECT * FROM eq2propriete ORDER BY arrondissement DESC');
            $result = $req->fetchAll(PDO::FETCH_ASSOC);
            break;
        default:
            $result = ["message" => "ordre invalide"];
    }
    header('Content-type: application/json');
    echo json_encode($result);
});

//Methodes POST

post('/projet2/api/utilisateurvalide', function() {
    global $pdo;

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if(isset($data["adresse_courriel"]) && isset($data["mot_de_passe"])) {
        $req = $pdo->prepare('SELECT `type_compte` FROM `eq2utilisateur` WHERE `adresse_courriel` = :adresse_courriel AND `mot_de_passe` = :mot_de_passe');
        $req->execute([
            "adresse_courriel" => $data["adresse_courriel"],
            "mot_de_passe" => $data["mot_de_passe"],
        ]);
        $result = $req->fetchAll(PDO::FETCH_ASSOC);
        if(isset($result[0]['type_compte'])) {
            header('Content-type: application/json');
            echo json_encode(['message' => 'valide', 'type_compte' => $result[0]['type_compte'], 'adresse_courriel' => $data["adresse_courriel"]]);
        } else {
            header('Content-type: application/json');
            echo json_encode(['message' => 'invalide']);
        }

    } else {
        header('Content-type: application/json');
        echo json_encode(['message' => 'error']);
    }
});

post('/projet2/api/ajouterutilisateur', function() {
    global $pdo;

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if(isset($data["adresse_courriel"]) && isset($data["mot_de_passe"]) && isset($data["nom"]) && isset($data["prenom"]) && isset($data["telephone"]) && isset($data["type_compte"])) {
        $req = $pdo->prepare('INSERT INTO `eq2utilisateur`(`adresse_courriel`, `mot_de_passe`, `nom`, `prenom`, `telephone`, `type_compte`) VALUES (:adresse_courriel, :mot_de_passe, :nom, :prenom, :telephone, :type_compte)');
        $req->execute([
            "adresse_courriel" => $data["adresse_courriel"],
            "mot_de_passe" => $data["mot_de_passe"],
            "nom" => $data["nom"],
            "prenom" => $data["prenom"],
            "telephone" => $data["telephone"],
            "type_compte" => $data["type_compte"],
        ]);

    } else {
        header('Content-type: application/json');
        echo json_encode(['message' => 'error']);
    }
});

post('/projet2/api/ajouterpropriete', function() {
    global $pdo;

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if(isset($data["adresse"]) && isset($data["nb_chambres"]) && isset($data["superficie"]) && isset($data["prix"]) && isset($data["arrondissement"]) && isset($data["animaux"]) && isset($data["fumeur"]) && isset($data["stationnement"]) && isset($data["description"]) && isset($data["proprietaire_adresse_courriel"])) {
        $req = $pdo->prepare('INSERT INTO `eq2propriete`(`adresse`, `nb_chambres`, `superficie`, `prix`, `arrondissement`, `animaux`, `fumeur`, `stationnement`, `description`, `proprietaire_adresse_courriel`) VALUES (:adresse, :nb_chambres, :superficie, :prix, :arrondissement, :animaux, :fumeur:, :stationnement, :description, :proprietaire_adresse_courriel)');
        $req->execute([
            "adresse" => $data["adresse"],
            "nb_chambres" => $data["nb_chambres"],
            "prix" => $data["prix"],
            "animaux" => $data["animaux"],
            "fumeur" => $data["fumeur"],
            "stationnement" => $data["stationnement"],
            "description" => $data["description"],
            "proprietaire_adresse_courriel" => $data["proprietaire_adresse_courriel"],
        ]);
    } else {
        header('Content-type: application/json');
        echo json_encode(['message' => 'error']);
    }
});


