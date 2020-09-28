const addToDo = (e) => {
  e.preventDefault();
  // get form input
  const formInput = document.getElementById("item");

  const newToDo = formInput.value;

  // get todo list
  const todoList = document.getElementById("items");

  const newItem = document.createElement("li");
  newItem.className = "list-group-item undone";

  newItem.textContent = newToDo;

  // add del button
  const delButton = document.createElement("button");
  delButton.className = "btn btn-danger btn-sm float-right delete";

  // add delete icon
  const delIcon = document.createElement("i");
  delIcon.className = "fas fa-trash";

  // add toggle button
  const toggleButton = document.createElement("button");
  toggleButton.className = "btn btn-success btn-sm float-right toggle mr-4";

  // add toggle icon
  const toggleIcon = document.createElement("i");
  toggleIcon.className = "far fa-check-circle";

  delButton.appendChild(delIcon);
  toggleButton.appendChild(toggleIcon);

  newItem.appendChild(delButton);
  newItem.appendChild(toggleButton);
  todoList.appendChild(newItem);

  // reset input
  formInput.value = "";
};

// get form and listen to submit event
const form = document.getElementById("addForm");
form.addEventListener("submit", addToDo);

// get all delete buttons and listen to click

const removeItem = (e) => {
  const btn = e.target.classList;
  if (btn.contains("delete") || btn.contains("fa-trash")) {
    if (confirm("Are you sure?")) {
      const li = e.target.parentElement;

      if (btn.contains("fa-trash")) {
        const parentli = li.parentElement;
        return parentli.remove();
      }
      li.remove();
    }
  }

  // toggle todostate

  if (btn.contains("toggle")) {
    const icon = e.target.children[0];

    icon.classList.toggle("fa-check-circle");
    icon.classList.toggle("fa-times-circle");

    const li = e.target.parentElement;
    li.classList.toggle("undone");
    li.classList.toggle("done");

    e.target.classList.toggle("btn-danger");
    e.target.classList.toggle("btn-success");
  }

  if (btn.contains("far")) {
    btn.toggle("fa-check-circle");
    btn.toggle("fa-times-circle");
    const button = e.target.parentElement;
    button.classList.toggle("btn-danger");
    button.classList.toggle("btn-success");

    const li = button.parentElement;
    li.classList.toggle("undone");
    li.classList.toggle("done");
  }
};

const allItems = document.getElementById("items");
allItems.addEventListener("click", removeItem);

// filter items through search

const filterToDo = (e) => {
  const keyword = e.target.value.toLowerCase();
  hideList(keyword);
};

const filterInput = document.getElementById("filter");
filterInput.addEventListener("keyup", filterToDo);

// filter items through radio buttons

const handleRadioFilter = (e) => {
  const todoState = e.target.value;
  hideListRadio(todoState);
};

const radioButtons = document.querySelectorAll("#select-type button");
Array.from(radioButtons).map((btn) =>
  btn.addEventListener("click", handleRadioFilter)
);

function hideList(keyword) {
  const allList = document.querySelectorAll("li");
  Array.from(allList).map((li) => {
    const todoTitle = li.firstChild.textContent;
    if (todoTitle.toLowerCase().includes(keyword)) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  });
}

function hideListRadio(keyword) {
  const allList = document.querySelectorAll("li");
  Array.from(allList).map((li) => {
    const allClass = Array.from(li.classList);
    if (keyword === "all") {
      return (li.style.display = "block");
    }

    if (allClass.includes(keyword)) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  });
}
