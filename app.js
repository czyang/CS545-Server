const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const net = require('net');

// const configRoutes = require('./routes')
const cors = require('cors')
const httpPort = 5450
const socketPort = 5451

app.options('*', cors()) 
app.use(cors())

app.use(bodyParser.json())

net.createServer(function(sock) {
 console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
  sock.on('data', function(data) {
    console.log('DATA ' + sock.remoteAddress + ': ' + data);
    sock.write('From Server: You said "' + data + '"');
  });
 sock.on('close', function(data) {
   console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
 });

}).listen(socketPort, '0.0.0.0');

// configRoutes(app)

app.listen(httpPort, () => {
  console.log(`Listening on :${httpPort}`)
})