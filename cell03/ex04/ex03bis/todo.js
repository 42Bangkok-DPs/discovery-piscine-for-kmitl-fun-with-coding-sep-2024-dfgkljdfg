document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('ft_list');
    const newButton = document.getElementById('new-button');


    function createTodoItem(text) {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        todoItem.textContent = text;
        todoItem.onclick = () => {
            if (confirm('Do you want to remove this task?')) {
                todoItem.remove();
                saveToDoList();
            }
        };
        return todoItem;
    }

    function loadToDoList() {
        const cookieName = 'todoList';
        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
            const [name, value] = cookie.split('=');
            acc[name] = value;
            return acc;
        }, {});
        
        const todoList = cookies[cookieName] ? JSON.parse(decodeURIComponent(cookies[cookieName])) : [];
        todoList.forEach(todo => {
            listContainer.appendChild(createTodoItem(todo));
        });
    }


    function saveToDoList() {
        const todoList = Array.from(listContainer.children).map(child => child.textContent);
        document.cookie = `todoList=${encodeURIComponent(JSON.stringify(todoList))}; path=/;`;
    }


    newButton.onclick = () => {
        const newTodo = prompt('Enter a new task::');
        if (newTodo && newTodo.trim() !== '') {
            const todoItem = createTodoItem(newTodo.trim());
            listContainer.insertBefore(todoItem, listContainer.firstChild);
            saveToDoList();
        }
    };

    loadToDoList();
});
