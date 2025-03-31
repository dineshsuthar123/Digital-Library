const suggestedBooks = [{
    name: "Atomic Habits",
    author: "James Clear",
    pages: 306,
    read: false,
},
    {
        name: "4 hour work week",
        author: "Tim ferris",
        pages: 396,
        read: false,
    },
    {
        name: "How to win friends and influence people",
        author: "Dale carnegie",
        pages: 228,
        read: false,
    },
    {
        name: "Attitude is everything",
        author: "Jeff keller",
        pages: 144,
        read: false,
    },
];

// ************************** Nav toggle functionality ******************

const navToggle = document.querySelector(".menu-icon");
const navLinksCtn = document.querySelector(".nav-links-ctn");
const navBar = document.querySelector("nav");

navToggle.addEventListener("click", (event) => {
    navBar.classList.toggle("show-nav");
});

// ************************** Form functionality ************************

// TODO Reading Status should is checkbox, to improve the user experience make reading status a tag like "Not Started yet", "Currenctly Reading", "Finished Reading" and according to this status you can show some text, appreciate them, give them motivation to Read.

// TODO Add Books by fetching the data from an API, show only selected one

// TODO More Info about the book such as the Price, reviews, ratings, downloads, sold data.

// TODO Add the favorite book heart icon functionality to all books

// TODO Also inform the user that book has been either added or removed using a popup message.

// TODO There should not be the same book multiple times in the library, Only one unique copy should be there

// TODO If suggested book is added to the library then button should say added to the library

// TODO Add the filter to the reading list

// setting the reference of dom elements in the variables
const form = document.querySelector("#form");
const bookName = form.querySelector("#book-name-input");
const bookAuthor = form.querySelector("#book-author-input");
const bookPages = form.querySelector("#book-pages-input");
const readStatus = form.querySelector("#read-status-input");
const submitBtn = form.querySelector(".submit-btn");
const readingList = document.querySelector(".reading-list-section");
const addBtn = document.querySelectorAll(".add-btn");

let myLibrary = [{
    name: "Compound Effect",
    author: "Darren Hardy",
    pages: 150,
    read: false,
    info: function () {
        return `${name} by ${author}, ${pages}, ${read}`;
    },
},
    {
        name: "Atomic Habits",
        author: "James Clear",
        pages: 350,
        read: true,
        info: function () {
            return `${name} by ${author}, ${pages}, ${read}`;
        },
    },
    {
        name: "Mindset",
        author: "Dr. Carol S. Dweck",
        pages: 200,
        read: false,
        info: function () {
            return `${name} by ${author}, ${pages}, ${read}`;
        },
    },
];

// Book constructor function to create the book object
function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.name} by ${this.author}, ${this.pages}, ${read}`;
    };
}

// Handle UI tasks
// Function to create the new book object and adding it to the array
function addBookToLibrary() {
    // Getting the values from the form and store them in variables
    let name = bookName.value;
    let author = bookAuthor.value;
    let pages = parseInt(bookPages.value);
    let status = readStatus.checked;

    if (name === "" || author === "" || pages === "") {
        // Improve on this, Make the JS validation and make the pop up card to show the warnings
        alert("Please fill in all the details");
    } else {
        let book = new Book(name, author, pages, status);
        myLibrary.push(book);

        // add book to the page.
        displayBooks(book);

        //add book to local storage
        addBookToLocalStorage(book);
    }
}

// Function to show the books of the array
function showBooks() {
    // const books = myLibrary;
    const books = getBooksFromLocalStorage();
    books.forEach((book, index) => displayBooks(book, index));
}

// Function to show the added book to the array on the page.
function displayBooks(book, index = myLibrary.length - 1) {
    const demoBook = document.createElement("div");
    demoBook.dataset.index = index;
    demoBook.classList.add("demo-book");

    const readStatus = book.read ? "checked" : "unchecked";

    const bookContent = `
        <h3 class="book-title">${book.name}</h3>
        <div class="author_and_page-ctn">
            <p class="author-name">${book.author}</p>
            <p class="pages-number">${book.pages}</p>
        </div>
        <div class="read-status-ctn">
            <span>Read</span>
            <label class="switch">
                <input type="checkbox" name="read status" ${readStatus} />
                <span class="slider round"></span>
            </label>
        </div>
        <button class="primary-btn remove-btn">
            Remove from list
        </button>
    `;
    demoBook.innerHTML = bookContent;
    readingList.appendChild(demoBook);
}

// Function to clear fields
function clearFields() {
    bookName.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
}

// Function to add suggested book to reading list
function addSuggestionBookToLibrary(e) {
    const name = e.target.parentElement.firstElementChild.textContent;
    const author =
        e.target.parentElement.firstElementChild.nextElementSibling
            .firstElementChild.textContent;
    const pages =
        e.target.parentElement.firstElementChild.nextElementSibling.lastElementChild
            .textContent;
    const readStatus = false;
    const book = new Book(name, author, pages, readStatus);
    myLibrary.push(book);
    displayBooks(book);
    addBookToLocalStorage(book);

    // Popup message showing user that book has been added to reading list
    alert(
        "Congrats 🎉, Your book has been added to the Reading list, Do check out 👍"
    );
}

// function to remove the book from the array and from the page.
function removeBook(el) {
    if (el.classList.contains("remove-btn")) {
        el.parentElement.remove(); // removing from the page.
        const arrIndex = parseInt(el.parentElement.dataset.index); // removing from the list.
        myLibrary.splice(arrIndex, 1);
    }
    console.log(el.parentElement);
}

// Handle Storage
function getBooksFromLocalStorage() {
    let books;
    if (localStorage.getItem("books") === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
}

function addBookToLocalStorage(book) {
    const books = getBooksFromLocalStorage();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
}

function removeBookFromLocalStorage(name) {
    const books = getBooksFromLocalStorage();
    books.forEach((book, index) => {
        if (book.name === name) {
            books.splice(index, 1);
        }
    });
    localStorage.setItem("books", JSON.stringify(books));
}

// Event: adding the book to the array on clicking the submit btn.
submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent actual submit
    addBookToLibrary(); // adding book to the list and to the page also.

    // Popup message showing user that book has been added to reading list
    alert(
        "Congrats 🎉, Your book has been added to the Reading list, Do check out 👍"
    );
    clearFields(); // clearing the fields once the form is filled.
});

// Event: display the books
document.addEventListener("DOMContentLoaded", showBooks);

// Event: remove the book from the list
readingList.addEventListener("click", (event) => {
    // remove a book from the page and list
    removeBook(event.target);

    // Popup message showing user that book has been removed from reading list
    alert("Your book has been removed from reading list");

    console.log(event.target.parentElement.children[0].textContent);
    // remove the book from the local storage
    removeBookFromLocalStorage(
        event.target.parentElement.children[0].textContent
    );
});

// Event: add the suggested book to the reading list
addBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        addSuggestionBookToLibrary(e);
    });
});