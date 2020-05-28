var insertTitle = document.querySelector(".insert-title");
var insertAuthor = document.querySelector(".insert-author");

var bookAlert = document.querySelector('.alert')
var bookSend = document.querySelector('.book-send')

var buttonInsert = document.querySelector("#button-insert");

var searchTitle = document.querySelector(".search-title");
var searchAuthor = document.querySelector(".search-author");

var buttonSearchTitle = document.querySelector("#button-search-title");
var buttonSearchAuthor = document.querySelector("#button-search-author");

const list = document.querySelector("#book-list");

var controlRow = 0 //controlar o número de linhas na página

var buttonShow = document.querySelector('#button-show')

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

function displayBooks() {
    const books = getBooks();

    books.forEach(book => render(book));
}

//mostrar os livros cadastrados, com limite da tela 
function render(book) {

    if (controlRow < 8){ // para caber na tela apenas os oito primeiros livros
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    
        list.appendChild(row);
    } else {
        return false
    }
    
    controlRow++
}

//mostrar os livros procurados no campo pesquisa
function renderSearchBook(book) {
    const row = document.createElement("tr");

        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    
    list.appendChild(row);
}

buttonInsert.onclick = insertBooks;

function insertBooks() {
    let title = insertTitle.value;
    let author = insertAuthor.value;
    let control = false

    const books = getBooks()

    if(books == ''){ //se for a primeira inserção
        const book = new Book(title, author);

        render(book);

        saveToStorage(book);

        bookAlert.style.display = 'block'
        bookAlert.style.background = 'blue'
        bookAlert.innerHTML= "Livro cadastrado com sucesso"

        clearFields();
    } else {
        //laço para verificar se já existe o livro cadastrado
        for (i = 0; i < books.length; i++){
            if(books[i].title.indexOf(title) != -1){ //significa que tem outro titulo igual
                control = true
            }             
        }
        if(control == true){
            bookAlert.style.display = 'block'
            bookAlert.style.background = 'red'
            bookAlert.innerHTML= "Livro já cadastrado"
            clearFields();
        } else {
            bookAlert.style.display = 'block'
            bookAlert.style.background = 'blue'
            bookAlert.innerHTML= "Livro cadastrado com sucesso"

            const book = new Book(title, author);
            render(book);
            saveToStorage(book);
            clearFields();
        }
    }       
}

//limpar o alerta quando digitar novo livro
insertTitle.addEventListener('focus', cleanAlert, false)
function cleanAlert(){
    bookAlert.style.display = 'none'
}

function getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
        //primeiro elemento cria o array
        books = [];
    } else {
        //a partir do primeiro, acrescenta o elemento no array
        books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
}

function saveToStorage(book) {
    const books = getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
}

function clearFields() {
    insertTitle.value = "";
    insertAuthor.value = "";
    searchTitle.value = "";
    searchAuthor.value = "";
}

document.querySelector("#book-list").addEventListener("click", e => {
    deleteBook(e.target);
    removeBookFromStorage(
        e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    ); //quero remover pelo título. Então:
    // quero o elemento irmão do elemento irmão do elemento pai do link de exclusão
    // é o elemento título
});

function deleteBook(book) {
    if (book.classList.contains("delete")) {
        book.parentElement.parentElement.remove(); //o elemento pai do link é o elemento TD. E o pai desse elemento é a linha da tabela TR
    }
}

function removeBookFromStorage(bookTitle) {
    const books = getBooks();

    books.forEach((book, index) => {
        if (book.title === bookTitle) {
            books.splice(index, 1);
        }
    });

    localStorage.setItem("books", JSON.stringify(books));
}

buttonSearchTitle.onclick = searchForTitle;
buttonSearchAuthor.onclick = searchForAuthor;

function searchForTitle() {
    var title = searchTitle.value;
    const books = getBooks();
    var titleLower = ''

    title = title.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }) //palavra com a inicial maiúscula
    titleLower = title.toLowerCase() //palavra em letras minúsculas

    list.innerHTML = "";

    books.forEach(book => {

        // if (book.title === title) {
        //     render(book);
        // }
        if(book.title.indexOf(title) != -1 || book.title.indexOf(titleLower) != - 1){
            renderSearchBook(book);
        }
    });

    clearFields();
}

function searchForAuthor() {
    var author = searchAuthor.value;
    const books = getBooks();

    list.innerHTML = "";

    author = author.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })
    authorLower = author.toLowerCase()

    books.forEach(book => {
        
        // if (book.author === author) {
        //     render(book);
        // }
        if (book.author.indexOf(author) != -1 || book.title.indexOf(authorLower) != - 1){ //para caso a pesquisa seja com um dos nomes
            renderSearchBook(book);
        }
    });

    clearFields();
}

buttonShow.addEventListener('click', showLibrary, false)
//mostra todos os 8 primeiros livros cadastrados
function showLibrary(){
    const books = getBooks()
    let row = 0
    list.innerHTML = "";

    books.forEach(book => {
        if(row < 8){
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `;
        
            list.appendChild(row);
        }
        row++
    })

}

document.addEventListener("DOMContentLoaded", displayBooks);