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

// ========================================
// CHRONOLOGIE
// ========================================

const boutonAjouterEvenement =
  document.getElementById("ajouter-evenement");

const formulaireEvenement =
  document.getElementById("formulaire-evenement");

const titreEvenement =
  document.getElementById("titre-evenement");

const dateEvenement =
  document.getElementById("date-evenement");

const chapitreEvenement =
  document.getElementById("chapitre-evenement");

const lieuEvenement =
  document.getElementById("lieu-evenement");

const personnagesEvenement =
  document.getElementById("personnages-evenement");

const descriptionEvenement =
  document.getElementById("description-evenement");

const boutonEnregistrerEvenement =
  document.getElementById("enregistrer-evenement");

const boutonAnnulerEvenement =
  document.getElementById("annuler-evenement");

const listeEvenementsHTML =
  document.getElementById("liste-evenements");


// ========================================
// DONNÉES CHRONOLOGIE
// ========================================

let listeDesEvenements =
  JSON.parse(localStorage.getItem("evenements")) || [];

let evenementEnModification = null;


// ========================================
// REMPLIR LES PERSONNAGES
// ========================================

function remplirPersonnagesEvenement() {

  personnagesEvenement.innerHTML = "";

  listeDesPersonnages.forEach(function(personnage, index) {

    const option = document.createElement("option");

    option.value = index;
    option.textContent = personnage.nom;

    personnagesEvenement.appendChild(option);

  });

}


// ========================================
// AJOUTER UN ÉVÉNEMENT
// ========================================

boutonAjouterEvenement.addEventListener("click", function() {

  evenementEnModification = null;

  viderFormulaireEvenement();

  remplirPersonnagesEvenement();

  formulaireEvenement.style.display = "block";

});


// ========================================
// ANNULER
// ========================================

boutonAnnulerEvenement.addEventListener("click", function() {

  formulaireEvenement.style.display = "none";

  evenementEnModification = null;

  viderFormulaireEvenement();

});


// ========================================
// ENREGISTRER
// ========================================

boutonEnregistrerEvenement.addEventListener("click", function() {

  const titre = titreEvenement.value.trim();

  if (titre === "") {

    alert("Donne un titre à ton événement.");

    return;

  }


  const personnagesSelectionnes =
    Array.from(personnagesEvenement.selectedOptions)
      .map(function(option) {

        const index = Number(option.value);

        return listeDesPersonnages[index].nom;

      });


  const nouvelEvenement = {

    titre: titre,

    date: dateEvenement.value.trim(),

    chapitre: chapitreEvenement.value.trim(),

    lieu: lieuEvenement.value.trim(),

    personnages: personnagesSelectionnes,

    description: descriptionEvenement.value.trim()

  };


  // AJOUT OU MODIFICATION

  if (evenementEnModification === null) {

    listeDesEvenements.push(nouvelEvenement);

  } else {

    listeDesEvenements[evenementEnModification] =
      nouvelEvenement;

    evenementEnModification = null;

  }


  sauvegarderEvenements();

  afficherEvenements();

  afficherFrise();

  formulaireEvenement.style.display = "none";

  viderFormulaireEvenement();

});


// ========================================
// AFFICHER LES ÉVÉNEMENTS
// ========================================

function afficherEvenements() {

  listeEvenementsHTML.innerHTML = "";


  if (listeDesEvenements.length === 0) {

    listeEvenementsHTML.innerHTML =
      "<p>Aucun événement enregistré pour le moment.</p>";

    return;

  }


  listeDesEvenements.forEach(function(evenement, index) {

    const carte = document.createElement("div");

    carte.classList.add("carte-evenement");


    const personnagesTexte =
      evenement.personnages &&
      evenement.personnages.length > 0
        ? evenement.personnages.join(", ")
        : "Aucun";


    carte.innerHTML = `

      <h3>${evenement.titre}</h3>

      <p>
        <strong>🕐 Date / période :</strong>
        ${evenement.date || "Non renseignée"}
      </p>

      <p>
        <strong>📖 Chapitre :</strong>
        ${evenement.chapitre || "Non renseigné"}
      </p>

      <p>
        <strong>📍 Lieu :</strong>
        ${evenement.lieu || "Non renseigné"}
      </p>

      <p>
        <strong>👤 Personnages :</strong>
        ${personnagesTexte}
      </p>

      <p>
        <strong>Description :</strong><br>
        ${evenement.description || "Aucune description"}
      </p>


      <div class="actions-evenement">

        <button
          class="modifier-evenement"
          data-evenement-index="${index}">
          ✏️ Modifier
        </button>

        <button
          class="supprimer-evenement"
          data-evenement-index="${index}">
          🗑️ Supprimer
        </button>

      </div>

    `;


    listeEvenementsHTML.appendChild(carte);

  });

}


