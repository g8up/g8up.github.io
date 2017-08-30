/*
 *作者：Sigma
 *微信: softor
 *时间: 2012年10月19日
 */

var words = {0: "桥", 1: "空", 2: "东风", 3: "何处", 4: "人间", 5: "风流", 6: "归去", 7: "春风", 8: "西风", 9: "归来", 10: "江南", 11: "相思", 12: "梅花", 13: "千里", 14: "回首", 15: "明月", 16: "多少", 17: "如今", 18: "阑干", 19: "年年", 20: "万里", 21: "一笑", 22: "黄昏", 23: "当年", 24: "天涯", 25: "相逢", 26: "芳草", 27: "尊前", 28: "一枝", 29: "风雨", 30: "流水", 31: "依旧", 32: "风吹", 33: "风月", 34: "多情", 35: "故人", 36: "当时", 37: "无人", 38: "斜阳", 39: "不知", 40: "不见", 41: "深处", 42: "时节", 43: "平生", 44: "凄凉", 45: "春色", 46: "匆匆", 47: "功名", 48: "一点", 49: "无限", 50: "今日", 51: "天上", 52: "杨柳", 53: "西湖", 54: "桃花", 55: "扁舟", 56: "消息", 57: "憔悴", 58: "何事", 59: "芙蓉", 60: "神仙", 61: "一片", 62: "桃李", 63: "人生", 64: "十分", 65: "心事", 66: "黄花", 67: "一声", 68: "佳人", 69: "长安", 70: "东君", 71: "断肠", 72: "而今", 73: "鸳鸯", 74: "为谁", 75: "十年", 76: "去年", 77: "少年", 78: "海棠", 79: "寂寞", 80: "无情", 81: "不是", 82: "时候", 83: "肠断", 84: "富贵", 85: "蓬莱", 86: "昨夜", 87: "行人", 88: "今夜", 89: "谁知", 90: "不似", 91: "江上", 92: "悠悠", 93: "几度", 94: "青山", 95: "何时", 96: "天气", 97: "惟有", 98: "一曲", 99: "月明", 100: "往事"};

$(document).ready(function() {
	$('#luckyNumber').on("keyup", function(e) {
		window["t"] && clearTimeout(window["t"]);
		var result = [],
			phoneCall = $(this).val().toString().replace(/[^0-9 ]/g, ''),
			pieces = phoneCall.split(/\s+/),
			len = pieces.length;

		if (len == 0 || phoneCall.length == 0) {
			$('.loading').hide();
			$('#myArtical').hide();
			return;
		}

		var code = e.which;
		if (!(code == 8 || code == 32 || code == 46 || (code >= 48 && code <= 57) || (code >= 96 && code <= 105))) {
			return;
		}

		$('.loading').show();
		$('#myArtical').hide();

		window["t"] = setTimeout(function() {
			for (var i = 0, L = pieces.length; i < L; i++) {
				result.push(iamlibai(pieces[i]));
			}
			$('#myArtical').html(result.join("<br />"));
			//share
			window['forShare'] = "【" + result.join(',') + "】";
			$('#myArtical').append(share.html());

			$('#myArtical').animate({
				height: "show",
				opacity: "show"
			});
			$('.loading').animate({
				height: "hide",
				opacity: "hide"
			}, function() {
				$('.loading').html(function() {
					var poets = ['李白', '杜甫', '王维', '东坡', '苏轼'],
						len = poets.length,
						temp = parseInt(Math.random() * len),
						_temp = parseInt(Math.random() * len);
					while (temp == _temp) {
						_temp = parseInt(Math.random() * len);
					}
					return poets[temp] + '在研墨，' + poets[_temp] + '在创作。。。';
				}());
			});

			clearTimeout(window["t"]);
		}, 1000);
	}).focus();

	$('#myArtical').hover(
		function() {
			$('.share').show();
		},
		function() {
			$('.share').hide();
		}
	);
	$('#luckyNumber').blur(function() {
		$(this).focus();
	});

	// Tips
	$('#luckyNumber').qtip({
		content: "输入手机号试试吧，用空格断句~", // Set the tooltip content to the current corner
		position: {
			my: 'bottom left',
			at: 'top right'
		}
	});

	$('.logo').qtip({
		content: "<div class='word'>由一篇文章触发灵感，夜不能寐，连夜赶制，遂酿成此机，一举道破那数字里的天机。。。</div><div class='sign'>——搪瓷茶缸</div>", // Set the tooltip content to the current corner
		position: {
			my: 'top left',
			at: 'bottom right'
		},
		style:{
			classes: 'logo-qtip'
		}
	});
});

