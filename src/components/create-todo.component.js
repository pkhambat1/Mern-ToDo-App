import axios from "axios"
import React, { Component } from "react"

class CreateTodo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false,
    }
  }

  onChangeTodoDescription = (e) => {
    this.setState({
      todo_description: e.target.value,
    })
  }

  onChangeTodoResponsible = (e) => {
    this.setState({
      todo_responsible: e.target.value,
    })
  }

  onChangeTodoPriority = (e) => {
    this.setState({
      todo_priority: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    console.log(`Form submitted: `)
    console.log(`Todo Description: ${this.state.todo_description}`)
    console.log(`Todo Responsible: ${this.state.todo_responsible}`)
    console.log(`Todo Priority: ${this.state.todo_priority}`)
    console.log(`Todo Completed: ${this.state.todo_completed}`)

    const newTodo = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed,
    }
    axios
      .post("http://localhost:4000/todos/add", newTodo)
      .then((res) => console.log(res.data))
    window.location.href = "/"
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create Note</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_description}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <label>Content: </label>
            <textarea
              className="form-control"
              value={this.state.todo_responsible}
              onChange={this.onChangeTodoResponsible}
              rows="15"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Type: </label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="General"
                checked={this.state.todo_priority === "General"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">General</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Work"
                checked={this.state.todo_priority === "Work"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Work</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="Reminder"
                checked={this.state.todo_priority === "Reminder"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Reminder</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="List"
                checked={this.state.todo_priority === "List"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">List</label>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Save" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

export default CreateTodo
