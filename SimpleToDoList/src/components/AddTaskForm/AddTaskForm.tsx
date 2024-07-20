import React from "react";
import PlusSign from "../../assets/img/svg/Plus.svg";
import "./style.css";

import { TaskService } from "../../logic/TaskService";

interface AddTaskFormProps {
    placeholdertext: string;
}

interface AddTaskFormState {
    taskName: string;
    taskService: TaskService
}

export class AddTaskForm extends React.Component<AddTaskFormProps, AddTaskFormState> {
    constructor(props: AddTaskFormProps) {
        super(props);
        this.state = { taskName: "", taskService: TaskService.getInstance() }
    }

    render() {
        return (
            <form className="searchBarContainer">
                <div className="content">
                    <input type="text" maxLength={32} value={this.state.taskName} onChange={(e) => this.setState({ taskName: e.target.value })} placeholder={this.props.placeholdertext} />
                    <button onClick={(e) => { this.state.taskService.createTask(e, this.state.taskName) }}><img src={PlusSign} alt="Plus Sign" /></button>
                </div>
            </form>
        );
    }
}