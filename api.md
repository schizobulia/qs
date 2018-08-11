## 学生注册
req：  学号   密码（初始密码为学号后6位）
<br />
res:   token

## 普通登陆
req:   使用微信登陆 
<br />
res:   返回openid

## 学生登陆
req:   学号   密码
<br />
res:   token

## 查询用户信息
req:   token
<br />
res:   姓名   性别   学号   班级   系别   学校id  头像  积分  介绍

## 查询学校
req：   token
<br />
res:   学校名称   学校地址

##  发布一条论坛信息
req:   token   标题   内容   图片（多图  最多五张）  
<br />
res:   是否成功

##  查询论坛全部信息
req:   token   
<br />
res:   [标题, 内容, 图片, 评论数量, 点赞数量, 论坛信息id]

##  个人发布所有论坛信息
req:   token   
<br />
res:   [标题, 内容, 图片, 评论数量, 点赞数量 , 论坛信息id]

##  删除一条论坛信息
req:   token   论坛信息id
<br />
res:   是否删除

##  失物招领所有信息
req:   token   
<br />
res:   内容   图片  联系人方式  状态(是否已找回)

##  发布失物信息
req:   token  内容   图片(最多两张)   联系人方式 
<br />
res:   是否成功

##  查询所有兼职
req:   token  
<br />
res:   标题  内容   图片（最多三张）  联系人方式   类型   id

##  查询附近商家活动
req:  token
<br />
res:  标题   内容   图片（最多五张）  联系人方式   类型   地址   id

##  评论
req:  token  类型（商家活动 兼职 论坛 ） 内容   usericon
<br />
res:  是否成功 

##  获取评论内容
req:  token  类型（商家活动 兼职 论坛 ） id
<br />
res:  内容   评论时间  usericon


##  获取二手市场所有内容
req:  token
<br />
res:  内容  价格  usericon 电话  图片(最多三张)  类型 


***新增***

##  获取类型
req:  token  类型(商家活动   兼职   二手市场)
<br />
res:  该类型下所有的type 

##  获取兼职
req:  token  类型(商家活动   兼职   二手市场)
<br />
res:  内容  价格  usericon 电话  图片(最多三张)  类型 

## 商家活动推荐
req:  ''
<br />
res:  标题   内容   图片（最多五张）  联系人方式   类型   地址   id

## 获取轮播图信息
req:  ''
<br />
res:  [url, image] (数组长度最多为3)  

## 获取我的商品
req: token 
<br />
res: 内容  联系人方式  状态(是否已找回)  发布时间 

## 修改个人信息
req:  token  name  department  name   sex   studentnumber   描述   班级   
<br />
res: 内容  联系人方式  状态(是否已找回)  发布时间



 

