const http = require("http");
const express=require("express");
const fs = require("fs");
const qs = require("querystring");
const mysql= require('mysql2');
const Router = require("express");
const port = 3000;
const ip = "127.0.0.1";
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'WangHan@520',
  database : 'user'
});
connection.connect((err)=>{
  if(err){
      console.log('[query]-:'+err);
  }
  console.log('[connection connect] succeed!');
});
const sendResponse = (filename, statusCode, response) => {
  fs.readFile(`./html/${filename}`, (error, data) => {
    if (error) {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end("Sorry, internal error");
    } else {
      response.statusCode = statusCode;
      response.setHeader("Content-Type", "text/html");
      response.end(data);
    }
  });
};

const server = http.createServer((request, response) => {
  const method = request.method;
  let url = request.url;

  if (method === "GET") {
    const requestUrl = new URL(url, `http://${ip}:${port}`);
    url = requestUrl.pathname;
    const lang = requestUrl.searchParams.get("lang");
    let selector;

    if (lang === null || lang === "en") {
      selector = "";
    } else if (lang === "zh") {
      selector = "-zh";
    } else {
      selector = "";
    }

    if (url === "/") {
      sendResponse(`Index${selector}.html`, 200, response);
    } else if (url === "/Login.html") {
      sendResponse(`Login${selector}.html`, 200, response);
    } else if (url === "/Register.html") {
      sendResponse(`Register${selector}.html`, 200, response);
    } else if (url === "/Hall.html") {
      sendResponse(`Hall${selector}.html`, 200, response);
    } else {
      sendResponse(`404${selector}.html`, 404, response);
    }
  } else {
    if (url === "/server") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        body = qs.parse(body);
        console.log(body);
        //数据库查询
        let Query=`select * from user.userinfo where account="${body.username}" and password="${body.password}"`;
        connection.query(Query,(err,result)=>{
          if(err){
          console.log('[query]-:'+err);
          }else{
            if(result.length==0){
              console.log("账号或密码错误")
              if (!headersSent) {
                response.statusCode = 301;
                response.setHeader("Location", "/Login.html");
                headersSent = true; // 设置响应头部后将变量设置为true
              }
            }else{
              response.statusCode = 301;
              response.setHeader("Location", "/Hall.html");
              headersSent = true; // 设置响应头部后将变量设置为true
            }
          }
        });
        response.end();
      });
    }
  }
});

server.listen(port, ip, () => {
  console.log(`Server is running at http://${ip}:${port}`);
});