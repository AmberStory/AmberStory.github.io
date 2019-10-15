var border = new Array();
var flag = 0;
var f = 1;

$(document).ready(function (){

	//点击开始游戏
	$("input.but").on("click",newGame);

	//生成移动的数字方格及随机两个方格
	function newGame(){

		$("div.end").css("display","none");
		f = 1;
		//定义二维数组，每一个网格对应的数字
		for(var m=0;m<4;m++){
			border[m] = new Array();
			for(var n=0;n<4;n++){
				border[m][n] = 0;
			}
		}

		//生成数字方格
		for(var i = 0; i<4; i++){
			for(var j=0; j<4; j++){
				$("div.container").append("<div class='num-cell-"+i+"-"+j+"'></div>");
				$(".num-cell-"+i+"-"+j).css({"fontSize":"58px","position":"absolute","paddingTop":"10px","box-sizing":"border-box","color":"#fff"});
				numStyle(i,j);
			}
		}
		
		//随机初始化两个方格
		for(k=0;k<2;k++){
			var m = Math.floor(Math.random()*4);
			var n = Math.floor(Math.random()*4);
			if (border[m][n] ==0) {
				border[m][n] = Math.random() > 0.93 ? 4 : 2;
				numStyle(m,n);
				$(".num-cell-"+m+"-"+n).text(border[m][n]);
			}
			else{
				k--;
			}
		}
	}

	//移动操作
	$(document).on("keydown",function(event){

		if(f){
			//判断按键方向
			switch(event.keyCode){
				case 37: moveLeft(); break;
				case 38: moveUp(); break;
				case 39: moveRight(); break;
				case 40: moveDown(); break;
			}

			//判断方格是否填满
			//方法二
			var num = border.join(",");	//将数组转换成字符串
			if(num.search("0")<0 && f){	//查找字符串中是否存在数字“0”，没有则返回-1
				$("div.end").css("display","block");
				f = 0;
				return false;
			}

			/*方法一
			var num = 0;
			for(var i=0; i<4; i++){
				for(var j=0; j<4; j++){
					if(border[i][j] != 0){
						num++;
					}
				}
			}
			if(num == 16 && f){
				$("div.end").css("display","block");
				f = 0;
				return false;
			}*/

			//判断是否进行了移动，如果发生移动，则重新生成一个数字方格
			if (flag) {
				//判断数组中的最大值
				var arr = border.join(",").split(",");	//把二维数组转换成一维数组
				maxNum = Math.max.apply(null,arr);
				$(".score span").text(maxNum);
				
				newNum();
				flag = 0;
			}
		}
	})
	
	//设置数字方格的公共样式
	function numStyle(i,j){
		if(border[i][j]!=0){
			//位置、样式、大小设计
			$(".num-cell-"+i+"-"+j).css({"top":getTop(i,j),"left":getLeft(i,j),"width":"100px","height":"100px","borderRadius":"7px","backgroundColor":getNumbackgroundColor(border[i][j])});
			//插入的文字
			$(".num-cell-"+i+"-"+j).text(border[i][j]);
		}
		else{
			$(".num-cell-"+i+"-"+j).css({"top":getTop(i,j),"left":getLeft(i,j),"width":0,"height":0});
			$(".num-cell-"+i+"-"+j).text("");
		}
	}

	//移动一格后生成新的数字方格
	function newNum(){
		setTimeout(function(){
		for(k=0;k<1;k++){
			var m = Math.floor(Math.random()*4);
			var n = Math.floor(Math.random()*4);
			if (border[m][n] ==0) {
				border[m][n] = Math.random() > 0.93 ? 4 : 2;
				numStyle(m,n);
				$(".num-cell-"+m+"-"+n).text(border[m][n]);
			}
			else{
				k--;
			}
		}},0);
	}

	//向左移动
	function moveLeft(){
		for(var m=0; m<4; m++){
			for(var n=1; n<4; n++){
				if (border[m][n]!=0) {
					for(k=n-1;k>=0;k--){
						if (border[m][k]==0 && k !=0) {
							continue;
						}
						if(border[m][k]==border[m][n]) {
							border[m][k] = border[m][n]*2;
							border[m][n] = 0;
							// $(".num-cell-"+m+"-"+n).animate({left:getLeft(m,k)},200);
							// setTimeout(numStyle(m,n),200);
							// setTimeout(numStyle(m,k),200);
							numStyle(m,n);
							numStyle(m,k);
							flag = 1;
							break;
						}
						if (k!=n-1 && border[m][k]!=0) {
							border[m][k+1] = border[m][n];
							border[m][n] = 0;
							// $(".num-cell-"+m+"-"+n).animate({left:getLeft(m,k+1)},200);
							// setTimeout(numStyle(m,n),200);
							// setTimeout(numStyle(m,k+1),200);
							numStyle(m,n);
							numStyle(m,k+1);
							flag = 1;
							break;
						}
						if (k==n-1 && border[m][k]!=0) {
							break;
						}

						else{
							border[m][k] = border[m][n];
							border[m][n] = 0;
							// $(".num-cell-"+m+"-"+n).animate({left:getLeft(m,k)},200);
							// setTimeout(numStyle(m,n),200);
							// setTimeout(numStyle(m,k),200);
							numStyle(m,n);
							numStyle(m,k);
							flag = 1;
						}
					}
				}
			}
		}
	}
	//向右移动
	function moveRight(){
		for(var m=0; m<4; m++){
			for(var n=2; n>=0; n--){
				if (border[m][n]!=0) {
					for(k=n+1;k<=3;k++){
						if (border[m][k]==0 && k !=3) {
							continue;
						}
						if(border[m][k]==border[m][n]) {
							border[m][k] = border[m][n]*2;
							border[m][n] = 0;
							numStyle(m,n);
							numStyle(m,k);
							flag = 1;
							break;
						}
						if (k!=n+1 && border[m][k]!=0) {
							border[m][k-1] = border[m][n];
							border[m][n] = 0;
							numStyle(m,n);
							numStyle(m,k-1);
							flag = 1;
							break;
						}
						if (k==n+1 && border[m][k]!=0) {
							break;
						}

						else{
							border[m][k] = border[m][n];
							border[m][n] = 0;
							numStyle(m,n);
							numStyle(m,k);
							flag = 1;
						}
					}
				}
			}
		}
	}
	//向上移动
	function moveUp(){
		for(var m=1; m<4; m++){
			for(var n=0; n<4; n++){
				if (border[m][n]!=0) {
					for(k=m-1;k>=0;k--){
						if (border[k][n]==0 && k !=0) {
							continue;
						}
						if(border[k][n]==border[m][n]) {
							border[k][n] = border[m][n]*2;
							border[m][n] = 0;
							numStyle(m,n);
							numStyle(k,n);
							flag = 1;
							break;
						}
						if (k!=m-1 && border[k][n]!=0) {
							border[k+1][n] = border[m][n];
							border[m][n] = 0;
							numStyle(m,n);
							numStyle(k+1,n);
							flag = 1;
							break;
						}
						if (k==m-1 && border[k][n]!=0) {
							break;
						}

						else{
							border[k][n] = border[m][n];
							border[m][n] = 0;
							numStyle(m,n);
							numStyle(k,n);
							flag = 1;
						}
					}
				}
			}
		}
	}
	//向下移动
	function moveDown(){
		for(var m=2; m>=0; m--){
			for(var n=0; n<4; n++){
				if (border[m][n]!=0) {
					for(k=m+1;k<=3;k++){
						if (border[k][n]==0 && k !=3) {
							continue;
						}
						if(border[k][n]==border[m][n]) {
							border[k][n] = border[m][n]*2;
							border[m][n] = 0;
							numStyle(m,n);
							numStyle(k,n);
							flag = 1;
							break;
						}
						if (k!=m+1 && border[k][n]!=0) {
							border[k-1][n] = border[m][n];
							border[m][n] = 0;
							numStyle(m,n);
							numStyle(k-1,n);
							flag = 1;
							break;
						}
						if (k==m+1 && border[k][n]!=0) {
							break;
						}

						else{
							border[k][n] = border[m][n];
							border[m][n] = 0;
							numStyle(m,n);
							numStyle(k,n);
							flag = 1;
						}
					}
				}
			}
		}
	}



	//设置数字方格距离最上方的距离
	function getTop(i,j){
		return 20+120*i;
	}
	//设置数字方格距离最左方的距离
	function getLeft(i,j){
		return 20+120*j;
	}
	//设置数字方格的背景颜色
	function getNumbackgroundColor(num){
		switch(num){
			case 2:return "#9BCD9B"; break;
			case 4:return "#9BCD9B"; break;
			case 8:return "#BCD2EE"; break;
			case 16:return "#BCD2EE"; break;
			case 32:return "#BFEFFF"; break;
			case 64:return "#BFEFFF"; break;
			case 128:return "#BCEE68"; break;
			case 256:return "#BCEE68"; break;
			case 512:return "#B4CDCD"; break;
			case 1024:return "#C1FFC1"; break;
			case 2048:return "#CD950C"; break;
		}
	}

});