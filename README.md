# SCQL_Web搭建记录
# TODO：
- [x] 本地部署SCDB
- [x] 本地部署SCQL engine
- [x] 注册时检测新账户名是否已被注册过
- [x] 实现用户数据存储（session，cookie）
- [x] 将请求转换为API文档要求的JSON结构
- [ ] 实现SCDB接收网页端发送的POST请求
- [ ] 新用户信息主钥ID生成方式
- [ ] 实现多方（三方）数据查询
- [ ] 实现账号注销功能
- [ ] 将数据库返回消息动态显示在交互区

# Precondition
- 下载nodejs
- 使用npm下载以下模块
  - axios@1.4.0
  - body-parser@1.20.2
  - cors@2.8.5
  - ejs@3.1.9
  - express-session@1.17.3
  - express-static@1.2.6
  - express@4.18.2
  - mysql@2.18.1
  - mysql2@3.3.3
  - vue-wxlogin@1.0.4

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
