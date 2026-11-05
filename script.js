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

  dessinerCarteRelations();

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

afficherPersonnages();

// ========================================
// RELATIONS
// ========================================

const boutonAjouterRelation =
  document.getElementById("ajouter-relation");

const formulaireRelation =
  document.getElementById("formulaire-relation");

const selectPersonnage1 =
  document.getElementById("personnage-1");

const selectPersonnage2 =
  document.getElementById("personnage-2");

const selectTypeRelation =
  document.getElementById("type-relation");

const descriptionRelation =
  document.getElementById("description-relation");

const boutonEnregistrerRelation =
  document.getElementById("enregistrer-relation");

const boutonAnnulerRelation =
  document.getElementById("annuler-relation");

const listeRelationsHTML =
  document.getElementById("liste-relations");


// ========================================
// CHARGEMENT DES RELATIONS
// ========================================

let listeDesRelations =
  JSON.parse(localStorage.getItem("relations")) || [];


// ========================================
// REMPLIR LES LISTES DE PERSONNAGES
// ========================================

function remplirSelectPersonnages() {

  selectPersonnage1.innerHTML = "";
  selectPersonnage2.innerHTML = "";

  listeDesPersonnages.forEach(function(personnage, index) {

    const option1 = document.createElement("option");
    option1.value = index;
    option1.textContent = personnage.nom;

    const option2 = document.createElement("option");
    option2.value = index;
    option2.textContent = personnage.nom;

    selectPersonnage1.appendChild(option1);
    selectPersonnage2.appendChild(option2);

  });

}


// ========================================
// OUVRIR LE FORMULAIRE
// ========================================

boutonAjouterRelation.addEventListener("click", function() {

  remplirSelectPersonnages();

  if (listeDesPersonnages.length < 2) {

    alert(
      "Il faut créer au moins deux personnages avant d'ajouter une relation."
    );

    return;

  }

  formulaireRelation.style.display = "block";

});


// ========================================
// ANNULER
// ========================================

boutonAnnulerRelation.addEventListener("click", function() {

  formulaireRelation.style.display = "none";

  descriptionRelation.value = "";

});


// ========================================
// ENREGISTRER UNE RELATION
// ========================================

boutonEnregistrerRelation.addEventListener("click", function() {

  const indexPersonnage1 =
    Number(selectPersonnage1.value);

  const indexPersonnage2 =
    Number(selectPersonnage2.value);


  // Empêche de relier un personnage à lui-même

  if (indexPersonnage1 === indexPersonnage2) {

    alert(
      "Choisis deux personnages différents."
    );

    return;

  }


  const personnage1 =
    listeDesPersonnages[indexPersonnage1];

  const personnage2 =
    listeDesPersonnages[indexPersonnage2];


  const nouvelleRelation = {

    personnage1: personnage1.nom,

    personnage2: personnage2.nom,

    type: selectTypeRelation.value,

    description: descriptionRelation.value.trim()

  };


  listeDesRelations.push(nouvelleRelation);


  sauvegarderRelations();

afficherRelations();
dessinerCarteRelations();


  formulaireRelation.style.display = "none";

  descriptionRelation.value = "";

});


// ========================================
// AFFICHER LES RELATIONS
// ========================================

function afficherRelations() {

  listeRelationsHTML.innerHTML = "";


  if (listeDesRelations.length === 0) {

    listeRelationsHTML.innerHTML =
      "<p>Aucune relation enregistrée pour le moment.</p>";

    return;

  }


  listeDesRelations.forEach(function(relation, index) {

    const carteRelation =
      document.createElement("div");

    carteRelation.classList.add("carte-relation");


    carteRelation.innerHTML = `
      <h3>
        ${relation.personnage1}
        ↔
        ${relation.personnage2}
      </h3>

      <p>
        <strong>${relation.type}</strong>
      </p>

      ${
        relation.description
          ? `<p>${relation.description}</p>`
          : ""
      }

      <button
        class="supprimer-relation"
        data-relation-index="${index}">
        🗑️ Supprimer
      </button>
    `;


    listeRelationsHTML.appendChild(carteRelation);

  });

}


// ========================================
// SUPPRIMER UNE RELATION
// ========================================

listeRelationsHTML.addEventListener("click", function(event) {

  if (
    event.target.classList.contains("supprimer-relation")
  ) {

    const index =
      Number(event.target.dataset.relationIndex);


    const confirmation = confirm(
      "Supprimer cette relation ?"
    );


    if (confirmation) {

      listeDesRelations.splice(index, 1);

      sauvegarderRelations();

afficherRelations();
dessinerCarteRelations();

    }

  }

});


