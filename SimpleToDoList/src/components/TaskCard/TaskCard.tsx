import React from "react";
import TrashCan from "../../assets/img/svg/TrashSimple2.svg"
import CheckTask from "../../assets/img/svg/Check.svg"
import "./style.css"

import { TaskService } from "../../logic/TaskService"

type TaskCardProps = {
    taskTitle: string;
    taskDescription: string;
}

export class TaskCard extends React.Component<TaskCardProps> {
    TaskService: TaskService;
    constructor(props: any) {
        super(props)
        this.TaskService = TaskService.getInstance();
    }

    render() {
        return (
            <div className="task-body">

                {
                    this.TaskService.tasks.filter(task => task.name === this.props.taskTitle)[0]?.completed ?
                        <div className="task-info done">
                            <h3>{this.props.taskTitle}</h3>
                            <p>{this.props.taskDescription}</p>
                        </div>
                        :
                        <div className="task-info">
                            <h3>{this.props.taskTitle}</h3>
                            <p>{this.props.taskDescription}</p>
                        </div>
                }

                {
                    !this.TaskService.tasks.find(task => task.name === this.props.taskTitle)?.completed && (
                        <div className="task-buttons">
                            <button onClick={(e) => { this.TaskService.completeTask(e, this.props.taskTitle); }}><img src={CheckTask} alt="Check task as done" /></button>
                            <button onClick={(e) => { this.TaskService.deleteTask(e, this.props.taskTitle); }}><img src={TrashCan} alt="Trash can icon" /></button>
                        </div>
                    )
                }

            </div>
        )
    }
}