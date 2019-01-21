const client = require('scp2')
 // 部署上线
 client.scp('./dist', {
    host: '47.106.64.130',
    username: 'administrator',
    password: 'Szqr2018',
    path: 'D:\WebSite\CaiotForm\mytest'
  }, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('文件上传完毕!\n')
    }
  })