//新闻
(function () {
    /**
 * 初始化后绑定事件
 */
    function initBind() {
        $('#loginbtn').click(function (e) {
            changeHash('login');
        });
        $('#indexpage').click(function (e) {
            var pageName = $(e.target.parentNode).attr('uid');
            if (inArray(pages, pageName)) {
                changeHash(pageName);
            }
        });
    }
    initBind();
})();