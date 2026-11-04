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

// ===== PERSONNAGES =====

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
boutonAjouterPersonnage.addEventListener("click", function() {

  formulairePersonnage.style.display = "block";

});


boutonAnnulerPersonnage.addEventListener("click", function() {

  formulairePersonnage.style.display = "none";

});

let listeDesPersonnages =
  JSON.parse(localStorage.getItem("personnages")) || [];

function afficherPersonnages() {

  listePersonnages.innerHTML = "";

  listeDesPersonnages.forEach(function(personnage) {

    const carte = document.createElement("div");

    carte.classList.add("carte-personnage");

    carte.innerHTML = `
      <h3>${personnage.nom}</h3>

      <p><strong>Âge :</strong> ${personnage.age || "Non renseigné"}</p>

      <p><strong>Genre :</strong> ${personnage.genre || "Non renseigné"}</p>

      <p><strong>Rôle :</strong> ${personnage.role || "Non renseigné"}</p>

      <p><strong>Apparence :</strong><br>
      ${personnage.apparence || "Non renseignée"}</p>

      <p><strong>Personnalité :</strong><br>
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


  // Ajout dans notre liste

  listeDesPersonnages.push(nouveauPersonnage);


  // Sauvegarde dans le navigateur

  localStorage.setItem(
    "personnages",
    JSON.stringify(listeDesPersonnages)
  );


  // Actualisation de l'affichage

  afficherPersonnages();


  // Cache le formulaire

  formulairePersonnage.style.display = "none";


  // Vide les champs

  document.getElementById("nom-personnage").value = "";
  document.getElementById("age-personnage").value = "";
  document.getElementById("genre-personnage").value = "";
  document.getElementById("role-personnage").value = "";
  document.getElementById("apparence-personnage").value = "";
  document.getElementById("personnalite-personnage").value = "";
  document.getElementById("notes-personnage").value = "";

});

afficherPersonnages();
