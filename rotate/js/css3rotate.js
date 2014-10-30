// for testing 3D rotate

var jtrotate = {
	index : 0,
	total : 0,
	pics : null,

	initpic : function (argument) {
		var self = this;
		// 用于测试 后期在加载图片时先赋值
		self.pics = $(".pic");
		self.pics.addClass("hidden");
		self.pics.eq(0).removeClass("hidden").addClass("show");
	},

	initbtn : function(num){
		var self = this;
		self.total = num;
		var $bullets = $("#bullets");
		for (var i = 0; i < num ; i++) {
			$("<li>").attr("index",i).appendTo($bullets);
		};
		var $bullets_li = $bullets.find("li");
		$bullets_li.bind("click",function() {
			var target = this;
			self.changepic($(target).attr("index"));
			$(this).siblings().removeClass('active').end().addClass('active');
		}).eq(0).addClass("active");
	},

	changepic : function(target) {
		var self = this;
		var current = self.index;
		if (target==current) return true;
		else if(target>current){
			self.pics.eq(current).removeAttr("class").addClass("pic").addClass("hiddenleft").removeClass("show").addClass("hidden");
			self.pics.eq(target).removeAttr("class").addClass("pic").addClass("showleft").removeClass("hidden").addClass("show");
		}else{
			self.pics.eq(current).removeAttr("class").addClass("pic").addClass("hiddenright").removeClass("show").addClass("hidden");
			self.pics.eq(target).removeAttr("class").addClass("pic").addClass("showright").removeClass("hidden").addClass("show");
		}
		self.index=target;
	},

	loadimg : function(datas){
		var self = this;
		var img = new Image();
		$.each(datas,function (index,value){
			img.src = datas[index];
		})
		img.onload = function(){	//	预加载图片
			var num = datas.length;
			var $content = $("#content");
			for (var i = 0; i < num ; i++) {
				var newbox = $("<div>").addClass("box").appendTo($content);
				var newpic = $("<div>").addClass("pic").appendTo(newbox);
				$("<img>").attr("src",datas[i]).appendTo(newpic);
			}
			self.initpic();
			self.initbtn(num);
			$(".box").css("width",$(window).width()+"px");
		}
	}

}