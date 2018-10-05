const unified = require('unified')
const markdown = require('remark-parse')
const chalk = require('chalk')
const p = process.stdout.write
const fs = require('fs')

function tree(mdString) {
  return unified()
  .use(markdown)
  .parse(mdString)
}

function setFirstLast(node) {
  if (node.type != 'list') return
  if (!node.children) return
  node.children[0].styles.push('firstChild')
  node.children[node.children.length - 1]
    .styles.push('lastChild')
  for (let child in node.children) {
    node.children[child].styles.push('firstListItem')
  }
}

function applyStyleToChildren(node, style) {
  node.styles = node.styles || []
  if(!node.styles.includes(style))
    node.styles.push(style)
  if (style === 'list' || style == 'paragraph') return
  for (let child in node.children) {
    applyStyleToChildren(node.children[child], style)
  }
}

function setStyles(node) {
  if (node.type!=='root')
    applyStyleToChildren(node, node.type)
  if (!node.children || node.children.length === 0) return
  for (let child in node.children) {
    setStyles(node.children[child])
    setFirstLast(node.children[child])
  }
}

function setChalkOut(node) {
  if (node.children) {
    let out = ''
    if (node.type === 'listItem') out += ' · '
    
    for (let child in node.children) {
      out += setChalkOut(node.children[child], out)
    }
    if (node.type === 'paragraph') out += '\n'
    else if (node.type === 'link') out += chalk.blue(` ( ${node.url} )`)
    return out
  }
  const styles = node.styles
  const val = node.value
  let style = chalk.reset
  let decoration = ['', '']
  let unstyledDecoration = ['', '']
  if (styles.includes('heading')) {
    style = style.bold
    decoration = ['\n- ', ' -\n']
  }
  if (styles.includes('link')) { 
    style = style.blue
  }
  if (styles.includes('emphasis')) {
    style=style.italic
  }
  if (styles.includes('code')) {
    unstyledDecoration = [' { ',' } ']
    style=style.inverse
  }
  return unstyledDecoration[0] +
    style(decoration[0] + val + decoration[1]) +
    unstyledDecoration[1]
}

function toChalk(mdString, options) {
  let parseTree = tree(mdString)
  setStyles(parseTree)
  const out = setChalkOut(parseTree)
  return out 
}

function render(mdString, options, data = {}) {
  for (let key of Object.keys(data)) {
    mdString=mdString.replace(('${'+key+'}'), data[key])
  }
  const out = toChalk(mdString, options)
  process.stdout.write(out)
  process.stdout.write('\n')
}

module.exports = render
