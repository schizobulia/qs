//page2
class Page2Activity extends ControllerActivity {
  constructor(pageName) {
    super(pageName)
    this.toast = null
    this.loadingdialog = null
    this.notification = null
    this.dialog = null
  }

  onStart() {
    let view = this.view
    this.dialog = view.find('#dialog')
    this.notification = view.find('#notification')
    this.loadingdialog = view.find('#loadingdialog')
    this.toast = view.find('#toast')
    view = null
  }
  onBindEvent() {
    /**
    * 多图上传组件代码
    * =============
    */
    let numbers = 2
    let pNode = this.view.find('#componentupload')
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
    this.toast.bind('click', (e) => {
      BaseClass.Component.toast('内容', 'warning', 5)
      // BaseClass.Component.toast('内容')
    })

    /**
     * 加载动画
     * =============
     */
    this.loadingdialog.bind('click', (e) => {
      BaseClass.Component.loadingDailog('show', '加载中...')
    })

    /**
     * 通知栏 
     * =============
     */
    this.notification.bind('click', (e) => {
      BaseClass.Component.notification('标题', '这里内容', 'success', () => {
        console.log('关闭')
      }, 'top')
      // BaseClass.Component.notification('标题', '这里内容', 'success', () => {
      //   console.log('关闭')
      // }, 'bottom')
    })

    this.dialog.bind('click', (e) => {
      BaseClass.Component.dialog('跪求SSR...', 'success', () => {
        console.log('关闭')
      })
    })
  }

  onUnBindEvent() {
    this.dialog.unbind('click')
    this.notification.unbind('click')
    this.loadingdialog.unbind('click')
    this.toast.unbind('click')
  }
}
