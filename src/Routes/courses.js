const express = require('express');
const coursesController = require('../Controllers/CoursesController');
const router = express.Router();
const upload = require('../middlewares/multerConfig')

router.get('/create', coursesController.create);
router.post('/store', upload.single('cover'), coursesController.store);
router.get('/manage', coursesController.manage);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', upload.single('cover'), coursesController.update);
router.get('/delete/:id', coursesController.delete);

module.exports = router;