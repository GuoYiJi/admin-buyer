function getCtx (selector) {
  const pages = getCurrentPages()
  const ctx = pages[pages.length - 1]

  const componentCtx = ctx.selectComponent(selector)

  if (!componentCtx) {
    console.error('无法找到对应的组件，请按文档说明使用组件')
    return null
  }
  return componentCtx
}

function Toast (options) {
  const { selector = '#toast' } = options
  const ctx = getCtx(selector)

  ctx.handleShow(options)
}

Toast.hide = function (selector = '#toast') {
  const ctx = getCtx(selector)

  ctx.handleHide()
}

function Message (options) {
  console.log(options)
  const { selector = '#message' } = options
  console.log(selector)
  const ctx = getCtx(selector)

  ctx.handleShow(options)
}


/*获取当前页url*/
function getCurrentPageUrl(num = 1){
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length-num -1 ]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs(num = 1){
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length-num - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options
  
  //拼接url的参数
  var urlWithArgs = url + '?'
  for(var key in options){
      var value = options[key]
      urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length-1)
  
  return urlWithArgs

}
function showSucc (title="成功"){
  wx.showToast({
    title: title,
    icon: 'success',
    duration: 2000
  })
}
// function unique(arr) {
//   const res = new Map();
//   return arr.filter((a) => !res.has(a) && res.set(a, 1))
// }

module.exports = {
  $Toast: Toast,
  $Message: Message,
  $getUrl: getCurrentPageUrl,
  $getQuery: getCurrentPageUrlWithArgs,
  $success: showSucc,
  // $quchong: unique,
}
