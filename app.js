

// Add ALL ELEMENT
const todo = document.getElementById('todo-input');
const addBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const search = document.getElementById('search-input');

const getSavedTask = getDataFromLocalStorage('task') != null? getDataFromLocalStorage('task') : [];
showAllTask(getSavedTask)

/// GET TASK THROUGH ENTER
todo.addEventListener('keyup', function(e){
    if(e.key == 'Enter'){
        const inputValue = todo.value;
        const task = createTodo(inputValue)
        setDataInLocalStorage(task)
        showAllTask(task)
        todo.value = '';

    }
})


// FILTER TASK 
function filterTask(key){
    const getSavedTask = getDataFromLocalStorage('task') != null? getDataFromLocalStorage('task') : [];
    const searchResult = getSavedTask.filter(task => task.task.toLowerCase().includes(key.toLowerCase()));
    showAllTask(searchResult);
}
/// SEARCH SHOW DATA
search.addEventListener('keyup', function(e){
    const value = e.target.value
    filterTask(value)
})



/// GET TASK THROUGH CLICK
addBtn.addEventListener('click', function(){
    const inputValue = todo.value;
    const task = createTodo(inputValue)
    setDataInLocalStorage(task)
    showAllTask(task)
    todo.value = '';
})


// CREATE COMPLITE TASK WITH ALL FEATURES
function createTodo(task){
    const d = new Date()
    const time = d.toLocaleDateString('en-us', {
    });
    const todoObject ={id: Math.random()*10000, task: task, startDate: time, endDate: ''};
    const prevData = getDataFromLocalStorage('task');
   
    if(prevData === null || prevData ===""){
        return [todoObject]
    } else{
        const newArray = [...prevData, todoObject]
        console.log(newArray)
        return newArray
    }
}



// GET DATA INTO LOCAL STORAGE
function getDataFromLocalStorage(data){
    const getData = localStorage.getItem(data)
    return JSON.parse(getData)
}

// SET DATA INTO LOCAL STORAGE
function setDataInLocalStorage(todo){
    const taskList = JSON.stringify(todo)
    return localStorage.setItem('task', taskList)
}


// SHOW TODO INTO DOM

function showAllTask(allTask){
    let showData = `<tr class="top-header">
                    <th class="task-icon">Status <img src="assets/check-mark.png" class="icon"  alt=""></th>
                    <th class="task">Task</th>
                    <th class="start-date">Start Date</th>
                    <th class="end-date">End Date</th>
                </tr>`;
    allTask.map(task =>{
        showData += `<tr>
        <td data-id=${task.id}>
        <input type="checkbox">
        </td>
        <td>${task.task}</td>
        <td>${task.startDate}</td>
        <td>X</td>
    </tr>`
    })
    todoList.innerHTML = showData;
}