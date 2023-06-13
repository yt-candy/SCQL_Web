# SCQL_Web搭建记录
# TODO：
- [ ] 本地部署SCDB
- [ ] 本地部署SCQL engine
- [ ] 实现SCDB接收网页端发送的POST请求
- [ ] 注册时检测新账户名是否已被注册过
- [ ] 新用户信息主钥ID生成方式
- [ ] 实现多方（三方）数据查询

# 2023.6.13
- 部署SCDB后，终端无法检测到SCDB容器
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
2023-06-12 01:59:23 2023-06-12 07:59:23.6127 INFO main.go:85 Starting to read config file: /home/admin/configs/config.yml
2023-06-12 01:59:23 2023-06-12 07:59:23.6127 INFO main.go:98 Starting to connect to database and do bootstrap if necessary...
2023-06-12 01:59:23 2023-06-12 07:59:23.6127 INFO main.go:122 Starting to serve request with http...
```
# 2023.6.11
## 实现
- 主界面html外壳搭建ßßß
- 通过nodejs搭建后端服务器与本地MySQL数据库对接
- 实现网页端注册与密码登录功能
- 注册时检查两次密码是否一致
# 2023.5.18
## 实现
- SCQL_Web html静态界面
- 利用JavaScript检测密码输入是否为空
- 主界面切换查询功能时，显示不同输入提示
