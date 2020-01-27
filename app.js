var insertTitle = document.querySelector(".insert-title");
var insertAuthor = document.querySelector(".insert-author");

var buttonInsert = document.querySelector("#button-insert");

var searchTitle = document.querySelector(".search-title");
var searchAuthor = document.querySelector(".search-author");

var buttonSearchTitle = document.querySelector("#button-search-title");
var buttonSearchAuthor = document.querySelector("#button-search-author");

const list = document.querySelector("#book-list");

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

function render(book) {
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

    const book = new Book(title, author);

    render(book);

    saveToStorage(book);

    clearFields();
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
    const title = searchTitle.value;
    const books = getBooks();

    list.innerHTML = "";

    books.forEach(book => {
        if (book.title === title) {
            render(book);
        }
    });

    clearFields();
}

function searchForAuthor() {
    const author = searchAuthor.value;
    const books = getBooks();

    list.innerHTML = "";

    books.forEach(book => {
        if (book.author === author) {
            render(book);
        }
    });

    clearFields();
}

document.addEventListener("DOMContentLoaded", displayBooks);