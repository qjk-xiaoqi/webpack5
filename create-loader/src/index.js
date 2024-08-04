import './index.css'
import txt from 'my-async-loader!./async.txt'

import md from './mk.md'

document.write('hello wp')

document.write(`</br>异步loader: ${txt}`)

const div = document.createElement('div')
div.className = 'img2'
div.innerHTML = `${md}`
document.body.appendChild(div)
