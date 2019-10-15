var Obut = document.getElementsByTagName('input')[0];
var Oimg = document.getElementsByTagName('img');
var Omid = document.getElementById('mid');
var m = 0;
var k = 0;
var tag = 0;
var Img = ['image/1.png','image/2.png','image/3.png','image/4.png','image/5.png','image/6.png','image/7.png','image/8.png'];

Obut.onclick = function(){
	this.disabled = true;
	Face();
	
}

function Face(){
		var innerTimer = '';
		clearInterval(innerTimer);
		innerTimer = setInterval(function(){

			// Omid.innerHTML += '<img src=\''+ Img[Math.round(Math.random()*(Img.length-1))] +'\'/>';
			var newImg = document.createElement('img');
			newImg.src = Img[Math.round(Math.random()*(Img.length-1))];
			newImg.style.left = Math.random()*800+'px';
			newImg.tag = tag++;
			Omid.appendChild(newImg);
			doMove(newImg,'top');
			addOnclick(newImg);
			// if ((Oimg.length-k)>=5 && parseInt(getStyle(Oimg[n],'top'))>=600) {
			if (m>=1) {
				clearInterval(innerTimer);
				Omid.innerHTML = 'Game Over';
				Omid.innerHTML += '<br>' + '<br>' +'得分：'+k+'分';
			}
		},1000);
}

function addOnclick(newImg){
	newImg.onclick = function(){
		this.src = 'image/good.png';
		this.style.display = 'none';
		k++;
	}
}

function doMove(obj,attr){
		var timer = '';
		clearInterval(timer);
		obj.timer = setInterval(function(){
			var length = parseInt(getStyle(obj,attr));
			obj.style.top =length +2+'px';
			if (length > 600) {
				if (getStyle(obj,'display')=='block') {
					m++;
					// console.log(m);
				}
				obj.style.top = 600+'px';
				obj.src = '';
				clearInterval(obj.timer);
			}
		},30);
}


function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}