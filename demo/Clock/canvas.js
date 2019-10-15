var Otime = document.getElementById('clock');
var ctx = Otime.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;

function drawBackGround(){
	//画圆
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.lineWidth = 10;
	ctx.arc(0,0,r-5,0,2*Math.PI,false);
	ctx.stroke();

	//显示小时数
	var hourNumber = [3,4,5,6,7,8,9,10,11,12,1,2];
		ctx.font = "30px Arial";
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
	hourNumber.forEach(function(number,i){
		var rad = 2*Math.PI/12*i;
		var x = Math.cos(rad)*(r - 35);
		var y = Math.sin(rad)*(r - 35);
		ctx.fillText(number,x,y);
	});

	//画时间对应的刻度
	for(var i = 0; i<60; i++){
		rad = 2*Math.PI/60*i;
		x = Math.cos(rad)*(r -18);
		y = Math.sin(rad)*(r -18);
		ctx.beginPath();
		if (i%5 == 0) {
			ctx.arc(x,y,2,0,2*Math.PI);
		}else{
			ctx.arc(x,y,1,0,2*Math.PI);
		}
		ctx.fill();
	}
}

	//画出时针
function drawHour(hour,minute){
	ctx.save();
	ctx.beginPath();
	rad = 2*Math.PI/12*hour + 2*Math.PI/12/60*minute;
	ctx.rotate(rad);
	ctx.lineCap = 'round';
	ctx.moveTo(0,20);
	ctx.lineTo(0,-r/2);
	ctx.stroke();
	ctx.restore();
}

//画出分针
function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	rad = 2*Math.PI/60*minute;
	ctx.rotate(rad);
	ctx.lineCap = 'round';
	ctx.lineWidth = 6;
	ctx.moveTo(0,20);
	ctx.lineTo(0,-r/2 - 10);
	ctx.stroke();
	ctx.restore();
}

//画出秒针
function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = 'red';
	rad = 2*Math.PI/60*second;
	ctx.rotate(rad);
	ctx.moveTo(0,20);
	ctx.lineTo(5,0);
	ctx.lineTo(0,-r/2 - 30);
	ctx.lineTo(-5,0);
	ctx.fill();
	ctx.restore();
}

//画出中心白点
function drawDot(){
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.arc(0,0,3,0,2*Math.PI);
	ctx.fill();
}

function draw(){
	var nowTime = new Date();
	var hour = nowTime.getHours();
	var minute = nowTime.getMinutes();
	var second = nowTime.getSeconds();

	ctx.clearRect(0,0,width,height);
	drawBackGround();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}

draw();
setInterval(draw,1000);	//每隔一秒执行一次