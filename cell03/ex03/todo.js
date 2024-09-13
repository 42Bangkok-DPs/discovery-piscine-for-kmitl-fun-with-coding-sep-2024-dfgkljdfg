
function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function loadTodos() {
    const savedTodos = getCookie('todos');
    if (savedTodos) {
        const todos = JSON.parse(savedTodos);
        todos.reverse();
        todos.forEach(todo => addTodoToDOM(todo));
    }
}



function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        todos.push(item.innerText);
    });
    setCookie('todos', JSON.stringify(todos), 7);
}


function addTodoToDOM(text) {
    const ftList = document.getElementById('ft_list');
    const newTodo = document.createElement('div');
    newTodo.className = 'todo-item';
    newTodo.innerText = text;

    newTodo.addEventListener('click', function () {
        const confirmDelete = confirm("Do you really want to remove this item?");
        if (confirmDelete) {
            ftList.removeChild(newTodo);
            saveTodos();
        }
    });
    ftList.prepend(newTodo);
}



function createNewTodo() {
    const newTodoText = prompt("Enter a new to-do item:");
    if (newTodoText) {
        addTodoToDOM(newTodoText);
        saveTodos();
    }
}


document.getElementById('new-button').addEventListener('click', createNewTodo);


window.onload = function () {
    loadTodos();
};
