const fs = require('fs')
const uuid = require('uuid/v4')
let list = []
const distDir = './dist/'
const hybridDir = './hybrid-dist/'
let fileList = fs.readdirSync(distDir)


let packageName = 'kernel-' + uuid()+'.zip'
fs.renameSync(hybridDir + 'kernel.zip', hybridDir + packageName)

let json = { packageName, fileList}

fs.writeFileSync(hybridDir+'info.json', JSON.stringify(json))


