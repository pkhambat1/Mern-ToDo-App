import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Todo extends Component {

    deleteTodo() {
        axios.get('http://localhost:4000/todos/delete/' + this.props.todo._id)
        .then((res) => {
            console.log('Todo successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <tr>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_description}</td>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_responsible}</td>
                <td className={this.props.todo.todo_completed ? 'completed' : ''}>{this.props.todo.todo_priority}</td>
                <td>
                    <Link role="button" className="btn btn-sm btn-primary mr-3" to={"/edit/" + this.props.todo._id}>Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => this.deleteTodo()}>Delete</button>
                </td>
            </tr>
        );
    }

}

class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }



    todoList() {
        return this.state.todos.map(function (currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        });
    }


    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>All Notes</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th width="200">Title</th>
                            <th>Content</th>
                            <th>Type</th>
                            <th width="150">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TodosList;