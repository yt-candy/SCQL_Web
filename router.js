const express = require('express'); //创建路由实例
const router = express.Router();
router.get('/',(req,res) => {
  res.render('Index.html');
})
module.exports = router  //暴露接口
