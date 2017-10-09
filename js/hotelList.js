var bj=1;
//window.onload = function() {
//		console.log("刷新了");
//		bg = true;
//		console.log(bg);
//}
$(function() {
	var newData = {
		"page": 1,
		"district": '',
		"starsort": '',
		"price": ''
	}
	console.log(bj);
//	var area_li, price_li, star_li;
	if(bj==1){
		getdata(newData);
	}
	//	console.log(newData.page);
//	if(bg) {
//		//		bj = false;
//
//		//console.log(window.sessionStorage.getItem('hotelList'));
//		var data2 = JSON.parse(window.sessionStorage.getItem('hotelList'));
//		var pages = JSON.parse(window.sessionStorage.getItem('pages'));
//		var num = JSON.parse(window.sessionStorage.getItem('num'));
//		if(data2.response.length >= 1) {
//			var hotelHtml = template("template", data2);
//			$('#hotel').html(hotelHtml);
//				
//			//点击a标签的时候跳转
//			$('#hotel li').click(function() {
//				var id = $(this).attr('id');
//				window.location.href = "hotelDetails.html?id=" + id;
//			});
//
//			$('#filtrate .area li').each(function(index, value) {
//
//			})
//			$('#filtrate .price li').each(function(index, value) {
//
//			});
//			$('#filtrate .star li').each(function(index, value) {
//
//			})
//			//分页
//			if((num / 16) <= 0) {
//				$('.fy').css('display', 'none');
//			} else {
//				$('.fy').css('display', 'block');
//			}
//			$("#page").paging({
//				pageNo: num,
//				totalPage: pages,
//				totalSize: 300,
//				callback: function(num) {
//					//				console.log(num);
//					newData.page = num;
//					$.ajax({
//						type: "post",
//						url: "http://120.55.70.81:8088/dajiaserver/Rest/web/get_hotel_list",
//						data: newData,
//						async: true,
//						success: function(data) {
//							var data1 = JSON.stringify(data);
//							window.sessionStorage.setItem('hotelList', data1);
//							window.sessionStorage.setItem('pages', parseInt(data.response[0].num / 16));
//							window.sessionStorage.setItem('num', num);
//
//							//console.log(window.sessionStorage.getItem('hotelList'));
//							var hotelHtml = template("template", data);
//							$('#hotel').html(hotelHtml);
//
//							//点击a标签的时候跳转
//							$('#hotel li').click(function() {
//								var id = $(this).attr('id');
//								window.location.href = "hotelDetails.html?id=" + id;
//							});
//						}
//					});
//				}
//			});
//		} else {
//			getdata(newData);
//		}
//
//	} else {
//		getdata(newData);
//	}

	$('#filtrate .area li').on('click', function() {
		$(this).siblings().css('color', '#7B7B7B');
		$(this).css('color', '#F05053');
		newData.district = $(this).text();
		if($(this).text() == "全部") {
			newData.district = ''
		}
		window.sessionStorage.setItem('num', 1);
		newData.page = 1;
		getMsg(newData);
	});
	$('#filtrate .price li').on('click', function() {
		$(this).siblings().css('color', '#7B7B7B');
		$(this).css('color', '#F05053');
		newData.price = $(this).text();
		if($(this).text() == '2000以下'){
			newData.price = 2000;
		}
		if($(this).text() == '6000以上'){
			newData.price= 6000;
		}
		if($(this).text() == "全部") {
			newData.price = ''
		}
		window.sessionStorage.setItem('num', 1);
		newData.page = 1;
		getMsg(newData);
	});
	$('#filtrate .star li').on('click', function() {
		$(this).siblings().css('color', '#7B7B7B');
		$(this).css('color', '#F05053');
		newData.starsort = $(this).text();
		if($(this).text() == "全部") {
			newData.starsort = ''
		}
		window.sessionStorage.setItem('num', 1);
		newData.page = 1;
		getMsg(newData);
	});

	//获取数据
	function getMsg(newData) {
		console.log(newData);
		newData = newData;
		if(!(newData.district == '')) {
			newData.district = newData.district;
			if(!(newData.price == '')) {
				newData.price = newData.price;
			}
			if(!(newData.starsort == '')) {
				newData.starsort = newData.starsort;
			}
		} else if(!(newData.price == '')) {
			newData.price = newData.price;
			if(!(newData.starsort == '')) {
				newData.starsort = newData.starsort;
			}
		} else if(!(newData.starsort == '')) {
			newData.starsort = newData.starsort;
		}
		console.log(newData);
		getdata(newData);
	}

	//获取后台数据方法
	function getdata(newData) {
		$.ajax({
			type: "post",
			url: "http://120.55.70.81:8088/dajiaserver/Rest/web/get_hotel_list",
			datatype: 'json',
			data: newData,
			async: true,
			success: function(data) {
				console.log(data);

				var hotelHtml = template("template", data);
				$('#hotel').html(hotelHtml);
				var data1 = JSON.stringify(data);
				window.sessionStorage.setItem('hotelList', data1);
				console.log(data.response.length);
				if(data.response.length > 0) {
					window.sessionStorage.setItem('pages', parseInt(data.response[0].num / 16));
					if(parseInt(data.response[0].num / 16) <= 0) {
						$('.fy').css('display', 'none');
					} else {
						$('.fy').css('display', 'block');
					}

					//分页
					$("#page").paging({
						pageNo: 1,
						totalPage: parseInt(data.response[0].num / 16),
						totalSize: 300,
						callback: function(num) {
							//						console.log(num);
							newData.page = num;
							$.ajax({
								type: "post",
								url: "http://120.55.70.81:8088/dajiaserver/Rest/web/get_hotel_list",
								data: newData,
								async: true,
								success: function(data) {
									var data1 = JSON.stringify(data);
									window.sessionStorage.setItem('hotelList', data1);
									window.sessionStorage.setItem('pages', parseInt(data.response[0].num / 16));
									window.sessionStorage.setItem('num', num);

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
					})

				} else {
					$('.fy').css('display', 'none');
				}

				//分页功能

				//点击a标签的时候跳转
				$('#hotel li').click(function() {
					var id = $(this).attr('id');
					bj=2;
					window.location.href = "hotelDetails.html?id=" + id;
				});

			}
		});
	}

});