


var buffertest = {
	obj : null,
	timer : null,

	init : function (obj,target) {
		var self = this;
		self.obj = obj; 
		self.changeWidth(target);
	},

	changeWidth : function (target) {
		var self = this;
		var current = 0;	//获取元素当前宽度
		var speed = 0;
		self.timer = setInterval(function () {
			current = self.obj.offsetWidth;
			//console.log(current);
			speed = ( target - current ) / 10 ;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);	//取整

			if(current != target){
				self.obj.style.width = (current + speed) + "px";
			}else{
				clearInterval(self.timer);
			}
			
		},30);
	},
}