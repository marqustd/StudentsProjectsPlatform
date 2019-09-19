const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('dist'));
app.use('/public', express.static('public'));
// eslint-disable-next-line
app.listen(8080, () => console.log('Platform client seems ok!'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
