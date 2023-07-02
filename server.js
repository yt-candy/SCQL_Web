var express = require("express")
var querystring=require("querystring");
var bodyParser=require('body-parser');
var mysql=require("mysql2");
var url=require("url");
var router=require("./router");
const session = require('express-session');
var ejs=require("ejs");
var cors = require('cors');
var http=require("http");
const { checkPrime, generateKey } = require("crypto");

var app=express();
app.set('view engine', 'ejs');//设置EJS作为视图引擎
app.use(cors());//实现cors
var router = express.Router();//创建路由实例
const ip="localhost";
const port=1145;
const originalUser=4;
/*********************创建服务器**********************/
http.createServer((request,response)=>{
  response.writeHead(200,{'Content-Type':'text/plain'});
});
console.log(`Server is running at http://${ip}:${port}`);

/********************MySQL数据库********************/
//配置本机mysql连接基本信息
let connectInfo = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'WangHan@520',
	database: 'user'
})
//数据库建立连接
connectInfo.connect((err)=>{
  if(err){
    console.log('[query] - :'+err);
  }
  console.log("MySQL connection succeed!");
});
//控制台显示已注册用户信息
sqlDemo="select * from userinfo;";
connectInfo.query(sqlDemo,(err,result,fields)=>{
  if(err){
    console.log('[SELECT ERROR] - ',err.message);
    container=[];
    return;
  }
  console.log("userinfo:");
  console.log(result);
});
/*********************访问页面**********************/
app.use('/SCQL_Web',express.static('SCQL_Web'))
app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/"+"Index.html");
  console.log("访问Index.html");
})
app.get('/Index.html',(req,res)=>{
  res.sendFile(__dirname+"/"+"Index.html");
  console.log("访问Index.html");
})
app.get('/Login.html' , (req , res)=>{
  res.sendFile(__dirname+"/"+"Login.html");
   console.log("访问Login.html");
})
app.get('/Register.html' , (req , res)=>{
  res.sendFile(__dirname+"/"+"Register.html");
  console.log("访问Register.html");
})
app.get('/Hall.html' , (req , res)=>{
  res.sendFile(__dirname+"/"+"Hall.html");
  console.log("访问Hall.html");
})
app.get('/LoginFail.html' , (req , res)=>{
  res.sendFile(__dirname+"/"+"LoginFail.html");
  console.log("访问LoginFail.html");
})
app.get('/RegisterSucceed.html' , (req , res)=>{
  res.sendFile(__dirname+"/"+"RegisterSucceed.html");
  console.log("访问RegisterSucceed.html");
})
app.get('/RegisterFail.html' , (req , res)=>{
  res.sendFile(__dirname+"/"+"RegisterFail.html");
  console.log("访问RegisterFail.html");
})

/*********************账号密码验证**********************/
var userAccount;
var sql="";
let body = [];
//添加session中间件
app.use(session({
  secret: '114514',//用于签署session ID的密钥 
  cookie:{maxAge:80000},//cookie（待修改）
  resave: false,
  saveUninitialized: false,
}));
app.post('/process-login',(req,res)=>{
  req.on("data", (chunk) => {
    console.log("收到表单：");
    body.push(chunk);
  });
  console.log(`--------------------`);
  req.on("end", () => {
  //获取用户输入的账号密码
  body = Buffer.concat(body).toString();
  body = querystring.parse(body);
  console.log(body);
  //生成查询语句
  sql=`select * from user.userinfo where account="${body.username}" and password="${body.password}";`;
  console.log("query: "+sql);
  connectInfo.query(sql,(err,result,fields)=>{
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    //若查询结果为null，提示登录错误，否则跳转至Hall.html
    if(result.length==0){
      console.log("账号或密码错误");
      //重置body
      body=[];
      res.redirect(`http://${ip}:${port}/LoginFail.html`);
    }else{
      console.log("登陆成功！");
      //将用户信息存入session
      userAccount={'username':body.username};
      req.session.username=userAccount;
      console.log(req.session.username);
      //重置body
      body=[];
      // res.render('Hall.html', { user: req.session.username });
      res.redirect(`http://${ip}:${port}/Hall.html`);      
    }
  })
  });
})
//前端获取已登录的用户名
app.get('/get-username', (req, res)=>{
  console.log("登录用户为:"+userAccount.username);
  Name=userAccount.username;
  res.json({Name});
})

