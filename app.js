const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

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
        todo.addEventListener('transitioned',function(){
            todo.remove()
        })
    }

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }


}

function filterTodo(event){

    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }
                else{
                    todo.style.display = "none"
                }
                break
            case "uncompleted":
                console.log(event.target.value)
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }
                else{
                    todo.style.display = "none"
                }
                break

        }
    })
}

function saveLocalTodos(todo){
    let todos;

}