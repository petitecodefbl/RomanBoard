// ========================================
// MENU
// ========================================

const btnDashboard = document.getElementById("btn-dashboard");
const btnPersonnages = document.getElementById("btn-personnages");
const btnRelations = document.getElementById("btn-relations");
const btnChronologie = document.getElementById("btn-chronologie");


// ========================================
// SECTIONS
// ========================================

const dashboard = document.getElementById("dashboard");
const personnages = document.getElementById("personnages");
const relations = document.getElementById("relations");
const chronologie = document.getElementById("chronologie");


// ========================================
// NAVIGATION
// ========================================

function afficherSection(section) {

  dashboard.style.display = "none";
  personnages.style.display = "none";
  relations.style.display = "none";
  chronologie.style.display = "none";

  section.style.display = "block";
}


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


// Page affichée au démarrage
afficherSection(dashboard);


// ========================================
// PERSONNAGES
// ========================================

const boutonAjouterPersonnage =
  document.getElementById("ajouter-personnage");

const formulairePersonnage =
  document.getElementById("formulaire-personnage");

const boutonEnregistrerPersonnage =
  document.getElementById("enregistrer-personnage");

const boutonAnnulerPersonnage =
  document.getElementById("annuler-personnage");

const listePersonnages =
  document.getElementById("liste-personnages");


// ========================================
// DONNÉES
// ========================================

let listeDesPersonnages =
  JSON.parse(localStorage.getItem("personnages")) || [];


// null = création d'un personnage
// nombre = modification d'un personnage

let personnageEnModification = null;


// ========================================
// AJOUTER UN PERSONNAGE
// ========================================

boutonAjouterPersonnage.addEventListener("click", function() {

  personnageEnModification = null;

  viderFormulaire();

  formulairePersonnage.style.display = "block";

});


// ========================================
// ANNULER
// ========================================

boutonAnnulerPersonnage.addEventListener("click", function() {

  formulairePersonnage.style.display = "none";

  personnageEnModification = null;

  viderFormulaire();

});


// ========================================
// AFFICHER LES PERSONNAGES
// ========================================

function afficherPersonnages() {

  listePersonnages.innerHTML = "";

  listeDesPersonnages.forEach(function(personnage, index) {

    const carte = document.createElement("div");

    carte.classList.add("carte-personnage");

    carte.innerHTML = `
      <h3>${personnage.nom}</h3>

      <p>
        <strong>Âge :</strong>
        ${personnage.age || "Non renseigné"}
      </p>

      <p>
        <strong>Genre :</strong>
        ${personnage.genre || "Non renseigné"}
      </p>

      <p>
        <strong>Rôle :</strong>
        ${personnage.role || "Non renseigné"}
      </p>

      <p>
        <strong>Apparence :</strong><br>
        ${personnage.apparence || "Non renseignée"}
      </p>

      <p>
        <strong>Personnalité :</strong><br>
        ${personnage.personnalite || "Non renseignée"}
      </p>

      <p>
        <strong>Notes :</strong><br>
        ${personnage.notes || "Aucune note"}
      </p>

      <div class="actions-personnage">

        <button
          class="modifier-personnage"
          data-index="${index}">
          ✏️ Modifier
        </button>

        <button
          class="supprimer-personnage"
          data-index="${index}">
          🗑️ Supprimer
        </button>

      </div>
    `;

    listePersonnages.appendChild(carte);

  });

}


// ========================================
// ENREGISTRER
// ========================================

boutonEnregistrerPersonnage.addEventListener("click", function() {

  const nom =
    document.getElementById("nom-personnage").value.trim();

  const age =
    document.getElementById("age-personnage").value;

  const genre =
    document.getElementById("genre-personnage").value;

  const role =
    document.getElementById("role-personnage").value.trim();

  const apparence =
    document.getElementById("apparence-personnage").value.trim();

  const personnalite =
    document.getElementById("personnalite-personnage").value.trim();

  const notes =
    document.getElementById("notes-personnage").value.trim();


  // Le nom est obligatoire

  if (nom === "") {

    alert("Donne au moins un nom à ton personnage.");

    return;

  }


  // Création du personnage

  const nouveauPersonnage = {

    nom: nom,
    age: age,
    genre: genre,
    role: role,
    apparence: apparence,
    personnalite: personnalite,
    notes: notes

  };


  // ========================================
  // AJOUT OU MODIFICATION
  // ========================================

  if (personnageEnModification === null) {

    // Nouveau personnage

    listeDesPersonnages.push(nouveauPersonnage);

  } else {

    // Modification d'un personnage existant

    listeDesPersonnages[personnageEnModification] =
      nouveauPersonnage;

    personnageEnModification = null;

  }


  sauvegarderPersonnages();

  afficherPersonnages();

  formulairePersonnage.style.display = "none";

  viderFormulaire();

});


// ========================================
// MODIFIER OU SUPPRIMER
// ========================================

listePersonnages.addEventListener("click", function(event) {


  // ========================================
  // MODIFIER
  // ========================================

  if (
    event.target.classList.contains("modifier-personnage")
  ) {

    const index =
      Number(event.target.dataset.index);

    const personnage =
      listeDesPersonnages[index];


    // Mémorise le personnage à modifier

    personnageEnModification = index;


    // Remplit le formulaire

    document.getElementById("nom-personnage").value =
      personnage.nom || "";

    document.getElementById("age-personnage").value =
      personnage.age || "";

    document.getElementById("genre-personnage").value =
      personnage.genre || "";

    document.getElementById("role-personnage").value =
      personnage.role || "";

    document.getElementById("apparence-personnage").value =
      personnage.apparence || "";

    document.getElementById("personnalite-personnage").value =
      personnage.personnalite || "";

    document.getElementById("notes-personnage").value =
      personnage.notes || "";


    // Affiche le formulaire

    formulairePersonnage.style.display = "block";


    // Remonte vers le formulaire

    formulairePersonnage.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }


  // ========================================
  // SUPPRIMER
  // ========================================

  if (
    event.target.classList.contains("supprimer-personnage")
  ) {

    const index =
      Number(event.target.dataset.index);

    const personnage =
      listeDesPersonnages[index];


    const confirmation = confirm(
      "Supprimer " + personnage.nom + " ?"
    );


    if (confirmation) {

      listeDesPersonnages.splice(index, 1);

      sauvegarderPersonnages();

      afficherPersonnages();

    }

  }

});


// ========================================
// SAUVEGARDE
// ========================================

function sauvegarderPersonnages() {

  localStorage.setItem(
    "personnages",
    JSON.stringify(listeDesPersonnages)
  );

}


// ========================================
// VIDER LE FORMULAIRE
// ========================================

function viderFormulaire() {

  document.getElementById("nom-personnage").value = "";

  document.getElementById("age-personnage").value = "";

  document.getElementById("genre-personnage").value = "";

  document.getElementById("role-personnage").value = "";

  document.getElementById("apparence-personnage").value = "";

  document.getElementById("personnalite-personnage").value = "";

  document.getElementById("notes-personnage").value = "";

}


// ========================================
// AFFICHAGE AU DÉMARRAGE
// ========================================

afficherPersonnages();("btn-personnages");
