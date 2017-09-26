$(function() {
	//获取侧边导航下的所有li
	var $sidNav = $('#sideNav');
	var $sideNav_li = $('#sideNav li');
	
	//默认为第一个时选中  给第一个导航设置背景色
	$sideNav_li.eq(0).addClass('active');
	
	//监听scrollTOP的值
	$(window).scroll(function() {
		
		//获取滚动的scrollTop的值
		var wind_scrollTop = parseInt($(window).scrollTop());
		
		//判断卷去部分是否大于750，如果大于就把隐藏的那个按钮显示，反之隐藏
		var procedure_top=$('#procedure').offset().top;
		if(wind_scrollTop > procedure_top) {
			$sidNav.fadeIn().css({ 'position': 'fixed', 'top': 100 });
		} else {
			$sidNav.fadeOut();
		}
		sidNav1_roll($sidNav,wind_scrollTop,$sideNav_li);
		
		function sidNav1_roll(nav,scrollTop,nav_li){
			//判断侧边导航是否显示
			if(nav.css('display') == 'block') {	
				//导航跟随滚动条走
				if( scrollTop >= 0){
					nav_li.removeClass('active');
					nav_li.eq(0).addClass('active');	
				}
				if(scrollTop >= getModuleTop('#Emcee')) {
					nav_li.removeClass('active');
					nav_li.eq(1).addClass('active');	
				}
				if(scrollTop >= getModuleTop('#Makeup')) {
					nav_li.removeClass('active');
					nav_li.eq(2).addClass('active');
				}
				if(scrollTop >= getModuleTop('#Camera')) {
					nav_li.removeClass('active');
					nav_li.eq(3).addClass('active');
				}
				if(scrollTop >= getModuleTop('#Photography')) {
					nav_li.removeClass('active');
					nav_li.eq(4).addClass('active');
				}
				if(scrollTop >= getModuleTop('#Performer')) {
					$sideNav_li.removeClass('active');
					$sideNav_li.eq(5).addClass('active');
				}
			}

		}
		
		//获取页面元素的offsetTop
		function getModuleTop(id){
			 return parseInt($(id).offset().top);
		}
		
		//遍历侧边导航的每一个li
		$sideNav_li.each(function(index, value) {
			//点击每一个li的时候选为当前选中。
			$(value).click(function() {
				if(!(index == $sideNav_li.length-1)){
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
				}
			});
		});
	});


});