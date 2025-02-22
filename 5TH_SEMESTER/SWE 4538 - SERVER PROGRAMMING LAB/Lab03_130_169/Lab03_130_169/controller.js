const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const fs = require('fs');

const users = path.join(__dirname, 'user.csv');


const readUsers = () => {
    
    const data = fs.readFileSync(users, 'utf8').trim().split('\n');
    const users_ = [];

    for (let i = 0; i < data.length; i++) 
    { 
        const [id, name, email, password] = data[i].split(',');
        users_.push({ id, name, email, password });
    }

    return users_;
};



const initializePassport = require('./passport.js');
initializePassport(
    passport,
    email => readUsers().find(user => user.email === email),
    id => readUsers().find(user => user.id === id)
);

const getLogin = (req, res) => {
    const filePath = path.join(__dirname, 'views', 'login.html');
    res.sendFile(filePath);
};

const getRegister = (req, res) => {
    const filePath = path.join(__dirname, 'views', 'register.html');
    res.sendFile(filePath);
};

const postRegister = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        const newUser = {
            id: Date.now().toString(),
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        };

        const newUserCSVRow = `${newUser.id},${newUser.name},${newUser.email},${newUser.password}\n`;
        fs.appendFileSync(users, newUserCSVRow, 'utf8');

        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
    console.log(users);
};

const postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/welcome',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);
};

module.exports = { getLogin, postLogin, getRegister, postRegister };
