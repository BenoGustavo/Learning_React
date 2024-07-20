import React from "react";
import { TaskCard } from "../TaskCard/TaskCard";
import "./style.css"
import { TaskService } from "../../logic/TaskService"
import { Task } from "../../logic/Tasks";

type State = {
    tasks: Task[];
};

export class TasksContainerDone extends React.Component<{}, State> {
    taskService = TaskService.getInstance();

    constructor(props: {}) {
        super(props);
        this.state = { tasks: this.taskService.tasks };
    }

    componentDidMount() {
        this.taskService.subscribeToTaskUpdates(this.handleTasksUpdated);
    }

    componentWillUnmount() {
        this.taskService.unsubscribeFromTaskUpdates(this.handleTasksUpdated);
    }

    handleTasksUpdated = (tasks: any) => {
        this.setState({ tasks });
    };

    render() {
        return (
            <section className="tasksDoneContainer">
                <div className="container-title">
                    <h2>Tasks Done - {this.taskService.getQuantityOfTasksDone()}</h2>
                </div>
                {this.state.tasks.map(task => (
                    task.completed ? <TaskCard key={task.name} taskTitle={task.name} taskDescription={task.status} /> : null
                ))}
            </section>
        );
    }
}