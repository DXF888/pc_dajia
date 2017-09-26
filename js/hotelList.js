$(function() {
	$('#Next > span').html(">>");
	$('#Previous > span').html("<<");
	if(window.sessionStorage.getItem('hotelList')) {
		//		console.log(window.sessionStorage.getItem('hotelList'));
		var data2 = JSON.parse(window.sessionStorage.getItem('hotelList'));
		var hotelHtml = template("template", data2);
		$('#hotel').html(hotelHtml);
		//点击a标签的时候跳转
		$('#hotel li').click(function() {
			var id = $(this).attr('id');
			window.location.href = "hotelDetails.html?id=" + id;
		});
	}else{
		
		page_jump();
	}
	
	var newdata = {
		'page': 1
	}
	//分页功能
	function page_jump() {

		
		//传入的页数

		//开始时加载一次
		getdata(newdata);

		var page_new = 1;

		//页码点击事件
		$('.pagination li').click(function() {
			console.log("分页功能启动");
			//获取当前下a的数字，就是页码
			var page_number = $(this).children('a').text().trim();

			/*1.判断是不是数字
			 *2.如果是则把当前的数字赋值给page从而进行跳转内容
			 *3.如果不是数字，再判断是向前还是向后
			 *4.如果是向前把上次的减一，并赋值给页码
			 *5.如果是向后把上次的加一，并赋值给页码
			 */
			//下一页点击事件
			if(page_number == ">>") {
				newdata.page = ++page_new;
				getdata(newdata);
			} else if(page_number == '<<') { //上一页点击事件
				newdata.page = --page_new;
				if(newdata.page <= 1) {
					newdata.page = 1;
				}
				getdata(newdata);
			} else { //其他页码的跳转
				page_new = page_number;
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				newdata.page = page_new;
				getdata(newdata);
			}
		});
	}

	//获取后台数据方法
	function getdata(newdata) {
		$.ajax({
			type: "post",
			url: "http://120.55.70.81:8088/dajiaserver/Rest/web/get_hotel_list",
			datatype: 'json',
			data: newdata,
			async: true,
			success: function(data) {
				console.log(data);
				var data1 = JSON.stringify(data);
				window.sessionStorage.setItem('hotelList', data1);

				//				console.log(window.sessionStorage.getItem('hotelList'));
				var hotelHtml = template("template", data);
				$('#hotel').html(hotelHtml);

				//点击a标签的时候跳转
				$('#hotel li').click(function() {
					var id = $(this).attr('id');
					window.location.href = "hotelDetails.html?id=" + id;
				});

			}
		});
	}

});