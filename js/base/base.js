/**
 * 项目基类
 */
//是否为线上版
let development = false
//所有页面page的名称   在使用页面前请先此注册
let pages = ['page1', 'page2']
let pageTiles = ['页面1', '组件的使用']
let BaseClass = null
//api接口
let baseUrl = '127.0.0.1:3000'
//主内容
let contentNode = $('#content')[0]
//对话框之类
let otherPlugNode = $('#otherplug')[0]
//默认显示主页
let defaultPage = pages[0]
//用户是否在主页
let isHomePage = true

/**
 * 模块间通信
 */
let HandlerModule = []
//错误码
let ErrorMsg = {
	0: '失败',
	100: '内容长度不能超过100',
	12: '内容长度不能超过12',
	11: '参数不全',
	5: '未登录',
	6: '已登陆',
	8: '任务未完成,无法提交',
	9: '任务已提交,无法再次提交',
	13: '查无此任务'
}
/**
 * 项目基类
 */
class Base {

	constructor() {
		//页面跳转动画
		this.animOpction = null
	}

  /**
  * 侧别栏的单击跳转事件
  */
	silderTabClick() {
		$('#sidebarlist').click((e) => {
			let pageName = $(e.target).attr('uid')
			this.changeHash(pageName)
			pageName = null
		})
		$('#windowback').click((e) => {
			window.history.back()
		})
	}

  /**
  * 跳转页面
  * @param {*} params 
  */
	startPage() {
		let pageName = window.location.hash
		pageName = pageName.slice(1, pageName.length)
		if (inArray(pages, pageName)) {
			isHomePage = false
			this.closeSidebar()
			this.backHome()
			this.readHTML(pageName, function (html) { })
		} else {
			isHomePage = true
			$('#header').css('height', '53px')
			this.hideTobar('show')
			this.readHTML(defaultPage, function (html) { })
		}
		this.changeHeadeLeft()
		pageName = null
	}

	backHome() {
		$('#backhome').click((e) => {
			this.changeHash('')
		})
	}

  /**
  * 修改头部返回按钮
  * @param {*} isHome 
  */
	changeHeadeLeft() {
		if (isHomePage) {
			$('#header #windowback').css('display', 'none')
			$('#header > button > i').removeClass('am-icon-chevron-left').addClass('am-icon-bars')
		} else {
			$('#header #windowback').css('display', 'block')
			$('#header > button > i').removeClass('am-icon-bars').addClass('am-icon-chevron-left')
		}
	}
  /**
  * 关闭侧别栏
  */
	closeSidebar() {
		let silder = $('#sidebar')
		silder.offCanvas('close')
		silder = null
	}

  /**
  * 显示模块页面
  * @param {*} pageName 
  * @param {*} pageData 
  */
	setShowPage(pageName, pageData) {
		contentNode.innerHTML = pageData
		if (this.animOpction) {
			this.activityAnimation(pageName,
				this.animOpction.anim || 'fade',
				this.animOpction.time || 1)
			this.animOpction = null
		}
	}

  /**
   * 页面间的跳转动画
   * @param {*} view 
   * @param {*} anim 
   * @param {*} time 
   */
	activityAnimation(pageName, anim, time) {
		$(`#${pageName}page`).addClass(`am-animation-${anim}`)
			.addClass(`am-animation-delay-${time}`)
	}

  /**
  * 是否隐藏轮播图
  * @param {*} type 
  */
	hideTobar(type) {
		if (type === 'hide') {
			$('#s').css('height', '8%')
			$('#silderouter').hide()
		} else {
			$('#silderouter').show().css('top', '8%')
			$('#header').css('height', '53px')
		}
	}
  /**
   * 加载指定js文件
   * @param {*} pageName 
   */
	loadPageScrpat(pageName, sucCallback) {
		$.getScript(window.location.origin + `/js/page/` + pageName + '.js', function () {
			sucCallback()
		})
	}

  /**
  * 动态加载css
  * @param {*} pageName 
  */
	loadingCss(pageName) {
		$('head').children(':last').attr({
			rel: window.location.origin + '/css/page/' + pageName,
			type: 'text/css',
			href: './style.css'
		})
	}

  /**
  * 是否缓存
  * @param {*} key 
  * @param {*} value 
  */
	localStorage(key, value) {
		if (window.localStorage) {
			window.localStorage.setItem(key, value)
		} else {
			this.Component.toast('不支持localStorage!')
		}
	}

