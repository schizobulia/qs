// page1
(function () {
  class Page1Activity extends View {
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
  // 这里不应该生成Activity　不应该暴露在外部
  new Page1Activity('page1').onCreater()
})()

