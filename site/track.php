<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$stats_dir = __DIR__ . '/stats-data';
if (!is_dir($stats_dir)) mkdir($stats_dir, 0755, true);

$monat = date('Y-m');
$datei = "$stats_dir/$monat.json";

// Daten laden
function laden($datei) {
    if (!file_exists($datei)) return ['besuche' => 0, 'sprachen' => [], 'sektionen' => []];
    return json_decode(file_get_contents($datei), true) ?: ['besuche' => 0, 'sprachen' => [], 'sektionen' => []];
}

// Tracking empfangen
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) { echo json_encode(['ok' => false]); exit; }

    $lang = preg_replace('/[^a-z]/', '', strtolower($input['lang'] ?? 'de'));
    $sektionen = $input['sektionen'] ?? [];

    // Lockfile fuer gleichzeitige Zugriffe
    $lock = fopen("$datei.lock", 'c');
    flock($lock, LOCK_EX);

    $stats = laden($datei);
    $stats['besuche']++;
    $stats['sprachen'][$lang] = ($stats['sprachen'][$lang] ?? 0) + 1;

    foreach ($sektionen as $s) {
        $s = preg_replace('/[^a-z0-9-]/', '', strtolower($s));
        if (!empty($s)) {
            $stats['sektionen'][$s] = ($stats['sektionen'][$s] ?? 0) + 1;
        }
    }

    file_put_contents($datei, json_encode($stats, JSON_PRETTY_PRINT));
    flock($lock, LOCK_UN);
    fclose($lock);

    echo json_encode(['ok' => true]);
    exit;
}

// Stats abrufen (GET)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $alle = [];
    foreach (glob("$stats_dir/*.json") as $f) {
        $m = basename($f, '.json');
        $alle[$m] = laden($f);
    }
    ksort($alle);
    echo json_encode(['ok' => true, 'stats' => $alle]);
    exit;
}
