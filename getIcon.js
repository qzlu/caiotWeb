let fs = require('fs')
let cheerio = require('cheerio')
let data = fs.readFileSync('./static/css_font/demo_index.html')
let html = data.toString()
let $ = cheerio.load(html)
let chapters = $('.content.font-class li.dib')
let arr = []
chapters.each(function(item,index) {
    console.log(this)
    let chapter = $(this)
    let icon = {name:chapter.children('.code-name').text().replace(/\./ig,'').trim()}
    arr.push(icon)
})
let json = arr.map(item => JSON.stringify(item))
fs.writeFileSync('./static/css_font/iconfont.json',JSON.stringify(json))