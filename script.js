const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when the page loads
window.addEventListener('DOMContentLoaded', loadTasks);

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskValue = taskInput.value.trim();
    if (taskValue === '') {
        alert('Please enter a task!');
        return;
    }

    const listItem = createTaskElement(taskValue);
    taskList.appendChild(listItem);

    saveTasksToLocalStorage();
    taskInput.value = '';
}

function removeTask(button) {
    const listItem = button.parentElement;
    taskList.removeChild(listItem);
    saveTasksToLocalStorage();
}

function toggleTaskCompletion(checkbox) {
    const taskText = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskText.style.textDecoration = 'line-through';
        taskText.style.color = '#aaa';
    } else {
        taskText.style.textDecoration = 'none';
        taskText.style.color = '#333';
    }
    saveTasksToLocalStorage();
}

function createTaskElement(taskValue, isCompleted = false) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <input type="checkbox" class="checkbox" onclick="toggleTaskCompletion(this)" ${
            isCompleted ? 'checked' : ''
        }>
        <span style="text-decoration: ${isCompleted ? 'line-through' : 'none'}; color: ${
        isCompleted ? '#aaa' : '#333'
    };">${taskValue}</span>
        <button onclick="removeTask(this)">Delete</button>
    `;
    return listItem;
}

function saveTasksToLocalStorage() {
    const tasks = [];
    const listItems = taskList.querySelectorAll('li');
    listItems.forEach(item => {
        const checkbox = item.querySelector('.checkbox');
        const taskText = item.querySelector('span').innerText;
        tasks.push({ text: taskText, completed: checkbox.checked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const listItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(listItem);
    });
}
