/**
 *const Event = new _Event();
  Event.on('click', (data) => {
    console.log(data);
    Event.remove('click')
  });
  setTimeout(() => {
    Event.emit('click', 'data');
  }, 1000); 
*/
class _Event {
  constructor() {
    this.EVENTARR = [];
  }

  on(name, fun) {
    if (name && name != undefined && (typeof fun === 'function')) {
      this.EVENTARR.push({ name: name, fun: fun });
    } else {
      throw new Error('事件注册失败,请检查参数是否正确!');
    }
  }

  emit(name, data) {
    this.EVENTARR.map((e) => {
      if (e.name === name) {
        e.fun(data);
      } else {
        throw new Error('事件未被注册');
      }
    });
  }

  remove(name) {
    if (!name) {
      return;
    }
    this.EVENTARR.map((e, index) => {
      if (e.name === name) {
        this.EVENTARR = this.EVENTARR.slice(index, 1);
      }
    });
  }

  destory() {
    this.EVENTARR = [];
  }
}