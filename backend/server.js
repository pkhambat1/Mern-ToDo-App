const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');
// let User = require('./user.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo) {
            res.status(404).send('data is not found');
        } else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

todoRoutes.route('/delete/:id').get(function(req, res) {
    Todo.findByIdAndDelete(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            res.json('Todo deleted');

    });
});

todoRoutes.route('/auth/login').get(function(req, res) {
    User.findOn(req.body.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            res.json('Todo deleted');

    });
});

todoRoutes.route('/auth/signup').get(function(req, res) {
    User.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            res.json('Todo deleted');

    });
});

todoRoutes.route('/auth/logout').get(function(req, res) {
    User.findByIdAndDelete(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            res.json('Todo deleted');

    });
});



// // GET route for reading data
// todoRoutes.get('/', function (req, res, next) {
//     return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
//   });
  
  
//   //POST route for updating data
//   todoRoutes.post('/', function (req, res, next) {
//     // confirm that user typed same password twice
//     if (req.body.password !== req.body.passwordConf) {
//       var err = new Error('Passwords do not match.');
//       err.status = 400;
//       res.send("passwords dont match");
//       return next(err);
//     }
  
//     if (req.body.email &&
//       req.body.username &&
//       req.body.password &&
//       req.body.passwordConf) {
  
//       var userData = {
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password,
//       }
  
//       User.create(userData, function (error, user) {
//         if (error) {
//           return next(error);
//         } else {
//           req.session.userId = user._id;
//           return res.redirect('/profile');
//         }
//       });
  
//     } else if (req.body.logemail && req.body.logpassword) {
//       User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
//         if (error || !user) {
//           var err = new Error('Wrong email or password.');
//           err.status = 401;
//           return next(err);
//         } else {
//           req.session.userId = user._id;
//           return res.redirect('/profile');
//         }
//       });
//     } else {
//       var err = new Error('All fields required.');
//       err.status = 400;
//       return next(err);
//     }
//   })
  
//   // GET route after registering
//   todoRoutes.get('/profile', function (req, res, next) {
//     User.findById(req.session.userId)
//       .exec(function (error, user) {
//         if (error) {
//           return next(error);
//         } else {
//           if (user === null) {
//             var err = new Error('Not authorized! Go back!');
//             err.status = 400;
//             return next(err);
//           } else {
//             return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
//           }
//         }
//       });
//   });
  
//   // GET for logout logout
//   todoRoutes.get('/logout', function (req, res, next) {
//     if (req.session) {
//       // delete session object
//       req.session.destroy(function (err) {
//         if (err) {
//           return next(err);
//         } else {
//           return res.redirect('/');
//         }
//       });
//     }
//   });




app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});