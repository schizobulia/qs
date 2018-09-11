/**
 * 组件类
 * 在真实项目使用时如果不使用该类 可以删除
 */
class Component {
  /**
   * 上传图片的组件
   * @param {*} pNode  父节点
   * @param {*} number 数量
   * @param {*} callback 
   */
  uploadImg(pNode, number, callback) {
    let imgs = []
    let parentImgNode = document.createElement('div')
    let html = ''
    html += '<div class="am-form-group am-form-file"><button type="button" class="am-btn am-btn-danger am-btn-sm">\n        <i class="am-icon-cloud-upload"></i> 上传</button>\n      <input id="uploadimg" accept="image/*" type="file" multiple></div><div id="file-list"></div>'
    $(parentImgNode).html(html)
    pNode.append(parentImgNode)
    pNode.find('#uploadimg').on('change', function () {
      callback(imgs)
      if (imgs.length >= number) {
        BaseClass.Component.toast('\u6700\u591A\u53EA\u80FD\u4E0A\u4F20' + number + '\u5F20\u56FE\u7247.')
        return
      }
      let file = this.files[0]
      let uid = new Date().getTime()
      let imgNode = document.createElement('img')
      $(imgNode).addClass('uploadimgitem').attr('uid', uid)
      showImageByBase64(file, $(imgNode), function (blob) {
        imgs.push({ file: blob, id: uid })
        pNode.find('#file-list').append(imgNode)
        $(imgNode).click(function (e) {
          // let imguid = $(e.target).attr('uid')
          imgs.map((element, index) => {
            if (element.id === uid) {
              imgs.splice(index, 1)
              pNode.find('#file-list')[0].removeChild(this)
              callback(imgs)
            }
          })
        })
      })
    })

    html = ''
    parentImgNode = null
  }
  /**
   * 提示信息
   * @param {*} content 
   * @param {*} type [primary, secondary, success, warning, danger, success]
   * @param {*} time 
   */
  toast(content, type, time) {
    $(otherPlugNode).html(`
						<span class= "toast am-badge am-badge-${type || 'warning'}" > ${content}</span>`).show()
    $(otherPlugNode).fadeIn(500, () => {
      $(otherPlugNode).fadeOut(time || 100, () => {
        $(otherPlugNode).html(``)
      })
    })
  }

  /**
   * 显示加载动画
   * @param {*} type  如果为show 显示   其他隐藏 
   * @param {*} content 显示的内容
   */
  loadingDailog(type, content) {
    if (type === 'show') {
      let html = '<div class="am-modal am-modal-loading am-modal-no-btn" tabindex="-1" id="loaddialog"><div class="am-modal-dialog"><div class="am-modal-hd">' + content + '</div><div class="am-modal-bd"><span class="am-icon-spinner am-icon-spin"></span></div></div></div>'
      otherPlugNode.innerHTML = html
      $(otherPlugNode).show()
      $('#loaddialog').modal('toggle')
      html = ''
    } else {
      $('#loaddialog').modal('close')
      $(otherPlugNode).hide()
      otherPlugNode.innerHTML = ''
    }
  }

	/**
	 * 通知栏
	 * @param {*} title 
	 * @param {*} content 	
	 * @param {*} type   		[primary, secondary, success, warning, danger, success]
	 * @param {*} callback  单击关闭后的回调
	 * @param {*} location  可选 
	 */
  notification(title, content, type, callback, location) {
    let divNode = document.createElement('div')
    let html = `<div id = "notification" class= "component" > <div class="am-alert am-alert-${type}">
							<button type="button" class="am-close" id="close">&times;</button><h4><i class="am-icon-success"></i> ${title}</h4>
							${content}</div></div > `
    divNode.innerHTML = html
    if (location === 'bottom') {
      $(divNode).find('#notification').css('top', '85%')
    }
    contentNode.append(divNode)
    $(divNode).find('#close').click((e) => {
      contentNode.removeChild(divNode)
      divNode = null
      callback()
    })
    html = ''
  }

  /**
  * 显示基础的对话框
  * @param {*} title 
  * @param {*} content 
  * @param {*} sucCallback   确定之后的回调
  */
  dialog(title, content, sucCallback) {
    let html = '<div class="am-modal am-modal-confirm" tabindex="-1" id="basedialog"><div class="am-modal-dialog"><div class="am-modal-hd">' + title + '</div><div class="am-modal-bd">' + content + '</div><div class="am-modal-footer"><span class="am-modal-btn" data-am-modal-cancel>\u53D6\u6D88</span><span class="am-modal-btn" data-am-modal-confirm>\u786E\u5B9A</span></div></div></div>'
    otherPlugNode.innerHTML = html
    $(otherPlugNode).show()
    $('#basedialog').modal({
      relatedTarget: undefined,
      onConfirm: function onConfirm() {
        sucCallback()
      },
      // closeOnConfirm: false,
      onCancel: function onCancel() { }
    })
    html = null
  }
}
