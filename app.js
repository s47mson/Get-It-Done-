// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Fuctions
function addTodo(event){
  // Prevent form from submitting
  event.preventDefault();

  // todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // Add todo to local Storage
  saveLocalTodos(todoInput.value);

  // CheckMark Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Check Trash Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Append to list
  todoList.appendChild(todoDiv);

  // clear todo input value
  todoInput.value = '';
}

function deleteCheck(e){
  // console.log(e.target); //This is to check what we are clicking on in Developer tools in the browser.
  const item = e.target;
  // delete TODO
  if(item.classList[0] === 'trash-btn'){
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function(){
      todo.remove();
    });
  }

  // Check Mark
  if(item.classList[0] === 'complete-btn'){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e){
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
        todo.style.display = 'flex';
        break;

      case "completed":
        if(todo.classList.contains("completed")){
          todo.style.display = 'flex';
        }
        else{
          todo.style.display = "none";
        }
        break;

      case "incompleted":
        if(!todo.classList.contains("completed")){
          todo.style.display = 'flex';
        }
        else{
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo){
  let todos;
  // Check if something is already there in the list.
  if (localStorage.getItem("todos") == null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
  let todos;
  // Check if something is already there in the list.
  if (localStorage.getItem("todos") === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function(todo){
    // Repeated Code
    // todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // CheckMark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo){
  let todos;
  // Check if something is already there in the list.
  if (localStorage.getItem("todos") === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// At the end of project we still have an issue.
// If something is stored and checked and then page is refreshed it's gonna comeback again intact as incompleted task.
// Can do that by making a separate local storage of completed items.
