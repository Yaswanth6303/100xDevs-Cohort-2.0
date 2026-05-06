let globalId = 1;
let todoState = [];
let oldTodoState = [];

// Render a new todo into DOM
function renderTodo(todo) {
  const todos = document.getElementById("container");
  const newTodo = document.createElement("div");
  newTodo.id = todo.id;

  const title = document.createElement("h3");
  title.innerText = todo.title;

  const description = document.createElement("p");
  description.innerText = todo.description;

  newTodo.appendChild(title);
  newTodo.appendChild(description);

  todos.appendChild(newTodo);
}

// Remove todo from DOM
function removeTodo(todo) {
  const element = document.getElementById(todo.id);
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

// Update todo in DOM
function updateTodo(oldTodo, newTodo) {
  const element = document.getElementById(oldTodo.id);
  if (element) {
    element.children[0].innerText = newTodo.title;
    element.children[1].innerText = newTodo.description;
  }
}

// Update state using 2-pointer diffing
function updateState(newTodos) {
  // sort by id for consistency
  oldTodoState.sort((a, b) => a.id - b.id);
  newTodos.sort((a, b) => a.id - b.id);

  let i = 0; // pointer for old
  let j = 0; // pointer for new

  while (i < oldTodoState.length && j < newTodos.length) {
    const oldTodo = oldTodoState[i];
    const newTodo = newTodos[j];

    if (oldTodo.id === newTodo.id) {
      // check if updated
      if (
        oldTodo.title !== newTodo.title ||
        oldTodo.description !== newTodo.description
      ) {
        updateTodo(oldTodo, newTodo);
      }
      i++;
      j++;
    } else if (oldTodo.id < newTodo.id) {
      // deleted
      removeTodo(oldTodo);
      i++;
    } else {
      // added
      renderTodo(newTodo);
      j++;
    }
  }

  // Remaining oldTodos → deleted
  while (i < oldTodoState.length) {
    removeTodo(oldTodoState[i]);
    i++;
  }

  // Remaining newTodos → added
  while (j < newTodos.length) {
    renderTodo(newTodos[j]);
    j++;
  }

  // update reference
  oldTodoState = [...newTodos];
}

// Add new todo
function addTodo() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  if (!title || !description) {
    alert("Add both Title & Description");
    return;
  }

  todoState.push({
    title: title,
    description: description,
    id: globalId++,
  });

  // Clear inputs
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  updateState(todoState);
}
