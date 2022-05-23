class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

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
      for (let i = 0; i < this.library.length; i += 1) {
        const bookContainer = document.createElement('div');
        const title = document.createElement('p');
        const author = document.createElement('p')
        const deleteBtn = document.createElement('button');
        const divLine = document.createElement('hr')
        deleteBtn.setAttribute('class', 'deletebtn');
        deleteBtn.setAttribute('data', i);

        title.textContent = this.library[i].title;
        author.textContent = this.library[i].author;
        deleteBtn.textContent = 'Remove';

        bookContainer.appendChild(title);
        bookContainer.appendChild(author);
        bookContainer.appendChild(deleteBtn);
        bookContainer.appendChild(divLine)
        bookSection.appendChild(bookContainer);
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