  /**
  * 清除缓存
  * @param {*} key 
  */
	clearLocalStorage(key) {
		if (key === 'localstorage') {
			window.localStorage.clear()
		} else {
			window.localStorage.removeItem(key)
		}
	}
  /**
   * 获取缓存的page
   * @param {*} key 
   */
	getLocalStorage(key) {
		return window.localStorage.getItem(key)
	}

  /**
   * 获取单个页面
   * @param {*} sucCallback 
   */
	readHTML(pageName, sucCallback) {
		let that = this
		if (!inArray(pages, pageName)) {
			return
		}
		let localPageData = this.getLocalStorage(pageName)
		if (localPageData) {
			this.setShowPage(pageName, localPageData)
			return
		}
		this.Component.loadingDailog('show', '加载中...')
		$.ajax({
			async: false,
			url: '/page/' + pageName + '.html',
			success: function success(result) {
				that.Component.loadingDailog('hide')
				//打开此处可加入单页面缓存(避免多次请求)
				//开发时 不建议打开缓存
				if (development) {
					that.localStorage(pageName, result)
				}
				that.setShowPage(pageName, result)
				sucCallback(result)
				that.changePageTitle(pageName)
				that.loadPageScrpat(pageName, function () { })
			},
			error: function error(err) {
				that.Component.loadingDailog('hide')
				console.log(err)
			}
		})
		that = null
	}
  /**
   * 修改主页title
   * @param {*} title 
   */
	changePageTitle(pageName) {
		let i = pages.indexOf(pageName)
		$('#pagetitle').text(pageTiles[i])
	}

  /**
   * 显示基础的对话框
   * @param {*} title 
   * @param {*} content 
   * @param {*} sucCallback   确定之后的回调
   */
	showDialog(title, content, sucCallback) {
		let html = '<div class="am-modal am-modal-confirm" tabindex="-1" id="basedialog"><div class="am-modal-dialog"><div class="am-modal-hd">' + title + '</div><div class="am-modal-bd">' + content + '</div><div class="am-modal-footer"><span class="am-modal-btn" data-am-modal-cancel>\u53D6\u6D88</span><span class="am-modal-btn" data-am-modal-confirm>\u786E\u5B9A</span></div></div></div>'
		otherPlugNode.innerHTML = html
		$(otherPlugNode).show()
		$('#basedialog').modal({
			relatedTarget: undefined,
			onConfirm: function onConfirm() {
				sucCallback()
			},
			// closeOnConfirm: false,
			onCancel: function onCancel() { }
		})
	}


  /**
   * 修改页面hash
   * @param {*} hash
   * @param {*} animOpction  动画的属性 
   * { anim:   'fade', 效果  http://amazeui.org/css/animation
   *   time:   　1   } 时间  不要太长 
   */
	changeHash(hash, data, animOpction) {
		this.setPageHandler(hash, data)
		window.location.href = window.location.origin + ('#' + hash)
		this.animOpction = animOpction
	}

  /**
   *根据pageName获取页面信息
   *@param {*} pageName 
   */
	getPageHandler(pageName) {
		let index = HandlerModule.findIndex((element) => {
			return element.key === pageName
		})
		let data = HandlerModule[index]
		index = 0
		return data
	}
  /**
   * 设置要传递页面的信息
   * @param {*} pageName  
   * @param {*} data  数据(仅仅支持String) 
   */
	setPageHandler(pageName, data) {
		if ('#' + pageName === window.location.hash) {
			this.Component.toast('无法在同一页面进行通信!')
			return
		}
		let index = HandlerModule.findIndex((element) => {
			return element.key === pageName
		})

		if (index >= 0) {
			if (data === undefined) {
				HandlerModule.splice(index, 1)
			} else {
				HandlerModule[index].data = data
			}
		} else {
			HandlerModule.push({ key: pageName, data: data })
		}
		index = null
	}
  /**
   * 页面刷新时保存 HandlerModule
   */
	refreshHandler() {
		if (HandlerModule.length > 0) {
			this.localStorage('handler', JSON.stringify(HandlerModule))
		}
	}
  /**
   * 解决页面刷新handler清除的问题
   */
	getLocalHandler() {
		let data = this.getLocalStorage('handler')
		if (data) {
			HandlerModule = JSON.parse(data)
			this.clearLocalStorage('handler')
		}
		data = null
	}

}

/**
 * 组件类
 * 在真实项目使用时如果不使用该类 可以删除
 * 或者如果觉得该文件过大  可以放到别的文件中
 */
