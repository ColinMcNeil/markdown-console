const renderTemplate = require('./index')
const fs = require('fs');

fs.readFile('example.md', 'utf8', function (err, contents) {
  renderTemplate(contents)
});
