$(function() {
	//设置让下面的选项，在选中时把下面的chekbox也同时选中状态
	$('.content-search-checkbox').click(function() {
		if($(this).is(':checked')) {
			$('.content-main-checkbox').attr('checked', 'true');
		} else {
			$('.content-main-checkbox').attr('checked', '');
		}
	});
	//判断全部选中没有，选中就全部删除
	$('.batchesDelete').click(function() {
//		if($('.content-search-checkbox').is(':checked')) {
			if($('.content-main-checkbox').is(':checked')){
				$('.content-main').remove();
			}
//		}
	});
	//添加按钮
	$(document).on('click', '.content-search-add', function() {
		var contentMainHtml = '';
		contentMainHtml +='<input class="fl content-main-checkbox" type="checkbox" id="" value="" />';
		contentMainHtml +='<div class="content-main-left fl">';
		contentMainHtml +='<img src="../img/imgControl/tupian.png" />';
		contentMainHtml +='<span class="content-main-left-sp1">名称</span><span class="content-main-left-sp2">大小</span>';
		contentMainHtml +='<input type="text" placeholder="图片路径" />';
		contentMainHtml +='<input type="file" />';
		contentMainHtml +='</div>';
		contentMainHtml +='<div class="content-main-right fl">';
		contentMainHtml +='<p class="content-main-right-p1">';
		contentMainHtml +='<a href="javascript:;" class="delete-btn">';
		contentMainHtml +='删除</a>';
		contentMainHtml +='</p>';
		contentMainHtml +='<p>';
		contentMainHtml +='上传时间</p>';
		contentMainHtml +='<input type="text" placeholder="链接地址" />';
		$('.content-container').append("<div class='content-main'>" + contentMainHtml + "</div>");
	});
	//删除按钮
	$(document).on('click', '.delete-btn', function() {
		if($('.content-main-checkbox').is(':checked')) {
			$(this).parents('.content-main').remove();
		}
	});
});