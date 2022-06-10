const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken')

const {
    createUser,
    getUser,
    getUserByUsername
} = require('../../db/index');

userRouter.use((req, res, next) => {
    console.log("A request is being made to /user");
    next();
});

userRouter.post('/register', async (req, res, next) => {

    const _user = await getUserByUsername(req.body); // username
    try {
        if (_user) {
            next();
        } else {
            const user = await createUser(req.body);  // username, password 
            const token = jwt.sign({ id: user.id, username: user.username }, 'secret');
            res.send({ user, token });
        }

    } catch ({ name, message }) {
        next({
            name: "createUserError",
            message
        })
    }
});

userRouter.post('/login', async (req, res, next) => {

    try {
        const user = await getUser(req.body) //username, password
        console.log(user);
        if (user) {
            const token = jwt.sign({ id: user.id, username: user.username }, 'secret');
            res.send({ user, token });
        }
    } catch (error) {
        next(error)
    }
})

module.exports = userRouter;