const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

//temp variable while we have no database
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date(),
        }
    ]
};

app.use(bodyParser.json());
app.use(cors());



// ROOT ROUTE
app.get('/', (req, res) => {
    res.send(database.users);
});


// SIGNIN ROUTE
app.get('/signin', (req, res) => {
    res.send('sign in form');
});

// SIGNING IN logic 
app.post('/signin', (req, res) =>{
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json(database.users[0]); 
        } else {
            res.status(400).json('error logging in');
            console.log(req.body.email, req.body.password);
        }
});


// REGISTER ROUTE
app.get('/register', (req, res) => {
    res.send('register form');
});

// REGISTER IN logic 
app.post('/register', (req, res) =>{
    const { email, name, password } = req.body;

    database.users.push({
       id: '125',
            name: name,
            email: email,
            entries: 0,
            joined: new Date(),
   });
   res.json(database.users[database.users.length-1]);
});


// PROFILE ID ROUTE
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false; 
    database.users.forEach(user => {
        // if user id from "database" is equal to id from parmas
        if (user.id == id) {
            found = true;
            return res.json(user);
        }
     });
    if (found === false) {
        return res.status(400).json('no user found.');
    }
});


// ROUTE to increase users entry tally 
app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false; 
    database.users.forEach(user => {
        // if user id from "database" is equal to id from parmas
        if (user.id == id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
     });
    if (found === false) {
        return res.status(400).json('not found.');
    }
});



// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });



// START SERVER - tell express to listen for requests
// app.listen(process.env.PORT, process.env.IP, () => {
//     console.log('app is running');
// });

app.listen(8081, () => {
    console.log('app is running on port 8081');
});

