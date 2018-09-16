/**
 * 路由控制层
 */

class RouterController {
  constructor() {
    this.routerArray = []
  }

  /**
   * 注册路由
   * @param {*} path　路径 
   * @param {*} module1 模块名称
   * @param {*} title 页面标题
   */
  push(path, module1, title) {
    let isDefault = false
    if (this.check(path, module1, title) && this.checkPath(path)) {
      console.error('路由异常')
      return
    }
    if (path === '/') {
      isDefault = true
    }
    return this.routerArray.push({ module: path, page: module1, title: title, default: isDefault })
  }
  /**
   * 参数检查 
   * @param  {...any} array 
   */
  check(...array) {
    array.map((element) => {
      if (element === 'undefined' || !element || element === '') {
        console.error('不能为空!!!')
        return true
      }
    })
    return false
  }
  /**
   * 检查路由
   * @param {*} path 
   */
  checkPath(path) {
    this.routerArray.find((element) => {
      if (element.page === path) {
        console.error('该路由已注册')
        return true
      } else {
        return false
      }
    })
  }
  /**
   * 获取所有路由的信息
   */
  getRouter() {
    return this.routerArray
  }

  /**
  * 页面是否被注册
  * @param {*} pageName 
  */
  isHavePage(pageName) {
    return this.routerArray.find((element) => {
      return element.module === pageName
    })
  }

  /**
   * 根据path获取router
   */
  getRouterByPath(path) {
    return this.routerArray.find((element) => {
      if (element.module === path) {
        return element
      }
    })
  }
}

const _Router = new RouterController()

_Router.push('/', 'page1', '首页')
_Router.push('/page2', 'page2', '组件的使用')