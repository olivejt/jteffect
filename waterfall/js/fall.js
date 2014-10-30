window.onload = function  () {
	waterfall("main","box");

	//模拟后台给的json数据
	
	var dataInt = {
		"data":[{"src":'21.jpg'},{"src":'22.jpg'},{"src":'23.jpg'},{"src":'24.jpg'},{"src":'25.jpg'}]
	};
	window.onscroll = function  () {
		if (checkScrollSlide()) { //拖动到一定程度
			var oParent = document.getElementById('main');

			//将数据库渲染到当前页面的尾部
			for(var i = 0 ;i <dataInt.data.length;i++){
				var oBox = document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				
				var oPic = document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);

				var oImg = document.createElement('img');
				oImg.src = "images/" + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}

			waterfall("main","box");
		}
	}
}

function waterfall (parent , box) {
	//将main下class为box的元素取出
	var oParent = document.getElementById(parent);
	var oBoxs = getByCLass(oParent,box);

	//计算整个页面显示的列数（页面宽/盒子宽）
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	console.log(oBoxW);
	//设置main的宽度 而且居中
	oParent.style.cssText = 'width:' + oBoxW*cols +'px;margin:0 auto' ;

	var hArr = new Array();//先存第一行的图片的高度，之后修改为存每一列的总高度
	for (var i = 0; i < oBoxs.length; i++) {
		if (i<cols) {
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			//获取当前行高度最小的列
			var minH = Math.min.apply(null,hArr);
			var index = getMinIndex(hArr,minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH + 'px';
			oBoxs[i].style.left = oBoxW*index + 'px';//计算当前图片应该放在哪一列
			//或者用oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
			
			hArr[index] += oBoxs[i].offsetHeight;//将当前盒子高度叠加到数组里
		}
	}
	console.log(hArr);
}

function getByCLass (parent,clsname) {
	// 根据class获取元素
	var boxArr = new Array();//存储获取到的所有class为Box的元素
		oElement = parent.getElementsByTagName('*');
	for (var i = 0; i < oElement.length; i++) {
		if (oElement[i].className == clsname) {
			boxArr.push(oElement[i]);
		}
	}
	return boxArr;
}

function getMinIndex (arr,val) {
	for (var i in arr) {
		if(arr[i] == val){
			return i;
		}
	}
}


//检测是否具备加载数据库的条件
function checkScrollSlide () {
	var oParent = document.getElementById('main');
	var oBoxs = getByCLass(oParent,'box');
	var oBoxsLength = oBoxs.length;
	var lastBoxH = oBoxs[oBoxsLength-1].offsetTop + Math.floor(oBoxs[oBoxsLength-1].offsetHeight/2);
	/*
	*混杂模式下是通过Body元素检测页面滚动走的距离
	*标准模式下是通过Html元素检测...
	*
	*/
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var heigth = document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH < scrollTop + heigth)? true : false ;
}