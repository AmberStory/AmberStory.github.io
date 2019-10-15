var Obut = document.getElementsByTagName('input');
var Opar = document.getElementById('par');
var str = '';
var flag = 1;
var Jsonrandlist = [
	{'image': 'image/1.png', 'link': 'https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.1.alsnsE&id=542647241130&skuId=3262288872777&areaId=420100&user_id=196993935&cat_id=50025783&is_b=1&rn=46c8d72b62309724873437658b0b3695',
		'price': '¥199', 'name': '优衣库官方旗舰店'},
	{'image': 'image/2.png', 'link': 'https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.8.alsnsE&id=541948088101&skuId=3255784837097&areaId=420100&user_id=394695430&cat_id=50025783&is_b=1&rn=46c8d72b62309724873437658b0b3695',
		'price': '¥179', 'name': '七格格旗舰店'},
	{'image': 'image/3.png', 'link': 'https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.13.alsnsE&id=543511560483&skuId=3435284935430&areaId=420100&user_id=356060330&cat_id=50025783&is_b=1&rn=46c8d72b62309724873437658b0b3695',
		'price': '¥299', 'name': 'ONLY官方旗舰店'},
	{'image': 'image/4.png', 'link': 'https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.18.alsnsE&id=543446259341&skuId=3270118488461&areaId=420100&user_id=412129187&cat_id=50025783&is_b=1&rn=46c8d72b62309724873437658b0b3695',
		'price': '¥268', 'name': 'JNBY官方旗舰店'},
	{'image': 'image/5.png', 'link': 'https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.23.alsnsE&id=542600464915&skuId=3262101745957&areaId=420100&user_id=728443962&cat_id=50025783&is_b=1&rn=46c8d72b62309724873437658b0b3695',
		'price': '¥350', 'name': '哥弟官方旗舰店'},
	{'image': 'image/6.png', 'link': 'https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.28.alsnsE&id=542812357902&skuId=3263958932505&areaId=420100&user_id=2037011877&cat_id=50025783&is_b=1&rn=46c8d72b62309724873437658b0b3695',
		'price': '¥189', 'name': '同恩旗舰店'},
	{'image': 'image/7.png', 'link': 'https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.33.alsnsE&id=542665630914&skuId=3271520713686&areaId=420100&user_id=513051429&cat_id=50025783&is_b=1&rn=46c8d72b62309724873437658b0b3695',
		'price': '¥169', 'name': '乐町官方旗舰店'},
	{'image': 'image/8.png', 'link': 'https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.38.alsnsE&id=542797677163&skuId=3427831971472&areaId=420100&user_id=112394247&cat_id=50025783&is_b=1&rn=46c8d72b62309724873437658b0b3695',
		'price': '¥239', 'name': '太平官方旗舰店'}
];
show();
function show(){
		for (var i = 0; i < Jsonrandlist.length; i++) {
		str = '<div><a target=\'_blank\' href=\''+Jsonrandlist[i].link+'\'><img src=\''+Jsonrandlist[i].image+'\'></a><p>'+Jsonrandlist[i].price+'</p><a target=\'_blank\' href=\''+Jsonrandlist[i].link+'\'>'+Jsonrandlist[i].name+'</a></div>';
		Opar.innerHTML += str;
	}
}

Obut[0].onclick = function(){
	flag = flag * (-1);
	if (flag<0) {Obut[0].value = '从高到低';}
	else{ Obut[0].value = '从低到高';}
	sortByKey(Jsonrandlist,'price');
	Opar.innerHTML = '';
	show();
}
Obut[1].onclick = function(){
	var k = 1;
	sortByKey(Jsonrandlist,'price',k);
	Opar.innerHTML = '';
	show();
}


function sortByKey(array, key, k) {
    return array.sort(function(a, b) {
        var x = parseInt(a[key].substring(1,a[key].length)); var y = parseInt(b[key].substring(1,b[key].length));
        // console.log(a.key);
        // return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        if (k&&k==1) {return Math.random()-0.5;}
        else{return flag*(y - x);}
        
    });
}