/* ====================================
   Timeline Builder with Excel Export
   ==================================== */

document.addEventListener('DOMContentLoaded', function() {
    const timelineBuilder = document.getElementById('timeline-builder');
    if (timelineBuilder) {
        initTimelineBuilder();
    }
});

let tasks = [];
let taskIdCounter = 1;

function initTimelineBuilder() {
    document.getElementById('add-task')?.addEventListener('click', addNewTask);
    document.getElementById('export-timeline')?.addEventListener('click', exportTimelineToExcel);

    // Load saved tasks
    loadTasksFromLocalStorage();

    // Add some default tasks if none exist
    if (tasks.length === 0) {
        addDefaultTasks();
    }
}

function addDefaultTasks() {
    const defaultTasks = [
        { text: 'Check for event date conflicts', date: '', completed: false },
        { text: 'Reserve venue', date: '', completed: false },
        { text: 'Create event budget', date: '', completed: false },
        { text: 'Submit SAFE form', date: '', completed: false },
        { text: 'Book catering', date: '', completed: false },
        { text: 'Arrange security', date: '', completed: false },
        { text: 'Begin marketing campaign', date: '', completed: false }
    ];

    defaultTasks.forEach(task => {
        tasks.push({ id: taskIdCounter++, ...task });
    });

    renderTasks();
}

function addNewTask() {
    const newTask = {
        id: taskIdCounter++,
        text: '',
        date: '',
        completed: false,
        editing: true
    };

    tasks.push(newTask);
    renderTasks();
}

function renderTasks() {
    const container = document.getElementById('timeline-tasks');
    if (!container) return;

    if (tasks.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">No tasks yet. Click "Add Task" to get started!</p>';
        return;
    }

    container.innerHTML = '';

    tasks.forEach(task => {
        const taskEl = createTaskElement(task);
        container.appendChild(taskEl);
    });

    saveTasksToLocalStorage();
}

function createTaskElement(task) {
    const div = document.createElement('div');
    div.className = `timeline-task ${task.completed ? 'completed' : ''}`;
    div.dataset.taskId = task.id;

    if (task.editing) {
        div.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <div class="task-content">
                <input type="text" class="task-input" placeholder="Enter task description..." value="${task.text}">
                <input type="date" class="task-date-input" value="${task.date}">
            </div>
            <div class="task-actions">
                <button class="task-btn save-btn" title="Save">✓</button>
                <button class="task-btn delete-btn" title="Delete">✕</button>
            </div>
        `;

        // Save button
        div.querySelector('.save-btn').addEventListener('click', () => {
            task.text = div.querySelector('.task-input').value;
            task.date = div.querySelector('.task-date-input').value;
            task.editing = false;
            renderTasks();
        });
    } else {
        div.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <div class="task-content">
                <div class="task-text">${task.text || 'Untitled task'}</div>
                <div class="task-date">${task.date ? new Date(task.date).toLocaleDateString() : 'No date set'}</div>
            </div>
            <div class="task-actions">
                <button class="task-btn edit-btn" title="Edit">✏️</button>
                <button class="task-btn delete-btn" title="Delete">✕</button>
            </div>
        `;

        // Edit button
        div.querySelector('.edit-btn').addEventListener('click', () => {
            task.editing = true;
            renderTasks();
        });
    }

    // Checkbox
    div.querySelector('.task-checkbox').addEventListener('change', (e) => {
        task.completed = e.target.checked;
        renderTasks();
    });

    // Delete button
    div.querySelector('.delete-btn').addEventListener('click', () => {
        if (confirm('Delete this task?')) {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        }
    });

    return div;
}

function exportTimelineToExcel() {
    if (typeof XLSX === 'undefined') {
        alert('Excel library not loaded. Please refresh the page.');
        return;
    }

    if (tasks.length === 0) {
        alert('No tasks to export!');
        return;
    }

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Create timeline worksheet data
    const wsData = [
        ['UCF Event Planning Timeline'],
        ['Generated:', new Date().toLocaleDateString()],
        [],
        ['Status', 'Task Description', 'Due Date', 'Completed Date']
    ];

    // Add tasks
    tasks.forEach(task => {
        wsData.push([
            task.completed ? '✓ Complete' : '⃝ Pending',
            task.text || 'Untitled task',
            task.date || 'Not set',
            task.completed ? new Date().toLocaleDateString() : ''
        ]);
    });

    // Add summary
    wsData.push([]);
    wsData.push(['Summary']);
    wsData.push(['Total Tasks:', tasks.length]);
    wsData.push(['Completed:', tasks.filter(t => t.completed).length]);
    wsData.push(['Pending:', tasks.filter(t => !t.completed).length]);

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Timeline');

    // Generate filename
    const filename = `UCF_Event_Timeline_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);

    window.UCFUtils.showToast('Timeline exported to Excel successfully!', 'success');
}

function saveTasksToLocalStorage() {
    localStorage.setItem('ucf_event_timeline', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const saved = localStorage.getItem('ucf_event_timeline');
    if (saved) {
        tasks = JSON.parse(saved);
        taskIdCounter = Math.max(...tasks.map(t => t.id), 0) + 1;
        renderTasks();
    }
}
