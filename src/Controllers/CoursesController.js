const course = require("../models/course");
const render = require('../until/render')

class CoursesController {
   
    //Get Create project

   async create(req, res) {

    render(req, res, 'createcourses')
   } 

   async store(req, res) {
    try {
      // Kiểm tra xem có file đã được tải lên không
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      req.body.cover = req.file.filename;
      await course.create(req.body);
      render(req, res, '/');
    } catch (error) {
      // In thông báo lỗi chi tiết
      console.error('Error creating course:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async manage(req, res) {
    try {
        const courses = await course.find();
        render(req, res, 'managecourse', {courses});
    } catch (error) {
        console.error('Error fetching courses:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async edit(req, res) {
    try {
        const courses = await course.findById(req.params.id);
        res.render('editcourse', { courses });
    } catch (error) {
        console.error('Error fetching courses:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  update = async (req, res) => {
    try {

        const formData = req.body;
        const fileName = req.file.filename;
        await course.updateOne({_id: req.params.id}, { ...formData, cover: fileName });
        res.redirect('/courses/manage');
    } catch (error) {
        console.error('Error fetching courses:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  //DELETE /course/:id
  delete = async (req, res, next) => {
    try {
        await course.deleteOne({_id: req.params.id});
        res.redirect('back');
    } catch (error) {
        console.error('Error fetching courses:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}


module.exports = new CoursesController;