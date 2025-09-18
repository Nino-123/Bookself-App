
const STORAGE_KEY = 'BOOKSHELF_APPS_BOOKS';

function getAllBooks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function setAllBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function generateBookId() {
  return Date.now();
}

let editingBookId = null;

function createBookElement(book) {
  const container = document.createElement('div');
  container.setAttribute('data-bookid', book.id);
  container.setAttribute('data-testid', 'bookItem');

  const title = document.createElement('h3');
  title.setAttribute('data-testid', 'bookItemTitle');
  title.textContent = book.title;

  const author = document.createElement('p');
  author.setAttribute('data-testid', 'bookItemAuthor');
  author.textContent = `Penulis: ${book.author}`;

  const year = document.createElement('p');
  year.setAttribute('data-testid', 'bookItemYear');
  year.textContent = `Tahun: ${book.year}`;

  const actionDiv = document.createElement('div');

  const toggleBtn = document.createElement('button');
  toggleBtn.setAttribute('data-testid', 'bookItemIsCompleteButton');
  toggleBtn.textContent = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
  toggleBtn.addEventListener('click', () => toggleBookStatus(book.id));

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('data-testid', 'bookItemDeleteButton');
  deleteBtn.textContent = 'Hapus Buku';
  deleteBtn.addEventListener('click', () => deleteBook(book.id));

  const editBtn = document.createElement('button');
  editBtn.setAttribute('data-testid', 'bookItemEditButton');
  editBtn.textContent = 'Edit Buku';
  editBtn.addEventListener('click', () => startEditBook(book.id));

  actionDiv.append(toggleBtn, deleteBtn, editBtn);
  container.append(title, author, year, actionDiv);
  return container;
}

function renderBooks(filterTitle = '') {
  let books = getAllBooks();
  if (filterTitle) {
    const search = filterTitle.trim().toLowerCase();
    books = books.filter(book => book.title.toLowerCase().includes(search));
  }
  const incompleteList = document.getElementById('incompleteBookList');
  const completeList = document.getElementById('completeBookList');
  incompleteList.innerHTML = '';
  completeList.innerHTML = '';
  books.forEach(book => {
    const el = createBookElement(book);
    if (book.isComplete) {
      completeList.appendChild(el);
    } else {
      incompleteList.appendChild(el);
    }
  });
}
function handleSearch(e) {
  e.preventDefault();
  const searchValue = document.querySelector('[data-testid="searchBookFormTitleInput"]').value;
  renderBooks(searchValue);
}

function handleBookFormSubmit(e) {
  e.preventDefault();
  const title = document.querySelector('[data-testid="bookFormTitleInput"]').value.trim();
  const author = document.querySelector('[data-testid="bookFormAuthorInput"]').value.trim();
  const year = parseInt(document.querySelector('[data-testid="bookFormYearInput"]').value, 10);
  const isComplete = document.querySelector('[data-testid="bookFormIsCompleteCheckbox"]').checked;
  if (!title || !author || isNaN(year)) return;

  let books = getAllBooks();
  if (editingBookId) {
    books = books.map(book =>
      book.id == editingBookId
        ? { ...book, title, author, year, isComplete }
        : book
    );
    editingBookId = null;
  document.querySelector('[data-testid="bookFormSubmitButton"]').innerHTML = 'Masukkan Buku ke rak <span>Belum selesai dibaca</span>';
  } else {
    const newBook = {
      id: generateBookId(),
      title,
      author,
      year,
      isComplete
    };
    books.push(newBook);
  }
  setAllBooks(books);
  renderBooks();
  e.target.reset();
}

function startEditBook(id) {
  const books = getAllBooks();
  const book = books.find(b => b.id == id);
  if (!book) return;
  document.querySelector('[data-testid="bookFormTitleInput"]').value = book.title;
  document.querySelector('[data-testid="bookFormAuthorInput"]').value = book.author;
  document.querySelector('[data-testid="bookFormYearInput"]').value = book.year;
  document.querySelector('[data-testid="bookFormIsCompleteCheckbox"]').checked = book.isComplete;
  editingBookId = id;
  document.querySelector('[data-testid="bookFormSubmitButton"]').innerHTML = 'Simpan Perubahan';
}

function toggleBookStatus(id) {
  const books = getAllBooks();
  const idx = books.findIndex(b => b.id == id);
  if (idx !== -1) {
    books[idx].isComplete = !books[idx].isComplete;
    setAllBooks(books);
    renderBooks();
  }
}

function deleteBook(id) {
  let books = getAllBooks();
  books = books.filter(b => b.id != id);
  setAllBooks(books);
  renderBooks();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('[data-testid="bookForm"]').addEventListener('submit', handleBookFormSubmit);
  document.querySelector('[data-testid="searchBookForm"]').addEventListener('submit', handleSearch);
  renderBooks();
});
