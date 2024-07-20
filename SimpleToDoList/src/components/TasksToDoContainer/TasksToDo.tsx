import React from "react";
import { TaskCard } from "../TaskCard/TaskCard";
import "./style.css";
import { TaskService } from "../../logic/TaskService";
import { Task } from "../../logic/Tasks";

export class TasksToDo extends React.Component<{}, { tasks: Task[] }> {
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
                    <h2>Tasks to do - {this.taskService.getQuantityOfTasksToDo()}</h2>
                </div>
                {this.state.tasks.map(task => (
                    task.completed ? null : <TaskCard key={task.name} taskTitle={task.name} taskDescription={task.status} />
                ))}
            </section>
        );
    }
}