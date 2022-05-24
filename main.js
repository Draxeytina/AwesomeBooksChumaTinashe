import Book from './Book.js';

window.addEventListener('DOMContentLoaded', () => {
  const bookSection = document.querySelector('.book-list');
  const bookTitle = document.getElementById('title');
  const bookAuthor = document.getElementById('author');
  const form = document.querySelector('.add-new');
  class Library {
    constructor() {
      this.library = JSON.parse(localStorage.getItem('bookCollection')) || [];
    }

    addBook(bookTitle, bookAuthor) {
      const selectedBook = new Book(bookTitle.value, bookAuthor.value);
      this.library.push(selectedBook);
      this.createBook();
    }

    createBook() {
      bookSection.innerHTML = '';
      const bookListHeader = document.createElement('h2');
      const bookTable = document.createElement('table');
      bookListHeader.textContent = 'All awesome books';
      bookSection.appendChild(bookListHeader);
      bookSection.appendChild(bookTable);

      for (let i = 0; i < this.library.length; i += 1) {
        const bookContainer = document.createElement('tr');
        const bookInfo = document.createElement('h2');
        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'deletebtn');
        deleteBtn.setAttribute('data', i);

        bookInfo.textContent = `"${this.library[i].title}" authored by ${this.library[i].author}`;
        deleteBtn.textContent = 'Remove';
        bookContainer.appendChild(bookInfo);
        bookContainer.appendChild(deleteBtn);
        bookTable.appendChild(bookContainer);
      }
      this.deleteBook();
    }

    deleteBook() {
      [...document.querySelectorAll('.deletebtn')].forEach((element) => {
        const elementIndex = parseInt(element.getAttribute('data'), 10);
        element.addEventListener('click', () => {
          this.library.splice(elementIndex, 1);
          localStorage.setItem('bookCollection', JSON.stringify(this.library));
          this.createBook();
        });
      });
    }
  }

  const myLibrary = new Library();

  myLibrary.createBook();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (bookTitle.value === '' || bookAuthor.value === '') {
      return;
    }
    myLibrary.addBook(bookTitle, bookAuthor);
    localStorage.setItem('bookCollection', JSON.stringify(myLibrary.library));
    bookTitle.value = '';
    bookAuthor.value = '';
  });
});
