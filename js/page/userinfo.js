//个人用户信息
(function () {
    var dom = $('#userinfo');
    hideTobar('show');
    initPage();
    function initPage() {
        var muser = user.info;
        dom.find('#name').text(muser.name || '无');
        dom.find('#sex').text(muser.name || '不明');
        dom.find('#studycode').text(muser.studentnumber || '无');
        dom.find('#department').text(muser.department || '无');
        // dom.find('#mclass').text(muser.name || '无');
        dom.find('#integral').text(muser.integral || '无');
        dom.find('#name').text(muser.name || '无');
        httpGet({
            url: '/student/findstudentshool',
            data: { },
        }, (data) => {
           user.info.school = data.data.shoolname;
           dom.find('#school').text(data.data.shoolname || '无');
        });
    }
})();