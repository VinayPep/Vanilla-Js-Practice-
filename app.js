const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

document.addEventListener('DOMContentLoaded', getTodo)
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck)
filterOption.addEventListener('click',filterTodo)

function addTodo(event){
    event.preventDefault()
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo")

    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    //ADD TODO TO LOCAL STORGE
    saveLocalTodos(todoInput.value)
    const completeButton = document.createElement('button')
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add("complete-btn")
    todoDiv.appendChild(completeButton)

    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)

    //clear todoInput value
    todoInput.value = ""

}

function deleteCheck (event){
    const item = event.target
    if(item.classList[0]==='trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall")
        removeTodo(todo)
        todo.addEventListener('transitioned',function(){
            todo.remove()
        })
    }

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }


}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        const mStyle = todo.style;
        if(mStyle != undefined && mStyle != null){
            switch (e.target.value) {
                case "all":
                    mStyle.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (todo.classList.contains('completed')){
                        mStyle.display = 'none';
                    }
                    else{
                        mStyle.display = "flex";
                    }
                    break;
            }
        }
    })
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))


}

function getTodo(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo")

    const newTodo = document.createElement('li')
    newTodo.innerText = todo
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    const completeButton = document.createElement('button')
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add("complete-btn")
    todoDiv.appendChild(completeButton)

    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)


    })

}

function removeTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos",JSON.stringify(todos))

}