document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('tasks__form');
    const taskInput = document.getElementById('task__input');
    const taskList = document.getElementById('tasks__list');
  
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskTitle => addTask(taskTitle));
  
    taskForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const taskTitle = taskInput.value.trim();
      if (taskTitle !== '') {
        addTask(taskTitle);
        taskInput.value = '';
        saveTasks();
      }
    });
  
    function addTask(title) {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');
  
      const taskTitleDiv = document.createElement('div');
      taskTitleDiv.classList.add('task__title');
      taskTitleDiv.innerText = title;
  
      const removeButton = document.createElement('a');
      removeButton.href = '#';
      removeButton.classList.add('task__remove');
      removeButton.innerHTML = '&times;';
  
      removeButton.addEventListener('click', function () {
        taskDiv.remove();
        saveTasks();
      });
  
      taskDiv.appendChild(taskTitleDiv);
      taskDiv.appendChild(removeButton);
      taskList.appendChild(taskDiv);
    }
  
    function saveTasks() {
      const tasks = Array.from(document.querySelectorAll('.task__title')).map(task => task.innerText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
  