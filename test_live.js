const renderTemplate = require('./index')
const fs = require('fs');

fs.readFile('live_example.md', 'utf8', function (err, contents) {
  setInterval(() => {
    console.clear()
    let date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    renderTemplate(contents, {},
      {
        time: `${hours}:${minutes}:${seconds}`,
        cpu: process.cpuUsage().system,
        cwd: process.cwd()
      })
  }, 700)
});
