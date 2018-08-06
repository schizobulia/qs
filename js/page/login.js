(function () {
    hideTobar('hide');
    const dom = $('#loginpage');
    dom.find('#register').click(function (e) {
        let uid = $('#btnreglog').attr('uid');
        let btndom = $('#btnreglog');
        if (parseInt(uid) === 2) {
            //登陆
            btndom.text('注册');
            $('#register').text('登陆');
            btndom.attr('uid', '1');
        } else {
            //注册
            $('#register').text('注册');
            btndom.text('登陆');
            btndom.attr('uid', '2');
        }
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