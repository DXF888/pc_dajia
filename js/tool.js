$(function(){
	//点击之后在0.8秒返回顶部
	$('#return').click(function() {
		$(document.body).animate({ scrollTop: 0 }, 1000);
	});

	//搜索栏的放大镜，放上去显示框
	$('.search-bar').mouseover(function() {
		$(this).css('border', '1px solid red');
		//搜索框显示并保存选中输入的内容
		$(this).children('input').show().focus().select();;
	});
	//搜索栏的放大镜，离开隐藏
	$('.search-bar').mouseout(function() {
		$(this).css('border', 'none');
		$(this).children('input').hide();
	});
	
	
});
	//设置加载动画始终居中
	function sc1(DivId) {

					var t = $(DivId).css('top');
					var l = $(DivId).css('left');
					//获取定位位置
//					console.log('t=' + t);
//					console.log('l=' + l);

					var st = $(document).scrollTop();
					var sl = $(document).scrollLeft();
					//获取滚动上去那部分
//					console.log('st=' + st);
//					console.log('sl=' + sl);

					var ch = document.documentElement.clientHeight;
					var cw = document.documentElement.clientWidth;
					//可见屏幕大小
//					console.log('ch=' + ch);
//					console.log('cw=' + cw);
					
//					console.log($(DivId).offset());
					var ot = $(DivId).offset().top;
					var ol = $(DivId).offset().left;
					//距离文档左边跟上边的距离
//					console.log('ot=' + ot);
//					console.log('ol=' + ol);

					var w = $(DivId).width();
					var h = $(DivId).height();
					//对象的高度和宽度
//					console.log('w=' + w);
//					console.log('h=' + h);

					var top = st + (ch - h) / 2+250;
					var left = sl + (cw - w) / 2;

//					console.log(top);
//					console.log(left);

					$(DivId).css('top', top);
					$(DivId).css('left', left);
					//alert($(DivId).style.top); 
				}