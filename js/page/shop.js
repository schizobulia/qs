(function () {
    hideTobar('hide');
    initPage();

    function initPage() {
        $('#shoppage > div > div.am-list-news-bd > ul > li > div.content').click(function (e) {
            let uid = $(e.target.parentNode).attr('uid');
            if (uid) {
                if ($(e.target.parentNode).hasClass('content')) {
                    changeHash('shopinfo');
                }
            }
        });
    }

})();