// tableau pour stocker les livres
let livres = [];

// ajouter un livre
function ajouterLivre() {
    const titre = document.getElementById("titreLivre").value;
    const auteur = document.getElementById("auteurLivre").value;
    if (titre && auteur) {
        const livre = {
            title: titre,
            author: auteur,
            read: false
        };
        livres.push(livre);
        afficherLivres();
        document.getElementById("titreLivre").value = "";
        document.getElementById("auteurLivre").value = "";
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

// afficher les livres
function afficherLivres() {
    const listeLivres = document.getElementById("listeLivres");
    listeLivres.innerHTML = "";
    livres.forEach((livre, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "livre");
        // Ajout de "Titre :" et "Auteur :" dans la liste avant de voir afficher le nom du livre et de l'auteur
        const titreSpan = document.createElement("span");
        titreSpan.classList.add("titre");
        titreSpan.textContent = `Titre : ${livre.title}`;
        const auteurSpan = document.createElement("span");
        auteurSpan.classList.add("auteur");
        auteurSpan.textContent = ` - Auteur : ${livre.author}`;
        li.appendChild(titreSpan);
        li.appendChild(auteurSpan);
        // Bouton pour marquer le livre comme lu/non lu
        const boutonLu = document.createElement("button");
        boutonLu.classList.add("btn", "btn-sm", livre.read ? "btn-success" : "btn-secondary", "float-end", "ms-2");
        boutonLu.textContent = livre.read ? "Lu" : "Non lu";
        // Changer l'état de lecture du livre lorsque le bouton est cliqué
        boutonLu.onclick = () => {
            livre.read = !livre.read; // Inverser l'état de lecture
            afficherLivres();
        };
        // Bouton pour supprimer le livre
        const boutonSupp = document.createElement("button");
        boutonSupp.classList.add("btn", "btn-sm", "btn-danger", "float-end");
        // Ajouter une icône poubelle au bouton
        const iconSupp = document.createElement("img");
        iconSupp.src = "https://img.icons8.com/?size=100&id=67884&format=png&color=000000"; 
        iconSupp.alt = "Supprimer";
        iconSupp.style.width = "20px";
        iconSupp.style.height = "20px";
        boutonSupp.appendChild(iconSupp);
        boutonSupp.onclick = () => {
            supprimerLivre(index);
        };
        li.appendChild(boutonLu);
        li.appendChild(boutonSupp);
        listeLivres.appendChild(li);
    });
}

// supprimer un livre
function supprimerLivre(index) {
    livres.splice(index, 1);
    afficherLivres();
}

// filtrer les livres
function filtrerLivres() {
    let input = document.getElementById('rechercheLivre').value;
    input = input.toLowerCase();
    const listeLivres = document.getElementById("listeLivres");
    const livresAffiches = listeLivres.getElementsByClassName('livre');
    // Parcourir chaque livre affiché
    for (let i = 0; i < livresAffiches.length; i++) {
        // Récupérer le titre et l'auteur du livre actuel
        const titre = livresAffiches[i].querySelector('.titre').textContent.toLowerCase();
        const auteur = livresAffiches[i].querySelector('.auteur').textContent.toLowerCase();
        // Vérifier si le titre ou l'auteur ne contient pas le texte de recherche
        if (!titre.includes(input) && !auteur.includes(input)) {
            // Masquer le livre si le texte de recherche ne correspond pas sinon affiche les livre si le texte correspond
            livresAffiches[i].style.display = "none";
        } else {
            livresAffiches[i].style.display = "list-item";
        }
    }
}
