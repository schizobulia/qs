//项目的基类
const pages = ['news', 'login', 'userinfo', 'bbs',
    'losefound', 'writelose', 'mylosefound', 'shop', 'shopinfo'
    , 'secondary', 'writesecondary', 'parttime', 'collegenotice'
    , 'bbsmanagement', 'bbsinfo']; //所有页面page的名称   在使用页面前请先再些注册
const pageTiles = ['智慧校园', '登陆', '个人信息', '论坛',
    '失物招领', '填写基本信息', '我的物品', '商家活动', '活动信息',
    '二手市场', '上传物品信息', '兼职', '学院通知', '论坛管理', '具体信息'];
const baseUrl = 'http://www.cmycgzs.com';  //api接口
const contentNode = $('#content')[0];  //主内容
const otherPlugNode = $('#otherplug')[0]; //对话框之类
const commentsNode = $('#comments');   //评论模块的父node
const defaultPage = pages[0]; //默认显示主页
let isHomePage = true;  //用户是否在主页

/**
 * 模块间通信
 */
let HandlerModule = {
    commentType: 'bbs',   //评论时提交的类型
    bbsTypes: ['游戏', '新闻'],
}
let user = {};
//错误码
const ErrorMsg =
    {
        0: '失败',
        100: '内容长度不能超过100',
        12: '内容长度不能超过12',
        11: '参数不全',
        5: '未登录',
        6: '已登陆',
        8: '任务未完成,无法提交',
        9: '任务已提交,无法再次提交',
        13: '查无此任务',
    };

initPage();

window.onhashchange = function () {
    startPage();
}

/**
 * 跳转页面
 * @param {*} params 
 */
function startPage() {
    let pageName = window.location.hash;
    pageName = pageName.slice(1, pageName.length);
    hideComments();  //如果用户直接单击返回home 则隐藏评论区
    if (inArray(pages, pageName)) {
        isHomePage = false;
        closeSidebar();
        backHome();
        readHTML(pageName, function (html) { });
    } else {
        isHomePage = true;
        $('#header').css('height', '35%');
        hideTobar('show');
        readHTML(defaultPage, function (html) { });
    }
    changeHeadeLeft();
}

function backHome() {
    $('#backhome').click(function (e) {
        changeHash('');
        hideComments();
    })
}

window.onload = function () {
    startPage();
}
/**
 * 修改头部返回按钮
 * @param {*} isHome 
 */
function changeHeadeLeft() {
    if (isHomePage) {
        $('#header #windowback').css('display', 'none');
        $('#header > button > i').removeClass('am-icon-chevron-left').addClass('am-icon-bars');
    } else {
        $('#header #windowback').css('display', 'block');
        $('#header > button > i').removeClass('am-icon-bars').addClass('am-icon-chevron-left');
    }
}

//初始化页面
function initPage() {
    const token = window.localStorage.getItem('token');
    if (token) {
        user.token = token;
        getUserInfo();
    }
    silderTabClick();
}

/**
 * 关闭侧别栏
 */
function closeSidebar() {
    const silder = $('#sidebar');
    silder.offCanvas('close');
}

/**
 * 显示模块页面
 * @param {*} pageName 
 * @param {*} pageData 
 */
function setShowPage(pageName, pageData) {
    contentNode.innerHTML = pageData;
}

/**
 * 是否隐藏轮播图
 * @param {*} type 
 */
function hideTobar(type) {
    if (type === 'hide') {
        $('#header').css('height', '8%');
        $('#silderouter').css('display', 'none');
    } else {
        $('#silderouter').css('display', 'block').css('top', '8%');
        $('#header').css('height', '35%');
    }
}

/**
 * 是否有譔页面
 * @param {*} array 
 * @param {*} pageName 
 */
function inArray(array, pageName) {
    for (let index = 0; index < array.length; index++) {
        if (array[index] === pageName) {
            return true;
        }
    }
    return false;
}

/**
 * 加载指定js文件
 * @param {*} pageName 
 */
function loadPageScrpat(pageName, sucCallback) {
    $.getScript(window.location.origin + '/js/page/' + pageName + '.js', function () {
        sucCallback();
    });
}

