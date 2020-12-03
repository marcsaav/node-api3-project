const Users = require('../users/userDb')

const logger = (req, res, next) => {
    const date = new Date()
    console.log(req.method, req.url, date.toString())
    next()
}

const validateUserId = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await Users.getById(id)
        if(user) {
            next()
        } else {
            res
                .status(404)
                .json({ message: 'Invalid user id.'})
        }
    } catch (err) {
        res
            .status(400)
            .json({ message: 'Invalid user id.'})
    }
}

const validateUser = (req, res, next) => {
    const newUser = req.body
    if(!newUser) {
        res
            .status(400)
            .json({ message: 'Missing user data.'})
    } else if(!newUser.name) {
        res
            .status(404)
            .json({ message: 'Missing required text field.'})
    } else {
        next()
    }
}

const validatePost = (req, res, next) => {
    const newPost = req.body
    if(!newPost) {
        res
            .status(400)
            .json({ message: 'Missing post data.'})
    } else if(!newPost.text) {
        res
            .status(404)
            .json({ message: 'Missing required text field.'})
    } else {
        next()
    }
}

module.exports = {
    logger,
    validateUserId,
    validateUser,
    validatePost
}