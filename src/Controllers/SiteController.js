const Course = require('../models/course');
const User = require('../models/user');
const render = require('../until/render')

class SiteController {
  // Get home
  async get(req, res) {
    try {
        const courses = await Course.find({});

        render(req, res, 'index', {courses});
    } catch (error) {
      res.status(500).json({ error: 'ERROR!!!' });
    }
  }
}

module.exports = new SiteController();
