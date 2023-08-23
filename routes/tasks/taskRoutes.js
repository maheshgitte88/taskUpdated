const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../../authenticateUser');
const Task = require('../../Models/Task');
const User = require('../../Models/users');


router.post('/create-task', authenticateUser, async (req, res) => {
  const { title, completed, description } = req.body;
  const user = req.user.id;
  if (!user) {
    return res.status(401).json({ error: 'User is missing. Please log in.' });
  }
  try {
    const myUser = await User.findById(user);

    if (!myUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (description.length < 10) {
      return res.status(400).json({ error: 'Task content should be at least 00 characters.' });
    }
    const post = new Task({ user: user, title, completed, description });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'An error occurred while creating Task.' });
  }
});


router.get('/tasks', authenticateUser, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'An error occurred while fetching tasks.' });
  }
});



router.put('/tasks/:taskId', authenticateUser, async (req, res) => {
  const { title, description, completed } = req.body;
  const userId = req.user.id;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId, user: userId },
      { title, description, completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'An error occurred while updating task.' });
  }
});


router.get('/tasks/:taskId', authenticateUser, async (req, res) => {
  const userId = req.user.id;

  try {
    const task = await Task.findOne({ _id: req.params.taskId, user: userId });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'An error occurred while fetching task.' });
  }
});

router.get('/tasks/search', authenticateUser, async (req, res) => {
  const { query } = req.query;
  const userId = req.user.id;

  try {
    const tasks = await Task.find({
      user: userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error searching tasks:', error);
    res.status(500).json({ error: 'An error occurred while searching tasks.' });
  }
});

router.delete('/tasks/delete/:taskId', authenticateUser, async (req, res) => {
  const userId = req.user.id;

  try {
    const task = await Task.findOneAndDelete({ _id: req.params.taskId, user: userId });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'An error occurred while deleting task.' });
  }
});


module.exports = router;
