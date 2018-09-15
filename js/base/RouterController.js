/**
 * 路由控制层
 */

class RouterController {
  constructor() {
    this.routerArray = []
  }

  /**
   * 注册路由
   * @param {*} path 
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

  getRouter() {
    return this.routerArray
  }
}

const _Router = new RouterController()

_Router.push('/', 'page1', '首页')
_Router.push('/page2', 'page2', '组件的使用')