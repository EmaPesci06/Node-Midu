const path = require('node:path')

console.log(path.sep)

const filepath = path.join('/content', 'subfolder', 'test.txt')
console.log(filepath)

const base = path.basename('/tmp/midu-secret-files/password.txt')
console.log(base)
