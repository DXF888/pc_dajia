$(function() {
	$(".upinput").fileupload({
		url: "../lib/video/index.php", //文件上传地址，当然也可以直接写在input的data-url属性内  
		dataType: "json", //如果不指定json类型，则传来的json字符串就需要解析jQuery.parseJSON(data.result);  
		formData: function(form) { //如果需要额外添加参数可以在这里添加  
			return [{ name: "param1", value: $(".upinput").attr("param1") },
				{ name: "param2", value: $(".param2").val() }
			];
		},
		done: function(e, data) {
			//done方法就是上传完毕的回调函数，其他回调函数可以自行查看api  
			//注意data要和jquery的ajax的data参数区分，这个对象包含了整个请求信息  
			//返回的数据在data.result中，这里dataType中设置的返回的数据类型为json  
			if(data.result.sta) {
				// 上传成功：  
				$(".upstatus").html(data.result.msg);
				$(".preview").html("<embed src=" + data.result.previewSrc +
					" allowscriptaccess='always' allowfullscreen='true' autostart='false' wmode='opaque'" +
					" width='400' height='300'></embed>");
			} else {
				// 上传失败：  
				$(".progress .bar").css("width", "0%");
				$(".upstatus").html("<span style='color:red;'>" + data.result.msg + "</span>");
			}

		},
		progress: function(e, data) { //上传进度  
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$(".progress .bar").css("width", progress + "%");
			$(".upstatus").html("正在上传...");
		}
	});

});