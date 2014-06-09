var cheerio = require('cheerio')
var through = require('through2')

function npml () {
  var text = ''
  return through(function (chunk, enc, next) {
    text += chunk
    next()
  }, function (done) {
    this.push(transform(text.toString()))
    
    done()
  })

}

function transform(xml) {
  var $ = cheerio.load(xml)
  var out = {}
  out.name = $('package').attr('name')
  out.version = $('package').attr('version')
  out.author = $('package author').text() + ' <' + $('package author').attr('email') + '>'
  out.repository = $('package repository').text()
  out.readmeFilename = $('package readmeFilename').text()
  out.main = $('package main').text()
  out.license = $('package license').text()
  out.description = $('package description').text()

  object('scripts', function ($el) {
    this[$el.attr('name')] = $el.text()
  })

  object('dependencies', function ($el) {
    this[$el.attr('name')] = $el.attr('version')
  })

  object('devDependencies', function ($el) {
    this[$el.attr('name')] = $el.attr('version')
  })

  array('keywords', function ($el) {
    this.push($el.text())
  })


  function object(propName, fn) {
    out[propName] = {}
    $('package ' + propName + ' *').each(function (i, el) {
      fn.call(out[propName], $(el))
    })
  }

  function array(propName, fn) {
    out[propName] = []
    $('package ' + propName + ' *').each(function (i, el) {
      fn.call(out[propName], $(el))
    })
  }

  return JSON.stringify(out, null, 2)
}

module.exports = npml

if (!module.parent) {
  // eg npml < package.xml > package.json
  process.stdin
    .pipe(npml())
    .pipe(process.stdout)

}