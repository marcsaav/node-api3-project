const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares/middlewares')

const Users = require('./userDb')
const Posts = require('../posts/postDb')

router.post('/', middlewares.validateUser, async (req, res) => {
  try {
    const newUser = await Users.insert(req.body)
    res
      .status(201)
      .json(newUser)
  } catch(err) {
    res
      .status(500)
      .json({ message: 'Could not add new user.'})
  }
});

router.post('/:id/posts', middlewares.validateUserId, middlewares.validatePost, async (req, res) => {
  try {
    const newPost = await Posts.insert(req.body)
    res
      .status(201)
      .json(newPost)
  } catch(err) {
    res
      .status(500)
      .json({ message: 'Could not add new post.'})
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await Users.get()
    res
      .status(200)
      .json(users)
  } catch(err) {
    res
      .status(500)
      .json({ message: 'Could not retrieve users data.'})
  }
});

router.get('/:id', middlewares.validateUserId, async (req, res) => {
  const { id } = req.params
  try {
    const user = await Users.getById(id)
    res
      .status(200)
      .json(user)
  } catch(err) {
    res
      .status(500)
      .json({ message: 'Could not retrieve user data.'})
  }
});

router.get('/:id/posts', middlewares.validateUserId, async (req, res) => {
  const { id } = req.params
  try {
    const userPosts = await Users.getUserPosts(id)
    res
      .status(200)
      .json(userPosts)
  } catch(err) {
    res
      .status(500)
      .json({ message: 'Could not retrieve user posts data.'})
  }
});

router.delete('/:id', middlewares.validateUserId, async (req, res) => {
  const { id } = req.params
  try {
    const deletedUser = await Users.remove(id)
    res
      .status(200)
      .json(deletedUser)
  } catch(err) {
    res
      .status(500)
      .json({ message: 'Could not remove user.'})
  }
});

router.put('/:id', middlewares.validateUserId, middlewares.validateUser,  async (req, res) => {
  const { id } = req.params
  const changes = req.body
  try {
    const newUser = await Users.update(id, changes)
    res
      .status(201)
      .json(newUser)
  } catch(err) {
    res
      .status(500)
      .json({ message: 'Could not update user.'})
  }
});

module.exports = router;
