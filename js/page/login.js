(function () {
    hideTobar('hide');
    const dom = $('#loginpage');
    dom.find('#register').click(function (e) {
        $('#btnreglog').text('注册');
        $('#btnreglog').attr('uid', '2');
    });
    dom.find('#btnreglog').click(function (e) {
        let uid = $('#btnreglog').attr('uid');
        if (parseInt(uid) === 1) {
            //登陆
        } else {
            //注册
        }
    });
})();