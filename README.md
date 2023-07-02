# SCQL_Web搭建记录
# TODO：
- [x] 本地部署SCDB
- [x] 本地部署SCQL engine
- [x] 注册时检测新账户名是否已被注册过
- [x] 实现用户数据存储（session，cookie）
- [x] 将请求转换为API文档要求的JSON结构
- [x] 实现账号注销功能
- [x] 新用户信息主钥ID生成方式
- [ ] 实现SCDB接收网页端发送的POST请求
- [ ] 实现多方（三方）数据查询（在一台电脑上模拟多方查询？）
- [ ] 将数据库返回消息动态显示在交互区
- [ ] 修改docker容器源码中允许请求头
- [ ] 登录后加载对应可见数据库以及对应数据库包含的表
# Precondition
- 下载nodejs
- 使用npm（nodejs自带）下载以下模块
```
  npm install axios
  npm install body-parser
  npm install ejs
  npm install express-session
  npm install express-static
  npm install express
  npm install mysql2
```
# 分工
## 当前状况
- 鉴于大一立项结题答辩将至，~~师兄导师步步紧逼~~，所以在大好的暑假时间，希望大家能齐心协力，尽快弄清SCQL原理，做好网页客户端，复现SCDBclient的查询过程
## 概述
- 我们立项的所有进度都在`https://github.com/DINOREXNB/SCQL_Web`上记录，当天的新**工作进度**和**问题**就写在`README.txt`上
- `README.txt`格式参考我之前写的来，内容尽量简洁
## 遇见问题？
- STFW(search the fxxking web) first! 不能解决的先上网查
	- [stack overflow](https://stackoverflow.com/)
	- [csdn](https://www.csdn.net/)
	- [github issue](https://github.com/secretflow/scql/issues)
- 组内讨论
- 挂在`README.txt`内，把日志/截图也放上去，之后问师兄或导师（？）
## 具体分工（W、T、H）
- 都得会：
	- git基础操作（github合作需要）
	- 前端三件套（HTML、CSS、JS）相关语法
	- nodejs基础语法，http服务器如何搭建、使用
	- Google浏览器控制台
	- sql语句语法
	- mysql工作台基础使用
	- docker使用镜像、查看镜像日志
1. 实现SCDB接收网页端发送的POST请求（解决跨域请求限制）（T）
	- 了解ajax/xhr请求
	- 学会使用nginx进行反向代理，怎么写配置文件
	- 部署SCDB，engine（看隐语部署文档）
2. 将数据库返回消息动态显示在网页交互区（H）
	- 学会express模块使用
3. 登录后加载对应可见数据库以及对应数据库包含的表（T）
	- JS事件监听器
	- 网页内容动态更新
	- 数据库与网页交互（mysql2模块学习）
4. 在网页客户端选择sql文件用以生成数据库和表（H）
	- sql生成数据库/表的语法
5. 实现多方（三方）数据查询（在一台电脑上模拟多方查询？）（W、T、H）
6. 修改网页布局，通过session获得API要求的请求结构相关信息（W）
## 课程/网站推荐
- mysql数据库、sql语句
	- [Youtube CodewithMosh](https://www.youtube.com/watch?v=7S_tz1z_5bA)
- 三件套、nodejs、jQuery
	- [菜鸟教程](https://www.runoob.com/)
	- [文轩解码](https://www.youtube.com/@wenxuandecode4140)
- Docker
	- [Youtube CodewithMosh](https://www.youtube.com/watch?v=pTFZFxd4hOI)
- git
	- [廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600)
## 碎碎念
- 这个大一立项其实本质就是做一个toy project，导师也没有把我们逼得很紧（~~就是没管~~），~~据说21级也有不少ppt战神过了结题答辩的~~，但是作为工大人，我们要秉持一个有始有终的态度，才不负“规格严格、功夫到家”嘛。之前确实自己一个人做了一些东西，但是现在我发现只靠一个人是很难完成的，还是需要大家的合作才能让我们的立项继续下去，这个暑假相信也比之前空出了许多时间，希望大家能如期完成，真正的从大一立项学到一些有用的东西，让这个项目完美收官

# 2023.7.1
## 实现
- 在网页客户端实现本地文件浏览
- 浏览本地sql文件执行查询语句、生成数据库/表
# 2023.6.30
## 实现
- 利用nginx服务器进行反向代理解决跨域问题（测试网页可以收到回复）
# 2023.6.26
## 实现
- 账号注销
- 登出账户
# 2023.6.19
## 实现
- 用户登陆后在主界面加载用户信息
# 2023.6.18
## 问题
- （SCDB服务器已经可以接收到请求）由于端口不同发生跨域问题，未实现CORS

<img width="1171" alt="截屏2023-06-18 17 37 34" src="https://github.com/DINOREXNB/SCQL_Web/assets/130140331/5785c96f-d7aa-454d-8338-81fea14aeb1a">

# 2023.6.14
## 问题
- ~~使用xhr对象发送HTTP请求到"http://127.0.0.1:8080/public/submit_and_get" 显示无法找到该地址，但是docker的scdb容器中显示~~
```
INFO main.go:122 Starting to serve request with http...
```
（已经将容器内部8080端口映射到主机的8080端口）

<img width="625" alt="截屏2023-06-15 05 59 49" src="https://github.com/DINOREXNB/SCQL_Web/assets/130140331/9cf520bb-f3a4-49aa-8042-768e50efa011">

# 2023.6.13
## 实现
- docker compose中SCDB部署，engine部署
- 注册用户名检查

## 问题
- ~~Hall.html提交表单被拒绝访问~~
<img width="1206" alt="截屏2023-06-14 01 50 26" src="https://github.com/DINOREXNB/SCQL_Web/assets/130140331/e98531db-6616-40b1-a004-2d8112b6b580">

- ~~部署SCDB后，终端无法检测到SCDB容器~~
```
2023-06-12 01:59:07 2023-06-12 07:59:07.6127 INFO main.go:85 Starting to read config file: /home/admin/configs/config.yml
2023-06-12 01:59:07 2023-06-12 07:59:07.6127 INFO main.go:98 Starting to connect to database and do bootstrap if necessary...
2023-06-12 01:59:07 2023-06-12 07:59:07.6127 INFO logger.go:147 /home/admin/dev/pkg/scdb/server/server.go:97
2023-06-12 01:59:07 [error] failed to initialize database, got error dial tcp 172.20.0.3:3306: connect: connection refused
2023-06-12 01:59:07 2023-06-12 07:59:07.6127 FATAL main.go:102 Failed to connect to database and bootstrap it: dial tcp 172.20.0.3:3306: connect: connection refused
2023-06-12 01:59:20 2023-06-12 07:59:20.6127 INFO main.go:85 Starting to read config file: /home/admin/configs/config.yml
2023-06-12 01:59:20 2023-06-12 07:59:20.6127 INFO main.go:98 Starting to connect to database and do bootstrap if necessary...
2023-06-12 01:59:20 2023-06-12 07:59:20.6127 INFO logger.go:147 /home/admin/dev/pkg/scdb/server/server.go:97
2023-06-12 01:59:20 [error] failed to initialize database, got error dial tcp 172.20.0.3:3306: connect: connection refused
2023-06-12 01:59:20 2023-06-12 07:59:20.6127 FATAL main.go:102 Failed to connect to database and bootstrap it: dial tcp 172.20.0.3:3306: connect: connection refused
```
# 2023.6.11
## 实现
- 主界面html外壳搭建
- 通过nodejs搭建后端服务器与本地MySQL数据库对接
- 实现网页端注册与密码登录功能
- 注册时检查两次密码是否一致
# 2023.5.18
## 实现
- SCQL_Web html静态界面
- 利用JavaScript检测密码输入是否为空
- 主界面切换查询功能时，显示不同输入提示
