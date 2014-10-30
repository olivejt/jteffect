
$(document).ready(function () {
	var $search_input = $('#search-input');
	var $search_form = $('#search-form');
	var $search_suggest = $('#search-suggest');
	var $search_btn = $('#search-btn');

	$search_input.bind('keyup',function  () {
		var search_text = $(this).val();
		if(search_text == ""){
			$search_suggest.hide();
		}else{
			
			//失效
			// $.get('http://cn.bing.com/qsonhs.aspx?q='+search_text,function function_name (d) {
			// 	console.log(d);
			// },'json');

			//jsonp获取关键词提示
			$('<script>').attr('src','get_sug.php?callback=writeSug&key='+search_text).appendTo($('head'));
			
			$search_suggest.show().css({
				top:$search_form.offset().top + $search_form.outerHeight(),
				left:$search_form.offset().left,
				position:'absolute'
			});
		}
	});

	$search_btn.bind('click submit',function() {
		var keyword = $search_input.val();
		gosearch(keyword);
	});

	$(document).bind('click',function() {
		$search_suggest.hide();
	});


	$(document).delegate('li','click',function () {
		var keyword = $(this).text();
		gosearch(keyword);
	});
})

function writeSug (data) {
	$sug_ul = $('#sug-ul');
	$sug_ul.html("");
	$.each(data,function (index,value) {
		$("<li>").html(value).appendTo($sug_ul);
	})
}

function gosearch (keyword) {
	if(keyword !== "")
	location.href = 'http://www.baidu.com/s?wd='+keyword;
}

