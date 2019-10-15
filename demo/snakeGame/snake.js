window.onload = function(){
	var Height = 20;
	var Width = 20; 
	var boxHeight = 20+'px';
	var boxWidth = 20+'px';
	var len = 3;
	var key = 39;
	var Owrap = document.getElementById('wrap');
	var Osnake = document.getElementById('snake');
	var Obut = document.getElementById('but');
	var snake = new Array();
	var carrier = new Array();
	var speed = '';
	//添加蛇身位置控制标签
	for(k = 0 ;k<20	;k++){
		carrier[k] = new Array();
	}


	initWrap();
	Obut.onclick = start;
	function start(){
		food();
		initSnake(len);
		clearInterval(speed);
		speed = setInterval(snakeMove,500);
		Obut.disabled = 'true';
	}


	//绘制地图
	function initWrap(){
		var table = document.createElement("table");
		var tbody = document.createElement("tbody");
		for (var i = 0; i < Width; i++) {
			var row = document.createElement("tr");
			for (var j = 0; j < Height; j++) {
				var col = document.createElement('td');
				row.appendChild(col);
			}
			tbody.appendChild(row);
		}
		table.appendChild(tbody);
		Owrap.appendChild(table);
	}

	//初始化蛇身
	function initSnake(len){
		var pointer = randomPointer();
		for(var i = 0; i<len ;i++){
			x = pointer[0] - i;
			y = pointer[1];
			snake.push([x,y]);
			canvas(x,y);
			carrier[x][y] = "cover";
		}
	}

	//随机生成点
	function randomPointer(){
		var x = Math.floor(Math.random()*Width);
		var y = Math.floor(Math.random()*Height);
		var pointer = [];
		if (x == 0) {x = x +2;}
		if (x == 1) {x = x +1;}

		//如果生成的食物与蛇身重合，则重新生成一次食物
		if(carrier[x][y] == 'cover'){
			randomPointer();
		}
		pointer[0] = x;
		pointer[1] = y;
		return pointer;
	}

	//随机生成食物
	function food(){
		var pointer = randomPointer();
		var x = pointer[0];
		var y = pointer[1];
		carrier[x][y] = "food";
		var div = document.createElement('div');
		div.id = "food";
		div.style.height = boxHeight;
		div.style.width = boxWidth;
		div.style.backgroundColor = 'yellow';
		div.style.top = 1+22*y+'px';
		div.style.left =1+22*x+'px';
		Owrap.appendChild(div);
	}

	//控制移动
	function snakeMove(){
		var Ofood = document.getElementById('food');
		var headX = snake[0][0];
		var headY = snake[0][1];
		switch(key){
			case 37: headX -= 1; break;	//向左移
			case 38: headY -= 1; break;	//向上移
			case 39: headX += 1; break;	//向右移
			case 40: headY += 1; break;	//向下移
		}
		if(headX >= Width || headY >= Height || headX < 0 || headY < 0){
			alert("Game Over");
			clearInterval(speed);
			// Osnake.display = 'none';
			// Ofood.display = 'none';
			return false;
		}
		else{
			//判断小蛇蛇是否遇到食物
			if(carrier[headX][headY] != 'food'){
				var lastX = snake[snake.length-1][0];
				var lastY = snake[snake.length-1][1];
				carrier[lastX][lastY] = 'false';
				snake.pop();
				afterMove(headX,headY);
			}
			else{
				Ofood.className = 'Sbody';
				Ofood.style.backgroundColor = 'blue';
				//食物变成蛇身的一部分
				Osnake.insertBefore(Ofood,Osnake.firstElementChild);
				Ofood.id = '';
				//重新生成食物
				food();
				carrier[headX][headY] = 'cover';
			}
			snake.unshift([headX,headY]);
		}
	}

	//绘制每一节蛇身
	function canvas(x,y){
		var div = document.createElement('div');
		div.className = 'Sbody';
		div.style.width = boxWidth;
		div.style.height = boxHeight;
		div.style.backgroundColor = 'blue';
		div.style.top = 1+22*y+'px';
		div.style.left =1+22*x+'px';
		Osnake.appendChild(div);
	}

	//绘制移动后的蛇身
	function afterMove(headX,headY){
		Osnake.removeChild(Osnake.lastElementChild);
		canvas(headX,headY);
		//将最后一个元素插入到第一的位置
		Osnake.insertBefore(Osnake.lastElementChild,Osnake.firstElementChild);
	}

	document.onkeydown = function(e){
		var e = e || event;
		key = e.keyCode;
	}
}