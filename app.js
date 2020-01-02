var insertTitle = document.querySelector('.insert-title')
var insertAuthor = document.querySelector('.insert-author')
var insertGenre = document.querySelector('.insert-genre')
var buttonInsert = document.querySelector('#button-insert')

var searchTitle = document.querySelector('.search-title')
var searchAuthor = document.querySelector('.search-author')
var searchGenre = document.querySelector('.search-genre')
var buttonSearchTitle = document.querySelector('#button-search-title')
var buttonSearchAuthor = document.querySelector('#button-search-author')
var buttonSearchGenre = document.querySelector('#button-search-genre')

var result = document.querySelector('.result')

var buttonShowStorage = document.querySelector('.showStorage')

class Book {
    constructor(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
    }
}

function render(books) {

    for (book of books) {

        var parag = document.createElement('p')

        console.log(book)

        parag.innerHTML += ` ${book.title} / ${book.author} / ${book.genre} <button type='button' class="btn btn-secondary ml-3 delete">  Excluir</button>  `;
    }
    result.appendChild(parag)
}

buttonInsert.onclick = insertBooks
buttonShowStorage.onclick = showStorage

function insertBooks() {
    let inputTitle = insertTitle.value
    let inputAuthor = insertAuthor.value
    let inputGenre = insertGenre.value

    const book = new Book(inputTitle, inputAuthor, inputGenre)

    const books = getBooks()

    books.push(book)

    render(books)
    saveToStorage(books)

    clearFields()
}

function getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
}

function saveToStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

function clearFields() {
    insertTitle.value = ''
    insertAuthor.value = ''
    insertGenre.value = ''
}

function showStorage() {

    const storage = JSON.parse(localStorage.getItem('books'));

    for (let i in storage) {

        let element = storage[i]

        let value = Object.values(element).join(' / ')

        var parag = document.createElement('p')

        parag.innerHTML += `${value} <button type='button' class="btn btn-secondary ml-3 delete">  Excluir</button> `

        result.appendChild(parag)
    }
}