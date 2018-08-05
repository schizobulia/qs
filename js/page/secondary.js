//二手市场
(function () {
    let dom = $('#secondarypage');

    dom.find('#secondary').click(function () {
        changeHash('writesecondary');
        close();
    });

    hideTobar('hide');
    function close() {
        if (dom) {
            dom = null;
        }
    }
})();