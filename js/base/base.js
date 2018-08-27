'use strict';

//项目的基类

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pages = ['page1', 'page2']; //所有页面page的名称   在使用页面前请先此注册
var pageTiles = ['页面1', '组件的使用'];
var BaseClass = null;
var baseUrl = '127.0.0.1:3000'; //api接口
var contentNode = $('#content')[0]; //主内容
var otherPlugNode = $('#otherplug')[0]; //对话框之类
var commentsNode = $('#comments'); //评论模块的父node
var defaultPage = pages[0]; //默认显示主页
var isHomePage = true; //用户是否在主页
/**
 * 模块间通信
 */
var HandlerModule = {};
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

var Base = function () {
    function Base() {
        _classCallCheck(this, Base);
    }

    _createClass(Base, [{
        key: 'silderTabClick',

        /**
        * 侧别栏的单击跳转事件
        */
        value: function silderTabClick() {
            var that = this;
            $('#sidebarlist').click(function (e) {
                var pageName = $(e.target).attr('uid');
                if (inArray(pages, pageName)) {
                    that.changeHash(pageName);
                }
                that = null;
            });
            $('#windowback').click(function (e) {
                window.history.back();
            });
        }

        /**
        * 跳转页面
        * @param {*} params 
        */

    }, {
        key: 'startPage',
        value: function startPage() {
            var pageName = window.location.hash;
            pageName = pageName.slice(1, pageName.length);
            if (inArray(pages, pageName)) {
                isHomePage = false;
                this.closeSidebar();
                this.backHome();
                this.readHTML(pageName, function (html) { });
            } else {
                isHomePage = true;
                $('#header').css('height', '53px');
                this.hideTobar('show');
                this.readHTML(defaultPage, function (html) { });
            }
            this.changeHeadeLeft();
        }
    }, {
        key: 'backHome',
        value: function backHome() {
            var that = this;
            $('#backhome').click(function (e) {
                that.changeHash('');
            });
            that = null;
        }

        /**
        * 修改头部返回按钮
        * @param {*} isHome 
        */

    }, {
        key: 'changeHeadeLeft',
        value: function changeHeadeLeft() {
            if (isHomePage) {
                $('#header #windowback').css('display', 'none');
                $('#header > button > i').removeClass('am-icon-chevron-left').addClass('am-icon-bars');
            } else {
                $('#header #windowback').css('display', 'block');
                $('#header > button > i').removeClass('am-icon-bars').addClass('am-icon-chevron-left');
            }
        }
        /**
        * 关闭侧别栏
        */

    }, {
        key: 'closeSidebar',
        value: function closeSidebar() {
            var silder = $('#sidebar');
            silder.offCanvas('close');
        }

        /**
        * 显示模块页面
        * @param {*} pageName 
        * @param {*} pageData 
        */

    }, {
        key: 'setShowPage',
        value: function setShowPage(pageName, pageData) {
            contentNode.innerHTML = pageData;
        }
    }, {
        key: 'hideTobar',


        /**
        * 是否隐藏轮播图
        * @param {*} type 
        */
        value: function hideTobar(type) {
            if (type === 'hide') {
                $('#header').css('height', '8%');
                $('#silderouter').css('display', 'none');
            } else {
                $('#silderouter').css('display', 'block').css('top', '8%');
                $('#header').css('height', '53px');
            }
        }
        /**
         * 加载指定js文件
         * @param {*} pageName 
         */

    }, {
        key: 'loadPageScrpat',
        value: function loadPageScrpat(pageName, sucCallback) {
            $.getScript(window.location.origin + '/js/page/' + pageName + '.js', function () {
                sucCallback();
            });
        }
    }, {
        key: 'loadingCss',


        /**
        * 动态加载css
        * @param {*} pageName 
        */
        value: function loadingCss(pageName) {
            $('head').children(':last').attr({
                rel: window.location.origin + '/css/page/' + pageName,
                type: 'text/css',
                href: './style.css'
            });
        }
    }, {
        key: 'localStorage',


        /**
        * 是否缓存
        * @param {*} key 
        * @param {*} value 
        */
        value: function localStorage(key, value) {
            if (window.localStorage) {
                window.localStorage.setItem(key, value);
            } else {
                alert('不支持localStorage!');
            }
        }
    }, {
        key: 'clearLocalStorage',


        /**
        * 清除缓存
        * @param {*} key 
        */
        value: function clearLocalStorage(key) {
            if (key === 'localstorage') {
                window.localStorage.clear();
            } else {
                window.localStorage.removeItem(key);
            }
        }
    }, {
        key: 'localPage',

        /**
         * 获取缓存的page
         * @param {*} pageName 
         */
        value: function localPage(pageName) {
            return window.localStorage.getItem(pageName);
        }
    }, {
        key: 'readHTML',


        /**
         * 获取单个页面
         * @param {*} sucCallback 
         */
        value: function readHTML(pageName, sucCallback) {
            var that = this;
            if (!inArray(pages, pageName)) {
                return;
            }
            this.clearLocalStorage('localstorage');
            var localPageData = this.localPage(pageName);
            if (localPageData) {
                this.setShowPage(pageName, localPageData);
                return;
            }
            this.loadingDailog('show', '加载中...');
            $.ajax({
                async: false,
                url: '/page/' + pageName + '.html',
                success: function success(result) {
                    that.loadingDailog('hide');
                    //打开此处可加入单页面缓存(避免多次请求)
                    //开发时 不建议打开缓存
                    // this.localStorage(pageName, result);
                    that.setShowPage(pageName, result);
                    sucCallback(result);
                    that.changePageTitle(pageName);
                    that.loadPageScrpat(pageName, function () { });
                    that = null;
                },
                error: function error(err) {
                    that.loadingDailog('hide');
                    console.log(err);
                    that = null;
                }
            });
        }
    }, {
        key: 'changePageTitle',

        /**
         * 修改主页title
         * @param {*} title 
         */
        value: function changePageTitle(pageName) {
            var i = pages.indexOf(pageName);
            $('#pagetitle').text(pageTiles[i]);
        }
    }, {
        key: 'showDialog',


        /**
         * 显示基础的对话框
         * @param {*} title 
         * @param {*} content 
         * @param {*} sucCallback   确定之后的回调
         */
        value: function showDialog(title, content, sucCallback) {
            var html = '<div class="am-modal am-modal-confirm" tabindex="-1" id="basedialog"><div class="am-modal-dialog"><div class="am-modal-hd">' + title + '</div><div class="am-modal-bd">' + content + '</div><div class="am-modal-footer"><span class="am-modal-btn" data-am-modal-cancel>\u53D6\u6D88</span><span class="am-modal-btn" data-am-modal-confirm>\u786E\u5B9A</span></div></div></div>';
            otherPlugNode.innerHTML = html;
            $('#basedialog').modal({
                relatedTarget: undefined,
                onConfirm: function onConfirm() {
                    sucCallback();
                },
                // closeOnConfirm: false,
                onCancel: function onCancel() { }
            });
        }
    }, {
        key: 'loadingDailog',

        /**
         * 显示加载动画
         * @param {*} type  如果为show 显示   其他隐藏 
         * @param {*} content 显示的内容
         */
        value: function loadingDailog(type, content) {
            if (type === 'show') {
                var html = '<div class="am-modal am-modal-loading am-modal-no-btn" tabindex="-1" id="loaddialog"><div class="am-modal-dialog"><div class="am-modal-hd">' + content + '</div><div class="am-modal-bd"><span class="am-icon-spinner am-icon-spin"></span></div></div></div>';
                otherPlugNode.innerHTML = html;
                $('#loaddialog').modal('toggle');
            } else {
                $('#loaddialog').modal('close');
                otherPlugNode.innerHTML = '';
            }
        }
    }, {
        key: 'changeHash',


        /**
         * 修改页面hash
         * @param {*} hash 
         */
        value: function changeHash(hash) {
            window.location.href = window.location.origin + ('#' + hash);
        }
    }, {
        key: 'uploadImg',


        /**
         * 上传图片的组件
         * @param {*} view 对应的模块视图
         * @param {*} number 图片最大数
         * @param {*} callback 
         */
        value: function uploadImg(view, number, callback) {
            var parentImgNode = document.createElement('div');
            var html = '';
            html += '<div class="am-form-group am-form-file"><button type="button" class="am-btn am-btn-danger am-btn-sm">\n        <i class="am-icon-cloud-upload"></i> \u9009\u62E9\u8981\u4E0A\u4F20\u7684\u6587\u4EF6</button>\n      <input id="uploadimg"  type="file" multiple></div><div id="file-list"></div>';
            $(parentImgNode).html(html);
            html = '';
            view.append(parentImgNode);
            view.find('#uploadimg').on('change', function () {
                callback(this.files[0]);
            });
        }
    }]);

    return Base;
}();

window.onload = function () {
    BaseClass.startPage();
};
window.onhashchange = function () {
    BaseClass.startPage();
};
//初始化页面
function initPage() {
    BaseClass = new Base();
    // $('#header').hide();
    BaseClass.silderTabClick();
}

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
            } else {
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
        that = null;
    };
}
/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 * 用url方式表示的base64图片数据
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
function showImageByBase64(file, imgNode, callback) {
    var fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onloadend = function (e) {
        imgNode.attr('src', e.target.result);
        photoCompress(file, {
            quality: 0.2
        }, function (base64Codes) {
            //这里bl 为文件对象
            var bl = convertBase64UrlToBlob(base64Codes);
            callback(bl);
        });
    };
}

initPage();