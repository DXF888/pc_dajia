$(function(){
	
	//调用验证码插件
	var verifyCode = new GVerify("v_container");
	
	
	
	/*检查账号和密码是否可以登录*/
	$('#subit').click(function(){
		var res = verifyCode.validate($("#code_input").val());
		if(res ==true && $('#username').val() == 'admin' && $('#password').val() == 'admin'){
			$(this).attr("href","control.html");
		}else{
			alert('请输入正确的账号和密码');
		}
	});
	//当用户按enter键的时候，跳转至后台管理界面
	$(document).keydown(function(event){
		if(event.keyCode == 13){
			var res = verifyCode.validate($("#code_input").val());
			if(res ==true && $('#username').val() == 'admin' && $('#password').val() == 'admin'){	
				window.location.href='control.html';
			}else{
				alert('请输入正确账号和密码');
			}
		}
	});
	$('.huantu').click(function(){
		verifyCode.validate($("#code_input").val());
	})
	
});