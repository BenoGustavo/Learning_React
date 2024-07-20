import React from "react";
import { AddTaskForm } from "./components/AddTaskForm/AddTaskForm";
import { TasksContainerDone } from "./components/TasksContainerDone/TasksContainerDone";
import { TasksToDo } from "./components/TasksToDoContainer/TasksToDo";

import { TaskService } from "./logic/TaskService";

export class App extends React.Component {
  TaskService: TaskService;
  constructor(props: any) {
    super(props)
    this.TaskService = TaskService.getInstance();
    this.TaskService.loadTasks();
  }

  render() {
    return (
      <>
        <section >
          <AddTaskForm placeholdertext="Add new task" />
        </section>
        <main>
          <TasksToDo />
          <TasksContainerDone />
        </main>
      </>
    )
  }
}