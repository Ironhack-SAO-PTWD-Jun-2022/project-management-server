// importar mongoose
const mongoose = require('mongoose');

// importar roteador
const router = require('express').Router();

// modelos
const Project = require('../models/Project.model');

// criar projeto
router.post('/', async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const projectFromDB = await Project.create({ title, description });
    res.status(200).json(projectFromDB);
  } catch (error) {
    next(error);
  }
})

// retorna todos os projetos
router.get('/', async (req, res, next) => {
  try {
    const projectsFromDB = await Project.find();
    res.status(200).json(projectsFromDB);
  } catch (error) {    
    next(error);
  }
})

// retorna um projeto específico
router.get('/:projectId', async (req, res, next) => {
  const { projectId } = req.params;
  try {
    // valida se o projectId é um id que o mongo reconhece
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      // return res.status(400).json({ message: 'Specified ID is not valid.'});
      const error = new Error('Specified ID is not valid.');
      error.status = 400;
      // caso id não seja valido, jogamos um erro que vai para o catch
      throw error; 
    }
    const projectFromDB = await Project.findById(projectId).populate('tasks');
    res.status(200).json(projectFromDB);
  } catch (error) {    
    next(error);
  }
});

// edita um projeto específico
router.put('/:projectId', async (req, res, next) => {
  const { projectId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      const error = new Error('Specified ID is not valid.');
      error.status = 400;
      throw error; 
    }
    const projectFromDB = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
    res.status(200).json(projectFromDB);
  } catch (error) {
    next(error);
  }
})

// remove um projeto específico
router.delete('/:projectId', async (req, res, next) => {
  const { projectId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      const error = new Error('Specified ID is not valid.');
      error.status = 400;
      throw error; 
    }
    const projectFromDB = await Project.findByIdAndRemove(projectId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
})

module.exports = router;