_satellite.pushAsyncScript(function(event, target, $variables){
  // This tag needs to be replaced with your account tag
(function(c,h,a,f,i,e){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
 c[a].a=i;c[a].e=e;var g=h.createElement("script");g.async=true;g.type="text/javascript";
 g.src=f+'?aid='+i;var b=h.getElementsByTagName("script")[0];b.parentNode.insertBefore(g,b);
 })(window,document,"rtp","//sjrtp5-cdn.marketo.com/rtp-api/v1/rtp.js","muratamanufacturing");

// Send page view (required by the recommendation)
rtp('send', 'view');

// Populate campaign
rtp('get', 'campaign', true);

// Prepare to load CSS for recommendation
var d = document;
var link = d.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';

// Change template configuration for Predictive Content
var path = location.pathname;
if (path.indexOf('en-us') != -1) {
	rtp('set', 'rcmd', 'richmedia',
		{
			template1 :
			{
				"rcmd.content.background.color" : "#FFFFFF",
				"rcmd.title.text" : "Recommended Contents",
				"rcmd.cta.background.color" : "#F5002F",
				"rcmd.cta.font.color" : "#FFFFFF",
				"rcmd.cta.text" : "Read more",
				"category" : ["en us"]
			}
		}
	);
	link.href = 'https://go.murata.com/rs/382-MEZ-125/images/rtp_recommendation_en.css';
} else if (path.indexOf('en-eu') != -1) {
	rtp('set', 'rcmd', 'richmedia',
		{
			template1 :
			{
				"rcmd.content.background.color" : "#FFFFFF",
				"rcmd.title.text" : "Recommended Contents",
				"rcmd.cta.background.color" : "#F5002F",
				"rcmd.cta.font.color" : "#FFFFFF",
				"rcmd.cta.text" : "Read more",
				"category" : ["en eu"]
			}
		}
	);
	link.href = 'https://go.murata.com/rs/382-MEZ-125/images/rtp_recommendation_en.css';
} else if (path.indexOf('en-sg') != -1) {
	rtp('set', 'rcmd', 'richmedia',
		{
			template1 :
			{
				"rcmd.content.background.color" : "#FFFFFF",
				"rcmd.title.text" : "Recommended Contents",
				"rcmd.cta.background.color" : "#F5002F",
				"rcmd.cta.font.color" : "#FFFFFF",
				"rcmd.cta.text" : "Read more",
				"category" : ["en sg"]
			}
		}
	);
	link.href = 'https://go.murata.com/rs/382-MEZ-125/images/rtp_recommendation_en.css';
} else if (path.indexOf('zh-cn') != -1) {
	rtp('set', 'rcmd', 'richmedia',
		{
			template1 :
			{
				"rcmd.content.background.color" : "#FFFFFF",
				"rcmd.title.text" : "推荐内容",
				"rcmd.cta.background.color" : "#F5002F",
				"rcmd.cta.font.color" : "#FFFFFF",
				"rcmd.cta.text" : "更多内容",
				"category" : ["zh cn"]
			}
		}
	);
	link.href = 'https://go.murata.com/rs/382-MEZ-125/images/rtp_recommendation_zh.css';
} else if (path.indexOf('ko-kr') != -1) {
	rtp('set', 'rcmd', 'richmedia',
		{
			template1 :
			{
				"rcmd.content.background.color" : "#FFFFFF",
				"rcmd.title.text" : "추천 컨텐츠",
				"rcmd.cta.background.color" : "#F5002F",
				"rcmd.cta.font.color" : "#FFFFFF",
				"rcmd.cta.text" : "더 보기",
				"category" : ["ko kr"]
			}
		}
	);
	link.href = 'https://go.murata.com/rs/382-MEZ-125/images/rtp_recommendation_ko.css';
} else if (path.indexOf('ja-jp') != -1) {
	rtp('set', 'rcmd', 'richmedia',
		{
			template1 :
			{
				"rcmd.general.font.family" : "メイリオ",
				"rcmd.content.background.color" : "#FFFFFF",
				"rcmd.title.text" : "おすすめのコンテンツ",
				"rcmd.cta.background.color" : "#F5002F",
				"rcmd.cta.font.color" : "#FFFFFF",
				"rcmd.cta.text" : "さらに読む",
				"category" : ["ja jp"]
			}
		}
	);
	link.href = 'https://go.murata.com/rs/382-MEZ-125/images/rtp_recommendation_ja.css';
} else {
	rtp('set', 'rcmd', 'richmedia',
		{
			template1 :
			{
				"rcmd.content.background.color" : "#FFFFFF",
				"rcmd.title.text" : "Recommended Contents",
				"rcmd.cta.background.color" : "#F5002F",
				"rcmd.cta.font.color" : "#FFFFFF",
				"rcmd.cta.text" : "Read more",
				"category" : ["en global"]
			}
		}
	);
	link.href = 'https://go.murata.com/rs/382-MEZ-125/images/rtp_recommendation_en.css';
}

// Populate recommendation
rtp('get','rcmd', 'richmedia');

// Load CSS for recommendation
var h = d.getElementsByTagName('head')[0];
h.appendChild(link);

});
