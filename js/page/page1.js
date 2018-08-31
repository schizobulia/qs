'use strict';

//论坛
(function () {
    let a = 's';
    var view = $('#page1page');
    var bbsData = null;
    // BaseClass.hideTobar('hide');
    view.find('#handler').click(function (e) {
        BaseClass.changeHash('page2', '来自page1发送的消息',
            { anim: 'fade', time: 0.5 });   //加入跳转动画

        // BaseClass.changeHash('page2', '来自page1发送的消息');
    });
})();