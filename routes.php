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



// API

get('/projet2/api/getnombrepropriete', function () {
    global $pdo;

    $req = $pdo->query('SELECT * FROM eq2utilisateur');
    $result = $req->fetchAll(PDO::FETCH_ASSOC);

    header('Content-type: application/json');
    echo json_encode($result);
});

get('/projet2/api/getutilisateur', function () {
    global $pdo;

    $req = $pdo->query('SELECT * FROM eq2utilisateur');
    $result = $req->fetchAll(PDO::FETCH_ASSOC);

    header('Content-type: application/json');
    echo json_encode($result);
});

get('/projet2/api/getutilisateur/$adresseCouriel', function ($adresseCouriel) {
    global $pdo;

    $req = $pdo->prepare('SELECT * FROM eq2utilisateur WHERE adresse_courriel = :adresseCouriel');     
    $req->bindParam('adresseCouriel', $adresseCouriel);
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

get('/projet2/api/getpropriete/$adresse', function ($adresse) {
    global $pdo;

    $req = $pdo->prepare('SELECT * FROM eq2propriete WHERE adresse = :adresse');
    $req->bindParam('adresse', $adresse);
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

//Methodes POST

//� tester
post('/projet2/api/ajouterUtilisateur', function() {
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
        echo json_encode(['message' => 'fail']);
    }
});

//� tester
post('/projet2/api/ajouterPropriete', function() {
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
        echo json_encode(['message' => 'fail']);
    }
});
