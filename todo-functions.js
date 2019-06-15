//Read and parse the data when the app starts up
const getSavedTodos=function(){
    const storedTodosJSON=localStorage.getItem('todos');
    if(JSON.parse(storedTodosJSON)!==null){
        return JSON.parse(storedTodosJSON)
    }else{
        return []
    }
}

//Get the DOM elements for the list summary
const generateSummaryDOM=function(incompleteTodos){
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todos').appendChild(summary)
}

//Save todos to LocalStorage
const saveTodos=function(todos){
    localStorage.setItem('todos',JSON.stringify(todos));
}

//remove todo
const removeTodo=function(todoID){
    let id=todos.findIndex(function(todo){
        return todoID=todo.id;
    })
 
    if(id>-1){
        todos.splice(id,1)
    }
    
}

//toggle TODO
const toggleTODO=function(todoID){
    let todo=todos.findIndex(function(todoIndex){
        return todoID==todoIndex.id;
    })

    if(todo>-1){
        todos[todo].completed=!todos[todo].completed;
    }
}

//generate DOM elements for an individual note
const generateTodoDOM=function(todo){  
    let eachTodo=document.createElement('div');

    //generate check box
    let checkBox=document.createElement('input');
    checkBox.type="checkbox";
    if(todo.completed){
        checkBox.checked=true;
    }
    eachTodo.appendChild(checkBox);    
    checkBox.addEventListener('change',function(e){
        toggleTODO(todo.id);
        saveTodos(todos);
        renderTodos(todos,filters);
    })

    //genrate text element
    let p = document.createElement('span')
    p.textContent = todo.text
    eachTodo.appendChild(p)

      //generate remove button
      let removeButton=document.createElement('button');
      removeButton.textContent='x';
      eachTodo.appendChild(removeButton);   
      removeButton.addEventListener('click',function(e){
          console.log(todo.id);
          removeTodo(todo.id);
          renderTodos(todos,filters);
      }) 

    return eachTodo;
}
       

//Render application todos based on filters
const renderTodos = function (todos, filters) {
    
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''

    generateSummaryDOM(incompleteTodos);

   
    filteredTodos.forEach(function (todo) {       
        const todoElement=generateTodoDOM(todo);
        document.querySelector('#todos').appendChild(todoElement);        
    })
}

