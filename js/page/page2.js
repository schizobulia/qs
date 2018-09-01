'use strict'

//page2

(function () {
  let view = $('#page2page')
  // BaseClass.hideTobar('hide')

  /**
   * 多图上传组件代码
   * =============
   */

  let numbers = 2
  let pNode = view.find('#componentupload')
  BaseClass.Component.uploadImg(pNode, numbers, (files) => {
    console.log(files)
  })

  /**
   * 接收Page1发送的消息
   * =============
   */
  let handleData = BaseClass.getPageHandler('page2')
  console.log(handleData)
  /**
   * 提示信息
   * =============
   */
  view.find('#toast').click(function (e) {
    BaseClass.Component.toast('内容', 'warning', 3000)
    // BaseClass.Component.toast('内容')
  })

  view.find('#loadingdialog').click((e) => {
    BaseClass.Component.loadingDailog('show', '加载中...')
  })
})()
