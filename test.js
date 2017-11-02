var tv4 = require('tv4'),
  formats = require('tv4-formats'),
  validator = tv4.freshApi(),
  chance = new require('chance')();

validator.addFormat(formats);

const schema = {
  "title": "Contact",
  "type": "object",
  "properties": {
  "id": {
    "type": "string",
    "format": "guid"
  },
  "name": {
    "type": "string"
  },
  "age": {
    "description": "Age in years",
      "type": "integer",
      "minimum": 0
  }
},
  "required": ["id", "name", "age"]
}


const val = {
  id: chance.guid(),
  // id: 'http://www.lala.com',
  name: 'dank',
  age: 50
};
const result = validator.validateMultiple(val, schema)
result.errors = result.errors.map(x => {
  delete x.stack;
  return x;
})
console.log(val);
console.log(result);
// console.log(validator.error);