/*********************注册账号*************************/
let container=[];
let insertsql="";
//四个初始用户
let newUserID=originalUser;
app.post('/process-register',(req,res)=>{
  req.on("data",(chunk)=>{
    console.log("收到注册信息：");
    container.push(chunk);
  });
  console.log(`--------------------`);
  req.on("end", () => {
  //获取用户注册的账号密码
  container = Buffer.concat(container).toString();
  container = querystring.parse(container);
  console.log(container);
  //检查注册时两次密码是否一致
  if(container.password!=container.pass_confirm){
    console.log("两次密码输入不一致");
    container=[];
    res.redirect(`http://${ip}:${port}/RegisterFail.html`);
  }else{
  checkAccountSql=`select * from userinfo where account="${container.username}"`;
  console.log("checkAccountSql:"+checkAccountSql);
  //检测注册账号用户名是否已存在
  connectInfo.query(checkAccountSql,(err,result,fields)=>{
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      container=[];
      return;
    }
    if(result.length!=0){
      console.log("待注册用户名已存在！");
      container=[];
      res.redirect(`http://${ip}:${port}/RegisterFail.html`);
      return;
    }else{
      //将注册信息存入user数据库
      newUserID++;
      console.log("newUserID:",newUserID);
      insertsql= `INSERT INTO userinfo VALUES (${newUserID},'${container.username}','${container.password}')`;
      newUserID+=1;
      console.log("query: "+insertsql);
      connectInfo.query(insertsql,(err,result,fields)=>{
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          container=[];
          return;
        }
        console.log("注册成功！");
        container=[];
        res.redirect(`http://${ip}:${port}/RegisterSucceed.html`);
  })
    }
  });
  
  } 
  });

});
/***************************注销账号***************************/
let tologoff=[];
app.post('/process-logoff',(req,res)=>{
  req.on("data",(chunk)=>{
    console.log("收到注销请求:");
    tologoff.push(chunk);
    console.log(`${chunk}`);
  });
  req.on("end",()=>{
    tologoff = Buffer.concat(tologoff).toString();
    tologoff = querystring.parse(tologoff);
    console.log("注销用户："+tologoff.username);
    logoffsql=`DELETE FROM userinfo where account="${tologoff.username}"`;
    connectInfo.query(logoffsql,(err,result,fields)=>{
      if(err){
        console.log('[DELETE ERROR] - ',err.message);
        tologoff=[];
        return;
      }
      console.log("注销成功！");
      tologoff=[];
      // res.redirect(`http://${ip}:${port}/Index.html`);
    })
  })
})

/**************************SCQL主界面******************************/
//TODO：显示数据库与数据库对应表,显示交互内容（用js实现？）


/**********************接受主界面查询语句****************************/
//TODO：与SCDB对接

//TODO：创建数据库/表
var newDbTbSql=[];
app.post('/create-dbtb',(req,res)=>{
  req.on("data",(chunk)=>{
    console.log("执行中...");
    newDbTbSql.push(chunk);
  });
  req.on("end", () => {
    newDbTbSql = Buffer.concat(newDbTbSql).toString();
    newDbTbSql = querystring.parse(newDbTbSql);
    // console.log(`${newDbTbSql.content}`);
    connectInfo.query(`${newDbTbSql.content}`,(err,result,fields)=>{
      if(err){
        console.log('[CREATE ERROR] - ',err.message);
        newDbTbSql=[];
        return;
      }
      console.log("执行成功！");
      
      newDbTbSql=[];
    })
  });
});

//启动服务器
var server=app.listen(port,()=>{});
