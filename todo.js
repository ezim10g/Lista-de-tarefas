//Variáveis
let todoItems = []
const todoInput = document.querySelector('.todo-input')
const completedTodosDiv = document.querySelector('.completed-todos')
const uncompletedTodosDiv = document.querySelector('.uncompleted-todos')
const audio = new Audio('sound.mp3')

// Obtém lista ao primeiro boot
window.onload = () =>{
    let storageTodoItems = localStorage.getItem('todoItems')
    if(storageTodoItems !== null){
        todoItems = JSON.parse(storageTodoItems)
    }
    render()

}


// Get the content type into the input
todoInput.onkeyup = ((e) => {
    let value = e.target.value.replace(/^\s+/,"")
    if(value && e.keyCode === 13) {// Enter
        addTodo(value)

        todoInput.value = ''
        todoInput.focus()
       
    }
})

// Add new todo
function addTodo(text){
    todoItems.push({
    
        id:Date.now(), text, completed:false
        
    })

   saveAndRender()
   
}

//Remove todo
function removeTodo(id){
    todoItems = todoItems.filter(todo => todo.id !== Number(id))
    saveAndRender()
}

//Mark as complete
function markAsCompleted(id){
    todoItems = todoItems.filter(todo =>{
        if(todo.id === Number(id)){
            todo.completed = true
        }

    return todo
       
    })
    audio.play()
    saveAndRender()
}

//Mark as uncompleted
function markAsUncompleted(id){
    todoItems = todoItems.filter(todo =>{
        if(todo.id === Number(id)){
            todo.completed = false
        }

    return todo
        
    })
    saveAndRender()
}

//Save in local Storage
function save(){
    localStorage.setItem('todoItems', JSON.stringify(todoItems))
}

//Render
function render(){
    let uncompletedTodos = todoItems.filter(item => !item.completed)
    let completedTodos = todoItems.filter(item => item.completed)

    completedTodosDiv.innerHTML = ''
    uncompletedTodosDiv.innerHTML = ''

    

    if(uncompletedTodos.length > 0){
      uncompletedTodos.forEach(todo => { uncompletedTodosDiv.append(createTodoElement(todo)) })
      
    }else{
        uncompletedTodosDiv.innerHTML = `<div class='empty'>Todas tarefas foram executadas 🏁</div`
    }

    if(completedTodos.length > 0){
        completedTodosDiv.innerHTML = `<div class='completed-title'>Completo (${completedTodos.length} / ${todoItems.length})</div>`
        completedTodos.forEach(todo =>{ completedTodosDiv.append(createTodoElement(todo)) })
    
       
    }

    
}


//Save and render
function saveAndRender(){
    save()
    render()
}

//Create todo list item
function createTodoElement(todo){
    //create todo liste container
    const todoDiv = document.createElement('div')
    todoDiv.setAttribute('data-id',todo.id)
    todoDiv.className = 'todo-item'

    //create todo item text
    const todoTextSpan = document.createElement('span')
    todoTextSpan.innerHTML = todo.text

    //check box for list
    const todoInputCheckBox = document.createElement('input')
    todoInputCheckBox.type = 'checkbox'
    todoInputCheckBox.checked = todo.completed
    todoInputCheckBox.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        e.target.checked ? markAsCompleted(id) : markAsUncompleted(id)
    }

    //Delete button for list
    const todoRemoveBtn =  document.createElement('a')
    todoRemoveBtn.href = '#'
    todoRemoveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`
    todoRemoveBtn.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        removeTodo(id)
    }

    todoTextSpan.prepend(todoInputCheckBox)
    todoDiv.appendChild(todoTextSpan)
    todoDiv.appendChild(todoRemoveBtn)

    return todoDiv
}






