import React, { Component } from 'react';
import axios from 'axios';

class EditTodo extends Component {
    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }



    componentDidMount() {
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        axios.post('http://localhost:4000/todos/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
        window.location.href="/";
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Edit Note</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" className="form-control" value={this.state.todo_description} onChange={this.onChangeTodoDescription} />
                    </div>
                    <div className="form-group">
                        <label>Content: </label>
                        <textarea className="form-control" value={this.state.todo_responsible} onChange={this.onChangeTodoResponsible} rows="15"></textarea>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityLow" value="General" checked={this.state.todo_priority === 'General'} onChange={this.onChangeTodoPriority} />
                            <label className="form-check-label">General</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityMedium" value="Work" checked={this.state.todo_priority === 'Work'} onChange={this.onChangeTodoPriority} />
                            <label className="form-check-label">Work</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityHigh" value="Reminder" checked={this.state.todo_priority === 'Reminder'} onChange={this.onChangeTodoPriority} />
                            <label className="form-check-label">Reminder</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityHigh" value="List" checked={this.state.todo_priority === 'List'} onChange={this.onChangeTodoPriority} />
                            <label className="form-check-label">List</label>
                        </div>
                    </div>
                    {/* <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input type="checkbox" className="form-check-input" id="completedCheckbox" name="completedCheckBox" onChange={this.onChangeTodoCompleted} checked={this.state.todo_completed} value={this.state.todo_completed} />
                            <label className="form-check-label" htmlFor="completedCHeckbox">
                                Completed
                            </label>
                        </div>

                    </div> */}
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary" />
                    </div>

                </form>
            </div>
        )
    }
}

export default EditTodo;