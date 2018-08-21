'use strict';

//项目的基类
var pages = ['bbs']; //所有页面page的名称   在使用页面前请先再些注册
var pageTiles = ['智慧校园'];

var baseUrl = 'http://www.cmycgzs.com'; //api接口
var contentNode = $('#content')[0]; //主内容
var otherPlugNode = $('#otherplug')[0]; //对话框之类
var commentsNode = $('#comments'); //评论模块的父node
var defaultPage = pages[0]; //默认显示主页
var isHomePage = true; //用户是否在主页

var BaseClass = {};

/**
 * 侧别栏的单击跳转事件
 */
BaseClass.silderTabClick = function () {
    $('#sidebarlist').click(function (e) {
        var pageName = $(e.target).attr('uid');
        if (inArray(pages, pageName)) {
            BaseClass.changeHash(pageName);
        }
    });

    $('#windowback').click(function (e) {
        window.history.back();
    });
};
/**
 * 跳转页面
 * @param {*} params 
 */
BaseClass.startPage = function () {
    var pageName = window.location.hash;
    pageName = pageName.slice(1, pageName.length);
    if (inArray(pages, pageName)) {
        isHomePage = false;
        BaseClass.closeSidebar();
        BaseClass.backHome();
        BaseClass.readHTML(pageName, function (html) {});
    } else {
        isHomePage = true;
        $('#header').css('height', '35%');
        BaseClass.hideTobar('show');
        BaseClass.readHTML(defaultPage, function (html) {});
    }
    BaseClass.changeHeadeLeft();
};

/**
 * 模块间通信
 */
var HandlerModule = {
};
var user = {};
//错误码
var ErrorMsg = {
    0: '失败',
    100: '内容长度不能超过100',
    12: '内容长度不能超过12',
    11: '参数不全',
    5: '未登录',
    6: '已登陆',
    8: '任务未完成,无法提交',
    9: '任务已提交,无法再次提交',
    13: '查无此任务'
};

window.onhashchange = function () {
    BaseClass.startPage();
};

BaseClass.backHome = function () {
    $('#backhome').click(function (e) {
        BaseClass.changeHash('');
        BaseClass.hideComments();
    });
};

window.onload = function () {
    BaseClass.startPage();
};

/**
 * 修改头部返回按钮
 * @param {*} isHome 
 */
BaseClass.changeHeadeLeft = function () {
    if (isHomePage) {
        $('#header #windowback').css('display', 'none');
        $('#header > button > i').removeClass('am-icon-chevron-left').addClass('am-icon-bars');
    } else {
        $('#header #windowback').css('display', 'block');
        $('#header > button > i').removeClass('am-icon-bars').addClass('am-icon-chevron-left');
    }
};

/**
 * 关闭侧别栏
 */
BaseClass.closeSidebar = function () {
    var silder = $('#sidebar');
    silder.offCanvas('close');
};
//初始化页面
function initPage() {
    $('#header').hide();
    BaseClass.silderTabClick();
}


/**
 * 显示模块页面
 * @param {*} pageName 
 * @param {*} pageData 
 */
BaseClass.setShowPage = function (pageName, pageData) {
    contentNode.innerHTML = pageData;
};

/**
 * 是否隐藏轮播图
 * @param {*} type 
 */
BaseClass.hideTobar = function (type) {
    if (type === 'hide') {
        $('#header').css('height', '8%');
        $('#silderouter').css('display', 'none');
    } else {
        $('#silderouter').css('display', 'block').css('top', '8%');
        $('#header').css('height', '35%');
    }
};

/**
 * 是否有譔页面
 * @param {*} array 
 * @param {*} pageName 
 */
