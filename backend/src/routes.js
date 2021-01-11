const express = require('express');
const routes = express.Router();
const uploadConfig = require('./config/upload');
const multer = require('multer');

const auth = require('./middlewares/auth');

const upload = multer(uploadConfig);

const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const DashboardController = require('./controllers/DashboardController');

routes.post('/login', UserController.index);
routes.post('/register', UserController.store);

routes.get('/profile', PostController.index);
routes.post('/post', auth, upload.single('thumbnail'), PostController.store);
routes.delete('/deletepost/:id', auth, PostController.delete);

routes.get('/dashboard', DashboardController.index);

module.exports = routes;