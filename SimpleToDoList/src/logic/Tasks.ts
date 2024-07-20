interface ITask {
    name: string;
    status: string;
    completed: boolean;
}

export class Task implements ITask {
    name: string;
    status: string;
    completed: boolean;

    constructor(name: string, completed = false) {
        this.name = name;
        this.status = "This task is to do";
        this.completed = completed;
    }

    completeTask() {
        this.completed = true;
        this.status = "This task is done"
    }
}