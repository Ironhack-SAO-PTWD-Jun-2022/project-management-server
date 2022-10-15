const router = require('express').Router();

const Task = require('../models/Task.model');
const Project = require('../models/Project.model');

// cria uma tarefa
router.post('/', async (req, res, next) => {
  const { title, description, projectId } = req.body;
  try {
    const taskFromDB = await Task.create({ title, description, project: projectId });
    await Project.findByIdAndUpdate(projectId, { $push: {tasks: taskFromDB._id}});
    res.status(200).json(taskFromDB);
  } catch (error) {
    console.error('Error trying to create task', error);
    res.status(500).json(error)
  }
})

module.exports = router;