class Component {
  /**
   * 上传图片的组件
   * @param {*} pNode  父节点
   * @param {*} number 数量
   * @param {*} callback 
   */
	uploadImg(pNode, number, callback) {
		let imgs = []
		let parentImgNode = document.createElement('div')
		let html = ''
		html += '<div class="am-form-group am-form-file"><button type="button" class="am-btn am-btn-danger am-btn-sm">\n        <i class="am-icon-cloud-upload"></i> 上传</button>\n      <input id="uploadimg" accept="image/*" type="file" multiple></div><div id="file-list"></div>'
		$(parentImgNode).html(html)
		pNode.append(parentImgNode)
		pNode.find('#uploadimg').on('change', function () {
			callback(imgs)
			if (imgs.length >= number) {
				BaseClass.Component.toast('\u6700\u591A\u53EA\u80FD\u4E0A\u4F20' + number + '\u5F20\u56FE\u7247.')
				return
			}
			let file = this.files[0]
			let uid = new Date().getTime()
			let imgNode = document.createElement('img')
			$(imgNode).addClass('uploadimgitem').attr('uid', uid)
			showImageByBase64(file, $(imgNode), function (blob) {
				imgs.push({ file: blob, id: uid })
				pNode.find('#file-list').append(imgNode)
				$(imgNode).click(function (e) {
					let imguid = $(e.target).attr('uid')
					imgs.map((element, index) => {
						if (element.id == uid) {
							imgs.splice(index, 1)
							pNode.find('#file-list')[0].removeChild(this)
							callback(imgs)
						}
					})
				})
			})
		})

		html = ''
		parentImgNode = null
	}
  /**
   * 提示信息
   * @param {*} content 
   * @param {*} type [primary, secondary, success, warning, danger, success]
   * @param {*} time 
   */
	toast(content, type, time) {
		let node = $('#otherplug')
		$(otherPlugNode).html(`
        <span class="toast am-badge am-badge-${type || 'warning'}">${content}</span>`).show()
		$(otherPlugNode).fadeIn(500, () => {
			$(otherPlugNode).fadeOut(time || 1000, () => {
				$(otherPlugNode).html(``)
			})
		})
	}

  /**
   * 显示加载动画
   * @param {*} type  如果为show 显示   其他隐藏 
   * @param {*} content 显示的内容
   */
	loadingDailog(type, content) {
		if (type === 'show') {
			let html = '<div class="am-modal am-modal-loading am-modal-no-btn" tabindex="-1" id="loaddialog"><div class="am-modal-dialog"><div class="am-modal-hd">' + content + '</div><div class="am-modal-bd"><span class="am-icon-spinner am-icon-spin"></span></div></div></div>'
			otherPlugNode.innerHTML = html
			$(otherPlugNode).show()
			$('#loaddialog').modal('toggle')
			html = ''
		} else {
			$('#loaddialog').modal('close')
			$(otherPlugNode).hide()
			otherPlugNode.innerHTML = ''
		}
	}

	/**
	 * 通知栏
	 * @param {*} title 
	 * @param {*} content 	
	 * @param {*} type   		[primary, secondary, success, warning, danger, success]
	 * @param {*} callback  单击关闭后的回调
	 * @param {*} location  可选 
	 */
	notification(title, content, type, callback, location) {
		let divNode = document.createElement('div')
		let html = `<div id="notification" class="component"><div class="am-alert am-alert-${type}">
				<button type="button" class="am-close" id="close">&times;</button><h4><i class="am-icon-success"></i> ${title}</h4>
				${content}</div></div>`
		divNode.innerHTML = html
		if (location === 'bottom') {
			$(divNode).find('#notification').css('top', '85%')
		}
		contentNode.append(divNode)
		$(divNode).find('#close').click((e) => {
			contentNode.removeChild(divNode)
			divNode = null
			callback()
		})
		html = ''
	}
}

window.onload = function () {
	BaseClass.getLocalHandler()
	BaseClass.startPage()
}
window.onhashchange = function () {
	BaseClass.startPage()
}

window.onbeforeunload = function () {
	BaseClass.refreshHandler()
}

//初始化页面
function initPage() {
	BaseClass = new Base()
	BaseClass.Component = new Component()
	// $('#header').hide()
	BaseClass.silderTabClick()
	pwa();
}

function pwa() {
	// 检测浏览器是否支持SW
	if (navigator.serviceWorker != null) {
		navigator.serviceWorker.register('/pwaservice.js', { scope: '/' }).then(function (registration) {
			// 注册成功
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}).catch(function (err) {
			// 注册失败 :(
			console.log('ServiceWorker registration failed: ', err);
		});
	}
}



/**
 * 页面销毁
 */
function destory() {
	BaseClass.clearLocalStorage('localstorage')
	pages = null
	development = null
	pageTiles = null
	BaseClass = null
	baseUrl = null
	contentNode = null
	otherPlugNode = null
	defaultPage = null
	isHomePage = null
	HandlerModule = null
	ErrorMsg = null
}


