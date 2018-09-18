// page1
class Page1Activity extends ActivityController {

  constructor(pageName) {
    super(pageName)
    this.hanlder = null
  }

  onStart() {
    this.hanlder = this.view.find('#handler')
    // BaseClass.hideTobar('hide')
  }

  onBindEvent() {
    this.hanlder.bind('click', (e) => {
      BaseClass.changeHash('page2/page1', { key: 'value' },
        { anim: 'fade', time: 0.5 })   //加入跳转动画
      // BaseClass.changeHash('page2', '来自page1发送的消息')
      this.onDestory()
    })
  }

  onUnBindEvent() {
    this.hanlder.unbind('click')
    this.hanlder = null
  }
}

