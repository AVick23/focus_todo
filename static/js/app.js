// Списки задач для каждого раздела
const tasks = {
    today: [],
    week: [],
    scheduled: [],
    completed: [] // Новый раздел для решённых задач
};

// Текущий активный раздел
let currentSection = 'today';

// Таймер Pomodoro
let pomodoroTime = 25 * 60; // 25 минут в секундах
let timerInterval;

// Функция для переключения между разделами
function switchSection(section) {
    currentSection = section;
    
    // Обновление заголовка раздела
    document.getElementById("section-title").textContent = section === 'today' ? 'Сегодня' : 
        section === 'week' ? 'На эту неделю' : 
        section === 'scheduled' ? 'Запланированные' : 'Решённые'; // Название для "Решённые"

    // Скрыть панель ввода в разделе "Решённые"
    const taskInputPanel = document.getElementById("task-input-panel");
    if (section === 'completed') {
        taskInputPanel.style.display = 'none'; // Скрыть панель
    } else {
        taskInputPanel.style.display = 'block'; // Показать панель
    }

    renderTasks(); // Отображаем задачи для выбранного раздела
}

// Функция для добавления задачи в текущий раздел
function addTask() {
    const taskInput = document.getElementById("task-input");
    if (taskInput.value.trim() !== "") {
        tasks[currentSection].push(taskInput.value);
        taskInput.value = "";
        renderTasks();
    }
}

// Функция для удаления задачи
function deleteTask(index) {
    tasks[currentSection].splice(index, 1); // Удаляем задачу по индексу
    renderTasks(); // Перерисовываем список задач
}

// Функция для завершения задачи (перенос её в раздел решённых)
function completeTask(index) {
    const task = tasks[currentSection][index];
    tasks[currentSection].splice(index, 1); // Удаляем задачу из текущего раздела
    tasks.completed.push(task); // Добавляем задачу в раздел "Решённые"
    renderTasks(); // Перерисовываем список задач
}

// Функция для отображения задач текущего раздела
function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Очистить текущий список задач

    tasks[currentSection].forEach((task, index) => {
        const taskElement = document.createElement("p");
        taskElement.textContent = task;

        // Если это не раздел "Решённые", добавляем кнопку завершения задачи
        if (currentSection !== 'completed') {
            const completeButton = document.createElement("button");
            completeButton.textContent = "Завершить";
            completeButton.onclick = () => completeTask(index);
            taskElement.appendChild(completeButton);
        }

        // Кнопка для удаления задачи
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.onclick = () => deleteTask(index);

        // Добавляем кнопку удаления к задаче
        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);
    });
}

// Функция для запуска таймера Pomodoro
function startPomodoro() {
    const timerDisplay = document.getElementById("timer-display");

    timerInterval = setInterval(() => {
        let minutes = Math.floor(pomodoroTime / 60);
        let seconds = pomodoroTime % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (pomodoroTime > 0) {
            pomodoroTime--;
        } else {
            clearInterval(timerInterval);
            alert("Pomodoro завершен!");
        }
    }, 1000);
}

// Функция для сброса таймера Pomodoro
function resetPomodoro() {
    clearInterval(timerInterval);
    pomodoroTime = 25 * 60;
    document.getElementById("timer-display").textContent = "25:00";
}

// Обработчик нажатия Enter в поле ввода
document.getElementById("task-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask(); // Добавить задачу при нажатии Enter
    }
});


// app.js
let sidebar = document.querySelector('.sidebar');

function toggleSidebar() {
    // Переключаем классы для сворачивания и разворачивания
    if (sidebar.classList.contains('shrunk')) {
        sidebar.classList.remove('shrunk');
        sidebar.classList.add('expanded');
    } else {
        sidebar.classList.remove('expanded');
        sidebar.classList.add('shrunk');
    }
}

// Скрываем текст по умолчанию
sidebar.classList.add('shrunk');

// Делаем так, чтобы панель разворачивалась при наведении
sidebar.addEventListener('mouseenter', () => {
    sidebar.classList.add('expanded');
    sidebar.classList.remove('shrunk');
});

// Скрываем текст, когда панель уходит
sidebar.addEventListener('mouseleave', () => {
    sidebar.classList.add('shrunk');
    sidebar.classList.remove('expanded');
});
