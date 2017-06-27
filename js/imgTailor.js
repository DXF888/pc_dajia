jQuery(function($) {
	//获取文件内容
	$('input[type=file]').each(function(index, value) {
		//当input的file发生变化时
		$(value).change(function() {
			//把当前调用者存储下来
			var this1 = this;
			$('.container').css('display', 'block'); //把盒子显示出来
			$('.jcrop-preview').show(); //让预览盒子显示
			var file = this.files[0]; //获取文件信息和文件内容
			var reader = new FileReader(); //读取本地文件

			reader.onload = function() {
				// 通过 reader.result 来访问生成的 DataURL
				var url = reader.result;
				$('.imgTailor').show(); //
				//获取URL并设置
				//设置当前展示图片
				$(this1).parent().prev('.img').children('img').attr('src', url);
				//显示在预览框的图片
				$('.imgTailor img').attr('src', url);
				//setImageURL(url);

			};
			//
			reader.readAsDataURL(file);


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
				onChange: updatePreview,
				onSelect: updatePreview,
				aspectRatio: xsize / ysize
			}, function() {
				// Use the API to get the real image size
				var bounds = this.getBounds();
				var widSize = this.getWidgetSize();
				var scaleFator = this.getScaleFactor();
				boundx = bounds[0];
				boundy = bounds[1];
				// Store the API in the jcrop_api variable
				jcrop_api = this;

				// Move the preview into the jcrop container for css positioning
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
				}
				//保存按钮的点击事件
				$('.imgTailor button').on('click', function() {
					$(this).parent().css('display', 'none');
					//当前图片的显示比例
					$(this1).parent().prev('.img').children('img').css({
						width: Math.round(rx * boundx) + 'px',
						height: Math.round(ry * boundy) + 'px',
						marginLeft: '-' + Math.round(rx * c.x) + 'px',
						marginTop: '-' + Math.round(ry * c.y) + 'px'
					});
				});
			};

			
		});
	})

	/*设置img的url*/
	function setImageURL(url) {
		image.src = url;
		//		console.log(22);
	}

});