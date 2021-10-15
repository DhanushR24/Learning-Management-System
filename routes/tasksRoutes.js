const { Router } = require('express');
const router = Router();
const tasksController = require('../controllers/tasksController')

router.get('/create', tasksController.task_create_get)
router.get('/', tasksController.task_index)
router.post('/', tasksController.task_create_post)
router.delete('/:id', tasksController.task_delete)
router.put('/:id', tasksController.task_post)

module.exports = router;