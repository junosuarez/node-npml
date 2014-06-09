var chai = require('chai')
chai.should()
var fs = require('fs')
var concat = require('concat-stream')

describe('npml', function () {
  var npml = require('../')
  
  it('is a stream', function () {

    var n = npml()

    n.pipe.should.be.a('function')

  })

  // it('concats the thing', function (done) {
  //   var n = npml()

  //   n.write('a')
  //   n.write('b')
  //   n.write('c')
  //   n.end()
  //   n.on('data', function (d) {
  //     d.toString().should.equal('abc')
  //     done()
  //   })
  // })

  it('parses xml', function (done) {
    fs.createReadStream('./package.xml')
      .pipe(npml())
      .on('error',done)
      .pipe(concat(function (transformed) {
        transformed = transformed[0]
        transformed.should.be.an.object
        transformed.should.deep.equal(require('../package.json'))
        done()
      }))
  })
})