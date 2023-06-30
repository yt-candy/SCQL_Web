function registerFormSubmit(event) {
    event.preventDefault();
    // 处理注册操作
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;

    if (password1 !== password2) {
      document.getElementById("error-message").innerText = "请重新核对密码";
      alert("两次输入的密码不一致，请重新输入");
      return;
    }
    // 注册成功后显示提示消息
    alert("注册成功！");
    
    // 跳转至登录界面
    window.location.href = "Login.html";
  }