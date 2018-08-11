//论坛
(function () {
    let view = $('#bbspage');
    let bbsData = null;
    hideTobar('hide');
    getAllBbs((data) => {
        bbsData = data.data;
        initPage();
    });
    let addBbsFile = [];
    let i = 0;


    function initPage() {
        fillView(bbsData);
        saveComment((data) => {
            addComments(data, $('#comments .content').attr('uid'));
        });
        let imagesNode = $('#file-list');
        $('.mcomment').click(function (e) {
            let uid = $(e.target).attr('uid');
            if (uid) {
                HandlerModule.commentType = 'bbs';
                fillComView(uid, (data) => {
                    showComments(data, uid);   //显示论坛
                });
            }
        });
        view.find('#sendbbs').click(function (e) {
            let uid = $(e.target).attr('uid');
            if (uid == 1) {
                $('#addbbs').css('display', 'block');
                $('#bbspage > ul').css('display', 'none');
                $(e.target).attr('uid', '2');
                $(e.target).text('确定发布');
            } else {
                $(e.target).attr('1');
                $(e.target).text('发布论坛信息');
                addBbs();
            }
        });

        $('#doc-form-file').on('change', function () {
            var that = this;
            $.each(this.files, function () {
                i++;
                addBbsFile.push({ index: i, file: that.files });
                var image = addSpan(this, i);
                showImageByBase64(that, $(image), (base64) => {
                    imagesNode.append(image);
                });
            });
        });

        imagesNode.click(function (e) {
            if ($(e.target).hasClass('uploadimage')) {
                var mindex = parseInt($(e.target).attr('id'));
                addBbsFile.map((element, index) => {
                    if (element.index === mindex) {
                        imagesNode.children(`#${mindex}`).remove();
                        addBbsFile.splice(index, 1);
                    }
                });
            }
        });
        fillTypes();
    }

    function fillTypes() {
        let html = '';
        let array = HandlerModule.bbsTypes;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            html += `<div class="am-radio">
            <label><input type="radio" name="radio-1" value="${element}">${element}</label></div>`;
        }
        $('#typesgroup').html(html);
    }

    /**
     * 填充论坛信息
     * @param {*} array 
     */
    function fillView(array) {
        let html = '';
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const images = element.images;
            let imageHtml = '';
            for (let j = 0; j < images.length; j++) {
                const img = images[j];
                imageHtml = `<img class="am-radius" alt="90*90" src="${img}"
                width="90" height="90" />`;
            }
            html += `<li class="bbsitem">
            <article class="am-comment">
                <a href="#link-to-user-home">
                    <img src="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/96/h/96" alt="" class="am-comment-avatar" width="48" height="48">
                </a>
                <div class="am-comment-main">
                    <header class="am-comment-hd">
                        <div class="am-comment-meta">
                            <a href="#link-to-user" class="am-comment-author">${element.title}</a> 发表于
                            <time datetime="2013-07-27T04:54:29-07:00" title="2013年7月27日 下午7:54 格林尼治标准时间+0800">2014-7-12 15:30</time>
                        </div>
                    </header>
                    <div class="am-comment-bd">
                        <p>${element.cont}</p>
                        <p class="imageurl">
                        ${imageHtml}
                        </p>

                    </div>
                    <footer class="am-comment-footer">
                        <div class="am-comment-actions">
                            <a href="#bbs" class="icon">
                                <i class="am-icon-thumbs-up"></i>
                            </a>
                            <a href="#bbs" class="icon">
                                <i class="am-icon-commenting-o mcomment" uid="${element.id}"></i>
                            </a>
                        </div>
                    </footer>
                </div>
            </article>
        </li>`
        }

        $('#bbspage > ul').html(html);
    }

    function addSpan(that, index) {
        if (addBbsFile.length > 5) {
            alert('最多上传五张图片,单击图片可删除图片.');
            return;
        }
        var spanNode = document.createElement('img');
        $(spanNode).addClass('uploadimage').attr('id', index);
        return spanNode;
    }

    /**
     * 发布
     */
    function addBbs() {
        let formData = new FormData();
        let title = $('#title').val();
        let desc = $('#desc').val();

        let radio = $('input:radio[name="radio-1"]:checked').val();
        if (addBbsFile.length < 1) {
            alert('请最少选择一张图片.');
            return;
        }
        for (let index = 0; index < addBbsFile.length; index++) {
            const element = addBbsFile[index];
            formData.append(`image${index}`, element.files);
        }
        if (isAjaxNull(title, desc, radio)) {
            formData.append('title', title);
            formData.append('cont', desc);
            formData.append('type', radio);
        } else {
            alert('输入不能为空...');
        }
        postHttp('/bbs/insert', formData, (data) => {
            alert('上传成功');
        });

    }

    function getAllBbs(callback) {
        httpGet({ url: '/bbs/findallbbs', data: {} }, (data) => {
            callback(data);
        });
    }
    /**
     * 增加一条评论
     * @param {*} data 
     * @param {*} id 
     */
    function addComments(data, id) {
        httpGet({
            url: '/bbs/adncomment', data: {
                cont: data,
                bbsid: id
            }
        }, (data1) => {
            addcom(data);
        });
    }

    function addcom(data) {
        let dom = $('article');
        dom.addClass('am-comment');
        dom.html(` <a href="#link-to-user-home">
        <img src="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/96/h/96" alt="" class="am-comment-avatar" width="48" height="48"></a>
    <div class="am-comment-main"><header class="am-comment-hd">
        <div class="am-comment-meta">
        <a href="#link-to-user" class="am-comment-author">${user.info.name}</a> 评论于
        <time datetime="2013-07-27T04:54:29-07:00" title="2013年7月27日 下午7:54 格林尼治标准时间+0800">2014-7-12 15:30</time>
        </div></header><div class="am-comment-bd">
            <p>${data}</p>
        </div></div>`);
        $('#comments .content').append(dom);
    }

    function fillComView(data, callback) {
        httpGet({
            url: '/bbs/getallcommentbybbsid',
            data: {bbsid: data},
        }, (data) => {
            callback(data.data);
        })
    }
})();

