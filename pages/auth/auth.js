import { login } from '../../utils/promisewx.js'
import { getToken } from '../../request/auth.js'


Page({
  // --------- 事件处理函数 -------------
  handleGetUserInfo (e) {
    const { encryptedData, rawData, iv, signature } = e.detail
    let code = ''
    login().then(res => {
      code = res.code
      const loginParams = {
        encryptedData,
        rawData,
        iv,
        signature,
        code
      }
      getToken(loginParams).then(res => {
        console.log(res) // 需要企业账号，否则无法获取token
      })
      .catch(err => {
        console.log('token获取失败', err)
      })
    })
    .catch(err => {
      console.log(err, '登录出错，无法拿到code')
    })
    
  }
})