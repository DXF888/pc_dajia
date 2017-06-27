$(function() {
	//加减号增加跟减少菜单跟菜名
	var number = 0;
	$(document).on('click', '.menu-add', function() {
		number += 1;
		var tr = '';
		tr += '<tr><td class="comboMenu" colspan="2"><input name=combo' + number + ' type="text" placeholder="请输入套餐名称" /><span class="menu-add">+</span><span class="menu-subtract">-</span></td>';
		tr += '<td class="dishName" colspan="2"><div class="greensName"><input type="text" placeholder="请输入菜名称" /><span class="dish-add">+</span><span class="dish-subtract">-</span></div></tr>'
		$(this).parent().parent().after(tr);
	});
	$(document).on('click', '.dish-add', function() {
		$(this).parent().append('<div class="greensName"><input type="text" placeholder="请输入菜名称" /><span class="dish-add">+</span><span class="dish-subtract">-</span></div>');
	});

	$(document).on('click', '.menu-subtract', function() {
		if($('.comboMenu').length <= 1) {
			alert('主人，只剩下一个了不能再删啦')
		} else {
			$(this).parent().parent().remove();
		}

	});
	//减号减去菜名跟菜单
	$(document).on('click', '.dish-subtract', function() {
		var greensnav = $('.dishName').length;
		var greensName = $('.greensName').length;
		if(greensName <= 1) {
			alert('只有一个菜啦，再减就没得吃啦');
		} else {
			$(this).parent().remove();
		}
	});
	

})