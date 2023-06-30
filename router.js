const express = require('express'); //创建路由实例
const router = express.Router();
router.get('/',(req,res) => {
  res.render('Index.html');
})
router.get('/Hall.html', function(req, res, next) {
  console.log("到这儿了")
  var user = req.session.username;
  console.log(user);
   res.render('Hall.html', { username:user.username});
});

module.exports = router  //暴露接口
