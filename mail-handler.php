<?php
/**
 * mail-handler.php — ASSUR EXPO 2026
 * Gestionnaire de formulaire (contact + newsletter) sans dépendance,
 * compatible avec un hébergement cPanel standard (fonction mail() native).
 *
 * À CONFIGURER avant mise en ligne :
 *   - $destinataire : adresse e-mail qui recevra les messages
 *   - $expediteur_site : adresse "from" technique (idéalement sur le même domaine
 *     que l'hébergement, pour éviter d'être filtré comme spam)
 */

$destinataire     = 'contact@assurexpo.com';
$expediteur_site  = 'no-reply@assurexpo.com';
$nom_site         = 'ASSUR EXPO 2026';

// Page vers laquelle on redirige après traitement (ancre #contact du site)
$page_retour = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '/index.html';
$page_retour = strtok($page_retour, '?'); // on retire un éventuel ancien paramètre ?sent=

function rediriger_avec_statut($page, $ok) {
    $sep = (strpos($page, '#') !== false) ? '' : '#contact';
    // On insère le paramètre avant l'ancre pour qu'il reste lisible par le JS
    $base = strtok($page, '#');
    $ancre = strpos($page, '#') !== false ? substr($page, strpos($page, '#')) : '#contact';
    header('Location: ' . $base . '?sent=' . ($ok ? '1' : '0') . $ancre);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    rediriger_avec_statut($page_retour, false);
}

// --- Anti-spam : honeypot + délai minimal ---
$honeypot = isset($_POST['ax_website']) ? trim($_POST['ax_website']) : '';
$timestamp = isset($_POST['ax_ts']) ? intval($_POST['ax_ts']) : 0;

if ($honeypot !== '') {
    // Un bot a rempli le champ invisible : on fait semblant que tout va bien
    rediriger_avec_statut($page_retour, true);
}
if ($timestamp > 0 && (time() - $timestamp) < 2) {
    // Soumission trop rapide pour être humaine
    rediriger_avec_statut($page_retour, false);
}

// --- Type de formulaire : "contact" (par défaut) ou "newsletter" ---
$type = isset($_POST['form_type']) ? $_POST['form_type'] : 'contact';

function nettoyer($valeur) {
    $valeur = isset($valeur) ? trim($valeur) : '';
    $valeur = str_replace(["\r", "\n"], ' ', $valeur); // anti header-injection
    return htmlspecialchars($valeur, ENT_QUOTES, 'UTF-8');
}

if ($type === 'newsletter') {
    $email = filter_var(trim($_POST['newsletter_email'] ?? ''), FILTER_VALIDATE_EMAIL);
    if (!$email) {
        rediriger_avec_statut($page_retour, false);
    }
    $sujet = "[$nom_site] Nouvelle inscription newsletter";
    $corps = "Nouvelle inscription à la newsletter ASSUR EXPO 2026 :\n\nE-mail : $email\n";
    $headers = "From: $nom_site <$expediteur_site>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
    $ok = @mail($destinataire, $sujet, $corps, $headers);
    rediriger_avec_statut($page_retour, $ok);
}

// --- Formulaire de contact ---
$prenom   = nettoyer($_POST['prenom'] ?? '');
$nom      = nettoyer($_POST['nom'] ?? '');
$email    = filter_var(trim($_POST['votre-email'] ?? ''), FILTER_VALIDATE_EMAIL);
$telephone = nettoyer($_POST['telephone'] ?? '');
$profil   = nettoyer($_POST['profil'] ?? 'Autre');
$message  = nettoyer($_POST['message'] ?? '');

if (!$prenom || !$email || !$message) {
    rediriger_avec_statut($page_retour, false);
}

$sujet = "[$nom_site] Nouveau message — $profil — $prenom $nom";
$corps  = "Nouveau message reçu depuis le site ASSUR EXPO 2026\n";
$corps .= "----------------------------------------------------\n";
$corps .= "Prénom      : $prenom\n";
$corps .= "Nom         : $nom\n";
$corps .= "E-mail      : $email\n";
$corps .= "Téléphone   : $telephone\n";
$corps .= "Profil      : $profil\n";
$corps .= "----------------------------------------------------\n";
$corps .= "Message :\n$message\n";

$headers  = "From: $nom_site <$expediteur_site>\r\n";
$headers .= "Reply-To: $prenom $nom <$email>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8";

$ok = @mail($destinataire, $sujet, $corps, $headers);
rediriger_avec_statut($page_retour, $ok);
