'use strict';

//论坛
(function () {
    let a = 's';
    var view = $('#bbspage');
    var bbsData = null;
    // BaseClass.hideTobar('hide');
    view.find('#handler').click(function (e) {
        BaseClass.changeHash('page2', '来自page1发送的消息');
    });
})();