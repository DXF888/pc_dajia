/*banner*/
(function() {
	//轮播图
	function carousel() {
		$(".slideBox").slide({ mainCell: ".bd ul", autoPlay: true });
	};
	carousel();

	/*返回顶部*/
	$(window).scroll(function() {
		if($(window).scrollTop() > 0) {
			$("#return").show();
		} else {
			$("#return").hide();
		}
		//判断卷去部分是否大于1550，如果大于怎把隐藏的显示，反之隐藏
		if(parseInt($(window).scrollTop()) > 1550) {
			$('.hideNav').fadeIn();
			$('.hideNav').css({
				'position': 'fixed',
				'top': '0'
			})
		} else {
			$('.hideNav').fadeOut();
		}

	});
	//点击之后在0.8秒返回顶部
	$('#return').click(function() {
		$(document.body).animate({ scrollTop: 0 }, 800);
	});
	//搜索栏的放大镜，放上去显示框，离开隐藏
	$('.search-bar').mouseover(function() {
		$(this).css('border', '1px solid red');
		$(this).children('input').show().focus().select();;
//		console.log($(this).prev());
//		$('.search-bar').show();
	});
	$('.search-bar').mouseout(function() {
		$(this).css('border', 'none');
		$(this).children('input').hide();
	})
})()