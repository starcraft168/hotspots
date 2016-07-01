var expect = require('chai').expect;
var request = require('supertest');

describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('server');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
});


/*
update test for the following
addPost
updatePost
removePost
*/
