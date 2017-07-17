function ScrMenu() {
	PIXI.Container.call( this );
	this.init();
}

ScrMenu.prototype = Object.create(PIXI.Container.prototype);
ScrMenu.prototype.constructor = ScrMenu;

ScrMenu.prototype.init = function() {
	this._arButtons = [];
	
	this.bg = addObj("bgMenu", _W/2, _H/2);
	this.bg.scale.x =  _W/this.bg.w;
	this.bg.scale.y =  _H/this.bg.h;
	this.addChild(this.bg);
	
	// var btnNormal = addButton("btnDefault", _W/2, _H/2+100);
	// btnNormal.name = "btnNormal";
	// btnNormal.interactive = true;
	// btnNormal.buttonMode=true;
	// btnNormal.overSc = true;
	// this.addChild(btnNormal);
	// this._arButtons.push(btnNormal);
	// var tf = addText("Slow Mode", 24, "#FFFFFF", undefined, "center", 350, 2)
	// tf.x = 0;
	// tf.y = -tf.height/2;
	// btnNormal.addChild(tf);
	var btnSpeed = addButton("btnDefault", _W/2, _H/2+100);
	btnSpeed.name = "btnSpeed";
	btnSpeed.interactive = true;
	btnSpeed.buttonMode=true;
	btnSpeed.overSc = true;
	this.addChild(btnSpeed);
	this._arButtons.push(btnSpeed);
	var tf = addText(getText("start"), 24, "#FFFFFF", undefined, "center", 350, 2)
	tf.x = 0;
	tf.y = -tf.height/2;
	btnSpeed.addChild(tf);
	
	
	var tfWait = addText("Please wait. \n Loading game.", 26, "#FFCC00", "#000000", "center", 500, 3)
	tfWait.x = btnSpeed.x;
	tfWait.y = btnSpeed.y - tfWait.height;
	this.addChild(tfWait);
	
	btnSpeed.visible = false;
	
	setTimeout(function(){
		btnSpeed.visible = true;
		tfWait.visible = false;
	}, 7000);
	
	var str1 = "This game is a proof of concept and intended for test purposes. It is based on experimental software.";
	var str2 = "In no respect shall this game or its authors incur any liability for the loss of ether.";
	var str3 = "Players who access this game from other jurisdictions do so at their own volition and are responsible for compliance with local law.";
	var str4 = "This program comes with ABSOLUTELY NO WARRANTY.";
	
	var tf3 = addText(str3, 16, "#FFFFFF", "#0000000", "center", _W, 3)
	tf3.x = _W/2;
	tf3.y = _H - tf3.height-20;
	this.addChild(tf3);
	var tf2 = addText(str2, 16, "#FFFFFF", "#0000000", "center", _W, 3)
	tf2.x = _W/2;
	tf2.y = tf3.y - tf2.height;
	this.addChild(tf2);
	var tf1 = addText(str1, 16, "#FFFFFF", "#0000000", "center", _W, 3)
	tf1.x = _W/2;
	tf1.y = tf2.y - tf1.height;
	this.addChild(tf1);
	
	this.interactive = true;
	this.on('mousedown', this.touchHandler);
	this.on('mousemove', this.touchHandler);
	this.on('touchstart', this.touchHandler);
	this.on('touchmove', this.touchHandler);
	this.on('touchend', this.touchHandler);
}

ScrMenu.prototype.clickCell = function(item_mc) {
	if(item_mc.name.search("btn") != -1){
		item_mc._selected = false;
		if(item_mc.over){
			item_mc.over.visible = false;
		}
	}
	
	if(item_mc.name == "btnNormal"){
		if(!passwordUser){
			passwordUser = prompt("enter your password");
		}
		this.removeAllListener();
		options_speedgame = false;
		showGame();
	} else if(item_mc.name == "btnSpeed"){
		this.removeAllListener();
		// options_speedgame = true;
		// options_splitdouble = false;
		// showGame();
		showSpeedGame();
	}
}

ScrMenu.prototype.checkButtons = function(evt){
	var mouseX = evt.data.global.x;
	var mouseY = evt.data.global.y;
	
	for (var i = 0; i < this._arButtons.length; i++) {
		var item_mc = this._arButtons[i];
		if(hit_test_rec(item_mc, item_mc.w, item_mc.h, mouseX, mouseY) &&
		item_mc.visible && item_mc.dead != true){
			if(item_mc._selected == false){
				item_mc._selected = true;
				if(item_mc.over){
					item_mc.over.visible = true;
				} else if(item_mc.overSc){
					item_mc.scale.x = 1.1*item_mc.sc;
					item_mc.scale.y = 1.1*item_mc.sc;
				}
			}
		} else {
			if(item_mc._selected){
				item_mc._selected = false;
				if(item_mc.over){
					item_mc.over.visible = false;
				} else if(item_mc.overSc){
					item_mc.scale.x = 1*item_mc.sc;
					item_mc.scale.y = 1*item_mc.sc;
				}
			}
		}
	}
}

ScrMenu.prototype.touchHandler = function(evt){
	if(this.bWindow){
		return false;
	}
	var phase = evt.type;
	
	if(phase=='mousemove' || phase == 'touchmove' || phase == 'touchstart'){
		this.checkButtons(evt);
	} else if (phase == 'mousedown' || phase == 'touchend') {
		for (var i = 0; i < this._arButtons.length; i++) {
			var item_mc = this._arButtons[i];
			if(item_mc._selected){
				this.clickCell(item_mc);
				return;
			}
		}
	}
}

ScrMenu.prototype.removeAllListener = function(){
	this.interactive = false;
	this.off('mousedown', this.touchHandler);
	this.off('mousemove', this.touchHandler);
	this.off('touchstart', this.touchHandler);
	this.off('touchmove', this.touchHandler);
	this.off('touchend', this.touchHandler);
}