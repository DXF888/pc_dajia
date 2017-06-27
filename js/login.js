$(function(){
	/*检查账号和密码是否可以登录*/
	$('#subit').click(function(){
		if($('#username').val() == 'admin' && $('#password').val() == 'admin'){
			$(this).attr("href","control.html");
		}else{
			alert('请输入正确的账号和密码');
		}
	})
});