function iamlibai(num) {
	var result = '',
		nums = num.split(''),
		len = nums.length;
	if (len == 1) {
		result += words[Number(nums[0])];
	} else {
		var temp = '';
		for (var n = 0; n < len; n++) {
			temp += nums[n];
			if (temp.length == 2) {
				result += words[Number(temp)];
				temp = '';
			}
		}
		if (temp != '') {
			result += words[temp];
		}
	}
	return result;
}



//shareIcon
var share = window.share || {};
share.getShareUrl = function() {
	return 'http://' + window.location.host + '/funlib/poetryrobot.php';
}
share.getPic = function() {
	return 'http://' + window.location.host + '/funlib/poetryrobot.png';
};
share.getWords = function() {
	var words = "我滴个老天爷啊，我的手机号里竟然埋藏着一首小诗，今天秘密被解开了：" + window['forShare'];
	return words;
};
share.html = function() {
	return '<div class="share">' + '<a class="douban" onclick="share.douban();"></a>' + '<a class="renren" onclick="share.renren();"></a>' + '<a class="weibo" onclick="share.sina();"></a>' + '<a class="tencentWeibo" onclick="share.tencentWeibo();"></a>' + '<a class="qzone" onclick="share.qzone();"></a>' + '</div>';
};
//QQ空间
share.qzone = function() {
	var p = {
		url: share.getShareUrl(),
		showcount: '0',
		desc: share.getWords(),
		summary: '',
		title: window.document.title,
		site: '笃行天下',
		pics: share.getPic(),
		style: '203',
		width: 22,
		height: 22
	};
	var s = [];
	for (var i in p) {
		s.push(i + '=' + encodeURIComponent(p[i] || ''));
	}
	var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&');
	window.open(url);
};
//腾讯微博
share.tencentWeibo = function() {
	var p = {
		title: '#诗机#' + share.getWords() + '你也试试吧：',
		url: share.getShareUrl(),
		assname: "诗机",
		appkey: "100665784",
		pic: share.getPic(),
		site: share.getShareUrl()
	};
	var s = [];
	for (var i in p) {
		s.push(i + '=' + encodeURIComponent(p[i] || ''));
	}
	var url = ['http://v.t.qq.com/share/share.php?', s.join('&')].join('');
	window.open(url);
};
//新浪微博
share.sina = function() {
	var p = {
		url: share.getShareUrl(),
		type: '3',
		//appkey:'3230804711',
		title: '#诗机#' + share.getWords() + '你也试试吧：',
		pic: share.getPic(),
		language: 'zh_cn',
		rnd: new Date().valueOf()
			//,ralateUid:1700535270 //关注帐号
	}
	var s = [];
	for (var i in p) {
		s.push(i + '=' + encodeURIComponent(p[i] || ''))
	}
	var url = 'http://service.weibo.com/share/share.php?' + s.join('&');
	window.open(url);
};
//人人网
share.renren = function() {
	var p = {
		resourceUrl: share.getShareUrl(),
		srcUrl: share.getShareUrl(),
		pic: share.getPic(),
		title: window.document.title,
		description: share.getWords()
			//,api_key:'1046d1b0bd274520ae177343a0c9fe63'
	};
	var s = [];
	for (var i in p) {
		if (p[i])
			s.push(i + '=' + encodeURIComponent(p[i]));
	}
	var url = ['http://widget.renren.com/dialog/share?', s.join('&')].join('');
	window.open(url);
};
//豆瓣
share.douban = function() {
	var p = {
		url: share.getShareUrl(),
		title: window.document.title,
		sel: share.getWords(),
		image: share.getPic()
	};
	var s = [];
	for (var i in p) {
		s.push(i + '=' + encodeURIComponent(p[i] || ''));
	}
	var url = ['http://www.douban.com/recommend/?', s.join('&')].join('');
	window.open(url);
};