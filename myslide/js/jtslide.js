/*
*
*	预加载图片&图片滚动播放
*
*/

var jtslide =  {

	//变量不要写成在函数里的全局变量
	timer : null,
	index : null,
	last_index : null,
	pic_div : null,
	offset : null,


	init : function(){
		var self = this;	//在函数里把this保存起来 防止多次寻找
		self.index = 0;
		self.offset = 5000;
	},

	picshow : function(index){
		this.select(index).show().animate({opacity:1},800);
	},

	pichide : function(index){
		this.select(index).animate({opacity:0},800).hide();
	},

	select : function(index){
		var pic = '#pic'+index;
		return $(pic);
	},

	auto : function(A){
		var self = this;
		if (A == false) {
			self.last_index = self.index;
			self.index++;
		}
		if (self.index > 4) {
			self.index = 1;
			self.last_index = 4;
		}
		self.picshow(self.index);
		self.pichide(self.last_index);

		self.timer = window.setTimeout(function(){
			self.auto(false);
		}, self.offset);
	},

	clickbtn : function(){
		var self = this;
		$(".box p a").filter("#prev,#next").bind("click",function(){
			if(self.timer){
				clearTimeout(self.timer);
			}
			var btn = this.id;
			if(btn=="prev"){
				self.last_index = self.index;
				self.index--;
				if(self.index<1){
					self.last_index = 1;
					self.index = 4;
				}
			}else{
				self.last_index = self.index;
				self.index++;
				if (self.index>4) {
					self.last_index = 4;
					self.index = 1;
				}
			}
			self.picshow(self.index);
			self.pichide(self.last_index);
			self.timer = window.setTimeout(function(){
				self.auto(false);
			}, self.offset);
		})
	},

	loadimg : function(datas){
		var self = this;
		var img = new Image();
		$.each(datas,function (index,value){
			img.src = datas[index];
		})
		img.onload = function(){	//	预加载图片
			$('.loading').hide();
			for (var i = 0; i < datas.length ; i++) {
				var div = "#pic" + (i+1)	;
				$(div).find("img").attr("src",datas[i]);
			}
			self.clickbtn();
			self.auto(false);
		}
	}


}