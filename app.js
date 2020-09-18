const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./utils/database').mongoConnect;

const userRoutes = require('./routes/users');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoutes);

mongoConnect(() => {
    app.listen(3000);
});