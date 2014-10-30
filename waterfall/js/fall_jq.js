$(window).on('load',function  () {
	waterfall();

	//模拟后台给的json数据
	var dataInt = {
		"data":[{"src":'21.jpg'},{"src":'22.jpg'},{"src":'23.jpg'},{"src":'24.jpg'},{"src":'25.jpg'}]
	};

	//滚动条滚动时 判断是否加载
	$(window).on('scroll',function  () {
		if(checkScrollSlide){
			$.each(dataInt.data,function (key,value) {//value保存一个js原生对象
				var oBox = $('<div>').addClass('box').appendTo($('#main'));//支持连缀，隐式迭代
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));//注意转为jq元素
				$('<img>').attr('src','images/'+$(value).attr('src')).appendTo($(oPic));
			})
			waterfall();
		}
	})
});

function waterfall () {
	var $boxs  = $('#main>div');
	var w = $boxs.eq(0).outerWidth();
	var cols = Math.floor($(window).width()/w);
	var $main = $('#main');
	$main.width(w*cols).css('margin','0 auto');//不需要写单位px

	var hArr=[];
	$boxs.each(function  (index,value) {
		var h = $boxs.eq(index).outerHeight();
		if (index<cols) {
			hArr[index] = h;
		}else{
			var minH = Math.min.apply(null,hArr);
			var minHIndex = $.inArray(minH,hArr);//获取一个值在数组中的索引 第一个参数是判断谁，第二个参数是在哪个数组
			//value保存的是dom对象[html element] 不可以使用jq的任何方法 需要先转为Jq对象
			$(value).css({
			'position':'absolute',
			'top':minH+'px',
			'left':minHIndex*w+'px'
			})
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();
		}
	})
}

function checkScrollSlide (argument) {
	var $lastBox = $boxs.last();
	var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	return (lastBoxDis>scrollTop+documentH)?true:false;
}