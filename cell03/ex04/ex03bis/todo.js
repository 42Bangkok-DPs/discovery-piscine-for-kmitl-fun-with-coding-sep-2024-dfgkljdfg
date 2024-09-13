function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
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
    $('.todo-item').each(function () {
        todos.push($(this).text());
    });
    setCookie('todos', JSON.stringify(todos), 7);
}

function addTodoToDOM(text) {
    const $newTodo = $('<div>', { class: 'todo-item', text: text });
    $newTodo.on('click', function () {
        if (confirm("Do you really want to remove this item?")) {
            $(this).remove();
            saveTodos();
        }
    });
    $('#ft_list').prepend($newTodo);
}

function createNewTodo() {
    const newTodoText = prompt("Enter a new to-do item:");
    if (newTodoText) {
        addTodoToDOM(newTodoText);
        saveTodos();
    }
}

$(document).ready(function () {
    $('#new-button').on('click', createNewTodo);
    loadTodos();
});