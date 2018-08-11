// 论坛管理
(function () {
    hideTobar('show');
    initPage();

    function initPage() {
        $('#bbsmanagementpage .see').click(function (e) {
            changeHash('bbsinfo');
        });
    }

})();