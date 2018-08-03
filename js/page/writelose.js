// 填写失物招领的信息
(function () {
    hideTobar('show');
    initPage();
    function initPage() {
        $('#fileimage1').change(function () {
            showImageByBase64(this, $('#writelosepage > form > fieldset > p:nth-child(1) > img:nth-child(1)'), 
            function (base64) {});
        });
        $('#fileimage2').change(function () {
            showImageByBase64(this, $('#writelosepage > form > fieldset > p:nth-child(1) > img:nth-child(3)'), 
            function (base64) {});
        });

    }
})();