// ========================================
// SAUVEGARDE DES RELATIONS
// ========================================

function sauvegarderRelations() {

  localStorage.setItem(
    "relations",
    JSON.stringify(listeDesRelations)
  );

}


// ========================================
// AFFICHAGE AU DÉMARRAGE
// ========================================

afficherRelations();

// ========================================
// CARTE VISUELLE DES RELATIONS
// ========================================

const carteRelations =
  document.getElementById("carte-relations");

const bullesPersonnages =
  document.getElementById("bulles-personnages");

const lignesRelations =
  document.getElementById("lignes-relations");


// ========================================
// DESSINER LA CARTE
// ========================================

function dessinerCarteRelations() {

  bullesPersonnages.innerHTML = "";
  lignesRelations.innerHTML = "";


  const nombrePersonnages =
    listeDesPersonnages.length;


  if (nombrePersonnages === 0) {
    return;
  }


  const largeur =
    carteRelations.clientWidth;

  const hauteur =
    carteRelations.clientHeight;


  const centreX =
    largeur / 2;

  const centreY =
    hauteur / 2;


  // Distance des personnages par rapport au centre

  const rayon =
    Math.min(largeur, hauteur) * 0.32;


  const positions = [];


  // ========================================
  // CRÉATION DES BULLES
  // ========================================

  listeDesPersonnages.forEach(function(personnage, index) {

    const angle =
      (index / nombrePersonnages) *
      Math.PI *
      2 -
      Math.PI / 2;


    const x =
      centreX +
      Math.cos(angle) * rayon;

    const y =
      centreY +
      Math.sin(angle) * rayon;


    positions.push({
      nom: personnage.nom,
      x: x,
      y: y
    });


    const bulle =
      document.createElement("div");


    bulle.classList.add(
      "bulle-personnage"
    );


    bulle.textContent =
      personnage.nom;

    bulle.dataset.personnageIndex = index;

    bulle.style.left =
      (x - 45) + "px";

    bulle.style.top =
      (y - 45) + "px";

bulle.addEventListener("click", function() {

  // Ouvre l'onglet Personnages
  afficherSection(personnages);

  // Cherche toutes les fiches personnages
  const cartes =
    document.querySelectorAll(".carte-personnage");

  const carte =
    cartes[index];

  // Descend jusqu'à la bonne fiche
if (carte) {

  carte.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  carte.classList.remove("surlignee");

  // Relance l'animation même si on clique
  // plusieurs fois sur le même personnage
  void carte.offsetWidth;

  carte.classList.add("surlignee");

  setTimeout(function() {
    carte.classList.remove("surlignee");
  }, 1800);

}

});
    
    bullesPersonnages.appendChild(
      bulle
    );

  });


  // ========================================
  // CRÉATION DES RELATIONS
  // ========================================

  listeDesRelations.forEach(function(relation) {

    const position1 =
      positions.find(function(position) {
        return position.nom === relation.personnage1;
      });


    const position2 =
      positions.find(function(position) {
        return position.nom === relation.personnage2;
      });


    if (!position1 || !position2) {
      return;
    }


    // Ligne

    const ligne =
      document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );


    ligne.setAttribute(
      "x1",
      position1.x
    );

    ligne.setAttribute(
      "y1",
      position1.y
    );

    ligne.setAttribute(
      "x2",
      position2.x
    );

    ligne.setAttribute(
      "y2",
      position2.y
    );


    ligne.setAttribute(
      "stroke",
      "#777"
    );

    ligne.setAttribute(
      "stroke-width",
      "3"
    );


    lignesRelations.appendChild(
      ligne
    );


    // ========================================
    // NOM DE LA RELATION
    // ========================================

    const texte =
      document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );


    const milieuX =
      (position1.x + position2.x) / 2;

    const milieuY =
      (position1.y + position2.y) / 2;


    texte.setAttribute(
      "x",
      milieuX
    );

    texte.setAttribute(
      "y",
      milieuY - 8
    );


    texte.setAttribute(
      "text-anchor",
      "middle"
    );


    texte.setAttribute(
      "class",
      "texte-relation"
    );


    texte.textContent =
      relation.type;


    lignesRelations.appendChild(
      texte
    );

  });

}


