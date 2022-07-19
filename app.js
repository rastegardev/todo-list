const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// click event for input button
todoButton.addEventListener("click", addTodo);
// delete and complete todo
todoList.addEventListener("click", deleteAndCompleteTodo);
// filter todo => All - Completed - Uncompleted
filterOption.addEventListener("click", filterTodo);
// add event to HTML Document - get local todo
document.addEventListener("DOMContentLoaded", getLocalTodo);

function addTodo(event) {
  // Cancel the default of the browser
  event.preventDefault();

  // Creat div element for li of list
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Creat li element for new todo
  const newTodoItem = document.createElement("li");
  newTodoItem.innerText = todoInput.value;

  //save local storage todo - saveLocalTodo()
  saveLocalTodo(todoInput.value);

  // add class name for todo li and appendChild li to parent div
  newTodoItem.classList.add("todo-item");
  todoDiv.appendChild(newTodoItem);

  // when clicked on input button remove the old text on input
  todoInput.value = "";

  // Creat completed button for todo item - li
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Creat trash button button for todo item - li
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // show new todo item on page
  todoList.appendChild(todoDiv);
}

// delete and complete todo - function
function deleteAndCompleteTodo(event) {
  const item = event.target;
  // console.log(item.parentElement);

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.remove();

    removeLocalTodo(todo);
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// filter todo
function filterTodo(event) {
  const allTodo = todoList.childNodes;

  allTodo.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}

//save local storage todo
function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//delete local storage todo
function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// get local storage todo
function getLocalTodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // Creat div element for li of list
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Creat li element for new todo
    const newTodoItem = document.createElement("li");
    newTodoItem.innerText = todo;

    // add class name for todo li and appendChild li to parent div
    newTodoItem.classList.add("todo-item");
    todoDiv.appendChild(newTodoItem);

    // Creat completed button for todo item - li
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Creat trash button button for todo item - li
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // show new todo item on page
    todoList.appendChild(todoDiv);
  });
}