// ========================================
// MODIFIER / SUPPRIMER
// ========================================

listeEvenementsHTML.addEventListener("click", function(event) {


  // MODIFIER

  if (
    event.target.classList.contains("modifier-evenement")
  ) {

    const index =
      Number(event.target.dataset.evenementIndex);

    const evenement =
      listeDesEvenements[index];

    evenementEnModification = index;

    remplirPersonnagesEvenement();


    titreEvenement.value =
      evenement.titre || "";

    dateEvenement.value =
      evenement.date || "";

    chapitreEvenement.value =
      evenement.chapitre || "";

    lieuEvenement.value =
      evenement.lieu || "";

    descriptionEvenement.value =
      evenement.description || "";


    Array.from(personnagesEvenement.options)
      .forEach(function(option) {

        const personnage =
          listeDesPersonnages[Number(option.value)];

        option.selected =
          evenement.personnages.includes(personnage.nom);

      });


    formulaireEvenement.style.display = "block";

    formulaireEvenement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }


  // SUPPRIMER

  if (
    event.target.classList.contains("supprimer-evenement")
  ) {

    const index =
      Number(event.target.dataset.evenementIndex);

    const evenement =
      listeDesEvenements[index];


    const confirmation = confirm(
      "Supprimer l'événement « " +
      evenement.titre +
      " » ?"
    );


    if (confirmation) {

      listeDesEvenements.splice(index, 1);

      sauvegarderEvenements();

      afficherEvenements();

      afficherFrise();

    }

  }

});


// ========================================
// SAUVEGARDE
// ========================================

function sauvegarderEvenements() {

  localStorage.setItem(
    "evenements",
    JSON.stringify(listeDesEvenements)
  );

}


// ========================================
// VIDER LE FORMULAIRE
// ========================================

function viderFormulaireEvenement() {

  titreEvenement.value = "";
  dateEvenement.value = "";
  chapitreEvenement.value = "";
  lieuEvenement.value = "";
  descriptionEvenement.value = "";

  Array.from(personnagesEvenement.options)
    .forEach(function(option) {
      option.selected = false;
    });

}


// ========================================
// AFFICHAGE INITIAL
// ========================================

afficherEvenements();

// ========================================
// FRISE CHRONOLOGIQUE
// ========================================

const friseEvenements =
  document.getElementById("frise-evenements");


function afficherFrise() {

  friseEvenements.innerHTML = "";


  if (listeDesEvenements.length === 0) {

    friseEvenements.innerHTML =
      "<p>Aucun événement dans la chronologie.</p>";

    return;

  }


  listeDesEvenements.forEach(function(evenement, index) {

    const element =
      document.createElement("div");

    element.classList.add("evenement-frise");


    element.innerHTML = `

      <div class="date-frise">
        ${evenement.date || "Date inconnue"}
      </div>

      <div class="point-frise"></div>

      <div class="nom-evenement-frise">
        ${evenement.titre}
      </div>

      <div class="chapitre-frise">
        ${evenement.chapitre || ""}
      </div>

    `;


    // CLIC SUR UN ÉVÉNEMENT DE LA FRISE

    element.addEventListener("click", function() {

      const cartes =
        document.querySelectorAll(".carte-evenement");

      const carte =
        cartes[index];


      if (carte) {

        carte.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });


        // Effet lumineux

        carte.classList.remove("surlignee");

        void carte.offsetWidth;

        carte.classList.add("surlignee");


        setTimeout(function() {

          carte.classList.remove("surlignee");

        }, 1800);

      }

    });


    friseEvenements.appendChild(element);

  });

}


// Premier affichage

afficherFrise();

// ========================================
// TABLEAU DE BORD - JOURNAL D'ÉCRITURE
// ========================================


// ===== ÉLÉMENTS HTML =====

const totalDepartInput =
  document.getElementById("total-depart");

const objectifMotsInput =
  document.getElementById("objectif-mots");

const boutonEnregistrerReglages =
  document.getElementById("enregistrer-reglages");


const motsSessionInput =
  document.getElementById("mots-session");

const pagesSessionInput =
  document.getElementById("pages-session");

const chapitresSessionInput =
  document.getElementById("chapitres-session");

const boutonAjouterSession =
  document.getElementById("ajouter-session");