/**
 * 从数组中获取arr[key] == value 的所有数据 并生成新arr
 * @param {*} arr 
 * @param {*} key 
 * @param {*} value 
 */
function getArrayByKey(arr, key, value) {
    const array = arr.map((element, index, c) => {
        if (element[key] === value) {
            return element;
        } else {
            return null;
        }
    });
    return array;
}

/**
 * 传人参数是否为空
 * @param {*} array 
 */
function isAjaxNull(...array) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element === 'undefined' || !element || element === '') {
            alert('输入不能为空!');
            return false;
        }
    }
    return true;
}


/**
 * get请求
* @param {*} ajaxData 
* @param {*} sucCallback 
*/
function httpGet(ajaxData, sucCallback) {
    loadingDailog('show', '加载中...');
    if (user.token) {
        ajaxData.data.token = user.token;
    } else {
        ajaxData.data.token = 0;
    }

    $.ajax({
        type: 'get',
        url: baseUrl + ajaxData.url,
        dataType: 'json',
        async: false,
        data: ajaxData.data,
        success: function (msg) {
            if (parseInt(msg.code) == 1) {
                sucCallback(msg);
            }
            else {
                alert(msg.error);
            }
            loadingDailog('hide');
        },
        error: function (err) {
            console.log(err);
            loadingDailog('hide');
            alert('服务器异常, 请刷新重试!');
        },
    });
}

function postHttp(url, formData, sucCallback) {
    loadingDailog('show', '加载中...');
    if (user.token) {
        formData.append('token', user.token);
    } else {
        formData.append('token', 0);
    }

    $.ajax({
        url: baseUrl + url,
        data: formData,
        method: 'POST',
        contentType: false,
        processData: false,
        success: function (data) {
            if (parseInt(data.code) === 1) {
                sucCallback(data);
            }
            loadingDailog('hide');
        },
        error: function (responseStr) {
            console.error(responseStr);
            loadingDailog('hide');
            alert('网络异常,请刷新界面重试!');
        }
    });
}



/**
 * 获取单个页面
 * @param {*} sucCallback 
 */
function readHTML(pageName, sucCallback) {
    if (!inArray(pages, pageName)) {
        return;
    }
    loadingDailog('show', '加载中...');
    $.ajax({
        async: false,
        url: `/page/${pageName}.html`,
        success: function (result) {
            loadingDailog('hide');
            setShowPage(pageName, result);
            sucCallback(result);
            changePageTitle(pageName);
            loadPageScrpat(pageName, function () { });
        },
        error: function (err) {
            loadingDailog('hide');
            console.log(err);
        },
    });
}
/**
 * 修改主页title
 * @param {*} title 
 */
function changePageTitle(pageName) {
    let i = pages.indexOf(pageName);
    $('#pagetitle').text(pageTiles[i]);
}

/**
 * 显示基础的对话框
 * @param {*} title 
 * @param {*} content 
 * @param {*} sucCallback   确定之后的回调
 */
function showDialog(title, content, sucCallback) {
    let html = `<div class="am-modal am-modal-confirm" tabindex="-1" id="basedialog"><div class="am-modal-dialog"><div class="am-modal-hd">${title}</div><div class="am-modal-bd">${content}</div><div class="am-modal-footer"><span class="am-modal-btn" data-am-modal-cancel>取消</span><span class="am-modal-btn" data-am-modal-confirm>确定</span></div></div></div>`;
    otherPlugNode.innerHTML = html;
    $('#basedialog').modal({
        relatedTarget: this,
        onConfirm: function () {
            sucCallback();
        },
        // closeOnConfirm: false,
        onCancel: function () {
        }
    });
}

/**
 * 显示加载动画
 * @param {*} type  如果为show 显示   其他隐藏 
 * @param {*} node  用户单击显示加载动画的  标签
 * @param {*} content 显示的内容
 */
