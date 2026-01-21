const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const articleRoutes = require('./routes/articles');
const logger = require('./logger');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logger);

// routing according to url start
app.use('/articles', articleRoutes);

// if url is not found:
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'front-end', '404.html'));
});

app.listen(port);
