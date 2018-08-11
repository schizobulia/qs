//单个论坛信息
(function () {
    hideTobar('hide');
    let dom = $('#bbsinfopage');
    initPage();
    function initPage() {
        dom.find('#del').click(function (e) {
            showDialog('是否确定删除?', '', function () {
                changeHash('bbsmanagement');
                close();
            });
        });
    }

    function close() {
        if (dom) {
            dom = null;
        }
    }
})();