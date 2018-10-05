*Ever needed to pretty-print to the console, but not sure how to format it?*

*Working on serverside apps and need a way to display a live dash on the terminal?*
# markdown-console (WIP a bit)
### An npm module to convert markdown to the console!
Simply give it markdown as a string (loading file recommended):
```javascript
const renderTemplate = require('markdown-console')
const fs = require('fs');

fs.readFile('example.md', 'utf8', function (err, contents) {
  renderTemplate(contents)
});
```
### Creates

![screenshot](https://i.imgur.com/oWvRqER.png)

### Templating!
[`live_example.md`](live_example.md)

```javascript
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

```
### Creates
![screenshot](https://i.imgur.com/PhymJcD.png)

Any template literals such as
`${time}` are automatically replaced based on data send.
**Updated LIVE**