function loadingDailog(type, content) {
    if (type === 'show') {
        let html = `<div class="am-modal am-modal-loading am-modal-no-btn" tabindex="-1" id="loaddialog"><div class="am-modal-dialog"><div class="am-modal-hd">${content}</div><div class="am-modal-bd"><span class="am-icon-spinner am-icon-spin"></span></div></div></div>`
        otherPlugNode.innerHTML = html;
        $('#loaddialog').modal('toggle');
    } else {
        $('#loaddialog').modal('close');
        otherPlugNode.innerHTML = '';
    }
}

/**
 * 侧别栏的单击跳转事件
 */
function silderTabClick() {
    $('#sidebarlist').click(function (e) {
        let pageName = $(e.target).attr('uid');
        if (inArray(pages, pageName)) {
            changeHash(pageName);
        }
    });

    $('#windowback').click(function (e) {
        window.history.back();
    });
}
/**
 * 修改页面hash
 * @param {*} hash 
 */
function changeHash(hash) {
    window.location.href = window.location.origin + `#${hash}`;
}


/**
 * 获取用户基本信息
 * @param {*} token 
 */
function getUserInfo(token) {
    httpGet({
        url: '/student/findstudent',
        data: {},
    }, function (data) {
        user.info = data.data;
        $('#loginheader > span').css('display', 'none');
        $('#loginbtn').css('display', 'none');
        $('#usericon').css('display', 'block');
        if (user.info.image) {
            $('#usericon').attr('src', user.image);
        }
        // changeHash('');
    });
}
/*
三个参数
file：一个是文件(类型是图片格式)，
w：一个是文件压缩的后宽度，宽度越小，字节越小
objDiv：一个是容器或者回调函数
photoCompress()
*/
function photoCompress(file, w, objDiv) {
    var ready = new FileReader();
    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    ready.readAsDataURL(file);
    ready.onload = function () {
        var re = this.result;
        canvasDataURL(re, w, objDiv)
    }
}
function canvasDataURL(path, obj, callback) {
    var img = new Image();
    img.src = path;
    img.onload = function () {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.7;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
    }
}
/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData) {
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

/**
 * 压缩并显示图片  返回压缩过的图片
 * @param {*} that 
 * @param {*} imgNode 
 * @param {*} callback 
 */
function showImageByBase64(that, imgNode, callback) {
    var file = that.files[0];
    var fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onloadend = function (e) {
        imgNode.attr('src', e.target.result);
        photoCompress(file, {
            quality: 0.2
        }, function (base64Codes) {
            //这里bl 为文件对象
            // var formData = new FormData();
            // var bl = convertBase64UrlToBlob(base64Codes);
            // formData.append("image", bl, "file_" + Date.parse(new Date()) + ".jpg"); // 文件对象
            // upload(e.target.result, formData);
            callback(base64Codes);
        });
    }
}

/**
 * 隐藏评论模块
 */
function hideComments() {
    $('#comments .content').html();
    commentsNode.fadeOut(500);
    $(contentNode).show();
}

/**
 * 显示评论模块
 * @param {*} array 
 */
function showComments(array, uid) {
    let html = '';
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        html += `<article class="am-comment">
        <a href="#link-to-user-home">
            <img src="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/96/h/96" alt="" class="am-comment-avatar" width="48" height="48"></a>
        <div class="am-comment-main"><header class="am-comment-hd">
            <div class="am-comment-meta">
            <a href="#link-to-user" class="am-comment-author"></a> 评论于
            <time datetime="${element.time}" title="${element.time}">${element.time}</time>
            </div></header><div class="am-comment-bd">
                <p>${element.cont}</p>
            </div></div></article>`
    }
    $('#comments .content').html(html).attr('uid', uid);
    commentsNode.show();
    $(contentNode).hide();
}
//评论
function saveComment(sucCallback) {
    $('#comments #savecomment').click(function () {
        $('#commentprompt').modal({
            relatedTarget: this,
            onConfirm: function (e) {
                if (e.data) {
                    sucCallback(e.data);
                } else {
                    alert('输入不能为空');
                }
                // alert('你输入的是：' + e.data || '')
            },
            onCancel: function (e) { }
        });
    });
    $('#comments #closecomment').click(function () {
        commentsNode.hide();
        $(contentNode).show();
    });
}


