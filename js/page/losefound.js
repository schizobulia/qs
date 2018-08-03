//失物招领
(function () {
    hideTobar('hide');
    initPage();
    function initPage() {
        $('#writeinfo').click(function (e) {
            changeHash('writelose'); 
        });
    }
})();