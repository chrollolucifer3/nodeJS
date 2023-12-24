const { create } = require('domain');
const express = require('express');
const cookieParser = require('cookie-parser');
const parseToken = require('./middlewares/parseToken');

const app = express();
const port = 3000

app.use(cookieParser());
app.use(parseToken);

// const morgan = require('morgan')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// app.use(morgan('combined'))
const route = require('./Routes');

const db = require('./config');
db.connect();

var methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.set('view engine', 'pug');
app.set('views', './src/views');

//Router init
route(app);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

