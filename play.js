


var MongoClient = require('mongodb').MongoClient,
  ObjectId = require('mongodb').ObjectId,
  expect = require('chai').expect,
  _ = require('lodash'),
  chance = new require('chance')();

const cid = chance.guid(),
  oid = new ObjectId();

console.log(cid, oid.toString(), oid.toHexString());
// const idoc = {id: ObjectId(cid), a:1};
const idoc = {a:1};
MongoClient.connect('mongodb://localhost:27017/test')
  .then(db => {
    const coll = db.collection('coll');
    coll.removeMany({})
      .then(() => {
        coll.insertOne(idoc)
          .then(response => {
            console.log('afterpost', idoc);
            const idocsid = idoc.id.toString();
            idoc.id = idocsid;
            idoc.a = 12;
            idoc.id = ObjectId(idoc.id);
            coll.updateOne({id: idoc.id}, idoc)
              .then(resput => {
                console.log('modifiedCount', resput.modifiedCount);
                console.log('afterput obj modified?', idoc);

                coll.find({})
                  .toArray()
                  .then(docs => {
                    console.log('find after put', docs);
                    db.close();
                  });

                /*
                                coll.findOne({id: ObjectId(idocsid)})
                                  .then(doc => {
                                    console.log('find', doc);
                                    db.close();
                                  });
                */



              })

          })
      })


  })
