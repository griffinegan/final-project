const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskValue = taskInput.value.trim();
    if (taskValue === '') {
        alert('Please enter a task!');
        return;
    }

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <input type="checkbox" class="checkbox" onclick="toggleTaskCompletion(this)">
        <span>${taskValue}</span>
        <button onclick="removeTask(this)">Delete</button>
    `;
    taskList.appendChild(listItem);
    taskInput.value = '';
}

function removeTask(button) {
    const listItem = button.parentElement;
    taskList.removeChild(listItem);
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
}
