$(function(){
  $('#submittodynamodb').click(function() {
    var freegeoip_json=$.getJSON("http://freegeoip.net/json/",function(){
      var params = {
          TableName:"abrax_dynamoDB",
          Item:{
              "userid": $('#userid').val(),
              "testval": $('#testval').val(),
              "userip":freegeoip_json.responseJSON.ip,
              "submittime":Date()
          }
      };
      socket.emit('submittodynamodb',params);
    });
  });
});
