'use strict';
$(function() {
	/*弹出框并且初始化裁剪信息*/

	var option = {
		rotatable: false,
		preview: '.up-pre-after',
	}
	$('#image').cropper(option);
	var now=''
	var img_title="";
	$(".up-img-touch").click(function() {
		$("#doc-modal-1").modal({ width: '600px' });
		$('#image').cropper('setAspectRatio', 400 / 300);
		img_title=0;
		now=this;
	});

	$(".up-img-touch1").click(function() {
		$("#doc-modal-1").modal({ width: '600px' });
		$('#image').cropper('setAspectRatio', 620 / 397);
		now=this;
	});
	$(".up-img-touch2").click(function() {
		$("#doc-modal-1").modal({ width: '600px' });
		$('#image').cropper('setAspectRatio', 1);
		now=this;
	});
	$(".up-img-touch3").click(function() {
		$("#doc-modal-1").modal({ width: '600px' });
		$('#image').cropper('setAspectRatio', 300 / 224);
		img_title=3;
		now=this;
	});
	$(".up-img-touch4").click(function() {
		$("#doc-modal-1").modal({ width: '600px' });
		$('#image').cropper('setAspectRatio', 750 / 400);
		img_title=4;
		now=this;
	});
	//图片上传
	var $inputImage = $('#inputImage');
	var URL = window.URL || window.webkitURL;
	var blobURL;
	if(URL) {
		$inputImage.change(function() {
			var files = this.files;
			var file;
			if(files && files.length) {
				file = files[0];
				if(/^image\/\w+$/.test(file.type)) {
					blobURL = URL.createObjectURL(file);
					$('#image').one('built.cropper', function() {
						// Revoke when load complete
						URL.revokeObjectURL(blobURL);
					}).cropper('reset').cropper('replace', blobURL);
					$inputImage.val('');
				} else {
					window.alert('Please choose an image file.');
				}

				//绑定上传事件
				$('#up-btn-ok').on('click', function() {
					var $modal = $('#my-modal-loading');
					var $modal_alert = $('#my-alert');
					var img_src = $('#image').attr("src");
					if(img_src == "") {
						set_alert_info("没有选择上传的图片");
						$modal_alert.modal();
						return false;
					}

					$modal.modal();

					var fileName = file.name;
//					console.log(fileName);
					var url = $(this).attr("url");
					var canvas = $("#image").cropper('getCroppedCanvas');
					var data1 = $("#image").cropper('getData');
					var data = canvas.toDataURL(); //转成base64
					var data2={
							"image": data.toString(), 
							'data1':data1, 
							'fileName':fileName
					}
					$.ajax({
						url: url,
						//dataType: 'json',
						type: "POST",
						data: data2,
						success: function(data) {
							$modal.modal('close');
							set_alert_info(data.result);
							$modal_alert.modal();
							
							if(data != "") {
								$(now).children('img').attr("src", data);
							}

						},
						error: function() {
							$modal.modal('close');
							set_alert_info("上传文件失败了！");
							$modal_alert.modal();
							console.log('Upload error');  
						}
					});
				});
				/*图片上传结束*/
			}

//			 Amazi UI 上传文件显示代码
						var fileNames = '';
						$.each(this.files, function() {
							fileNames += '<span class="am-badge">' + this.name + '</span> ';
						});
						$('#file-list').html(fileNames);

		});
	} else {
		$inputImage.prop('disabled', true).parent().addClass('disabled');
	}

	// 初始化

	// 事件代理绑定事件
		$('.docs-buttons').on('click', '[data-method]', function() {
			var $this = $(this);
			var data = $this.data();
			var result = $('#image').cropper(data.method, data.option, data.secondOption);
			switch(data.method) {
				case 'getCroppedCanvas':
					if(result) {
						// 显示 Modal
						$('#cropped-modal').modal().find('.am-modal-bd').html(result);
						$('#download').attr('href', result.toDataURL('image/jpeg'));
					}
					break;
			}
		});

});

function rotateimgright() {
	$("#image").cropper('rotate', 90);
}

function rotateimgleft() {
	$("#image").cropper('rotate', -90);
}

function set_alert_info(content) {
	$("#alert_content").html(content);
}