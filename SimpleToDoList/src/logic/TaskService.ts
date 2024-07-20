import { Task } from "./Tasks";
import { LocalStorageController } from "./localStorage";

class SimpleEventEmitter {
    private events: { [event: string]: Function[] } = {};

    on(event: string, listener: Function) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event: string, listener: Function) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    emit(event: string, ...args: any[]) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(...args));
    }
}

export class TaskService {
    private static instance: TaskService;
    tasks: Task[];
    private emitter: SimpleEventEmitter;
    private LocalStorageController: LocalStorageController

    private constructor() {
        this.emitter = new SimpleEventEmitter();
        this.LocalStorageController = LocalStorageController.getInstance();
        this.tasks = [];
    }

    public static getInstance(): TaskService {
        if (!TaskService.instance) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    }

    loadTasks() {
        this.tasks = this.LocalStorageController.getData('tasks').map((task: any) => new Task(task.name, task.completed));
        this.notifyTaskUpdates();
    }

    notifyTaskUpdates() {
        this.emitter.emit('tasksUpdated', this.tasks);
    }

    subscribeToTaskUpdates(callback: { (tasks: any): void; (...args: any[]): void; }) {
        this.emitter.on('tasksUpdated', callback);
    }

    unsubscribeFromTaskUpdates(callback: { (tasks: any): void; (...args: any[]): void; }) {
        this.emitter.off('tasksUpdated', callback);
    }

    createTask(event: React.MouseEvent<HTMLButtonElement>, taskName: string) {
        event.preventDefault();
        if (this.tasks.find(task => task.name === taskName)) {
            alert("Task already exists");
            return;
        }

        if (taskName === "" || taskName === null || taskName === undefined || taskName.length > 32) {
            alert("Please enter a valid task name");
            return;
        }

        const task = new Task(taskName)

        this.tasks.push(task)

        this.LocalStorageController.saveData('tasks', this.tasks);

        this.notifyTaskUpdates()
    }

    getQuantityOfTasksToDo() {
        return this.tasks.filter(task => !task.completed).length;
    }

    getQuantityOfTasksDone() {
        return this.tasks.filter(task => task.completed).length;
    }

    deleteTask(event: React.MouseEvent<HTMLButtonElement>, taskName: string) {
        event.preventDefault();
        this.tasks = this.tasks.filter(task => task.name !== taskName);

        this.LocalStorageController.saveData('tasks', this.tasks);

        this.notifyTaskUpdates();
    }

    completeTask(event: React.MouseEvent<HTMLButtonElement>, taskName: string) {
        event.preventDefault();

        for (let task of this.tasks) {
            if (task.name === taskName) {
                task.completed = true;
                task.status = "This task is done";
                break;
            }
        }

        this.LocalStorageController.saveData('tasks', this.tasks);

        this.notifyTaskUpdates();
    }
}