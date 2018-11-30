/**
_Event.on('click', (data) => {
  console.log(data);
});
_Event.on('click1', (data) => {
  console.log(data);
});

_Event.emit('click', 'click data');
_Event.emit('click1', 'click data1'); 
*/

class MEvent {

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

const _Event = new MEvent()



