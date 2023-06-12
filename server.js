var express = require("express")
var querystring=require("querystring");
var bodyParser=require('body-parser');
var mysql=require("mysql2");
var url=require("url");
var router=require("./router");

var http=require("http");
var app=express();
var router = express.Router();//创建路由实例
const ip="127.0.0.1";
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
var sql="";
let body = [];
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
      //重置body
      body=[];
      res.redirect(`http://${ip}:${port}/Hall.html`);      
    }
  })
  });
})

/*********************注册账号*************************/
let container=[];
let insertsql="";
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
  //TODO:检测账号是否已存在
  if(container.password!=container.pass_confirm){
    container=[];
    res.redirect(`http://${ip}:${port}/RegisterFail.html`);
  }else{
  //TODO：生成主钥

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

});
/***************************注销账号***************************/
//TODO：如果添加注销功能，要修改注册时获取id的方法


/**************************SCQL主界面******************************/
//TODO：显示数据库与数据库对应表


/**********************接受主界面查询语句****************************/
//TODO：与SCDB对接
let sqlHall="";
let containerHall=[];
app.post('/process-query',(req,res)=>{
  req.on("data", (chunk) => {
    console.log("执行：");
    containerHall.push(chunk);
  });
  console.log(`--------------------`);
  req.on("end", () => {
  //获取查询语句
  containerHall = Buffer.concat(containerHall).toString();
  containerHall = querystring.parse(containerHall);
  console.log(containerHall.query);
  //查询后清空containerHall
  containerHall=[];
  });
});

//启动服务器
var server=app.listen(port,()=>{});