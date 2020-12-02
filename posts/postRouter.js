const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares/posts-middlewares')

const Posts = require('./postDb')

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.get()
    res
      .status(200)
      .json(posts)
  } catch(err) {
    res
      .status(500)
      .json({ message: 'Could not retrieve posts.'})
  }
});

router.get('/:id', middlewares.validateByPostId, async (req, res) => {
  const { id } = req.params
  try {
    const post = await Posts.getById(id)
    res
      .status(200)
      .json(post)
  } catch(err) {
    res
      .status(500)
      .json({ message: 'Could not retrive post.'})
  }
});

router.delete('/:id', middlewares.validateByPostId, async (req, res) => {
  const { id } = req.params
  try {
    const deletedPost = await Posts.remove(id)
    res
      .status(200)
      .json(deletedPost)
  } catch(err) {
    res
      .status(500)
      .json({ message: 'Could not delete post.'})
  }
});

router.put('/:id', middlewares.validateByPostId, middlewares.validatePost, async (req, res) => {
  const { id } = req.params
  const changes = req.body
  try {
    const updatedPost = await Posts.update(id, changes)
    res
      .status(200)
      .json(updatedPost)
  } catch(err) {
    res
      .status(500)
      .json({ message: 'Could not update post.'})
  }
});

module.exports = router;
