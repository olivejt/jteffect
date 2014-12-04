/*
*
*	@date 2014/12/4
*	@author jt
*/

var buffermove = {
	obj : null,		//运动的对象
	json : null,	//进行操作的属性键值对
	timer : null,	//定时器
	coefficient : 10,		//运动速度系数(缩放) >1

	init : function  (obj,json,callback) {
		var self = this;
		self.obj = obj;
		self.json = json;
		self.move();
		if(callback) callback();
	},

	getStyle : function (attr) {
		/* Notice：
		*	1. 样式表的三种形式  
		*	2. style,currentStyle,getComputedStyle的区别和用法
		*/
		var self = this;
		if(self.obj.style[attr]){	//内联样式
            return self.obj.style[attr];
        }
        else if(self.obj.currentStyle){		//IE
            return self.obj.currentStyle[attr];
        }
        else {		//DOM
            return getComputedStyle(self.obj,false)[attr];
        }
	},

	setStyle : function (attr,value) {
		var self = this;
		self.obj.style[attr] = value + 'px';	//此处仅支持关于像素的修改
	},

	move : function  () {
		var self = this;
		var speed = 0;	//记录每次变化的数值
		clearInterval(self.timer);	//防止重复设置定时器

		self.timer = setInterval(function () {
			for(attr in self.json){
				var current = 0;	//用于保存当前属性值
				current = parseInt(self.getStyle(attr));
				//速度调整
				speed = ( self.json[attr] - current ) / self.coefficient ;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);	

				//执行动画
				if(current != self.json[attr]){
					self.setStyle(attr,current + speed);
				}else{
					clearInterval(self.timer);
				}
				
			}
		},30);
	}
}