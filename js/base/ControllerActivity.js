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
    return this.view
  }
	/**
	 *　开始状态
	 */
  onStart() {

  }

	/**
	 * 销毁
	 */
  onDestory() {
    contentNode.removeChild(this.view[0])
    this.view = null;
  }
}