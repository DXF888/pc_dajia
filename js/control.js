$(function() {
	/*后台管理侧边导航的一级菜单点击 */
	function subClick() {
		var subNav = $('.subnav').children('a');
		for(var i=0; i<subNav.length;i++){
			$(subNav[i]).click(function(event){
				//设置面包屑导航
				var this_content=$(this).text();
				$('.content-header').html('当前位置是：'+'<a href="control.html">'+this_content+'</a>'+"&gt;");
				
				//让一级菜单点击显示或者关闭
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
				var this_text=$(this).text();
				var content_header=$('.content-header').html();
				console.log(this_text);
				console.log(content_header);
				if(this_text.indexOf(content_header)){
					console.log(11);
				}
				//设置面包屑导航
				$('.content-header').append('<a>'+this_text+'</a>');
				
				//让二级菜单点击显示或者关闭
				$(this).siblings('ul').toggle();
			});
		})
	}
	subMenuClick();
	//显示内容头部的信息
	
});