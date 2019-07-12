const client = require('scp2')
 // 部署上线
 client.scp('./dist', {
    host: '172.172.172.37',
    prot:21,
    username: 'administrator',
    password: '123456',
    path: 'D:\WebSite\Caiot\test'
  }, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('文件上传完毕!\n')
    }
  })