$(function(){
  //canvas creation
  var corecanvas = document.createElement('canvas');
  corecanvas.id     = "CursorLayer";
  corecanvas.width  = 800;
  corecanvas.height = 600;
  corecanvas.style.border   = "1px solid";
  document.getElementById("core").appendChild(corecanvas);
  //events: http://www.w3schools.com/jsref/dom_obj_event.asp
  var ctx = corecanvas.getContext('2d');
  ctx.fillStyle = "solid";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 3;
	ctx.lineCap = "round";
  //var img = document.getElementById("");
  var mouse={
    clicked: false,
    prevpos: {x:0,y:0}
  };
  function onclick(e){
    x = e.pageX - corecanvas.parentElement.offsetLeft;
    y = e.pageY - corecanvas.parentElement.offsetTop;
    socket.emit('onclick',{"x":x,"y":y});
  }
  function onmousedown(e){
    mouse.clicked=true;
    mouse.prevpos.x = e.pageX - corecanvas.parentElement.offsetLeft;
    mouse.prevpos.y = e.pageY - corecanvas.parentElement.offsetTop;
  }
  function onmouseup(e){mouse.clicked=false;}
  function onmousemove(e){
    if(mouse.clicked){
      x = e.pageX - corecanvas.parentElement.offsetLeft;
      y = e.pageY - corecanvas.parentElement.offsetTop;
      ctx.moveTo(mouse.prevpos.x,mouse.prevpos.y);
      ctx.lineTo(x,y);
      ctx.stroke();
      socket.emit('drawline',{canvasdata:corecanvas.toDataURL(),p0:{x:mouse.prevpos.x,y:mouse.prevpos.y},p1:{x:x,y:y}});
      mouse.prevpos.x=x;
      mouse.prevpos.y=y;
    }
  }

  socket.on('drawline',function(msg){
    ctx.moveTo(msg.p0.x,msg.p0.y);
    ctx.lineTo(msg.p1.x,msg.p1.y);
    ctx.stroke();
  });

  socket.on('initcanvas',function(msg){
    if(msg===null){return;}
    var img = new Image();
      img.onload = function(){
        corecanvas.getContext('2d').drawImage(img,0,0);
      };
    img.src=msg;
  });

  corecanvas.addEventListener('click',onclick);//remove on from http://www.w3schools.com/jsref/dom_obj_event.asp
  corecanvas.addEventListener('mousedown',onmousedown);
  corecanvas.addEventListener('mouseup',onmouseup);
  corecanvas.addEventListener('mousemove',onmousemove);

});


//http://code-and.coffee/post/2015/collaborative-drawing-canvas-node-websocket/
