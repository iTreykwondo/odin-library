const mainContainer = document.querySelector(".main");
const form = document.querySelector(".form");

let myLibrary = [];
let book;

function Book(title, author, pageCount, readStatus) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.readStatus = readStatus;
}

function addToLibrary(book) {
  let titleInput = document.querySelector("#title");
  let authorInput = document.querySelector("#author");
  let pageInput = document.querySelector("#pages");
  let checkbox = document.querySelector("#checkbox");

  book = new Book(
    titleInput.value,
    authorInput.value,
    pageInput.value,
    checkbox.checked
  );
  myLibrary.push(book);
  createBookCard(book);
}

function createBookCard(book) {
  let div = document.createElement("div");
  let closeButton = document.createElement("img");
  let title = document.createElement("h3");
  let author = document.createElement("h3");
  let pageCount = document.createElement("p");
  let readStatus = document.createElement("button");

  myLibrary.forEach((book) => {
    title.textContent = book.title;
    author.textContent = book.author;
    pageCount.textContent = book.pageCount;
    readStatus.textContent = `Read Status: ${
      book.readStatus ? "Read" : "Not Read"
    }`;

    div.classList.add("card");
    closeButton.src = "./img/close-icon.png";
    closeButton.classList.add("close");
    readStatus.classList.add("status-btn");

    div.appendChild(closeButton);
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pageCount);
    div.appendChild(readStatus);

    mainContainer.appendChild(div);
  });

  closeButton.addEventListener("click", (e) => {
    let index = Array.from(div.parentNode.children).indexOf(div);
    myLibrary.splice(index, 1);
    div.parentNode.removeChild(div);
    console.log(index);
  });

  readStatus.addEventListener("click", () => {
    let index = Array.from(div.parentNode.children).indexOf(div);
    readStatus.textContent = `Read Status: ${
      !book.readStatus ? "Read" : "Not Read"
    }`;
    myLibrary[index].toggleReadStatus();
  });

  return book;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addToLibrary();
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
  let checkbox = document.querySelector("#checkbox");
  checkbox.checked = false;
});