function inArray(array, pageName) {
    for (var index = 0; index < array.length; index++) {
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
BaseClass.loadPageScrpat = function (pageName, sucCallback) {
    $.getScript(window.location.origin + '/js/page/' + pageName + '.js', function () {
        sucCallback();
    });
};

/**
 * 从数组中获取arr[key] == value 的所有数据 并生成新arr
 * @param {*} arr 
 * @param {*} key 
 * @param {*} value 
 */
function getArrayByKey(arr, key, value) {
    var array = arr.map(function (element, index, c) {
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
function isAjaxNull() {
    for (var _len = arguments.length, array = Array(_len), _key = 0; _key < _len; _key++) {
        array[_key] = arguments[_key];
    }

    for (var index = 0; index < array.length; index++) {
        var element = array[index];
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
    BaseClass.loadingDailog('show', '加载中...');

    $.ajax({
        type: 'get',
        url: baseUrl + ajaxData.url,
        dataType: 'json',
        async: false,
        data: ajaxData.data,
        success: function success(msg) {
            if (parseInt(msg.code) == 1) {
                sucCallback(msg);
            } else {
                alert(ErrorMsg[msg.code]);
            }
            BaseClass.loadingDailog('hide');
        },
        error: function error(err) {
            console.log(err);
            BaseClass.loadingDailog('hide');
            alert('服务器异常, 请刷新重试!');
        }
    });
}

function postHttp(url, formData, sucCallback) {
    BaseClass.loadingDailog('show', '加载中...');

    $.ajax({
        url: baseUrl + url,
        data: formData,
        method: 'POST',
        contentType: false,
        processData: false,
        success: function success(data) {
            if (parseInt(data.code) === 1) {
                sucCallback(data);
            }else{
                alert(ErrorMsg[data.code]);
            }
            BaseClass.loadingDailog('hide');
        },
        error: function error(responseStr) {
            console.error(responseStr);
            BaseClass.loadingDailog('hide');
            alert('网络异常,请刷新界面重试!');
        }
    });
}

/**
 * 获取单个页面
 * @param {*} sucCallback 
 */
BaseClass.readHTML = function (pageName, sucCallback) {
    if (!inArray(pages, pageName)) {
        return;
    }
    BaseClass.loadingDailog('show', '加载中...');
    $.ajax({
        async: false,
        url: '/page/' + pageName + '.html',
        success: function success(result) {
            BaseClass.loadingDailog('hide');
            BaseClass.setShowPage(pageName, result);
            sucCallback(result);
            BaseClass.changePageTitle(pageName);
            BaseClass.loadPageScrpat(pageName, function () {});
        },
        error: function error(err) {
            BaseClass.loadingDailog('hide');
            console.log(err);
        }
    });
};
/**
 * 修改主页title
 * @param {*} title 
 */
BaseClass.changePageTitle = function (pageName) {
    var i = pages.indexOf(pageName);
    $('#pagetitle').text(pageTiles[i]);
};

/**
 * 显示基础的对话框
 * @param {*} title 
 * @param {*} content 
 * @param {*} sucCallback   确定之后的回调
 */
BaseClass.showDialog = function (title, content, sucCallback) {
    var html = '<div class="am-modal am-modal-confirm" tabindex="-1" id="basedialog"><div class="am-modal-dialog"><div class="am-modal-hd">' + title + '</div><div class="am-modal-bd">' + content + '</div><div class="am-modal-footer"><span class="am-modal-btn" data-am-modal-cancel>\u53D6\u6D88</span><span class="am-modal-btn" data-am-modal-confirm>\u786E\u5B9A</span></div></div></div>';
    otherPlugNode.innerHTML = html;
    $('#basedialog').modal({
        relatedTarget: undefined,
        onConfirm: function onConfirm() {
            sucCallback();
        },
        // closeOnConfirm: false,
        onCancel: function onCancel() {}
    });
};
/**
 * 显示加载动画
 * @param {*} type  如果为show 显示   其他隐藏 
 * @param {*} content 显示的内容
 */
BaseClass.loadingDailog = function (type, content) {
    if (type === 'show') {
        var html = '<div class="am-modal am-modal-loading am-modal-no-btn" tabindex="-1" id="loaddialog"><div class="am-modal-dialog"><div class="am-modal-hd">' + content + '</div><div class="am-modal-bd"><span class="am-icon-spinner am-icon-spin"></span></div></div></div>';
        otherPlugNode.innerHTML = html;
        $('#loaddialog').modal('toggle');
    } else {
        $('#loaddialog').modal('close');
        otherPlugNode.innerHTML = '';
    }
};



/**
 * 修改页面hash
 * @param {*} hash 
 */
BaseClass.changeHash = function (hash) {
    window.location.href = window.location.origin + ('#' + hash);
};

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
        canvasDataURL(re, w, objDiv);
    };
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
        h = obj.height || w / scale;
        var quality = 0.7; // 默认图片质量为0.7
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
    };
}
/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData) {
    var arr = urlData.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
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
    };
}

initPage();