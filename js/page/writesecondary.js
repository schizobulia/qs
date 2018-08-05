(function () {
    let dom = $('#writesecondarypage');

    dom.find('form > fieldset > p:nth-child(1) > input').change(function (e) {
        let uid = $(e.target).attr('uid');
        var img = dom.find(`form > fieldset > p:nth-child(1) > img:nth-child(${uid})`);
        showImageByBase64(this, img, 
        function (base64) {});
    });

    hideTobar('hide');

    function close() {
        if (dom) {
            dom = null;
        }
    }
})();