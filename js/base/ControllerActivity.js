/**
 * Controller类 
 * 每个module层会生成一个Controller
 */
class ControllerActivity {
  constructor(pageName) {
    this.pageName = pageName
    this.view = $(`#${pageName}`)
  }

	/**
	 * 创建视图
	 */
  onCreater() {
    this.onStart()
    this.onBindEvent()
    return this.view
  }

	/**
	 *　开始状态
	 */
  onStart() {

  }

  /**
   * 事件绑定
   * 此处的事件绑定并不是硬性要求　只是为了代码的规范性
   */
  onBindEvent() {

  }
  /**
   * 解除事件绑定
   */
  onUnBindEvent() {

  }

  /**
	 * 销毁
	 */
  onDestory() {
    this.onUnBindEvent()
    contentNode.removeChild(this.view[0])
    this.view = null
  }
}