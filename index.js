var express = require("express");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var savedcanvas=null;

app.use('/static', express.static('assets'));

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
  socket.on('clientconnected',function(msg){
    //ignoring msg value
    console.log('user connected');
    socket.emit('initcanvas',savedcanvas);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('onclick',function(msg){
    console.log('user clicked at ('+msg.x+','+msg.y+')');
  });
  socket.on('drawline',function(msg){
    socket.broadcast.emit('drawline',{p0:msg.p0,p1:msg.p1});
    savedcanvas=msg.canvasdata;
  });
});

http.listen(33333, function(){
  console.log('listening on *:33333');
});
