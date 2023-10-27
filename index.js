let myTodo = JSON.parse(localStorage.getItem('myTodo2')) || [];
// need to add
const listToDo = document.querySelector('.list-todo');
const inputToDo = document.querySelector('.input-todo-submit');
// create new todo
const formControl = document.querySelector('.todo-list-form');
formControl.addEventListener('submit', function (event) {
    // event.preventDefault();
    let todo = formControl.elements.inputToDo.value;
    if (!todo) {
        event.preventDefault();
        return alert('Empty todo!')
    }
    const newTodo = { id: myTodo.length + 1, todo, checked: false };
    myTodo.push(newTodo);

    localStorage.setItem('myTodo2', JSON.stringify(myTodo));
})

const displayTodo = () => {
    for (let i = 0; i < myTodo.length; i++) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('list-todo-item');
        let checkdTodo = '';
        if (myTodo[i].checked === true) {
            checkdTodo = 'done'
        }
        todoItem.innerHTML = `
                <div class="row">
                    <div class="col-8">
                        <span class="todo ${checkdTodo}">${myTodo[i].todo}</span>
                    </div>
                    <div class="col-4">
                        <button class="list-todo-btn green" onclick="checkedItem(this, ${myTodo[i].id})">
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button class="list-todo-btn red" onclick="deleteItem(this, ${myTodo[i].id})">
                            <i class="fa-solid fa-x"></i>
                        </button>
                    </div>
                </div>
            `;
        listToDo.appendChild(todoItem);
    }
}
displayTodo();

// checked Item
const checkedItem = (button, id) => {
    // function find migration to myTodo so this will change real value of myTodo
    const myItem = myTodo.find(todo => todo.id === id);
    if (myItem) {
        myItem.checked = true;
        // need to setItem again to update localStorage with change
        localStorage.setItem('myTodo2', JSON.stringify(myTodo));
    }

    const todoItem = button.closest('.list-todo-item');
    // focus , I use todoItem to make query
    const classTodo = todoItem.querySelector('.todo');
    classTodo.classList.add('done');
}


// delete item
// onclick with function have parameter = this, itsefl element!
const deleteItem = (button, id) => {
    // button = that element button
    const todoItem = button.closest('.list-todo-item');
    if (todoItem) {
        todoItem.remove();
    }

    myTodo = myTodo.filter(todo => todo.id !== id);

    // Lưu danh sách công việc mới sau khi xóa vào Local Storage
    localStorage.setItem('myTodo2', JSON.stringify(myTodo));
}