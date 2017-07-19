
$(function() {

	//点击全选图标显示跟隐藏
	$('.hotel-content-search-button1').click(function() {
		$('.shopMessageControl-container input[type=checkbox]').each(function(index, value) {
			if($(value).attr('checked') == 'checked') {
				$(value).removeAttr('checked');
			} else {
				$(value).attr('checked', 'checked');
			}
		});
	});
	/*酒店详情管理*/

	//编辑删除图片设置
	//把小x好点出来
	$('.move-operation').each(function(index, value) {
		$(value).click(function() {
			$(this).parent().siblings().children('.delete-img').toggle();
			$(this).parent().siblings().children('.banquet-delete-img').toggle();
		})
	});


	// 上传图片

});