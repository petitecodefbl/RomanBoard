// ===== BOUTONS DU MENU =====

const btnDashboard = document.getElementById("btn-dashboard");
const btnPersonnages = document.getElementById("btn-personnages");
const btnRelations = document.getElementById("btn-relations");
const btnChronologie = document.getElementById("btn-chronologie");


// ===== SECTIONS =====

const dashboard = document.getElementById("dashboard");
const personnages = document.getElementById("personnages");
const relations = document.getElementById("relations");
const chronologie = document.getElementById("chronologie");


// ===== FONCTION POUR CHANGER DE PAGE =====

function afficherSection(section) {

  // On cache tout
  dashboard.style.display = "none";
  personnages.style.display = "none";
  relations.style.display = "none";
  chronologie.style.display = "none";

  // Puis on affiche seulement la section demandée
  section.style.display = "block";
}


// ===== CLICS SUR LE MENU =====

btnDashboard.addEventListener("click", function() {
  afficherSection(dashboard);
});

btnPersonnages.addEventListener("click", function() {
  afficherSection(personnages);
});

btnRelations.addEventListener("click", function() {
  afficherSection(relations);
});

btnChronologie.addEventListener("click", function() {
  afficherSection(chronologie);
});


// ===== PAGE AFFICHÉE AU DÉMARRAGE =====

afficherSection(dashboard);
