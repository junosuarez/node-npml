# npml
generate node packages with simple xml!

## usage

first, write a sensible configuration file, like:
```xml
<?xml version='1.0' encoding='UTF-8' ?>
<package xmlns="http://npm.im/npml" name="npml" version="0.1.0">
  <author email="jason@denizac.org">jden</author>
  <description>generate node packages with simple xml!</description>
  <keywords>
    <keyword>xml</keyword>
    <keyword>the best</keyword>
    <keyword>so extensible</keyword>
    <keyword>very markup</keyword>
    <keyword>such enterprise</keyword>
    <keyword>wow</keyword>
  </keywords>
  <main>index.js</main>
  <scripts>
    <script name="test">mocha</script>
    <script name="start">node index.js</script>
  </scripts>
  <repository>git@github.com:jden/node-npml.git</repository>
  <license>ISC</license>
  <readmeFilename>README.md</readmeFilename>
  <dependencies>
    <dependency name="cheerio" version="^0.16.0" />
    <dependency name="through2" version="^0.5.1" />
  </dependencies>
  <devDependencies>
    <dependency name="chai" version="^1.9.1" />
    <dependency name="mocha" version="^1.19.0" />
    <dependency name="concat-stream" version="^1.4.6" />
  </devDependencies>
</package>
```
Now wouldn't it be awesome if npm just let you use that directly? Sadly, it doesn't - but that's where npml comes it! With this tool, you can write the xml you love while automatically generating the fragile, application-specific format used by package.json.

So, once we have the above xml, we can *automatically* generate that package.json file like so:

```console
$ cat package.xml | npml > package.json
```

The advantages of this technique are obvious, but the main one is worth calling out: you get to continue to use your full xml toolchain, so it's easy to generate, validate, and transform package configurations coming from any environment. And since it's xml, you can extend it with your own tags and formats if you want.

## installation

    $ npm install -g npml


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>


## license

ISC. (c) MMXIV jden <jason@denizac.org>. See LICENSE.md
