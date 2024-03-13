// add button
let addButton = document.querySelector('.add');
addButton.addEventListener('click',function() {
    let taskInput = document.querySelector('.input');
    if(taskInput.value.trim()) {
        createTask(taskInput.value.trim());
        taskInput.value='';
        swal("Task Added", "", "success");
    }else {
        swal("Empty Task", "", "error");
    }
});

// create task
function createTask(val) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.unshift(val);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// remove task
function removeTask(index) {
    swal({
  title: "Are you sure to delete task?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
    swal("Task Deleted!", {
      icon: "success",
    });
  } else {
    swal("Unless Task Exist");
  }
});
    
}

//dispaly tasks
function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksContainer = document.querySelector('.tasks');
    if(tasks.length ==0)  {
        tasksContainer.innerHTML = 'No Tasks';
    }
    else {
        tasksContainer.innerHTML = '';
        tasks.forEach((task, index) => {
                const taskBox = document.createElement('div');
                taskBox.classList.add('task-box');
                taskBox.innerHTML = `
                    <h3>${task}</h3>
                    <button onclick="removeTask(${index})">Delete</button>
                `;
                tasksContainer.appendChild(taskBox);
            }
        );
    }
}

displayTasks();

