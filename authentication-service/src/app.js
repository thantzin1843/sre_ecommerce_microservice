const path = require('path');
const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'), { index: false }));

// mount API routes under /api
app.use('/api', routes);

// fallback to login page for UI routes
app.get(['/', '/login', '/register', '/user', '/user/profile', '/admin', '/admin/profile'], (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

module.exports = app;
