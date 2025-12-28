const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// --- 1. LOAD SAVED TASKS WHEN PAGE OPENS ---
window.onload = function() {
    const savedTasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    savedTasks.forEach(taskText => {
        createTaskElement(taskText);
    });
};

// --- 2. THE ADD BUTTON LOGIC ---
addBtn.addEventListener('click', function() {
    const text = taskInput.value;
    if (text.trim() === "") return;

    createTaskElement(text);
    saveAllTasks(); // Save to memory
    taskInput.value = "";
});

// --- 3. HELPER FUNCTION TO CREATE THE TASK ---
function createTaskElement(text) {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Delete</button>
    `;

    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
        saveAllTasks(); // Save to memory after deleting
    });

    taskList.appendChild(li);
}

// --- 4. THE SAVING ENGINE ---
function saveAllTasks() {
    const allTasks = [];
    // Find every task currently on the screen and put its text in an array
    document.querySelectorAll('.task-item span').forEach(span => {
        allTasks.push(span.innerText);
    });
    // Store that array in the browser's localStorage
    localStorage.setItem('myTasks', JSON.stringify(allTasks));
}