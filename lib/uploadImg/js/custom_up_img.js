'use strict';
$(function() {
	/*弹出框并且初始化裁剪信息*/
	
	var option = {
		viewMode:1,
		rotatable: false,
		preview: '.up-pre-after'
	}
	$('#image').cropper(option);
	var now = ''
	var img_title = '';
	var fileName = '';
	$(".up-img-touch").click(function(e) {
		$("#doc-modal-1").modal({ width: '600px' });
		$('#image').cropper('setAspectRatio', 400 / 300);
		img_title = 0;
		now = this;
	});
	
	$(".up-img-touch1").click(function() {
		$("#doc-modal-1").modal({ width: '600px' });
		$('#image').cropper('setAspectRatio', 620 / 397);
		img_title = 1;
		now = this;
	});
	$(".up-img-touch2").click(function() {
		$("#doc-modal-1").modal({ width: '600px' });
		$('#image').cropper('setAspectRatio', 1);
		img_title = 2;
		now = this;

	});
	$(".up-img-touch3").click(function() {
		$("#doc-modal-1").modal({ width: '600px' });
		$('#image').cropper('setAspectRatio', 300 / 224);
		img_title = 3;
		now = this;

	});
	$(".up-img-touch4").click(function() {
		$("#doc-modal-1").modal({ width: '600px' });
		$('#image').cropper('setAspectRatio', 750 / 400);
		$('#image').cropper('reset');
		img_title = 4;
		now = this;
	});
	$('.delete-img').click(function(){
		var isdelete=confirm('确定要删除吗');
		if(isdelete){
			oploadImgName(this);
		}
	});
	
		// 事件代理绑定事件
	$(document.body).on('click', '[data-method]', function() {
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
	
	
	    // 上传图片
    var $inputImage = $('#inputImage');
    var URL = window.URL || window.webkitURL;
    var blobURL;
	if (URL) {
        $inputImage.change(function () {
            var files = this.files;
            var file;
            if (files && files.length) {
               file = files[0];
				fileName=file.name;
               if (/^image\/\w+$/.test(file.type)) {
                    blobURL = URL.createObjectURL(file);
                    $('#image').one('built.cropper', function () {
                        // Revoke when load complete
                       URL.revokeObjectURL(blobURL);
                    }).cropper('reset').cropper('replace', blobURL);
                    $inputImage.val('');
                    

                } else {
                    window.alert('Please choose an image file.');

                }
            }
			
            // Amazi UI 上传文件显示代码
            var fileNames = '';
            $.each(this.files, function() {
                fileNames += '<span class="am-badge">' + this.name + '</span> ';
            });
            $('#file-list').html(fileNames);
           
        });
    } else {
        $inputImage.prop('disabled', true).parent().addClass('disabled');
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

		console.log(fileName);
		var url = $(this).attr("url");
		var canvas = $("#image").cropper('getCroppedCanvas');
		var data1 = $("#image").cropper('getData');
		var data = canvas.toDataURL(); //转成base64
		var data2 = {
			"image": data.toString(),
			'data1': data1,
			'fileName': fileName,
			'img_title' :img_title,
			'hotelid':1,
			'picid':49
		}
		$.ajax({
			url: url,
			dataType: 'json',
			type: "POST",
			data: data2,
			success: function(data) {
				$modal.modal('close');
				set_alert_info(data.result);
				$modal_alert.modal();
				if(data != "") {
					$(now).children('img').attr("src", 'http://120.55.70.81:8088/dajiaserver' + data.picpath);
					if(img_title == 1 || img_title ==4){
						$(now).children('img').attr("name",data.picid);
					}
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

});
//删除图片并发送picid给后台
function oploadImgName(than){
		var picid=$(than).attr('name');
		$.ajax({
			type:"post",
			url:"http://120.55.70.81:8088/dajiaserver/Admin/BusinessInfo/del_hotel_img",
			async:true,
			data:{'picid':picid},
			success:function(data){
				alert(data);
				if(data == '删除成功'){
					//给小x号设置删除操作
						$(than).parent().remove();
				}
			}
		});	
	}
function rotateimgright() {
	$("#image").cropper('rotate', 90);
}

function rotateimgleft() {
	$("#image").cropper('rotate', -90);
}

function set_alert_info(content) {
	$("#alert_content").html(content);
}