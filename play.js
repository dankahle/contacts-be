/*
var app = require('express')();

var listener = app.listen(0, function(){
  console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
*/


var MongoClient = require('mongodb').MongoClient,
  ObjectId = require('mongodb').ObjectId,
  expect = require('chai').expect,
  _ = require('lodash');

const idoc = {a:1};
MongoClient.connect('mongodb://localhost:27017/test')
  .then(db => {
    const coll = db.collection('coll');
    coll.removeMany({})
      .then(() => {
        coll.insertOne(idoc)
          .then(response => {
            console.log('afterpost', idoc);
            const idocsid = idoc._id.toString();
            idoc._id = idocsid;
            idoc.a = 12;
            coll.updateOne({_id: idoc._id}, idoc)
              .then(resput => {
                console.log('modifiedCount', resput.modifiedCount);
                console.log('afterput', idoc);

                coll.find({})
                  .toArray()
                  .then(docs => {
                    console.log('find', docs);
                    db.close();
                  });

                /*
                                coll.findOne({_id: ObjectId(idocsid)})
                                  .then(doc => {
                                    console.log('find', doc);
                                    db.close();
                                  });
                */



              })

          })
      })


  })