const pourcentageProgressionDashboard =
  document.getElementById("pourcentage-progression");

const remplissageProgressionDashboard =
  document.getElementById("remplissage-progression");

const texteProgressionDashboard =
  document.getElementById("texte-progression");


const statMotsDashboard =
  document.getElementById("stat-mots");

const statChapitresDashboard =
  document.getElementById("stat-chapitres");

const statPagesDashboard =
  document.getElementById("stat-pages");


const motsAujourdhui =
  document.getElementById("mots-aujourdhui");

const listeSessionsHTML =
  document.getElementById("liste-sessions");


// ========================================
// CHARGEMENT DES DONNÉES
// ========================================

let reglagesRoman =
  JSON.parse(
    localStorage.getItem("reglagesRoman")
  ) || {
    totalDepart: 0,
    objectif: 80000
  };


let sessionsEcriture =
  JSON.parse(
    localStorage.getItem("sessionsEcriture")
  ) || [];


// ========================================
// DATE LOCALE
// ========================================

function obtenirDateLocale() {

  const maintenant = new Date();

  const annee =
    maintenant.getFullYear();

  const mois =
    String(maintenant.getMonth() + 1)
      .padStart(2, "0");

  const jour =
    String(maintenant.getDate())
      .padStart(2, "0");

  return annee + "-" + mois + "-" + jour;

}


// ========================================
// DATE LISIBLE
// ========================================

