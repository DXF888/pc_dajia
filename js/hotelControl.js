
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
	//给小x号设置删除操作
	$('.delete-img').each(function(index, value) {
		$(value).click(function() {
			$(this).parent().remove();
		});
	});
	$('.banquet-delete-img').each(function(index, value) {
		$(value).click(function() {
			$(this).parent().remove();
		});
	});

	// 上传图片
	/*当选择的图片改变时，把设置的图片显示在框里*/
//	$(document).on('change', 'input[type=file]', function() {
//		//设置弹出框大小
//		$("#up-img-touch").click(function() {
//			$("#doc-modal-1").modal({ width: '600px' });
//		});
//		$('.am-modal').show();
//		//即时显示长传的图片
//			var objUrl = getObjectURL(this.files[0]);
//			if(objUrl) {
//				$(this).parent().parent().children('img').attr("src", objUrl);
//
//				$(this).parent().parent().children('img').css({
//					'width': '172px',
//					'height': '166px'
//				});
//				$(this).parent().parent().children('img').removeClass("hide");
//			}
//		//建立一個可存取到該file的url
//		function getObjectURL(file) {
//			var url = null;
//			if(window.createObjectURL != undefined) { // basic
//				url = window.createObjectURL(file);
//			} else if(window.URL != undefined) {
//				// mozilla(firefox)
//				url = window.URL.createObjectURL(file);
//			} else if(window.webkitURL != undefined) {
//				// webkit or chrome
//				url = window.webkitURL.createObjectURL(file);
//			}
//			return url;
//		}
//	});
});