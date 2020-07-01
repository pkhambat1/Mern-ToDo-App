const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const todoRoutes = express.Router()
const PORT = 4000
const { username, password, cluster, dbName } = require("./config")

let Todo = require("./todo.model")
// let User = require('./user.model');

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
const connection = mongoose.connection

connection.once("open", function () {
  console.log("MongoDB database connection established successfully")
})

todoRoutes.route("/").get(function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err)
    } else {
      res.json(todos)
    }
  })
})

todoRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id
  Todo.findById(id, function (err, todo) {
    res.json(todo)
  })
})

todoRoutes.route("/add").post(function (req, res) {
  let todo = new Todo(req.body)
  console.log("req.body", req.body)
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: "todo added successfully" })
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed")
    })
})

todoRoutes.route("/update/:id").post(function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (!todo) {
      res.status(404).send("data is not found")
    } else {
      todo.todo_description = req.body.todo_description
      todo.todo_responsible = req.body.todo_responsible
      todo.todo_priority = req.body.todo_priority
      todo.todo_completed = req.body.todo_completed

      todo
        .save()
        .then((todo) => {
          res.json("Todo updated")
        })
        .catch((err) => {
          res.status(400).send("Update not possible")
        })
    }
  })
})

todoRoutes.route("/delete/:id").get(function (req, res) {
  Todo.findByIdAndDelete(req.params.id, function (err, todo) {
    if (!todo) res.status(404).send("data is not found")
    else res.json("Todo deleted")
  })
})

todoRoutes.route("/auth/login").get(function (req, res) {
  User.findOn(req.body.id, function (err, todo) {
    if (!todo) res.status(404).send("data is not found")
    else res.json("Todo deleted")
  })
})

todoRoutes.route("/auth/signup").get(function (req, res) {
  User.findById(req.params.id, function (err, todo) {
    if (!todo) res.status(404).send("data is not found")
    else res.json("Todo deleted")
  })
})

todoRoutes.route("/auth/logout").get(function (req, res) {
  User.findByIdAndDelete(req.params.id, function (err, todo) {
    if (!todo) res.status(404).send("data is not found")
    else res.json("Todo deleted")
  })
})

app.use("/todos", todoRoutes)

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT)
})
