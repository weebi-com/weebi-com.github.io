---
title: "Nouveautés"
layout: "changelog"
description: "Historique des évolutions de l'application Weebi, de 2022 à aujourd'hui."
---

Historique des évolutions de l'application

## 2026

### Version 368 — 5 septembre 2026

- Plusieurs articles possibles sur une facture libre
- Garde-fou inventaire pour éviter les ruptures de stock indésirables
- Correction de l'import d'articles sur Windows
- La devise secondaire disparaît correctement une fois désactivée
- Menu latéral : Vente, Achats, Facture libre et Stock comme activités nommées (fin de « Autres opérations »)
- Inventaire, entrée et sortie de stock regroupés dans une activité Stock avec sélecteur de type
- Facture libre (vente / dépense) regroupée dans une seule tuile d'opération
- Fiche article revue : désignation plus visible, boutons plus accessibles

### Version 367 — septembre 2026

- Correction du parcours de création d'utilisateur
- Export PDF plus fiable sur ordinateur (enregistrement via le panneau système)
- Lien direct pour obtenir une licence utilisateur
- Les managers peuvent à nouveau mettre à jour les mots de passe

### Version 366 — août 2026

- Export PDF sur Mac : dialogue d'enregistrement natif
- Noms de fichiers PDF corrects même si le nom légal de la boutique contient des caractères spéciaux

### Version 365 — août 2026

- Ajout de la langue chinoise
- Correction de la création d'utilisateur

### Version 363

- Devise de la boutique déduite automatiquement du pays sélectionné (quand disponible)

### Version 362

