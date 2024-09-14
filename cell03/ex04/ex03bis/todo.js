$(document).ready(function() {
    const $listContainer = $('#ft_list');
    const $newButton = $('#new-button');

    function createTodoItem(text) {
        const $todoItem = $('<div>', {
            class: 'todo-item',
            text: text,
            click: function() {
                if (confirm('Do you want to remove this task?')) {
                    $(this).remove();
                    saveToDoList();
                }
            }
        });
        return $todoItem;
    }

    function loadToDoList() {
        const cookieName = 'todoList';
        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
            const [name, value] = cookie.split('=');
            acc[name] = value;
            return acc;
        }, {});
        
        const todoList = cookies[cookieName] ? JSON.parse(decodeURIComponent(cookies[cookieName])) : [];
        $.each(todoList, function(_, todo) {
            $listContainer.append(createTodoItem(todo));
        });
    }

    function saveToDoList() {
        const todoList = $listContainer.children().map(function() {
            return $(this).text();
        }).get();
        document.cookie = `todoList=${encodeURIComponent(JSON.stringify(todoList))}; path=/;`;
    }

    $newButton.click(function() {
        const newTodo = prompt('Enter a new task:');
        if (newTodo && newTodo.trim() !== '') {
            const $todoItem = createTodoItem(newTodo.trim());
            $listContainer.prepend($todoItem);
            saveToDoList();
        }
    });

    loadToDoList();
});
