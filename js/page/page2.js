'use strict';

//page2
(function () {
    var view = $('#page2page');
    var bbsData = null;
    console.log('page2');
    // BaseClass.hideTobar('hide');

    /**
     * 多图上传组件代码
     * =============
     */
    var imgs = [];
    var numbers = 2;
    BaseClass.uploadImg(view, numbers, function (file) {
        if (imgs.length >= numbers) {
            alert('\u6700\u591A\u53EA\u80FD\u4E0A\u4F20' + numbers + '\u5F20\u56FE\u7247.');
            return;
        }
        var uid = new Date().getTime();
        var imgNode = document.createElement('img');
        $(imgNode).addClass('uploadimgitem').attr('uid', uid);
        showImageByBase64(file, $(imgNode), function (blob) {
            imgs.push({ file: blob, id: uid });
            view.find('#file-list').append(imgNode);
            $(imgNode).click(function (e) {
                var that = this;
                var imguid = $(e.target).attr('uid');
                imgs.map(function (element, index) {
                    if (element.id == uid) {
                        imgs.splice(index, 1);
                        view.find('#file-list')[0].removeChild(that);
                    }
                });
            });
        });
    });
    /**
     * =============
     */
})();