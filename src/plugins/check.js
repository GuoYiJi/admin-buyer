var CheckSpace = CheckSpace || {}
var RULE = {
  ImgCode: /^[0-9a-zA-Z]{4}$/,
  SmsCode: /^\d{4}$/,
  MailCode: /^\d{4}$/,
  UserName: /^[\w|\d]{4,16}$/,
  Password: /^[\w!@#$%^&*.]{6,16}$/,
  Mobile: /^1[3|4|5|7|8|9]\d{9}$/,
  RealName: /^[\u4e00-\u9fa5 ]{2,10}$/,
  BankNum: /^\d{10,19}$/,
  Money: /^([1-9]\d*|0)$/,
  Answer: /^\S+$/,
  Mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}
//约定一个数据格式 0，1, 2
// 0 是空 1是成功 2是格式有误
CheckSpace.isEmpty = function(text, msg) {
  var obj = {
    err: true
  }
  if (!text) {
    obj.msgs = msg + '不能为空！'
    obj.err = false
  }
  return obj
}
// CheckSpace.isEmpty1 = function(text,msg ){
//   var obj = {
//     err: true
//   }
//   if(!text) {
//     obj.msgs = msg + '不能为空！'
//     obj.err = false
//   }
//   return obj
// }
CheckSpace.phone = function(text) {
  var data = this.isEmpty(text, '手机号')
  if (!data.err)
    return data.msgs
  if (!RULE.Mobile.test(text)) {

    // myAlert('请输入正确的手机号码！');
    return '请输入正确的手机号码！'
  }
  return
}

CheckSpace.password = function(text) {
  var data = this.isEmpty(text, '密码')
  if (!data.err)
    return data.msgs
  if (!RULE.Password.test(text)) {
    return '请输入6-16位的密码！'
  }
  return
}

CheckSpace.isNull = function(text, errMsg) {
  var data = this.isEmpty(text, errMsg)
  if (!data.err)
    return data.msgs
  return
}

CheckSpace.all = function(arr) {
  // obj格式对应
  // var arr = [{
  //   name: '校验数值1',
  //   plan: '校验方法1'
  // },{
  //   name: '校验数值2',
  //   plan: '校验方法2'
  // },]
  for (var i = 0, j; j = arr[i++];) {
    const name = j.name
    //判断是否存在plan，否的话取errMsg
    if (j.plan) {
      const plan = j.plan
      if (this[plan](name)) {
        return this[plan](name)
      }
    } else {
      const errMsg = j.errMsg
      if (this.isNull(name, errMsg)) {
        return this.isNull(name, errMsg)
      }
    }
    // return

  }
}

export default CheckSpace

// return CheckSpace