- Synchro : resynchronisation individuelle d'un article, d'une boutique ou d'un contact uniquement dans la vue détail
- Synchro avancée réservée aux comptes Premium
- Bouton « tout synchroniser » moins accessible pour limiter les appels inutiles
- Paramètres : licence Weebi requise ; le lien magique y est aussi branché
- Comptabilité SYSCOHADA : ajustement / rééquilibrage des soldes
- Comptabilité sur mobile : actions regroupées dans un menu (sauf l'aide) pour éviter que le titre soit masqué

### Version 361

- Synchronisation automatique des tickets au démarrage (Premium)
- Exports Excel / LibreOffice pour les statistiques
- Mouvements entre comptes SYSCOHADA (rééquilibrage)

### Version 360

- Comptabilité OHADA — Système Minimal de Trésorerie
- Saisie de la date du versement client / fournisseur
- Vue récap : le bouton OK redevient utilisable après une annulation
- Stats stock : export PDF sur la bonne plage de dates
- Stats stock : sélection de période harmonisée
- Récap vente / achat à crédit plus clair
- Fiche contact : la liste des tickets commence en haut
- Menu latéral : bouton de déconnexion plus simple
- Garde-fous : TVA si OHADA, et montants de réduction entiers uniquement

### Version 359

- Vue dédiée pour suivre les tickets encore coincés en local
- Présentation des tickets revue
- Prix et identifiant technique moins mis en avant

### Version 358

- Partage d'une fiche article (désignation, prix, photo)
- Corrections de bugs rares à la création de boutique et au rechargement des stats
- Le menu latéral n'affiche plus l'indicateur de chargement
- Indication plus claire si l'utilisateur est connecté ou non au démarrage
- Événements locaux visibles pour chaque objet (article, boutique, contact, ticket)
- Interface de synchronisation revue
- Stats et graphiques : plus d'espace vertical, première colonne figée

### Version 354

- Nom du vendeur affiché sur le ticket
- Possibilité de rattraper / modifier un ticket qui vient d'être édité
- Configuration imprimante déplacée dans Paramètres
- Impression A4 / Letter possible depuis tous les systèmes
- Configuration imprimante plus claire (thermique vs laser)
- Imprimante thermique : choix 58 ou 80 mm
- Imprimante thermique : séparateur de milliers
- Plusieurs régressions corrigées

### Version 350

- Solde avant corrigé sur le détail ticket et le PDF
- Solde après corrigé (il n'était valable qu'au moment de l'émission)
- Solde avant / après affiché lors du partage WhatsApp du ticket

### Version 349

- Navigation retour moins intrusive
- Contact par défaut : solde non affiché
- Mise à jour article / boutique / contact : pas de dialogue de confirmation s'il n'y a pas de modification
- Comptabilité : fusion de la vue finances et des graphiques
- Graphiques comptables et tableau financier revus
- Correction de la liste des tickets d'un contact
- Correction des graphiques de trésorerie

### Version 346

- Corrections d'accès sécurisé aux données (Android, iOS, macOS)
- Correction d'ouverture de liens sur iOS
- Icône boutique du menu latéral plus cohérente
- Garde-fou contre le stock négatif
- Création de panier d'articles de nouveau affichée

### Version 343 — 26 avril 2026

- Rapport PDF avec la valeur du stock

### Version 342 — 17 avril 2026

- Affichage plus lisible du taux de la devise secondaire
- Amélioration de l'affichage du contact

### Version 341 — 14 avril 2026

- Mise à jour d'un article : conservation de l'ancien code-barres
- Correction du coût des articles sur ticket iOS
- Premier lancement : le français est conservé si aucune langue n'est choisie
- Export stock trié par ordre alphabétique (insensible à la casse)
- Catégories d'articles triées alphabétiquement (insensible à la casse)
- Ajout d'une devise
- Devise secondaire pour conversion
- Possibilité de relier l'appareil au compte cloud dès le premier lancement
- Plus de marge pour sélectionner les éléments en bas de liste
- « Suivi de l'activité » renommé en « Comptabilité »

### Version 339 — 21 février 2026

- Correction de la configuration des accès utilisateurs
- Bouton « Mot de passe oublié » visible sur l'écran de connexion

### Version 338 — 5 janvier 2026

- Affichage du SKU et de la catégorie dans l'aperçu article
- Bouton de recherche d'articles revu

## 2025

### Décembre 2025

- Aperçu articles harmonisé dans les opérations achats, stock et inventaire
- Bouton scan code-barres ajouté dans la vue achat

### Novembre 2025

#### Version 330

- Droits utilisateurs revus : hors ligne, les droits précédents sont conservés
- Droits CRUD visibles dans le menu latéral
- Accès aux stats mieux contrôlé selon les permissions
- Correction de l'affichage du menu sans connexion
- Correction de la navigation après changement de mot de passe

#### Version 329

- Interface revue

#### Version 328 — 5 novembre 2025

- Correction de la sauvegarde photo si le fichier n'existe pas

#### Version 327 — 2 novembre 2025

- Correction de l'impression Bluetooth sur iOS

### Octobre 2025

#### Version 326 — 31 octobre 2025 (iOS)

- Mise à jour boutique protégée selon les droits et l'identifiant
- Correction du lien appareil / boutique en cas de plusieurs boutiques
- Guidage vers la vue appareil pour générer un code de liaison
- Affichage de la vue de mise à jour du mot de passe

#### Versions 326 / 325 / 324 — 28 octobre 2025

- Message si aucune catégorie ; bouton de création si les droits le permettent
- Affichage de l'unité de stock par défaut ; correction unité box / carton
- Correction de la mise à jour d'article juste après création
- Correction de l'aperçu stock en appui long à la vente
- Correction des décimales dans les montants sur iOS
- Plus d'icônes de fermeture sur les dialogues

#### Version 323 — 21 octobre 2025

- Stats financières : affichage même si l'échelle est inhabituelle
- Sauvegarde des photos avant suppression
- Correction des sauvegardes d'articles
- Mise à jour cloud de la boutique mieux reflétée en local

#### Version 322 — 20 octobre 2025

- Export PDF du catalogue avec les stocks (depuis Articles)
- Icône scan code-barres plus intuitive
- Taxe de 5 % disponible
- Corrections de synchronisation initiale (boutique et photos)

### Septembre 2025 — Version 320

- Administration de l'entreprise : boutiques et appareils liés (caisses)
- Gestion des utilisateurs, des droits et des accès
- Correction des exports de tickets

### Juillet 2025

- Code-barres sur Windows et macOS
- Affichage du lecteur de code-barres corrigé
- Infos produit via Open Food Facts lors du scan
- Contournement si trop de photos au téléchargement du catalogue
- Meilleure gestion des caméras (arrière, avant, externe)

### Mai 2025

- Bouton scanner affiché par défaut
- Export libellé, prix et stock depuis stats / stock
- Plus d'informations sur la fiche article
- Export PDF du stock
- Correction d'un risque d'arrondi sur les promotions

### Avril 2025

#### Version 317

- Import groupé de photos : persistance dans le bon dossier
- Vue export plus fluide
- Pas de demande de sauvegarde photo si le dossier est vide
- Liaison plus simple d'un appareil à une boutique cloud unique
- Libellés et couleurs de synchro plus clairs pour les événements en file
- Connexion non bloquée si la lecture de certaines données échoue

#### Version 316

- Corrections autour de la synchronisation

#### Version 312

- Fiche contact : tickets et solde réactifs (ex. désactivation d'un ticket)
- Aperçu contact plus clair

#### Version 311

- Corrections de synchronisation des tickets
- Solde avant / après contact affiché uniquement pour les tickets actifs

### Mars 2025

- Correction de la longueur des numéros de téléphone selon le pays
- Correction de la mise à jour des photos
- Aperçu contact amélioré
- Correction de la duplication de catégorie à la création

### Février 2025 — Version 304

- Impression ticket : infos contact prises depuis le ticket
- Correction d'un plantage audio au démarrage

### Janvier 2025

#### Versions 302 et 303

- Version minimale : icône et lien vers le store

#### Version 301

- Mobile : icône d'impression réactive après opération sur le ticket
- PC / Mac : sauvegarde du PDF en local
- Panier vidé à l'ouverture d'une nouvelle activité
- Boutons d'appbar harmonisés (achats, stocks, inventaire : tri + partage)
- Plafond de montant pour éviter les erreurs de valeur max
- Inventaire : affichage arrondi revu
- Dates avec jour et mois en toutes lettres
- Recherche tickets par libellé article insensible à la casse
- Cabas vidé automatiquement au changement de type d'opération

#### Version 300

- Contact WhatsApp
- Partage PDF

#### Version 298

- Date du ticket imprimé corrigée sur Android
- Séparateur de milliers sur le ticket imprimé
- Impression tickets stock / inventaire possible sur iOS

#### Version 295 — 11 janvier 2025

- Correctifs dépenses
- Vue dédiée aux postes de dépenses
- Bouton WhatsApp pour envoyer le ticket au client / fournisseur
- Partage du ticket en PDF
- Vue détaillée du ticket améliorée
- Accès au support Weebi via WhatsApp

#### Version 294 — 9 janvier 2025

- Contacts : distinction clients / fournisseurs
- Tri des articles alphabétique par défaut
- Tri des contacts par nom de famille
- Mise en place de l'abonnement compte cloud
- Correction de l'orientation des statistiques

## 2024

### Novembre 2024

- Saisie dépense hors catalogue simplifiée
- Vente hors catalogue ajoutée
- Ventes / dépenses hors catalogue enrichies avec sélection du contact
- Articles non quantifiables
- Détail ticket plus réactif
- Dialogue de paiement : bouton OK plus clair quand le montant est correct
- Dates affichées selon la locale
- Code article masqué pour éviter la confusion
- Correction de la modification des infos boutique
- Catégories
- Correction recherche article après mise à jour
- Vue ventes : mise en page revue (prix, icône, espacements)

### Juillet 2024

- Infos contact stockées sur le ticket (identifiant, prénom, nom)
- Ticket imprimé / partagé mieux localisé
- Version minimale de l'app : dialogue d'info si mise à jour recommandée
- Correction stockage des photos sur iOS

### Juin 2024

- Identifiants articles / contacts non réutilisés après suppression
- Sélection de photo corrigée
- Mise à jour dynamique des articles d'un calibre
- Mise en page articles (slider / calibre) revue

### Mai 2024 — Version 279

- Correction de la recherche client dans vente / dépense

### Avril 2024

- Locale du magasin
- Correction de l'ordre des onglets vente / dépense
- Sauvegarde des photos articles ; photos incluses dans les exports JSON
- Découvert retiré de la fiche création / mise à jour contact
- Analyse client : espace entre prénom et nom
- Traduction dans de nombreuses langues
- Séparateur de milliers
- Sous-total item dans le panier si quantité entre 0 et 1
- Correction imprimante Android
- Permissions microphone iOS / iPad revues
- Formatage dates / nombres selon la locale
- Date de création article masquée si valeur par défaut
- Mise à jour d'un article unique : désignation synchronisée avec le titre du calibre

### Mars 2024

- Adresses propres pour boutique et contacts
- Codes pays des numéros de téléphone
- Correction panier : réduction / surprime
- Boutons modifier et désactiver (article, boutique, contact) inversés pour plus de clarté
- Adresse complète à la création / mise à jour contact
- Import CSV / Excel : nouvel import réinitialise l'aperçu des lignes en erreur

### Février 2024

#### Version 171

- Dialogues de versement harmonisés
- Commentaire effaçable ; contenu réinitialisé si annulation du versement

#### Version 170

- Correction import article / contact pour mise à jour
- Code-barres scanné visible à la création / mise à jour produit
- Import CSV / Excel : message d'erreur précédent effacé
- Postes de dépense visibles pour les nouveaux utilisateurs
- Unité de stock modifiable depuis la fiche article
- Terminologie : « contact » et « boutique »
- Préférence code-barres correctement mémorisée après redémarrage

## 2023

### Décembre 2023

#### Version 266 — 23 décembre 2023

- Correction permissions Android 13 (message vocal et export CSV / JSON)

#### 4 décembre 2023

- Recherche produit dans les ventes corrigée (Android)
- Validateur e-mail sur contact et magasin

#### 3 décembre 2023

- Graphiques de trésorerie (recettes / dépenses, barres, camembert)
- Tableau des stats financières de la boutique + export

### Novembre 2023

- Affichage des remises corrigé
- Sortie de stock : signe corrigé (− et non +)
- Accents retirés à l'impression des articles pour une meilleure lisibilité

### Octobre 2023

#### Versions 251 / 250

- Recherche articles corrigée
- Recherche contacts par prénom / nom et avec / sans accents
- Filtres tickets : recherche contact corrigée (clavier mobile)
- Aide revue
- Articles « dépense rapide » masqués de la recherche
- Messages vocaux
- Partage de fichiers sur Windows
- Sauvegardes corrigées (export ordinateur)

### Septembre 2023

- Aide audio
- Lancement e-mail amélioré + dialogue en cas d'échec
- Menu latéral revu
- Sauvegarde des données mobile corrigée

### Août 2023

- Versement fournisseur
- Correction de l'achat à crédit
- Affichage du montant de taxe dans le récap panier
- Récap panier harmonisé en dépense
- Import ticket JSON : parcours harmonisé
- Corrections suppression articles, import tickets, visibilité panier si calibre effacé
- FAQ : « Support » renommé « Aide et contact »
- Message d'accueil en cas de bug pour accompagner la résolution
- Solde client : calcul corrigé

### Juillet 2023

#### Version 238 — 19 juillet 2023

- Persistence / sauvegarde des photos corrigée
- Bouton désactiver sur le panier d'articles
- Import photos sous Windows

#### 14 juillet 2023

- Montants avec décimales
- Recherche contact par téléphone corrigée
- Édition du nom d'article corrigée
- Photo sur l'article ; import groupé de photos
- Sauvegarde de fichiers sous Mac et iOS
- Menu latéral plus compact

### Juin 2023

- Photos articles : choix de dossier, aperçu, association par nom de fichier
- Photos gérées dans les exports
- Imprimante : reconnexion / déconnexion automatique selon le cycle de vie de l'app
- Correction panier lors de la saisie d'une réduction
- Code-barres revu en création / mise à jour / détail article
- Ordre du menu latéral revu
- Distinction plus claire achats vs entrée de stock
- Imports articles et contacts CSV
- Demande de vider le panier en passant de vente à dépense (et inverse)
- Achats et dépenses réordonnés pour les opérations fréquentes
- Recherche achats et sortie de stock corrigée
- Exports JSON (plus de format base locale)
- Import JSON revu : doublons, types d'action, distinction import / restauration
- Sauvegarde exigée avant de tout supprimer

### Avril 2023

- Exports / partages visibles sur Android
- Clic sur une ligne : ouverture du bon article dans le carrousel

### Mars 2023

- Prix total du panier corrigé
- Réduction possible sur le panier
- Vue dépense rapide améliorée (création / édition / suppression de postes)
- Clarification pour éviter la confusion articles / postes de dépense
- Tutoriels vidéo : vente cash et entrée de stock

### Janvier 2023

- « Panier » renommé « cabas » (distinction achat client / panier d'articles)
- Aperçu TTC du cabas corrigé (quantités mini ×2 / ×3)
- Sous-total du cabas revu
- Aide desktop sur les montants du panier
- Mac : saisie des quantités et validation du montant reçu
- Infos boutique sur le ticket iOS / iPad
- Jusqu'à 4 décimales dans la saisie (ex. 0,0001)

### Autres avancées 2023

- Scan de code-barres ; ajout / édition du code-barres par scan à la création / mise à jour
- Option d'afficher ou non l'icône code-barres
- Dépense hors catalogue avec type de paiement / réduction
- Date de facturation différente
- Inventaire disponible
- Export ticket par e-mail corrigé
- Entrée de stock revue

## 2022

### Fin décembre 2022

- Titre de l'activité en haut (plutôt que « Weebi »)
- Numéro de version en bas du menu
- Recherche articles en vente : tolérance aux accents
- Ajout au panier des lignes d'articles corrigé
- Désactivation / réactivation d'article
- Fiche article : statut et dates de modification
- Vérification anti-doublons à la création d'une ligne ou d'un panier d'articles
- Affichage articles amélioré (animation + aperçu photos)

### Décembre 2022

- Indication visuelle si un article est désactivé
- Mise à jour / édition contact revue

### Novembre 2022

- Présentation catalogue articles revue
- Recherche pays sans accents / caractères spéciaux
- Import CSV contacts

### Octobre 2022

- Droit d'achat sur fiche client → solde
- Taxes conservées au retour du panier
- Détail promo, réduction et taxes plus clair
- Croix pour annuler le paiement
- Paniers d'articles visibles dans le catalogue
- Listes déroulantes harmonisées

### Version 204 — 4 septembre 2022

- FAQ revue
- Import Excel d'articles mieux expliqué
- Vue support : contact plus simple (appel / message)
- Lecteur de tutoriels vidéo revu
- Tuto connexion Android
- Démo YouTube branchement imprimante
- Textes des opérations avancées de nouveau lisibles
- Dépenses rapides ne s'affichent plus dans le catalogue de vente

### Version 201 — 31 juillet 2022

- Suppression de tous les contacts, produits ou tickets possible
- Exports : sauvegarde locale et partage
- Vue paiement : annulation possible ; plus de blocage sur la saisie du montant
- Pavé numérique pour saisir le montant (ventes / achats plus rapides)
- Choix Bluetooth ou Wi‑Fi pour l'imprimante
- Dates de promotion
- Adresse avec pays et suggestions
- Dialogues / boutons de versement client harmonisés
- Bouton de validation achats / ventes revu
- Promotion retirée des achats (réservée à la vente)
- Stocks restants mieux arrondis
- Appui long + clic pour quantités décimales ou grandes
- Mac / PC : sortie de la fenêtre de grande quantité
- Appui long vers la fiche contact depuis la sélection
- Client inconnu coché par défaut si pas de contact
- Touche Effacer réparée sur ordinateur
- Correction des achats

### Versions 180 / 178 / 176 / 172

- Dépense rapide / note de frais
- Graphiques
- Impression iOS
- Format d'impression revu
- Téléphone client sur le ticket imprimé
- Vue imprimante corrigée
- Audio au lancement
- Sortie de stock
- Promo à 0 masquée dans la vue magasin
- Détail ticket : téléphone et e-mail si renseignés ; droit d'achat masqué si pas de crédit
- Réactivation de ticket revue
- Sélection client et mise à jour contact corrigées

### Versions 166–169 et débuts (2021–début 2022)

- Promo sur l'ensemble des produits vendus
- Champs gérant (nom, téléphone, e-mail)
- Exports CSV revus
- Création produit / sous-produit sans coût corrigée
- Confirmation à la création produit
- « Code » renommé « code-barres » ; identifiant auto si code-barres vide
- Compte Mobile Money masqué s'il n'est pas configuré
- Fonction de réinitialisation
- Références listées par ordre alphabétique / numéro
- Suppression définitive d'un ticket (après désactivation)
- Prix visibles sur les produits en vente
- Arborescence produit en vente corrigée
- Stocks arrondis (max 2 décimales)
- Facturation à crédit simplifiée
- Sous-produit : accès simplifié ; simple appui pour afficher
- Si un seul article : bouton pour en créer un autre
- Réinitialisation du catalogue ; suppression d'un sous-produit
- Tuiles produits adaptées à la taille d'écran
- Désactivation / réactivation de ticket corrigée
- Version de l'app dans À propos
- Import catalogue Excel
- Vue dédiée aux entrées de stock
- Affichage trompeur du stock après opération retiré
- Politique de confidentialité à l'initialisation
- Orientation débloquée (tablette / PC en paysage par défaut)
