const http = require('http');
const app = require('./app');

//Port number
var port = process.env.PORT || 4700;

http.createServer(app).listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});