// page1
class Page1Activity extends ControllerActivity {
  constructor(pageName) {
    super(pageName)
  }

  onStart() {
    // BaseClass.hideTobar('hide')
    this.view.find('#handler').click((e) => {
      BaseClass.changeHash('page2', '来自page1发送的消息',
        { anim: 'fade', time: 0.5 })   //加入跳转动画
      // BaseClass.changeHash('page2', '来自page1发送的消息')
      this.onDestory();
    })
  }
}

