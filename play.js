var app = require('express')();

var listener = app.listen(0, function(){
  console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
