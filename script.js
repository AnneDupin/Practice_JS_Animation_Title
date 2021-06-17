// Book constructor
// Le constructeur est une notion fondamentale dans la programmation orientée objet (PHP5, C#, Java...), il s'agit de la fonction d'une classe qui gère l'instanciation, c'est à dire la création d'un nouvel objet de cette classe.

function Book(titre, auteur, genre) {
    this.titre = titre;
    this.auteur = auteur;
    this.genre = genre;
}

// UI constructor
function UI() {

}

// ajout du livre à la liste

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');

    // créer un élément tr
    const row = document.createElement('tr');

// créer le contenu du tr

row.innerHTML = `
<td>${book.titre}</td>
<td>${book.auteur}</td>
<td>${book.genre}</td>
<td><a href="#" class="delete">X</a></td>
`;

list.appendChild(row);

}

// Nettoyer les champs
UI.prototype.clearFields = function () {
    document.getElementById('titre').value = '';
    document.getElementById('auteur').value = '';
    document.getElementById('genre').value = '';
}

//Montrer alerte 
UI.prototype.showAlert = function (message, ClassName) { 
    //message écrit en dessous + classname

    // créer div
    const div = document.createElement('div');
    // ajouter une classe
    div.className = `alert $(className)`; //classe en rouge css
    // ajouter du texte
    div.appendChild(document.createTextNode(message));
    // Prendre le parent
const container = document.querySelector('.container');
    // Prend le form 
const form = document.querySelector('#book-form');
// Insérer notre alerte
container.insertBefore(div, form);

//Timeout pour faire partir la div en 3s
setTimeout(function () {

    document.querySelector('.alert').remove();
}, 3000);

}

// Delete book
UI.prototype.deleteBook = function (target) {

    if (target.className === 'delete') {

        target.parentElement.parentElement.remove();
    }

}


// Event listener pour ajouter livre / erreur / succès

document.getElementById('book-form').addEventListener('submit', function (e) {

// Lier toutes les valeurs

const titre = document.getElementById('titre').value,
       auteur = document.getElementById('auteur').value,
       genre = document.getElementById('genre').value

   // Instancier un nouveau BOOK
   // À partir de notre classe, nous pouvons créer des objets, on parle alors 
   // d'instancier des objets, une classe objet a alors une instance. Il s'agit
   // d'objets qui contiennent les données et attributs définis dans une classe.    

const book = new Book(titre, auteur, genre);

// Instancier un nouvel UI, permet de créer des prototypes, rajouter lignes au tableau, etc
const ui = new UI();

// validation
if (titre === '' || auteur === '' || genre === '') {
    ui.showAlert('Remplissez les champs!', 'error');
    } else {

// ajout du liste dans la liste
ui.addBookToList(book);

//Succès
ui.showAlert('Livre ajouté', 'success');

// Clear fields
ui.clearFields();
    }

e.preventDefault();
});

// Evenement pour supprimer les lignes

document.getElementById('book-list').addEventListener('click', function (e) {

    // instancier UI
    const ui = new UI(); 
    // Effacer le livre
    ui.deleteBook(e.target);
    //montrer un message de succès
    ui.showAlert('Livre enlevé avec succès !', 'success');

    e.preventDefault();

});

