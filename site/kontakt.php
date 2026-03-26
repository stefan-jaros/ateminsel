<?php
// Konfiguration
$empfaenger = 'stefan@jaroszewski.ch';
$betreff_prefix = 'Ateminsel Kontaktformular';
$rate_limit_datei = sys_get_temp_dir() . '/ateminsel_rate_' . md5($_SERVER['REMOTE_ADDR']);
$rate_limit_max = 3; // Max Anfragen pro Stunde
$min_zeit_sekunden = 4; // Minimum Zeit zum Ausfüllen

header('Content-Type: application/json; charset=utf-8');

// Nur POST erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'fehler' => 'Methode nicht erlaubt']);
    exit;
}

// Honeypot prüfen (Feld muss leer sein)
if (!empty($_POST['website'])) {
    // Bot erkannt, trotzdem 200 zurückgeben damit Bot nichts merkt
    echo json_encode(['ok' => true]);
    exit;
}

// Zeitprüfung
$formular_zeit = isset($_POST['_ts']) ? (int)$_POST['_ts'] : 0;
if ($formular_zeit > 0 && (time() - $formular_zeit) < $min_zeit_sekunden) {
    echo json_encode(['ok' => true]);
    exit;
}

// Rate-Limiting
$anfragen = [];
if (file_exists($rate_limit_datei)) {
    $anfragen = json_decode(file_get_contents($rate_limit_datei), true) ?: [];
    // Alte Einträge entfernen (älter als 1 Stunde)
    $anfragen = array_filter($anfragen, function($zeit) {
        return $zeit > (time() - 3600);
    });
}

if (count($anfragen) >= $rate_limit_max) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'fehler' => 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.']);
    exit;
}

// Serverseitige Validierung
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$telefon = trim($_POST['phone'] ?? '');
$nachricht = trim($_POST['message'] ?? '');

if (empty($name) || mb_strlen($name) < 2 || mb_strlen($name) > 100) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'fehler' => 'Bitte geben Sie Ihren Namen ein.']);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'fehler' => 'Bitte geben Sie eine gültige E-Mail-Adresse ein.']);
    exit;
}

if (empty($nachricht) || mb_strlen($nachricht) < 10 || mb_strlen($nachricht) > 5000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'fehler' => 'Bitte schreiben Sie eine Nachricht (mind. 10 Zeichen).']);
    exit;
}

// Injection-Schutz für Header
if (preg_match('/[\r\n]/', $name . $email)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'fehler' => 'Ungültige Eingabe.']);
    exit;
}

// E-Mail senden
$betreff = "$betreff_prefix: $name";
$body = "Name: $name\n";
$body .= "E-Mail: $email\n";
if (!empty($telefon)) {
    $body .= "Telefon: $telefon\n";
}
$body .= "\nNachricht:\n$nachricht\n";
$body .= "\n---\nGesendet über ateminsel.ch";

$headers = "From: noreply@ateminsel.ch\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$gesendet = mail($empfaenger, $betreff, $body, $headers);

if ($gesendet) {
    // Rate-Limit aktualisieren
    $anfragen[] = time();
    file_put_contents($rate_limit_datei, json_encode($anfragen));

    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'fehler' => 'Die Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es telefonisch.']);
}
