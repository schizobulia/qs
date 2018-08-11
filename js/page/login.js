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
        let name = $('#name').val();
        let password = $('#password').val();
        if (!isAjaxNull(name, password)) {
            return;
        }
        if (name.lenght < 11) {
            alert('学号不能超过11位...')
            return;
        } else if (password.lenght > 11) {
            alert('学号不能超过11位');
            return;
        }

        if (parseInt(uid) === 1) {
            //登陆
            httpGet({
                url: '/student/login',
                data: { studentnumber: name, pass: password }
            }, function (data) {
                user.token = data.token;
                getUserInfo(data.token);
                window.localStorage.setItem('token', data.token);
            });
        } else {
            //注册
            httpGet({
                url: '/student/sign',
                data: { studentnumber: name, pass: password }
            }, function (data) {
                user.token = data.token;
                getUserInfo(data.token);
                window.localStorage.setItem('token', data.token);
            });
        }
    });
})();