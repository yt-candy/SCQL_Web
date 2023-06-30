   // 密码检查功能暑假实现
    // // 登录页面的前端验证逻辑
    // function loginFormSubmit(event) {
    //   event.preventDefault();
    //   var username = document.getElementById("username").value;
    //   var password = document.getElementById("password").value;

    //   // 使用AJAX将登录信息发送到后端进行验证
    //   var xhr = new XMLHttpRequest();
    //   xhr.open("POST", "login.php", true);
    //   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //   xhr.onreadystatechange = function() {
    //     if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    //       var response = JSON.parse(xhr.responseText);
    //       if (response.success) {
    //         alert("登录成功！");
    //         window.location.href = "Hall.html"; // 跳转到Hall.html页面
    //       } else {
    //         alert("登录失败：" + response.message);
    //       }
    //     }
    //   };
    //   xhr.send("username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
    // }

     // 登录页面的前端验证逻辑
     // 登录按钮点击后直接显示登录成功并跳转到Hall.html页面
     function loginFormSubmit(event) {
        event.preventDefault();
        alert("登录成功！");
        window.location.href = "Hall.html"; // 跳转到Hall.html页面
      }