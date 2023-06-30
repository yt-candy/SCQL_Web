alert("欢迎！");
// 获取相关元素
const dbTableButton = document.getElementById('db-table-button');
const dataProcessingButton = document.getElementById('data-processing-button');
const inputTextarea = document.getElementById('input-textarea');

// 点击 "数据库/表" 按钮时修改输入区域的期待输入内容
dbTableButton.addEventListener('click', function() {
  inputTextarea.placeholder = 'CREATE DATABASE [IF NOT EXISTS] database;\nDROP DATABASE [IF EXISTS] database;\nCREATE TABLE [IF NOT EXISTS] tbl_name TID [=] value\nDROP TABLE [IF EXISTS] tbl_name';
});

// 点击 "数据处理" 按钮时修改输入区域的期待输入内容
dataProcessingButton.addEventListener('click', function() {
  inputTextarea.placeholder = "SELECT [DISTINCT] select_expr [, select_expr] ... [FROM table_reference] [WHERE where_condition] [GROUP BY column]\nGRANT SELECT/REVOKE [CONSTRAINTS]([DATA]) ON [TABLE] TO [USER]";
});

 // 提交表单时清空输入区域内的内容
 function submitForm() {
  inputTextarea.value = ''; // 清空输入区域的文本内容
}