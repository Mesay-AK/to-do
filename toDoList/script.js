const theform = document.getElementById('theform');
const theinput = document.getElementById('theinput');
const mylist = document.getElementById('mylist');


function todo() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(todos => {
            todos.forEach(todo => {
                addinglist(todo);
            });
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });
}


function addinglist(todo) {
    const li = document.createElement('li');
    li.textContent = todo.title;
    if (todo.completed) {
        li.classList.add('completed');
    }
    mylist.appendChild(li);
    var img = document.createElement("img");
    img.src = "images/delete.png";
    img.setAttribute('id', 'deleteTask');
    li.appendChild(img);
}

function submits(event) {
    event.preventDefault();

    const todoTitle = theinput.value.trim();
    if (todoTitle === '') {
        return;
    }

    const todo = {
        title: todoTitle,
        completed: false
    };


    fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
        .then(response => response.json())
        .then(newTodo => {
            addinglist(newTodo);
            theinput.value = '';
        })
        .catch(error => {
            console.error('Error adding todo:', error);
        });
}


function init() {
    todo();
    theform.addEventListener('submit', submits);
}

init();
mylist.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.id === "deleteTask") {
        e.target.parentElement.remove();
    }
}, false);