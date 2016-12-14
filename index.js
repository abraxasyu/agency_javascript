var express = require("express");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var aws = require('aws-sdk');


aws.config.update({
  region:"us-east-2",
  //endpoint:"arn:aws:dynamodb:us-east-2:987536304171:table/abrax_dynamoDB"
  endpoint:"dynamodb.us-east-2.amazonaws.com"
});
var docClient = new aws.DynamoDB.DocumentClient();
var params = {
    TableName: "abrax_dynamoDB",
    Key:{
        "userid":"333"
    }
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});



var savedcanvas=null;


var config = {
      "USER"    : "",
      "PASS"    : "",
      "HOST"    : "ec2-52-15-182-72.us-east-2.compute.amazonaws.com",
      "PORT"    : "33333"
      //"DATABASE" : ""
    };


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
