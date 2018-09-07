
import config from '@/config'

/**
 * 必须注入handleError
 *
 * @param {*} tempFilePath  img url
 * @param {*} callback      success func
 */
function uploadImg (tempFilePath, callback) {
  var that = this
  console.log(tempFilePath)
  console.log(config)
  wx.uploadFile({
    url: config.uploadImageUrl,
    filePath: tempFilePath,
    name: "file",
    formData: {
      name: tempFilePath.substring(10),
      key: "img/${filename}",
      policy: config.imgPolicy,
      OSSAccessKeyId: "6MKOqxGiGU4AUk44",
      success_action_status: "200",
      signature: config.imgSignature
    },
    success: function(res) {
      console.log(res);
      if (res.statusCode == 400) {
        that.handleError("上传的图片大小不能超过2m!");
      } else if (res.statusCode == 200) {
        callback(config.uploadImageUrl + "/img" + tempFilePath.substring(10))
      }
    },
    fail: function(err) {
      console.log(err);
    }
  });
}
export default uploadImg
