
//封面上传完执行事件
function uploadSuccess1(msg) {
	var message = msg;
	var domain = jQuery("#hidDomain").val();
	if(message.split('|').length > 1) {
		var path = message.split('|')[1];
		jQuery('#thumbnail').attr("src", domain + "/" + path);
		jQuery("#hidImageUrl").val("/" + path);
		$('#thumbnail + div > img').attr("src", domain + "/" + path);
	} else {
		alert(message);
	}
	return false;
}
jQuery(function($) {
	
	/*这套方案的思路是先用uploadify将图片上传到服务器上面，
	然后前台得到Ajax中图片的路径显示到前台，
	然后通过jcrop进行裁剪并将裁剪后的参数传递到后台通过php裁剪干刚刚上传的图片，
	并删除以前上传的图片。*/
	//获取文件内容
	$('input[type=file]').each(function(index, value) {
		//当input的file发生变化时
		$(value).change(function() {
			
			$('.move4-box--content').show(); //让预览盒子显示
			$('.pingzhang').show();
			
			var file = this.files[0]; //获取文件信息和文件内容
			var reader = new FileReader(); //读取本地文件

			reader.onload = function() {
				// 通过 reader.result 来访问生成的 DataURL
				var url = reader.result; //
				//获取URL并设置
				//设置当前展示图片
				//显示在预览框的图片
				$('.move4-box--content img').attr('src', url);
				//setImageURL(url);
			};

			reader.readAsDataURL(file);
			
			//把当前调用者存储下来
			var this1 = this;
			console.log(this1);
			//上传图片
//			$.ajax({
//				type:'post',
//				url:'',
//				data:this1,
//				seccess:function(data){
//					
//				}
//			});
			
			

			/*图片裁剪*/
			// Create variables (in this scope) to hold the API and image size
			var jcrop_api,
				boundx,
				boundy,
				//获取元素
				// Grab some information about the preview pane
				$preview = $('#preview-pane'),
				$pcnt = $('#preview-pane .preview-container'),
				$pimg = $('#preview-pane .preview-container img'),

				xsize = $pcnt.width(),
				ysize = $pcnt.height();

			$('#target').Jcrop({
				onChange: updatePreview, //选框改变时触发
				onSelect: updatePreview, ////选择框确定时触发
				minSize: [172, 166], //设置最小宽度
				setSelect: [0, 0, 172, 166], //设置
				aspectRatio: 172 / 166 //缩放比例
			}, function() {

				var bounds = this.getBounds(); // 获取图片的真实大小

				boundx = bounds[0]; //获取图片的真实宽
				boundy = bounds[1]; //获取图片的真实高
				// 将API存储在jcrop_api变量中
				jcrop_api = this;

				// 将预览移动到容器中，用于css定位
				$preview.appendTo(jcrop_api.ui.holder);
			});
			//	console.log('.preview-container');

			//file选择文件事发生变化时开启裁剪

			function updatePreview(c) {
				//判断裁剪的宽度是否大于0
				if(parseInt(c.w) > 0) {
					//
					var rx = xsize / c.w;
					var ry = ysize / c.h;

					//设置预览框的显示比例
					$pimg.css({
						width: Math.round(rx * boundx) + 'px',
						height: Math.round(ry * boundy) + 'px',
						marginLeft: '-' + Math.round(rx * c.x) + 'px',
						marginTop: '-' + Math.round(ry * c.y) + 'px'
					});

					//保存按钮的点击事件
					$('#save').on('click', function() {
						//当前图片的显示比例
//						$(this1).prev('.img').children('img').css({
//							width: Math.round(rx * boundx) + 'px',
//							height: Math.round(ry * boundy) + 'px',
//							marginLeft: '-' + Math.round(rx * c.x) + 'px',
//							marginTop: '-' + Math.round(ry * c.y) + 'px'
//						});
						//上传
						$.ajax({
							type: "POST",
							url: "",
							data: {pointX: c.x, pointY: c.y, maxVal: c.w, maxVal1: c.h },
							success: function(msg) {
								$(this1).prev('.img').children('img').attr('src', url);
							}
						});
						//隐藏
						$('.move4-box--content').hide();
						$('.pingzhang').hide();
					});
				}
			}
		});
	});
});