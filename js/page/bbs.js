//论坛
(function () {
    let view = $('#bbspage');
    hideTobar('hide');
    initPage();

    function initPage() {
        $('.mcomment').click(function (e) {
            HandlerModule.commentType = 'bbs';
            showComments([1, 2, 3, 4, 5]);
        })
    }
})();