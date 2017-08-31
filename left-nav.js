+function($, undefined){
	
	//项目阶段列表
	var NODE_LIST = ['前期调研报告', '基本信息登记', '立项报告登记','方案信息登记','项目预算表登记'
	,'合同信息登记','会议纪要登记','财务拨款','实物捐赠','实物验收','实物捐出','财务报销','中期检查'
	,'决算表登记','末期检查','结项报告','公示登记','项目存档'],
	//当前阶段颜色
		CUR_COLOR = 'blue',
	//已经过阶段颜色
		PASSED_COLOR = 'green',
	//未经过阶段颜色
		WAIT_COLOR = 'gray',
	//阶段显示形式,默认：块级
		VIEW_STYLE = 'block',
	//是否现金拨款和实物捐赠存在 默认值 crash  可选值 crash（现金拨款）、entity（实物捐赠）、both（两者都有）
		EXIST_FLAG = 'crash';
		var DynMenu = function(){

			this.create();

		}

		//创建模块
		DynMenu.prototype.create = function(exist,stage/*传入数字*/){

			//判断传进来的是否是这三个值
			var isCorrect = "crash" === exist || "entity" === exist || "both" === exist;

			if(isCorrect) EXIST_FLAG = exist;

			//开始创建
			var model = "";
			for(var i=0,j=NODE_LIST.length; i<j; i++){

				switch(EXIST_FLAG){
					case "crash" :
						var regexp1 = '/^(\u5b9e\u7269).*/$';
						if(!regexp1.test(NODE_LIST[i])){
							if(i < stage){
								model += "<div class='model'><button type='button' data-stage='" + i + "' class='stageBtn' style='background:" + PASSED_COLOR + ";'>" + NODE_LIST[i] + "</botton></div>";
							}else if(i == stage){
								model += "<div class='model'><button type='button' data-stage='" + i + "' class='stageBtn' style='background:" + CUR_COLOR + ";'>" + NODE_LIST[i] + "</botton></div>";
							}else{
								model += "<div class='model'><button type='button' data-stage='" + i + "'  style='background:" + WAIT_COLOR + ";'>" + NODE_LIST[i] + "</botton></div>";
							}
							
						}
						break;
					case "entity":
						var regexp2 = '/^(\u62e8\u6b3e).*/$';
						if(!regexp2.test(NODE_LIST[i])){
							if(i < stage){
								model += "<div class='model'><button type='button' data-stage='" + i + "' class='stageBtn' style='background:" + PASSED_COLOR + ";'>" + NODE_LIST[i] + "</botton></div>";
							}else if(i == stage){
								model += "<div class='model'><button type='button' data-stage='" + i + "' class='stageBtn' style='background:" + CUR_COLOR + ";'>" + NODE_LIST[i] + "</botton></div>";
							}else{
								model += "<div class='model'><button type='button' data-stage='" + i + "'  style='background:" + WAIT_COLOR + ";'>" + NODE_LIST[i] + "</botton></div>";
							}
							
						}
						break;
					case "both":
							if(i < stage){
								model += "<div class='model'><button type='button' data-stage='" + i + "' class='stageBtn' style=' background:" + PASSED_COLOR + ";'>" + NODE_LIST[i] + "</botton></div>";
							}else if(i == stage){
								model += "<div class='model'><button type='button' data-stage='" + i + "' class='stageBtn' style='background:" + CUR_COLOR + ";'>" + NODE_LIST[i] + "</botton></div>";
							}else{
								model += "<div class='model'><button type='button' data-stage='" + i + "'  style='background:" + WAIT_COLOR + ";'>" + NODE_LIST[i] + "</botton></div>";
							}
						break;

				}	
			}
						//默认类名
						$(".left-nav").append(model);
						//为button绑定事件
						$(".stageBtn").on('click', DynMenu.toggleStage);

		}

		DynMenu.prototype.toggleStage = function(e){
			var $el = $(e.target);
			var stage = $el.attr("data-stage");

			$.get("../../html/" + NODE_LIST[stage] + "/" + NODE_LIST[stage] +".html",function(data){

				$("model-content").empty().append(data);

			});

		}

}(jQuery);