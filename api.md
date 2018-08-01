## 学生注册
req：  学号   密码（初始密码为学号后6位）
res:   token

## 普通登陆
req:   使用微信登陆 
res:   返回openid

## 学生登陆
req:   学号   密码
res:   token

## 查询用户信息
req:   token
res:   姓名   性别   学号   班级   系别   学校id  头像  积分  介绍

## 查询学校
req：   token
res:   学校名称   学校地址

##  发布一条论坛信息
req:   token   标题   内容   图片（多图  最多五张）  
res:   是否成功

##  查询论坛全部信息
req:   token   
res:   [标题, 内容, 图片, 评论数量, 点赞数量,  论坛信息id]

##  个人发布所有论坛信息
req:   token   
res:   [标题, 内容, 图片, 评论数量, 点赞数量 , 论坛信息id]

##  删除一条论坛信息
req:   token   论坛信息id
res:   是否删除

##  失物招领所有信息
req:   token   
res:   内容   图片  联系人方式 

##  发布失物信息
req:   token  内容   图片(最多两张)   联系人方式 
res:   是否成功

##  查询所有兼职
req:   token  
res:   标题  内容   图片（最多三张）  联系人方式   类型   id


##  查询附近商家活动
req:  token
res:  标题   内容   图片（最多五张）  联系人方式   类型   地址   id

##  评论
req:  token  类型（商家活动 兼职 论坛 ） 内容
res:  是否成功 

##  获取评论内容
req:  token  类型（商家活动 兼职 论坛 ） id
res:  内容

