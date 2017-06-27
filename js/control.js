$(function() {
	/*后台管理侧边导航的一级菜单点击 */
	function subClick() {
		var subNav = $('.subnav').children('a');
		for(var i=0; i<subNav.length;i++){
			$(subNav[i]).click(function(event){
				$('.content-header').html('当前位置是：'+'<a href="control.html">'+$(this).text()+'</a>'+"&gt;");
				$(this).next().toggle();
				if($(this).next().css('display') =='none'){
					$('.submenu').css('display','none');
				}
			})
		}
	};
	subClick();
	/*二级菜单的点击事件*/
	function subMenuClick(){
		var subMenu=$('.submenu').prev('a');
		$(subMenu).each(function(index,value){
			$(value).click(function(){
				$('.content-header').append('<a>'+$(this).text()+'</a>');
				$(this).siblings('ul').toggle();
			});
		})
	}
	subMenuClick();
	//显示内容头部的信息
	
});