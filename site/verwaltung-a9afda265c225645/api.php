<?php
header('Content-Type: application/json; charset=utf-8');

$kurse_datei = __DIR__ . '/../kurse.json';
$max_kurse = 3;

// Kurse laden
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $kurse = file_exists($kurse_datei) ? json_decode(file_get_contents($kurse_datei), true) : [];
    echo json_encode(['ok' => true, 'kurse' => $kurse]);
    exit;
}

// Kurse speichern
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $kurse_json = $_POST['kurse'] ?? '[]';
    $kurse = json_decode($kurse_json, true);

    if (!is_array($kurse)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'fehler' => 'Ungueltige Daten']);
        exit;
    }

    if (count($kurse) > $max_kurse) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'fehler' => "Maximal $max_kurse Kurse erlaubt"]);
        exit;
    }

    $saubere_kurse = [];
    foreach ($kurse as $k) {
        $titel = trim($k['titel'] ?? '');
        if (empty($titel)) continue;

        $saubere_kurse[] = [
            'titel' => htmlspecialchars($titel, ENT_QUOTES, 'UTF-8'),
            'tag' => htmlspecialchars(trim($k['tag'] ?? ''), ENT_QUOTES, 'UTF-8'),
            'uhrzeit' => htmlspecialchars(trim($k['uhrzeit'] ?? ''), ENT_QUOTES, 'UTF-8'),
            'start' => htmlspecialchars(trim($k['start'] ?? ''), ENT_QUOTES, 'UTF-8'),
            'ende' => htmlspecialchars(trim($k['ende'] ?? ''), ENT_QUOTES, 'UTF-8'),
            'lektionen' => max(1, (int)($k['lektionen'] ?? 1)),
            'ort' => trim($k['ort'] ?? ''),
            'kosten' => htmlspecialchars(trim($k['kosten'] ?? ''), ENT_QUOTES, 'UTF-8'),
            'plaetze_frei' => (bool)($k['plaetze_frei'] ?? true)
        ];
    }

    $json = json_encode($saubere_kurse, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if (file_put_contents($kurse_datei, $json) === false) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'fehler' => 'Datei konnte nicht gespeichert werden']);
        exit;
    }

    echo json_encode(['ok' => true, 'kurse' => $saubere_kurse]);
    exit;
}

http_response_code(400);
echo json_encode(['ok' => false, 'fehler' => 'Ungueltige Anfrage']);
