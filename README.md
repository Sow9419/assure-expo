ASSUR EXPO 2026 — Site premium (sponsor conversion)
═════════════════════════════════════════════════

DÉPLOIEMENT CPANEL
──────────────────
Déposez tout le contenu de ce zip à la racine de public_html/ via FTP
ou le Gestionnaire de fichiers. Aucune commande, aucune dépendance.
Le site fonctionne dès l'upload terminé.

  index.html
  assets/css/main.css
  assets/js/main.js
  mail-handler.php   (si vous branchez le formulaire — voir plus bas)

CONTENU RÉEL VS EMPLACEMENTS À COMPLÉTER
─────────────────────────────────────────
Tout le texte (chiffres marché, dates, lieu, arguments sponsoring,
programme) provient du contenu réel d'ASSUR'EXPO validé avec vous
dans nos échanges précédents.

Deux éléments sont volontairement laissés en emplacement, plutôt que
remplis avec de faux contenus :

1. Logos partenaires (section "Institutions & partenaires") : 10
   emplacements prêts, sans faux logos. Remplacez le contenu d'un
   `.logo-slot` par `<img src="assets/img/logos/nom.png" alt="Nom">`
   dès que vous avez les vrais fichiers.

2. Bouton "Télécharger la brochure" : affiche une notification tant
   qu'aucun PDF réel n'est fourni. Remplacez le `href="#"` du bouton
   par le chemin de votre brochure PDF pour l'activer.

Je n'ai pas inventé de témoignages, de statistiques ou de logos
d'institutions (INPS, CANAM...) présentés comme authentiques : les
faire figurer sur le site public d'un événement national sous de
fausses apparences aurait exposé ASSUR'EXPO à un vrai risque si un
sponsor, un journaliste ou l'État les reconnaissait comme fabriqués.

FORMULAIRE DE CONTACT
──────────────────────
Le formulaire pointe vers mail-handler.php (déjà livré dans un
échange précédent). Si vous ne l'avez plus, dites-le moi, je le
regénère à l'identique dans ce zip.

STRUCTURE
─────────
index.html          page unique, toutes les ancres (#salon, #sponsoriser,
                     #packages, #programme, #contact...) fonctionnelles
assets/css/main.css design system complet : tokens couleur/typo,
                     boutons, cartes (5 systèmes distincts : stats,
                     packages, timeline, FAQ, écosystème), bulles
                     flottantes, marks éditoriaux, focus/reduced-motion
assets/js/main.js   reveals au scroll, compteurs, FAQ accessible,
                     marquee, galerie, notification toast

BULLES / OBJETS FLOTTANTS
──────────────────────────
Présentes dans le hero (halo d'origine, inchangé) et dans 7 sections
supplémentaires (écosystème, concept, sponsoriser, packages,
programme, galerie, FAQ, contact) — formes organiques floutées,
jamais des cercles UI génériques, dérive lente et asymétrique.