function formaterDateSession(date) {

  const morceaux =
    date.split("-");

  const dateLocale =
    new Date(
      Number(morceaux[0]),
      Number(morceaux[1]) - 1,
      Number(morceaux[2])
    );

  return dateLocale.toLocaleDateString(
    "fr-FR",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

}


// ========================================
// CALCUL DU TOTAL DE MOTS
// ========================================

function calculerTotalMots() {

  let total =
    Number(reglagesRoman.totalDepart) || 0;


  sessionsEcriture.forEach(function(session) {

    total +=
      Number(session.mots) || 0;

  });


  return total;

}


// ========================================
// DERNIER NOMBRE DE PAGES
// ========================================

function obtenirPagesActuelles() {

  if (sessionsEcriture.length === 0) {
    return 0;
  }


  const derniereSession =
    sessionsEcriture[
      sessionsEcriture.length - 1
    ];


  return Number(derniereSession.pages) || 0;

}


// ========================================
// DERNIER NOMBRE DE CHAPITRES
// ========================================

function obtenirChapitresActuels() {

  if (sessionsEcriture.length === 0) {
    return 0;
  }


  const derniereSession =
    sessionsEcriture[
      sessionsEcriture.length - 1
    ];


  return Number(derniereSession.chapitres) || 0;

}


// ========================================
// MOTS ÉCRITS AUJOURD'HUI
// ========================================

function calculerMotsAujourdhui() {

  const aujourdHui =
    obtenirDateLocale();

  let totalAujourdHui = 0;


  sessionsEcriture.forEach(function(session) {

    if (session.date === aujourdHui) {

      totalAujourdHui +=
        Number(session.mots) || 0;

    }

  });


  return totalAujourdHui;

}


// ========================================
// AFFICHER LE TABLEAU DE BORD
// ========================================

function afficherDashboardEcriture() {

  const totalMots =
    calculerTotalMots();

  const objectif =
    Number(reglagesRoman.objectif) || 80000;

  const pages =
    obtenirPagesActuelles();

  const chapitres =
    obtenirChapitresActuels();


  // ===== POURCENTAGE =====

  let pourcentage = 0;

  if (objectif > 0) {

    pourcentage =
      (totalMots / objectif) * 100;

  }


  const largeurBarre =
    Math.min(
      Math.max(pourcentage, 0),
      100
    );


  pourcentageProgressionDashboard.textContent =
    pourcentage.toFixed(1) + " %";


  remplissageProgressionDashboard.style.width =
    largeurBarre + "%";


  texteProgressionDashboard.textContent =
    totalMots.toLocaleString("fr-FR") +
    " / " +
    objectif.toLocaleString("fr-FR") +
    " mots";


  // ===== CARTES =====

  statMotsDashboard.textContent =
    totalMots.toLocaleString("fr-FR");

  statPagesDashboard.textContent =
    pages;

  statChapitresDashboard.textContent =
    chapitres;


  // ===== AUJOURD'HUI =====

  const motsDuJour =
    calculerMotsAujourdhui();

  motsAujourdhui.textContent =
    "+" +
    motsDuJour.toLocaleString("fr-FR") +
    " mots";


  // ===== RÉGLAGES =====

  totalDepartInput.value =
    reglagesRoman.totalDepart;

  objectifMotsInput.value =
    reglagesRoman.objectif;


  afficherHistoriqueEcriture();

}


// ========================================
// ENREGISTRER LES RÉGLAGES
// ========================================

boutonEnregistrerReglages.addEventListener(
  "click",
  function() {

    const totalDepart =
      Math.max(
        0,
        Number(totalDepartInput.value) || 0
      );


    const objectif =
      Math.max(
        1,
        Number(objectifMotsInput.value) || 80000
      );


    reglagesRoman = {
      totalDepart: totalDepart,
      objectif: objectif
    };


    localStorage.setItem(
      "reglagesRoman",
      JSON.stringify(reglagesRoman)
    );


    afficherDashboardEcriture();

  }
);


// ========================================
// AJOUTER UNE SESSION
// ========================================

boutonAjouterSession.addEventListener(
  "click",
  function() {

    const mots =
      Math.max(
        0,
        Number(motsSessionInput.value) || 0
      );


    const pages =
      Math.max(
        0,
        Number(pagesSessionInput.value) || 0
      );


    const chapitres =
      Math.max(
        0,
        Number(chapitresSessionInput.value) || 0
      );


    // Il faut au moins saisir quelque chose

    if (
      mots === 0 &&
      pagesSessionInput.value === "" &&
      chapitresSessionInput.value === ""
    ) {

      alert(
        "Entre au moins le nombre de mots écrits."
      );

      return;

    }


    const nouvelleSession = {

      date: obtenirDateLocale(),

      mots: mots,

      pages: pages,

      chapitres: chapitres

    };


    sessionsEcriture.push(
      nouvelleSession
    );


    sauvegarderSessionsEcriture();


    // Vide uniquement les mots.
    // Pages et chapitres restent affichés
    // comme repère pour la prochaine fois.

    motsSessionInput.value = "";

    pagesSessionInput.value =
      pages;

    chapitresSessionInput.value =
      chapitres;


    afficherDashboardEcriture();

  }
);


// ========================================
// SAUVEGARDER LES SESSIONS
// ========================================

function sauvegarderSessionsEcriture() {

  localStorage.setItem(
    "sessionsEcriture",
    JSON.stringify(sessionsEcriture)
  );

}


// ========================================
// HISTORIQUE
// ========================================

function afficherHistoriqueEcriture() {

  listeSessionsHTML.innerHTML = "";


  if (sessionsEcriture.length === 0) {

    listeSessionsHTML.innerHTML =
      "<p>Aucune session enregistrée pour le moment.</p>";

    return;

  }


  // On affiche les plus récentes en premier

  const sessionsInversees =
    sessionsEcriture
      .map(function(session, index) {

        return {
          session: session,
          indexOriginal: index
        };

      })
      .reverse();


  sessionsInversees.forEach(function(element) {

    const session =
      element.session;

    const index =
      element.indexOriginal;


    const bloc =
      document.createElement("div");


    bloc.classList.add(
      "session-ecriture"
    );


    bloc.innerHTML = `

      <div class="infos-session">

        <div class="date-session">
          ${formaterDateSession(session.date)}
        </div>

        <div class="mots-session-historique">
          +${Number(session.mots).toLocaleString("fr-FR")} mots
        </div>

        <div class="details-session">
          📄 ${session.pages} pages
          •
          📖 ${session.chapitres} chapitres
        </div>

      </div>


      <button
        class="supprimer-session"
        data-session-index="${index}"
      >
        🗑️ Supprimer
      </button>

    `;


    listeSessionsHTML.appendChild(
      bloc
    );

  });

}


// ========================================
// SUPPRIMER UNE SESSION
// ========================================

listeSessionsHTML.addEventListener(
  "click",
  function(event) {

    if (
      event.target.classList.contains(
        "supprimer-session"
      )
    ) {

      const index =
        Number(
          event.target.dataset.sessionIndex
        );


      const session =
        sessionsEcriture[index];


      const confirmation =
        confirm(
          "Supprimer la session de " +
          Number(session.mots)
            .toLocaleString("fr-FR") +
          " mots ?"
        );


      if (confirmation) {

        sessionsEcriture.splice(
          index,
          1
        );


        sauvegarderSessionsEcriture();


        afficherDashboardEcriture();

      }

    }

  }
);


// ========================================
// PREMIER AFFICHAGE
// ========================================

afficherDashboardEcriture();


