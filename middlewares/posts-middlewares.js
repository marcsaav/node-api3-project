const Posts = require('../posts/postDb')

async function validateByPostId (req, res, next) {
    const { id } = req.params
    try {
        const post = await Posts.getById(id)
        if(post) {
            next()
        } else {
            res
                .status(404)
                .json({ message: 'Invalid post id.'})
        }
    } catch (err) {
        res
            .status(400)
            .json({ message: 'Invalid post id.'})
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
    validateByPostId,
    validatePost
}