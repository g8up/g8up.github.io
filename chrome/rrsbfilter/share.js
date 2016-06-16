//shareIcon
var share = window.share ||{};
share.getShareUrl = function(){
	return 'http://duxing.org/chrome/rrsbfilter/';
}
share.getPic = function(){
	return 'http://duxing.org/chrome/rrsbfilter/weixin_rrsbfilter.jpg';
};
share.getPics = function(){
	return 'http://duxing.org/chrome/rrsbfilter/weixin_rrsbfilter.jpg' + '|' + 'http://duxing.org/chrome/rrsbfilter/logo128.png';
};

share.getWords = function(){
    var words = $('.recommend').text().replace('人人2B过滤器','#人人2B过滤器#');//推荐语
	return words;
};
share.html = function(){
	return '<a class="douban" onclick="share.douban();"></a>'
		  +'<a class="weibo" onclick="share.sina();"></a>'
		  +'<a class="tencentWeibo" onclick="share.tencentWeibo();"></a>'
		  +'<a class="qzone" onclick="share.qzone();"></a>'
		  +'<a class="renren" onclick="share.renren();"></a>';
};
//QQ空间
share.qzone = function(){
	var p = {
		url: share.getShareUrl()
		,showcount: '0'
        ,desc: share.getWords()
		,summary: ''
		,title: window.document.title
		,site: '笃行天下'
		,pics: share.getPic()
		,style: '203'
		,width: 22
		,height: 22
	};
	var s = [];
	for (var i in p) {
		s.push(i + '=' + encodeURIComponent(p[i] || ''));
	}
    var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&') ;
	window.open( url );
};
//腾讯微博
share.tencentWeibo = function(){
	var p = {
		title: share.getWords()
		//,url : share.getShareUrl()
		,pic: share.getPics()
		,site: share.getShareUrl()
	};
	var s = [];
	for (var i in p) {
		s.push(i + '=' + encodeURIComponent(p[i] || ''));
	}
	var url = ['http://v.t.qq.com/share/share.php?',s.join('&')].join('');
	window.open( url );
};
//新浪微博
share.sina = function(){//发布的文本框里显示ti
	  var p = {
		//url:share.getShareUrl(),
		type:'3',
		//appkey:'3230804711',
		title:share.getWords(),
		pic:share.getPic(),
		language:'zh_cn',
		rnd:new Date().valueOf()
		//,ralateUid:1700535270 //关注帐号
	  }
	  var s = [];
	  for( var i in p ){
		s.push(i + '=' + encodeURIComponent( p[i] || '' ) )
	  }
	  var url = 'http://service.weibo.com/share/share.php?' + s.join('&') ;
	  window.open( url );
};
//人人网
share.renren = function(){
	var p = {
			resourceUrl : share.getShareUrl()
			,srcUrl:share.getShareUrl()
			,pic :share.getPic()
			,title : window.document.title
            ,description :share.getWords()
			//,api_key:'1046d1b0bd274520ae177343a0c9fe63'
		};
		var s = [];
		for (var i in p) {
			if (p[i])
				s.push(i + '=' + encodeURIComponent(p[i]));
		}
		var url = ['http://widget.renren.com/dialog/share?',s.join('&')].join('');
		window.open( url );
};
//豆瓣
share.douban = function(){
	var p ={
		url:share.getShareUrl()
		,title:window.document.title
		,sel:share.getWords()
		,image:share.getPic()
	};
	var s = [];
	for (var i in p) {
		s.push(i + '=' + encodeURIComponent(p[i] || ''));
	}
	var url = ['http://www.douban.com/recommend/?',s.join('&')].join('');
	window.open( url );
};