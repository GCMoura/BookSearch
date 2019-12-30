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

buttonInsert.onclick = insertBooks


function insertBooks() {
    let inputTitle = insertTitle.value
    result.innerHTML = inputTitle
    let inputAuthor = insertAuthor.value
    result.innerHTML += inputAuthor
    let inputGenre = insertGenre.value
    result.innerHTML += inputGenre
    insertTitle.value = ''
    insertAuthor.value = ''
    insertGenre.value = ''
}