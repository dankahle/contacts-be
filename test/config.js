const expect = require('chai').expect;
const dev = require('../config/development');

describe.only('dev config tests', () => {

  it('should have database set to contacts', () => {
    expect(dev.database).to.equal('mongodb://localhost/contacts');
  })

})
