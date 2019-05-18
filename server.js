const compression = require('compression');
const path = require('path');
const express = require('express');
const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, './dist')));

app.get('/', (req, res) => {
		res.sendfile(__dirname + '/index.html');
})

app.get('*', (req, res) => {
		res.sendfile(__dirname+ '/pages/fish404.html');
});

app.listen(3000, () => {
		console.log('Server is running! localhost:' + 3000);
})