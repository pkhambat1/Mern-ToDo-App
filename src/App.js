import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo-list.component";
import TodosList from "./components/todos-list.component";

import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.jpg";

function App() {
  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            <img src={logo} width="30" height="30" style={{ borderRadius: 100 }} alt="" />
          </Link>
          <Link to="/" className="navbar-brand">MERN Notes App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">All Notes</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Note</Link>
              </li>

            </ul>
          </div>
        </nav>
        <div className="container">
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    </div>
  );
}

export default App;

