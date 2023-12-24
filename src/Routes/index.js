const siteRouter = require('./site')
const coursesRouter = require('./courses')
const userRouter = require('./user')

function route(app) {
    
    app.use('/', siteRouter);
    app.use('/courses', coursesRouter);
    app.use('/', userRouter);

}

module.exports = route;