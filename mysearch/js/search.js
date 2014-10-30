//原生js实现搜索框智能提示

//封装常用函数

var getDom = function (id) {
	// 获取页面元素
	return document.getElementById(id);
}

var addEvent = function (id,event,fn) {
	// 为元素绑定事件
	var el = getDom(id) || document; //如果获取不到Id的元素，则为document防止报错
	if (el.addEventListener) { //非ie浏览器
		el.addEventListener(event,fn,false);
	}else if (el.attachEvent) {	//ie浏览器
		el.attachEvent('on'+event,fn);
	}
	//el.onclick只能绑定一次（后面会覆盖前面），而addEvent能绑定多次
}

//提示框定位
var getElementLeft = function (element) {
	// 自身左边距加上所有父元素左边距
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;

	while(current !== null){
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}

	return actualLeft;
}

var getElementTop = function (element) {
	// 
	var actualTop = element.offsetTop;
	var current = element.offsetParent;

	while(current !== null){
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}

	return actualTop;
}

var ajaxGet = function (url,callback) {//ajax获取搜索提示
	var _xhr = null;
	if (window.XMLHttpRequest) {
		_xhr = new window.XMLHttpRequest();
	}else if (window.ActiveXobject) {
		_xhr = new window.ActiveXobject("Msxml2.XMLHTTP");
	}else{
		console.log("new xhr failed")
	}
	_xhr.onreadystatechange = function () {
		if (_xhr.readyState == 4 && _xhr.status == 200) {
			//当readyState==4并且status==200时表示服务器正确响应并返回信息
			callback(JSON.parse(_xhr.responseText));
		}
	}
	_xhr.open('get',url,false);//false异步获取
	_xhr.send(null);
}

var delegateEvent = function (target,event,fn) {
	// 为js动态生成的网页元素添加事件时，通常需要使用事件代理来实现
	addEvent(document,event,function (e) {
		if (e.target.nodeName == target.toUpperCase()) {
			fn.call(e.target);
		}
	});
}

addEvent('search-input','keyup',function () {
	var search_suggest = getDom('search-suggest');
	var search_form = getDom('search-form');
	var sug_ul = getDom('sug-ul');
	var key = getDom('search-input').value;

	if(key!=""){
		ajaxGet('get_sug_for_ajax.php?key='+key,function (data) {
			var html = '';
			if(data[0]!='0'){
				for (var i = 0; i < data.length; i++) {
					html+='<li>'+data[i]+'</li>';
				}
			}
			
			sug_ul.innerHTML = html;
			search_suggest.style.top = getElementTop(search_form)+search_form.offsetHeight+'px';
			search_suggest.style.left = getElementLeft(search_form)+'px';
			search_suggest.style.position = 'absolute';
			search_suggest.style.display = 'block';

		});	
	}else{
		search_suggest.style.display = 'none';
	}
});

delegateEvent('li','click',function () {
	var keyword = this.innerHTML;
	location.href = 'http://www.baidu.com/s?wd='+keyword;
});

addEvent(getDom('search-btn'),'click',function () {
	var keyword = getDom('search-input').value;
	if (keyword!=="")
		location.href = 'http://www.baidu.com/s?wd='+keyword;
})
