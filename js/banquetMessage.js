$(function(){
	$(document).on('click','.addTaocan',function(){
			var th='<p><input type="text" /><span class="addTaocan">+</span><span class="deleteTaocan">-</span></p>'
			$(this).parent().parent().append(th);
	});
	$(document).on('click','.deleteTaocan',function(){
		if($('.taocan p').length <= 1){
			alert('主人，不能再删除了，只有一个套餐了');
		}else{
			$(this).parent().remove();
		}	
	});
});