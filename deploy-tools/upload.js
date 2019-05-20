const secret = require('./secret.json')
const accessKey = secret.AK;
const secretKey = secret.SK;
const bucketName = secret.bucketName;
const qiniu = require("qiniu")
const fs = require("fs")

let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


// 删除冲突文件
let config = new qiniu.conf.Config();
config.useHttpsDomain = true;
config.zone = qiniu.zone.Zone_z0;
let bucketManager = new qiniu.rs.BucketManager(mac, config);

let filesToDelete = ["info.json", "index.html"]

filesToDelete.forEach(key => {
    bucketManager.delete(bucketName, key, function(err, respBody, respInfo) {
        if (err) {
          console.log(err);
          //throw err;
        } else {
          if(respInfo.statusCode==200){
              console.log(`${key} - 删除成功`)
          } else {
            console.log(`${key} - ${respInfo.data.error}`)
          }
        }
      });
})

// 获取待上传的文件
let hybridDist = fs.readdirSync('./hybrid-dist')
hybridDist = hybridDist.filter((filename) => {
    return !filename.startsWith('.')
})

// 构造上传凭据
let options = {
    scope: bucketName,
  };
let putPolicy = new qiniu.rs.PutPolicy(options);
let uploadToken=putPolicy.uploadToken(mac);
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra()

console.log('等待文件删除完成...')
setTimeout(()=>{
  hybridDist.forEach((key) => {
    formUploader.putFile(uploadToken, key, `./hybrid-dist/${key}`, putExtra, function(respErr,
        respBody, respInfo) {
        if (respErr) {
          throw respErr;
        }
        if (respInfo.statusCode == 200) {
          console.log(respBody);
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
        }
      });
})
}, 3000)

// let cdnManager = new qiniu.cdn.CdnManager(mac);
// let urlsToRefresh = [
//   "https://hybrid-ios.myseu.cn/info.json",
//   "https://hybrid-ios.myseu.cn/index.html"
// ]
// setTimeout(()=>{
//   cdnManager.refreshUrls(urlsToRefresh, function(err, respBody, respInfo) {
//     if (err) {
//       throw err;
//     }
//     console.log(respInfo.statusCode);
//     if (respInfo.statusCode == 200) {
//       var jsonBody = JSON.parse(respBody);
//       console.log(jsonBody.code);
//       console.log(jsonBody.error);
//       console.log(jsonBody.requestId);
//       console.log(jsonBody.invalidUrls);
//       console.log(jsonBody.invalidDirs);
//       console.log(jsonBody.urlQuotaDay);
//       console.log(jsonBody.urlSurplusDay);
//       console.log(jsonBody.dirQuotaDay);
//       console.log(jsonBody.dirSurplusDay);
//     }
//   });
// }, 6000)