/**
 * 是否有譔页面
 * @param {*} array 
 * @param {*} pageName 
 */
function inArray(array, pageName) {
	return array.includes(pageName)
}
/**
 * 从数组中获取arr[key] == value 的所有数据 并生成新arr
 * @param {*} arr 
 * @param {*} key 
 * @param {*} value 
 */
function getArrayByKey(arr, key, value) {
	let array = arr.map(function (element, index, c) {
		if (element[key] === value) {
			return element
		} else {
			return null
		}
	})
	return array
}

/**
 * 传人参数是否为空
 * @param {*} array 
 */
function isAjaxNull() {
	for (let index = 0; index < array.length; index++) {
		let element = array[index]
		if (element === 'undefined' || !element || element === '') {
			BaseClass.Component.toast('输入不能为空!')
			return false
		}
	}
	return true
}

/**
 * get请求
* @param {*} ajaxData 
* @param {*} sucCallback 
*/
function httpGet(ajaxData, sucCallback) {
	BaseClass.Component.loadingDailog('show', '加载中...')

	$.ajax({
		type: 'get',
		url: baseUrl + ajaxData.url,
		dataType: 'json',
		async: false,
		data: ajaxData.data,
		success: function success(msg) {
			if (parseInt(msg.code) === 1) {
				sucCallback(msg)
			} else {
				BaseClass.Component.toast(ErrorMsg[msg.code])
			}
			BaseClass.Component.loadingDailog('hide')
		},
		error: function error(err) {
			console.log(err)
			BaseClass.Component.loadingDailog('hide')
			BaseClass.Component.toast('服务器异常, 请刷新重试!')
		}
	})
}

function postHttp(url, formData, sucCallback) {
	BaseClass.Component.loadingDailog('show', '加载中...')

	$.ajax({
		url: baseUrl + url,
		data: formData,
		method: 'POST',
		contentType: false,
		processData: false,
		success: function success(data) {
			if (parseInt(data.code) === 1) {
				sucCallback(data)
			} else {
				BaseClass.Component.toast(ErrorMsg[data.code])
			}
			BaseClass.Component.loadingDailog('hide')
		},
		error: function error(responseStr) {
			console.error(responseStr)
			BaseClass.Component.loadingDailog('hide')
			BaseClass.Component.toast('网络异常,请刷新界面重试!')
		}
	})
}


/*
三个参数
file：一个是文件(类型是图片格式)，
w：一个是文件压缩的后宽度，宽度越小，字节越小
objDiv：一个是容器或者回调函数
photoCompress()
*/
function photoCompress(file, w, objDiv) {
	let ready = new FileReader()
	/*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
	ready.readAsDataURL(file)
	ready.onload = function () {
		let re = this.result
		canvasDataURL(re, w, objDiv)
	}
}

function canvasDataURL(path, obj, callback) {
	let img = new Image()
	img.src = path
	img.onload = function () {
		let that = this
		// 默认按比例压缩
		let w = that.width,
			h = that.height,
			scale = w / h
		w = obj.width || w
		h = obj.height || w / scale
		let quality = 0.7 // 默认图片质量为0.7
		//生成canvas
		let canvas = document.createElement('canvas')
		let ctx = canvas.getContext('2d')
		// 创建属性节点
		let anw = document.createAttribute("width")
		anw.nodeValue = w
		let anh = document.createAttribute("height")
		anh.nodeValue = h
		canvas.setAttributeNode(anw)
		canvas.setAttributeNode(anh)
		ctx.drawImage(that, 0, 0, w, h)
		// 图像质量
		if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
			quality = obj.quality
		}
		// quality值越小，所绘制出的图像越模糊
		let base64 = canvas.toDataURL('image/jpeg', quality)
		// 回调函数返回base64的值
		callback(base64)
	}
}
/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData) {
	let arr = urlData.split(','),
		mime = arr[0].match(/:(.*?)/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n)
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}
	return new Blob([u8arr], { type: mime })
}

/**
 * 压缩并显示图片  返回压缩过的图片
 * @param {*} that 
 * @param {*} imgNode 
 * @param {*} callback 
 */
function showImageByBase64(file, imgNode, callback) {
	let fr = new FileReader()
	fr.readAsDataURL(file)
	fr.onloadend = function (e) {
		imgNode.attr('src', e.target.result)
		photoCompress(file, {
			quality: 0.2
		}, function (base64Codes) {
			//这里bl 为文件对象
			let bl = convertBase64UrlToBlob(base64Codes)
			callback(bl)
		})
	}
}

initPage()
