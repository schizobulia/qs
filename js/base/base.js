//项目的基类
var pages = ['news']; //所有页面page的名称   在使用页面前请先再些注册
const baseUrl = 'http://www.jcyxwl.com/';  //api接口
const contentNode = $('#content')[0];  //主内容
const otherPlugNode = $('#otherplug')[0]; //对话框之类
const defaultPage = pages[0]; //默认显示主页

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

//初始化页面
function initPage() {
    httpGet({ url: ',', data: { a: 1 } }, function (data) {
        readHTML(defaultPage, function (html) { });
    });
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
    $.ajax({
        type: 'get',
        // url: baseUrl + ajaxData.url,
        url: `https://www.jcyxwl.com/API/test.php`,
        dataType: 'json',
        async: false,
        data: ajaxData.data,
        success: function (msg) {
            if (parseInt(msg.code) == 1) {
                sucCallback(msg);
            }
            else {
                alert(ErrorMsg[msg.status]);
            }
        },
        error: function (err) {
            console.log(err);
        },
    });
}
/**
 * 获取单个页面
 * @param {*} sucCallback 
 */
function readHTML(pageName, sucCallback) {
    if (!inArray(pages, pageName)) {
        alert('请先注册次页面！');
        return;
    }
    $.ajax({
        async: false,
        url: `/page/${pageName}.html`,
        success: function (result) {
            setShowPage(pageName, result);
            sucCallback(result);
            loadPageScrpat(pageName, function () {});
        }
    });
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
function loadingDailog(type, node, content) {
    if (type === 'show') {
        $(node).attr('data-am-modal', "{target: '#loaddialog'}");
        let html = `<div class="am-modal am-modal-loading am-modal-no-btn" tabindex="-1" id="loaddialog"><div class="am-modal-dialog"><div class="am-modal-hd">${content}</div><div class="am-modal-bd"><span class="am-icon-spinner am-icon-spin"></span></div></div></div>`
        otherPlugNode.innerHTML = html;
    } else {
        otherPlugNode.innerHTML = '';
    }
}
