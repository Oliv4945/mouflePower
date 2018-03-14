/*
AppMeasurement for JavaScript version: 1.6
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/

// RSID settings
var s_account = "muratamainprd";
if((location.host.indexOf("www.muratasolutions.com") === -1 && location.host.indexOf("www3.ibac.co.jp") === -1 && location.host.indexOf("murata.com") === -1 && location.host.indexOf("murata.co.jp") === -1 && location.host.indexOf("muratasoftware.com") === -1 && location.host.indexOf("muratachannel.com") === -1 && location.host.indexOf("murata-ps.") === -1 && location.host.indexOf("dilp.netcomponents.com") === -1) || (location.host.indexOf("www-qas.") !== -1 || location.host.indexOf("dev-rp") !== -1 || location.host.indexOf("stg.") !== -1 || location.host.indexOf("test") !== -1 || location.host.indexOf("www-tmp.") !== -1 || location.host.indexOf("origin-www.") !== -1) || location.href.indexOf("ds.murata.co.jp/aa/") !== -1){
	s_account = "muratamaindev";
}
if (window.localStorage && window.localStorage.getItem("sdsat_stagingLibrary") == "true"){
	s_account = "muratamaindev";
}

var s = s_gi(s_account);

// Set VisitorID Service
/*
try {
	if (typeof window.Visitor !== "undefined") {
		if (typeof Visitor.getInstance == "function") { s.visitor = Visitor.getInstance("8370877056E1A4D87F000101@AdobeOrg"); }
		if (s.visitor && typeof s.visitor.getAnalyticsVisitorID == "function") { s.visitor.getAnalyticsVisitorID(); }
} catch (e) {}
*/


// Server Detections
if(location.hostname == "www-dev.murata.com" || location.hostname == "www-mig.murata.com" || location.hostname == "www-trn.murata.com"){
	s.abort = true;
}

// Avoid sending a beacon from iframe contents (s.t())
if(!(window == window.parent)){
	s.abort = true;
}

// Stock Check from iframe(Exception of Abort)
if (location.hostname == "dilp.netcomponents.com") {
	s.abort = false;
}

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
//s.charSet = "UTF-8"; /* set via DTM */
//s.cookieDomainPeriods = "2"; /* set via DTM */
//s.fpCookieDomainPeriods = "2"; /* set via DTM */

//s_code version
s.s_code_version = "WRP::"+ "JS-" + s.version + "_20180208_r1";

/* Conversion Config */
//s.currencyCode = "USD"; /* set via DTM */

/* Link Tracking Config */
//s.trackDownloadLinks = true; /* set via DTM */
//s.trackExternalLinks = true; /* set via DTM */
//s.trackInlineStats = true; /* set via DTM */
//s.linkDownloadFileTypes = ""; /* set via DTM */
//s.linkInternalFilters = ""; /* set via DTM */
//s.linkLeaveQueryString = false; /* set via DTM */
//s.linkTrackVars = "None"; /* set via DTM */
//s.linkTrackEvents = "None"; /* set via DTM */
s.useForcedLinkTracking = false;
s.loadModule("Media");
s.mrt_olhFlag = true;

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
//s.visitorNamespace = "murata"; /* set via DTM */
//s.trackingServer = "metrics.murata.com"; /* set via DTM */
//s.trackingServerSecure = "smetrics.murata.com"; /* set via DTM */

/////////////////////////////////////////////////////

/* timeparting config variables */
//s.dstStart="1/1/1900"; // update to the correct Daylight Savings Time start date for the current year.
//s.dstEnd="1/1/1900"; // update to the correct Daylight Savings Time end date for the current year.
s.scLocalTime = new Date();
s.currentYear = s.scLocalTime.getUTCFullYear(); // update to the current year (can be done programmatically).

// s_code version
s.prop75 = s.s_code_version;
s.eVar75 = "D=c75";

/************************** doPlugins SECTION **************************/
s.usePlugins = true;

/* Run Plugins */
function s_doPlugins(s) {

	/* mtl Standard settings ==========================================*/
	if(sc_doplugin_once){

		// Import tag parameters
		try {
			for(var sci in _sc){
				if(sci == "pageName"){
					var sciAlt = "mrt_pageName";
					s[sciAlt] = _sc[sci];
				}else{
					s[sci] = _sc[sci];
				}
			}
		}catch(e){}

		// Adjust URL
		var lPath = location.pathname.split(";")[0]; // Adjustment for Ceramy and myMurata (to get rid of "jsessionid")
		lPath = lPath.replace(/\/+$/,""); // delete plural slashes
		var lPathArray = lPath.split("/");
		var lHostname = location.hostname;
		var langDir;
		var lPathConcat;
		var pageNameFullPath;
		var FullPath;
			/* Preprocessing : delete "index.***" */
			if(lPathArray[lPathArray.length-1].indexOf("index.") !== -1){
				lPathArray.pop();
			}
			/* Preprocessing : delete ".aspx" */
			lPathArray[lPathArray.length-1] = lPathArray[lPathArray.length-1].replace(/\.aspx$/,"");
			/* Preprocessing : set language/locale from directory */
			if(lPathArray[1] && ((lPathArray[1].indexOf("-") !== -1 && lPathArray[1].toLowerCase().indexOf("cgi-bin") === -1) || lPathArray[1] == "en")){
				langDir = lPathArray[1].toLowerCase();
				lPathArray.splice(1,1);
				/* Adjustment */
				if(langDir == "en"){
					langDir = "en-global";
				}else if(langDir == "en-gb"){
					langDir = "en-eu";
				}
			}
		if(lPathArray[lPathArray.length-1].indexOf(".") === -1){
			lPathConcat = lPathArray.join("/") + "/";
		}else{
			lPathConcat = lPathArray.join("/");
		}
		lPathConcat = lPathConcat.replace(/\/\//g,"/").toLowerCase();
//		lPathConcat = decodeURIComponent(lPathConcat);
		FullPath = lHostname + lPathConcat;
		pageNameFullPath = langDir ? lHostname + "/" + langDir + lPathConcat : lHostname + lPathConcat;

		// PageName
		if(!s.mrt_pageName){
			s.pageName = pageNameFullPath;
		} else {
			s.pageName = pageNameFullPath + "::" + s.mrt_pageName;
		}
		s.eVar9 = s.eVar10 = s.prop71 = "D=pageName";

		// URL without language/locale
		s.prop20 = FullPath;
		s.eVar20 = s.eVar30 = "D=c20";

		// 404 error
		if(s.pageType){
			s.pageName = "404:" + document.URL;
		}

		// s.server
		if(!s.server){
			s.server = location.hostname;
		}
		s.eVar68 = "D=server";

		// External Campagin
		if(!s.campaign){
			var excidVal = s.Util.getQueryParam("excid");
			var utm_sourceVal = s.Util.getQueryParam("utm_source");
			if(excidVal){
				s.campaign = excidVal;
			}else if(utm_sourceVal){
				s.campaign = "utms:" + utm_sourceVal;
			}
		}

		// TrackingCode
		s.prop8 = s.eVar66 = s.eVar67 = "D=v0";

		// Internal Campaign
		s.eVar61 = s.Util.getQueryParam("intcid1");
		s.eVar62 = s.Util.getQueryParam("intcid2");
		s.eVar63 = s.Util.getQueryParam("intcid3");
		s.eVar64 = s.Util.getQueryParam("intcid4");
		s.eVar65 = s.Util.getQueryParam("intcid5");

		// URL / Referrer
		s.prop1 = s.eVar1 = s.eVar71 = "D=g";
		s.prop2 = s.eVar2 = "D=r";

		// Entry Referrer
		s.eVar72 = document.referrer ? "D=r" : "referrer_not_available";

		// Access Time
		s.prop3 = s.getTimeParting("h","0");
		s.eVar3 = s.eVar8 = "D=c3";

		// Access Date (YYYY/MM/DD)
		s.prop4 = s.scLocalTime.getUTCFullYear() + "/" + (s.scLocalTime.getUTCMonth()+1) + "/" + s.scLocalTime.getUTCDate();
		s.eVar4 = "D=c4";

		// Access Time (Unixtime)
		s.prop5 = Math.floor(s.scLocalTime.getTime()/1000);
		s.eVar5 = s.eVar7 = "D=c5";

		// DNT
		s.prop7 = "D=DNT";

		// RIA Detection
//		s.detectRIA("s_ria","prop9","","","","");

		// Document Title
		s.prop70 = document.title;
		s.eVar70 = "D=c70";

		// previous page name & percent page viewed
		if (!s.abort) {
			s.prop41 = s.getPreviousValue(s.pageName, "s_previous_pagename");
			var perPageView = s.getPercentPageViewed(s.pageName);
			if (perPageView && typeof perPageView == "object" && s.prop41 && s.prop41 == perPageView[0]) {
				if (typeof perPageView[1] !== "undefined" && perPageView[1] == "0") {
					perPageView[1] = "zero";
				}
				if (typeof perPageView[2] !== "undefined" && perPageView[2] == "0") {
					perPageView[2] = "zero";
				}
				s.prop42 = perPageView[1] + "|" + perPageView[2];
			}
		}

		// myMurataUserId
		if(s.myMurataUserId){
			s.prop48 = s.myMurataUserId;
			s.eVar48 = "D=c48";
		}

		// SFDCID
		if(s.Util.getQueryParam("mpid")){
			s.prop52 = s.Util.getQueryParam("mpid");
			s.eVar52 = "D=c52";
		}

		// s_vi
		s.eVar59 = s.prop59 = "D=s_vi";

		// UserAgent
		s.prop60 = s.eVar60 = "D=User-Agent";

		// mid
		s.eVar76 = s.prop73 = "D=mid";

		// aid
		s.eVar77 = s.prop72 = "D=aid";

		// Language/Locale
		var localeSetting;
		localeSetting = s.mrt_getCookie("website#lang") ? s.mrt_getCookie("website#lang").toLowerCase() : langDir;
		if(!localeSetting){
			localeSetting = "en-global";
			/* Document Title */
			var dTitleEnc = document.title ? encodeURIComponent(document.title) : "N/A";
			if(dTitleEnc.indexOf("%E6%9D%91%E7%94%B0%E8%A3%BD%E4%BD%9C%E6%89%80") !== -1){localeSetting = "ja-jp";}
			if(document.title.indexOf("Murata Manufacturing") !== -1){localeSetting = "en-global";}
			if(dTitleEnc.indexOf("%E6%9D%91%E7%94%B0%E5%88%B6%E4%BD%9C%E6%89%80") !== -1){localeSetting = "zh-cn";}
			/* Location Hostname */
			if(lHostname.indexOf("murata.co.jp") !== -1){localeSetting = "ja-jp";}
			if(lHostname.indexOf("murata.com") !== -1){localeSetting = "en-global";}
			if(lHostname.indexOf("psearch.jp.murata") !== -1){localeSetting = "ja-jp";}
			if(lHostname.indexOf("psearch.en.murata") !== -1){localeSetting = "en-global";}
			if(lHostname.indexOf("psearch.cn.murata") !== -1){localeSetting = "zh-cn";}
			if(lHostname.indexOf("ibac.co.jp") !== -1){localeSetting = "ja-jp";}
			/* Location Pathname */
			if(FullPath.indexOf("/ja-jp/") !== -1){localeSetting = "ja-jp";}
			else if(FullPath.indexOf("/en-us/") !== -1){localeSetting = "en-us";}
			else if(FullPath.indexOf("/zh-cn/") !== -1){localeSetting = "zh-cn";}
			else if(FullPath.indexOf("/ja/") !== -1){localeSetting = "ja-jp";}
			else if(FullPath.indexOf("/en/") !== -1){localeSetting = "en-global";}
			else if(FullPath.indexOf("/cn/") !== -1){localeSetting = "zh-cn";}
			else if(FullPath.indexOf("/ko/") !== -1){localeSetting = "ko-kr";}
			else if(FullPath.indexOf("_ja.do") !== -1){localeSetting = "ja-jp";}
			else if(FullPath.indexOf("_en.do") !== -1){localeSetting = "en-global";}
			else if(FullPath.indexOf("_cn.do") !== -1){localeSetting = "zh-cn";}
			/* Query Parameter */
			if(s.Util.getQueryParam("sLang")){localeSetting = s.Util.getQueryParam("sLang");}
			/* Location Hostname */
			if(lHostname.indexOf("murata.com.cn") !== -1){localeSetting = "zh-cn";}
			if(lHostname.indexOf("murata.com.sg") !== -1){localeSetting = "en-sg";}
		}
		/* Adjustment */
		if(localeSetting == "en"){
			localeSetting = "en-global";
		}else if(localeSetting == "en-gb"){
			localeSetting = "en-eu";
		}else if(localeSetting == "ja" || localeSetting == "jp"){
			localeSetting = "ja-jp";
		}else if(localeSetting == "cn"){
			localeSetting = "zh-cn";
		}
		/* Setting */
		s.prop6 = localeSetting;
		s.eVar6 = "D=c6";

		// Site Sections
		var sectionArray = FullPath.split("/");
		if(sectionArray[sectionArray.length-1].indexOf(".") !== -1){
			sectionArray.pop();
		}
		if (!sectionArray[1]){
			s.prop11 = sectionArray[0] + "/";
			s.prop12 = sectionArray[0] + "/::anypages";
			s.prop13 = sectionArray[0] + "/::anypages";
			s.prop14 = sectionArray[0] + "/::anypages";
			s.prop15 = sectionArray[0] + "/::anypages";
			s.prop16 = sectionArray[0] + "/::anypages";
		}else if (!sectionArray[2]){
			s.prop11 = sectionArray[0] + "/";
			s.prop12 = sectionArray[0] + "/" + sectionArray[1] + "/";
			s.prop13 = sectionArray[0] + "/" + sectionArray[1] + "/::anypages";
			s.prop14 = sectionArray[0] + "/" + sectionArray[1] + "/::anypages";
			s.prop15 = sectionArray[0] + "/" + sectionArray[1] + "/::anypages";
			s.prop16 = sectionArray[0] + "/" + sectionArray[1] + "/::anypages";
		}else if (!sectionArray[3]){
			s.prop11 = sectionArray[0] + "/";
			s.prop12 = sectionArray[0] + "/" + sectionArray[1] + "/";
			s.prop13 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/";
			s.prop14 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/::anypages";
			s.prop15 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/::anypages";
			s.prop16 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/::anypages";
		}else if (!sectionArray[4]){
			s.prop11 = sectionArray[0] + "/";
			s.prop12 = sectionArray[0] + "/" + sectionArray[1] + "/";
			s.prop13 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/";
			s.prop14 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/" + sectionArray[3] + "/";
			s.prop15 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/" + sectionArray[3] + "/::anypages";
			s.prop16 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/" + sectionArray[3] + "/::anypages";
		}else if (!sectionArray[5]){
			s.prop11 = sectionArray[0] + "/";
			s.prop12 = sectionArray[0] + "/" + sectionArray[1] + "/";
			s.prop13 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/";
			s.prop14 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/" + sectionArray[3] + "/";
			s.prop15 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/" + sectionArray[3] + "/" + sectionArray[4] + "/";
			s.prop16 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/" + sectionArray[3] + "/" + sectionArray[4] + "/::anypages";
		}else{
			s.prop11 = sectionArray[0] + "/";
			s.prop12 = sectionArray[0] + "/" + sectionArray[1] + "/";
			s.prop13 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/";
			s.prop14 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/" + sectionArray[3] + "/";
			s.prop15 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/" + sectionArray[3] + "/" + sectionArray[4] + "/";
			s.prop16 = sectionArray[0] + "/" + sectionArray[1] + "/" + sectionArray[2] + "/" + sectionArray[3] + "/" + sectionArray[4] + "/" + sectionArray[5] + "/";
		}
		s.prop21 = s.eVar11 = s.eVar21 = "D=c11";
		s.prop22 = s.eVar12 = s.eVar22 = "D=c12";
		s.prop23 = s.eVar13 = s.eVar23 = "D=c13";
		s.prop24 = s.eVar14 = s.eVar24 = "D=c14";
		s.prop25 = s.eVar15 = s.eVar25 = "D=c15";
		s.prop26 = s.eVar16 = s.eVar26 = "D=c16";

		// Set variables depending on URL structure
		// SiteTop
		if(FullPath.match(/^(?:www|www-dev)\.murata\.com\/$/)){
			s.events = s.apl(s.events,"event1",",",1);
			s.events = s.apl(s.events,"event2",",",1);
		}

		// AllProdcutsTop
		if(FullPath.match(/^(?:www|www-dev)\.murata\.com\/products\/$/)){
			s.events = s.apl(s.events,"event3",",",1);
			s.events = s.apl(s.events,"event4",",",1);
		}

		// AllProductsKnowledge
		if(FullPath.match(/^(?:www|www-dev)\.murata\.com\/(?:applications|about\/newsroom\/tech|support\/library\/selectionguide)\//) || FullPath.match(/^(?:www|www-dev)\.murata\.com\/products\/[^\/]+\/[^\/]+\/selectionguide\//)){
			s.events = s.apl(s.events,"event5",",",1);
			s.events = s.apl(s.events,"event6",",",1);
		}

		// SiteSearchResults
		if(FullPath.match(/^(?:www|www-dev)\.murata\.com\/search\/site\/searchresult\//)){
			if(window.addEventListener){
				window.addEventListener("load",function(){new AA_GET_SEARCH.SearchInfo();},false);
			}else if(window.attachEvent){
				window.attachEvent("onload",function(){new AA_GET_SEARCH.SearchInfo();});
			}
		}

		// SpecificProductContents
		if(FullPath.match(/^(?:www|www-dev)\.murata\.com\/products\//) && !FullPath.match(/^(?:www|www-dev)\.murata\.com\/products\/$/) && !FullPath.match(/^(?:www|www-dev)\.murata\.com\/products\/(?:newsletter|emiconfun|leadmount|ecoproducts|productdetail)\//)){
			s.events = s.apl(s.events,"event9",",",1);
			s.events = s.apl(s.events,"event10",",",1);
		}

		// InternalCampaginTopPage
		if(FullPath.match(/^(?:www|www-dev)\.murata\.com\/campaign\/[^\/]+\/[^\/]+\/[^\/]+\//)){
			s.events = s.apl(s.events,"event11",",",1);
			s.events = s.apl(s.events,"event12",",",1);
		}

		// PDFCatalogPage
		if(FullPath.match(/^(?:www|www-dev)\.murata\.com\/support\/library\/catalog\/$/)){
			s.events = s.apl(s.events,"event13",",",1);
			s.events = s.apl(s.events,"event14",",",1);
		}

		// ProductsSearchResults (Ceramy) : backward compatible
		if(FullPath.match(/^search\.murata\.co\.jp\/ceramy\/(?:pnsearchviewaction|catsearchviewaction|catsearchaction|icsearchresultviewaction)\.do/)){
			s.events = s.apl(s.events,"event19",",",1);
			s.events = s.apl(s.events,"event20",",",1);
			if(s.Util.getQueryParam("sKey")){s.eVar32 = s.Util.getQueryParam("sKey");}
			s.eVar40 = "ceramy::" + FullPath.replace(/^search\.murata\.co\.jp\/ceramy\/([^\.]+)\.do/,"$1");
		}

		// ProductsSearchResults (Ceramy) : backward compatible
		if(FullPath.match(/^search\.murata\.co\.jp\/ceramy\/(?:pnsearchviewaction|catsearchviewaction|catsearchaction|icsearchresultviewaction)\.do/)){
			s.events = s.apl(s.events,"event19",",",1);
			s.events = s.apl(s.events,"event20",",",1);
			if(s.Util.getQueryParam("sKey")){s.eVar32 = s.Util.getQueryParam("sKey");}
			s.eVar40 = "ceramy::" + FullPath.replace(/^search\.murata\.co\.jp\/ceramy\/([^\.]+)\.do/,"$1");
		}

		// ProductsSearchResults (psearch) : backward compatible
//		if(FullPath.match(/^(?:psearch|test-psearch)\.murata(?:\.co\.jp|\.com|\.com\.cn)\/[^\/]+\/result\//)){
//		if(FullPath.match(/^(?:psearch|test-psearch)(?:\.jp|\.en|\.cn)\.murata(?:\.co\.jp|\.com|\.com\.cn)\/[^\/]+\/result\//)){
		if(FullPath.match(/^(?:psearch|test-psearch).*\.murata(?:\.co\.jp|\.com|\.com\.cn)\/[^\/]+\/result\//)){
			s.events = s.apl(s.events,"event19",",",1);
			s.events = s.apl(s.events,"event20",",",1);
			if(s.Util.getQueryParam("pid")){s.eVar32 = s.Util.getQueryParam("pid");}
			if(s.Util.getQueryParam("i_pid")){s.eVar32 = s.Util.getQueryParam("i_pid");}
			if(s.Util.getQueryParam("cat")){s.eVar40 = "psearch::" + s.Util.getQueryParam("cat");}
		}

		// ProductsDetail (Ceramy) : backward compatible
		if(FullPath.match(/^search\.murata\.co\.jp\/ceramy\/catalogaction\.do/) && s.Util.getQueryParam("sNHinnm")){
			s.events = s.apl(s.events,"event21",",",1);
			s.events = s.apl(s.events,"event22",",",1);
			s.events = s.apl(s.events,"prodView",",",1);
			var sNHinnm = s.Util.getQueryParam("sNHinnm").toUpperCase();
			s.eVar50 = sNHinnm;
			s.prop50 = "D=v50";
			s.products = ";" + s.eVar50;
			s.pageName += "::" + s.eVar50;
		}

		// ProductsDetail (psearch) : backward compatible
//		if(FullPath.match(/^(?:psearch|test-psearch)\.murata(?:\.co\.jp|\.com|\.com\.cn)\/.*product\/[^\.]+\.html/)){
		if(FullPath.match(/^(?:psearch|test-psearch).*\.murata(?:\.co\.jp|\.com|\.com\.cn)\/.*product\/[^\.]+\.html/)){
			s.events = s.apl(s.events,"event21",",",1);
			s.events = s.apl(s.events,"event22",",",1);
			s.events = s.apl(s.events,"prodView",",",1);
			s.eVar50 = s.mrt_normarizeProductCode(FullPath.replace(/^(?:psearch|test-psearch).*\.murata(?:\.co\.jp|\.com|\.com\.cn)\/.*product\/([^\.]+)\.html/,"$1").toUpperCase());
			s.prop50 = "D=v50";
			s.products = ";" + s.eVar50;
		}

		//ProductsSearch-category (Minori)
		if(FullPath.match(/^www.murata.com\/search\/productsearch\//) && s.Util.getQueryParam("cate")){
			//ProductsSearch-keywords
			if (s.Util.getQueryParam("partno")){
				var stype = s.Util.getQueryParam("searchtype");
				var partno = s.Util.getQueryParam("partno");
				var d_partno = decodeURIComponent(partno);
				s.eVar32 = "m::" + d_partno + "::" + stype;
			}
			s.events = s.apl(s.events,"event19",",",1);
			s.events = s.apl(s.events,"event20",",",1);
			s.eVar40 = "m::" + s.Util.getQueryParam("cate");
		}

		// ProductsDetail (Minori)
		if(FullPath.match(/^www.murata.com\/products\/productdetail\//) && s.Util.getQueryParam("partno")){
			s.events = s.apl(s.events,"event21",",",1);
			s.events = s.apl(s.events,"event22",",",1);
			s.events = s.apl(s.events,"prodView",",",1);
			s.eVar50 = s.Util.getQueryParam("partno").toUpperCase() + "#";
			s.prop50 = "D=v50";
			s.products = ";" + s.eVar50;
			s.pageName += "::" + s.eVar50;
		}

		// ProductsDataSheets DL (Ceramy / other than PDF) : backward compatible
		if(FullPath.match(/^search\.murata\.co\.jp\/ceramy\/(?:catalogshowpageaction|catalogframeaction)\.do/) && s.Util.getQueryParam("sNHinnm")){
			s.events = s.apl(s.events,"event25",",",1);
			s.events = s.apl(s.events,"event26",",",1);
			var sNHinnm = s.Util.getQueryParam("sNHinnm").toUpperCase();
			s.eVar50 = sNHinnm;
			s.prop50 = "D=v50";
			s.products = ";" + s.eVar50;
			s.pageName += "::" + s.eVar50;
		}

		// WebSimSurfing : backward compatible
		if(FullPath.match(/^ds\.murata\.co\.jp\/software\/simsurfing\//)){
			s.events = s.apl(s.events,"event29",",",1);
			s.events = s.apl(s.events,"event30",",",1);
		}

		// MurataChannel
		if(FullPath.match(/^(?:www|www-dev)\.murata\.com\/about\/newsroom\/videos\/player/)){
			s.pageName += "::" + s.Util.getQueryParam("id").toLowerCase();
		}

		// Campaign Inquiry
		if(FullPath.match(/^go\.murata(?:\.co\.jp|\.com|\.com\.cn)\/.*_(?:complete|completed)\.html/)){
			s.events = s.apl(s.events,"event43",",",1);
		}

		// Form-Purpose : backward compatible
		if(s.Util.getQueryParam("g_contact_type")){
			s.c_w("s_cparam","type::" + s.Util.getQueryParam("g_contact_type"));
		}
		if(s.Util.getQueryParam("g_product_category")){
			s.c_w("s_cparam","category::" + s.Util.getQueryParam("g_product_category"));
		}

		// Job Application
		if(FullPath.match(/^www3\.ibac\.co\.jp\/[^\/]+\/2611000\/entry\/regi-008\.jsp/)){
			if(document.getElementById("aa_entry_done")){
				s.events = s.apl(s.events,"event99",",",1);
			}
		}
		if(FullPath.match(/^www3\.ibac\.co\.jp\/[^\/]+\/2611000\/mypage\/es\/es-[^\d]*002\.jsp/)){
			if(document.getElementById("aa_sheet_done")){
				s.events = s.apl(s.events,"event100",",",1);
			}
		}

		// Process PageCodes (preprocessing)
		if(FullPath.match(/^(?:www|www-dev)\.murata\.com\/contactform\/thankyou/)){
			if(s.c_r("aa_mktoForm_toi") && s.c_r("aa_mktoForm_ppc")){
				s.mrt_events = s.c_r("aa_mktoForm_toi");
				s.mrt_cfProductOfInterest = s.c_r("aa_mktoForm_ppc");
			}
		}

		// Process PageCodes
		if(s.mrt_events){
			switch (s.mrt_events){
			case "General":
				s.events = s.apl(s.events,"event36",",",1);
				s.eVar34 = "product::" + s.mrt_cfProductOfInterest;
				s.eVar49 = "D=v34";
				break;
			case "Technical":
				s.events = s.apl(s.events,"event68",",",1);
				s.eVar34 = "product::" + s.mrt_cfProductOfInterest;
				s.eVar49 = "D=v34";
				break;
			case "Quotation":
				s.events = s.apl(s.events,"event35",",",1);
				s.eVar35 = "product::" + s.mrt_cfProductOfInterest;
				s.eVar49 = "D=v35";
				break;
			case "Literature":
				s.events = s.apl(s.events,"event69",",",1);
				s.eVar34 = "product::" + s.mrt_cfProductOfInterest;
				s.eVar49 = "D=v34";
				break;
			case "sampleRequest": // backward compatible
			case "Sample":
				s.events = s.apl(s.events,"event70",",",1);
				s.eVar36 = "product::" + s.mrt_cfProductOfInterest;
				s.eVar49 = "D=v36";
				break;
			case "requestCatalog":
				s.events = s.apl(s.events,"event15",",",1);
				s.eVar36 = "product::" + s.mrt_cfProductOfInterest;
				s.eVar49 = "D=v36";
				break;
			case "requestTechnicalData":
				s.events = s.apl(s.events,"event71",",",1);
				break;
			case "catalogFormjp":
				s.events = s.apl(s.events,"event15",",",1);
				s.eVar36 = "product::" + s.mrt_events;
				s.eVar49 = "D=v36";
				break;
			case "gigafilFormjp":
				s.events = s.apl(s.events,"event36",",",1);
				s.eVar34 = "product::" + s.mrt_events;
				s.eVar49 = "D=v34";
				break;
			case "generalFormjp":
			case "complianceFormjp":
				s.events = s.apl(s.events,"event40",",",1);
				s.eVar38 = "D=pageName";
				s.eVar49 = "type::" + s.mrt_events;
				break;
			case "Web Feedback":
				s.events = s.apl(s.events,"event40",",",1);
				s.eVar38 = "type::" + s.mrt_events;
				s.eVar49 = "product::" + s.mrt_cfProductOfInterest;
				break;
			case "medicalInquiry":
				s.events = s.apl(s.events,"event103",",",1);
				s.events = s.apl(s.events,"event104",",",1);
				break;
			}
		}

		// Hierarchy
		s.hier1 = pageNameFullPath;
		s.hier2 = FullPath;

		s.plugins = "";
		s.fid = "";

		// Check Variables
		s.checkVariables("eVar73");
		s.checkEvents("eVar74");

		// Marketo Cookie ID
		var marketoCookieID;
		marketoCookieID = s.mrt_getCookie("_mkto_trk") ? s.mrt_getCookie("_mkto_trk") : "";
		if(marketoCookieID){
			s.prop58 = marketoCookieID;
			s.eVar78 = "D=c58";
		}

	} // end once
	sc_doplugin_once = false; // change flg

	// DownloadLinkHandler
	if (s.linkType == "d"){
		var dlhUrl = s.linkURL;
		if(dlhUrl){
			dlhUrl = dlhUrl.toLowerCase();
			var dlhFileName = dlhUrl.split("/")[dlhUrl.split("/").length-1];
			dlhFileName = dlhFileName.split("?")[0];

			// DesignSupportTools DL
			if(dlhFileName.match(/\.exe|\.zip|\.ashx/i) && (dlhUrl.match(/\/~\/media\/webrenewal\/tool\/(?:download(index)?|library)\/[^\/]+\/download(index)?\/[^\/]+\.ashx/) || dlhUrl.match(/\/~\/media\/webrenewal\/tool\/(?:sparameter|netlist|3dcad)\/[^\/]+\/[^\/]+\.ashx/))){
				s.linkTrackVars = "events,prop6,eVar37";
				s.linkTrackEvents = "event31,event32";
				s.eVar37 = dlhUrl;
				s.events = "event31,event32";

			// ProductRelatedFiles DL
			}else if(dlhFileName.match(/\.pdf|\.ashx/i)){
				// ProductsDataSheets DL (Ceramy) : backward compatible
				if(s.pageName.match(/^search\.murata\.co\.jp\/ceramy\/catalogaction\.do/) && s.Util.getQueryParam("sNHinnm")){
					s.linkTrackVars = "products,events,prop6";
					s.products = ";" + s.Util.getQueryParam("sNHinnm").toUpperCase();
					s.linkTrackEvents = "event25,event26";
					s.events = "event25,event26";
				// other than PDFCataglog : backward compatible
	//			}else if(s.pageName.match(/^(?:psearch|test-psearch)\.murata(?:\.co\.jp|\.com|\.com\.cn)\/[^\/]+\/result\//) || s.pageName.match(/^(?:psearch|test-psearch)\.murata(?:\.co\.jp|\.com|\.com\.cn)\/[^\/]+\/product\/[^\.]+\.html/)){
				}else if(s.pageName.match(/^(?:psearch|test-psearch).*\.murata(?:\.co\.jp|\.com|\.com\.cn)\/[^\/]+\/result\//) || s.pageName.match(/^(?:psearch|test-psearch).*\.murata(?:\.co\.jp|\.com|\.com\.cn)\/[^\/]+\/product\/[^\.]+\.html/)){
					s.linkTrackVars = "None";
					s.linkTrackEvents = "None";
					s.events = "";
				// PDFCataglog DL : backward compatible
	//			}else if(s.pageName.indexOf("murata.co.jp/products/") !== -1 || s.pageName.indexOf("search.murata.co.jp/") === 0 || s.pageName.indexOf("psearch.murata.co") !== -1 || s.pageName.indexOf("cross-reference.murata.co") !== -1 || s.pageName.indexOf("cross-reference2.murata.co") !== -1){
				}else if(s.pageName.indexOf("murata.co.jp/products/") !== -1 || s.pageName.indexOf("search.murata.co.jp/") === 0 || location.hostname.indexOf("psearch.") !== -1 || s.pageName.indexOf("cross-reference.murata.co") !== -1 || s.pageName.indexOf("cross-reference2.murata.co") !== -1){
					s.linkTrackVars = "events,prop6,eVar41";
					s.linkTrackEvents = "event17,event18";
					s.eVar41 = dlhUrl;
					s.events = "event17,event18";
				// ProductRelatedFiles DL
				}else if(dlhUrl.match(/\/~\/media\/webrenewal\/support\/library\/catalog\/products\//) || dlhUrl.match(/\/~\/media\/webrenewal\/support\/library\/selectionguide\//) || dlhUrl.match(/\/~\/media\/webrenewal\/products\//) || dlhUrl.match(/\/~\/media\/webrenewal\/faqs\/products\//) || dlhUrl.match(/\/~\/media\/webrenewal\/about\/newsroom\/tech\//)){
					s.linkTrackVars = "events,prop6,eVar41";
					s.linkTrackEvents = "event17,event18";
					s.eVar41 = dlhUrl;
					s.events = "event17,event18";
				// OtherFiles DL
				}else{
					s.linkTrackVars = "events,prop6,eVar39";
					s.linkTrackEvents = "event41";
					s.eVar39 = dlhUrl;
					s.events = "event41";
				}
			}

			dlhUrl = "";
		}
	}

	// ExitLinkHandler
	if(s.linkType == "e"){
		var elhUrl = s.linkURL;
		if(elhUrl){
			elhUrl = elhUrl.toLowerCase();

			// ThirdPartySitesLink
			if(elhUrl.indexOf("www.chip1stop.com/murata/") !== -1){
				s.linkTrackVars = "events,prop6,eVar42";
				s.linkTrackEvents = "event33,event34";
				s.eVar42 = elhUrl;
				s.events = "event33,event34";
			}

			elhUrl = "";
		}
	}

	// OtherLinkHandling
	if(s.mrt_olhFlag && s.clickObject && s.clickObject.href){
		var olURL = s.clickObject.href;
		var lhn = location.hostname;

		// RelatedSitesLink
		s.mrt_relatedSiteList = new Array();
		s.mrt_relatedSiteList =[
			"//www.murata.co.jp/",
			"//www.murata.co.jp/azumimurata/",
			"//www.murata.co.jp/fukuimurata/",
			"//www.murata.co.jp/himi/",
			"//www.murata.co.jp/iwamimurata/",
			"//www.murata.co.jp/izumomurata/",
			"//www.murata.co.jp/kanazawamurata/",
			"//www.murata.co.jp/kanazu/",
			"//www.murata.co.jp/komatsumurata/",
			"//www.murata.co.jp/komoromurata/",
			"//www.murata.co.jp/murataelectronics/english/",
			"//www.murata.co.jp/okayamamurata/",
			"//www.murata.co.jp/toyamamurata/index1.html",
			"//www.murata-ps.com/",
			"//www.muratasoftware.com/",
			"//www.murata-china.com/",
			"//www.ogakimurata.co.jp/eindex.html",
			"//www.tew.co.jp/en/",
			"//www.map-partner.co.jp/"
		];
		if(olURL.indexOf(lhn) === -1){
			var olURLAlt = olURL.replace(/\/index\.html/,"/");
			olURLAlt = olURLAlt.replace(/^(?:http:|https:)/,"");
			if(s.mrt_searchArray(olURLAlt,s.mrt_relatedSiteList,"1")){
				s.mrt_olhFlag = false;
				s.linkTrackVars = "events,prop6,eVar42";
				s.linkTrackEvents = "event38";
				s.eVar42 = olURL;
				s.events = "event38";
				s.tl(true,"o","relatedSitesLink::"+olURL);
				s.linkTrackVars = "None";
				s.linkTrackEvents = "None";
				s.mrt_olhFlag = true;
				s.abort = true;
			}
		}

		// CSV Download : backward compatible
		if(olURL.match(/(?:psearch|test-psearch).*\.murata(?:\.co\.jp|\.com|\.com\.cn)\/[^\/]+\/download\//)){
			s.mrt_olhFlag = false;
			var searchVal;
			if(s.Util.getQueryParam('pid','',olURL)){
				searchVal = s.Util.getQueryParam('pid','',olURL);
			}else if(s.Util.getQueryParam('i_pid','',olURL)){
				searchVal = s.Util.getQueryParam('i_pid','',olURL);
			}else if(document.getElementById("number_search").value){
				searchVal = document.getElementById("number_search").value;
			}
			var searchCategory = olURL.replace(/^(?:http|https):\/\/(?:psearch|test-psearch).*\.murata(?:\.co\.jp|\.com|\.com\.cn)\/([^\/]+)\/download\/.*$/,"$1");
			s.linkTrackVars = searchVal ? "events,prop6,eVar32" : "events,prop6";
			s.linkTrackEvents = "event66,event67";
			s.events = "event66,event67";
			s.eVar32 = searchVal;
			s.tl(true,"d","csvDownloadTracking::"+searchCategory);
			s.linkTrackVars = "None";
			s.linkTrackEvents = "None";
			s.mrt_getSearchConditions("p_csvdl");
			s.mrt_olhFlag = true;
			s.abort = true;
		}

		// RSSFeed
		if(olURL.match(/\/rssfeed/)){
			s.mrt_olhFlag = false;
			s.linkTrackVars = "prop6";
			s.tl(true,"o","rssfeed::"+olURL);
			s.linkTrackVars = "None";
			s.mrt_olhFlag = true;
			s.abort = true;
		}

	}

	// Adjust Events
	var cvFlg = false;
	if(s.events){
		var evArray = s.events.split(",");
		for (var i=0;i<evArray.length;i++){
			switch (evArray[i]){
			case "event15":
				s.events = s.apl(s.events,"event16",",",1);
				if(!s.eVar36){
					s.eVar36 = "D=pageName";
				}
				cvFlg = true;
				break;
			case "event35":
				if(!s.eVar35){
					s.eVar35 = "D=pageName";
				}
				cvFlg = true;
				break;
			case "event36":
				if(!s.eVar34){
					s.eVar34 = "D=pageName";
				}
				if(s.c_r("s_cparam")){
					s.eVar49 = s.c_r("s_cparam");
					s.c_w("s_cparam","");
				}
				cvFlg = true;
				break;
			case "event40":
				if(!s.eVar38){
					s.eVar38 = "D=pageName";
				}
				if(s.c_r("s_cparam")){
					s.eVar49 = s.c_r("s_cparam");
					s.c_w("s_cparam","");
				}
				cvFlg = true;
				break;
			case "event37":
			case "event39":
			case "event43":
			case "event68":
			case "event69":
			case "event70":
			case "event71":
				cvFlg = true;
				break;
			}
		}
	}

	if(cvFlg){
		s.prop21 = s.prop22 = s.prop23 = s.prop24 = s.prop25 = s.prop26 = "D=pageName";
		cvFlg = false;
	}

}

s.doPlugins = s_doPlugins;

/* Plugins Run Config */
sc_doplugin_once = true; // init

// MurataSNSLink
if(typeof jQuery !== "undefined"){
	if($(".social-utilities a")){
		$(".social-utilities a").click(function(){
			s.linkTrackVars = "events,prop6,eVar42";
			s.linkTrackEvents = "event62";
			s.events = "event62";
			s.eVar42 = $(this).attr("href");
			s.tl(true,"o","MurataSNSLink");
			s.linkTrackVars = "None";
			s.linkTrackEvents = "None";
		//s.abort = true;
		});
	}
}

// AddThis
if(typeof addthis !== "undefined"){
	function shareEventHandler(evt){
		if(evt.type == 'addthis.menu.share'){
//console.log(typeof(evt.data)); // evt.data is an object hash containing all event data
//console.log(evt.data); // evt.data is an object hash containing all event data
//console.log(evt.data.service); // evt.data.service is specific to the "addthis.menu.share" event
			if(evt.data.service){
				s.linkTrackVars = "events,prop6,eVar51";
				s.linkTrackEvents = "event61";
				s.events = "event61";
				s.eVar51 = evt.data.service;
				s.tl(true,"o","SNS Sharing::"+evt.data.service);
				s.linkTrackVars = "None";
				s.linkTrackEvents = "None";
//s.abort = true;
			}
		}
	}
	addthis.addEventListener('addthis.menu.share', shareEventHandler);
}

/*********************** UTIL FUNCTION SECTION **********************/

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * PluginPatch: s.Util.getQueryParam
 */
s.Util.getQueryParamOrg = s.Util.getQueryParam;
s.Util.getQueryParam = function() {
	var tmp = s.Util.getQueryParamOrg.apply(this, arguments);
	return tmp.split("#")[0];
};

/*
 * Plugin: aaTrackLink 1.0
 */
function aaTrackLink(pageObj){
	if(pageObj){
		var cnvType = pageObj.cnvType ? "" + pageObj.cnvType : "N/A";
		var cnvArea = pageObj.cnvArea ? "" + pageObj.cnvArea : "N/A";
		var prdCode = pageObj.prdCode ? "" + pageObj.prdCode : "N/A";
		var srhResult = pageObj.srhResult ? "" + pageObj.srhResult : "N/A";
		var srhWord = pageObj.srhWord ? "" + pageObj.srhWord : "N/A";
		prdCode = s.mrt_normarizeProductCode(prdCode);
		var aObj = pageObj.aObj ? pageObj.aObj : "N/A";
		switch(cnvType){
		// ProdcutsDetailAction
		case "contact":
		case "contact2":
		case "quote":
		case "quote2":
		case "small_lot":
		case "small_lot2":
		case "catalog_pdf":
		case "catalog_pdf2":
		case "catalog_contact":
			s.linkTrackVars = "products,events,prop6,eVar33";
			s.linkTrackEvents = "event23,event24";
			s.products = ";" + prdCode;
			s.events = "event23,event24";
			s.eVar33 = cnvType;
			s.tl(true,"o","aaTrackLink::ProdcutsDetailAction");
			s.linkTrackVars = "None";
			s.linkTrackEvents = "None";
			break;
		// ProductsDataSheets
		case "spec_data":
		case "spec_data_result":
			s.linkTrackVars = "products,prop6,events";
			s.linkTrackEvents = "event25,event26";
			s.products = ";" + prdCode;
			s.events = "event25,event26";
			s.tl(true,"o","aaTrackLink::ProductsDataSheets");
			s.linkTrackVars = "None";
			s.linkTrackEvents = "None";
			if (cnvType == "spec_data_result"){
				s.mrt_getSearchConditions("p_dsdl");
			}
			break;
		// ProductsCADdata
		case "product_data":
			s.linkTrackVars = "products,prop6,events";
			s.linkTrackEvents = "event27,event28";
			s.products = ";" + prdCode;
			s.events = "event27,event28";
			s.tl(true,"o","aaTrackLink::ProductsCADdata");
			s.linkTrackVars = "None";
			s.linkTrackEvents = "None";
			break;
		// myMurataID Creation
		case "mymurata_verify":
			s.linkTrackVars = "events,prop6";
			s.linkTrackEvents = "event37";
			s.events = "event37";
			s.tl(true,"o","aaTrackLink::myMurataID Creation");
			s.linkTrackVars = "None";
			s.linkTrackEvents = "None";
			break;
		// PrintPage
		case "print_link":
			s.linkTrackVars = "events,prop6";
			s.linkTrackEvents = "event63";
			s.events = "event63";
			s.tl(true,"o","aaTrackLink::PrintPage");
			s.linkTrackVars = "None";
			s.linkTrackEvents = "None";
			break;
		// PDFCataglog DL
		case "catalog_pdf_capacitor":
		case "catalog_pdf_general":
			return null;
			break;
		// psearchCondition
		case "psearch_condition":
			if (cnvArea == "p_detail2") {
				s.mrt_getSearchConditions(cnvArea);
			} else if (cnvArea == "p_graph") {
				s.mrt_getSearchConditions(cnvArea);
			} else {
				s.mrt_getSearchConditions("p_detail");
			}
		break;
		// minoriCondition Partnumber
		case "minori_condition":
			s.mrt_getSearchConditions("m_detail");
			break;
		// minoriCondition csvdl
		case "minori_csv_result":
			s.mrt_getSearchConditions("m_csvdl");
			break;
		// minori ItemDetails
		case "minori_spec_data":
		case "minori_part_numbers":
		case "minori_details":
			s.linkTrackVars = "products,events,prop6,eVar27";
			s.linkTrackEvents = "event25,event26";
			s.products = ";" + s.Util.getQueryParam("partno").toUpperCase() + "#";
			s.events = "event25,event26";
			s.eVar27 = cnvType;
			s.tl(true,"o","aaTrackLink::ProductsDataSheets");
			s.linkTrackVars = "None";
			s.linkTrackEvents = "None";
			break;
		case "minori_related_products":
		case "minori_miscellaneous":
			s.linkTrackVars = "products,events,prop6,eVar33";
			s.linkTrackEvents = "event23,event24";
			s.products = ";" + s.Util.getQueryParam("partno").toUpperCase() + "#";
			s.events = "event23,event24";
			s.eVar33 = cnvType;
			s.tl(true,"o","aaTrackLink::ProdcutsDetailAction");
			s.linkTrackVars = "None";
			s.linkTrackEvents = "None";
			break;
		case "minori_thirdpartysites":
			s.linkTrackVars = "events,prop6,eVar42";
			s.linkTrackEvents = "event33,event34";
			s.products = ";" + s.Util.getQueryParam("partno").toUpperCase() + "#";
			s.eVar42 = aObj.href ? aObj.href : "not_available";
			s.events = "event33,event34";
			break;

		// psearch-simsurfing graph_comparison
		case "graph_comparison":
			var i;
			var partnumber = pageObj.partnumber ? pageObj.partnumber : "N/A";
			var chara_type = pageObj.chara_type ? "" + pageObj.chara_type : "N/A";
			var parameter = pageObj.parameter ? pageObj.parameter : "N/A";
			var actionType = pageObj.actionType ? "" + pageObj.actionType : "N/A";
			s.products = "";
			var spart = partnumber.toString();
			if (spart.indexOf("#") !== -1){
				for(i=0; i< partnumber.length; i++){
					s.products += ";" + partnumber[i] + ",";
				}
			} else {
				for(i=0; i< partnumber.length; i++){
					s.products += ";" + partnumber[i] + "#,";
				}
			}
			s.products = s.products.slice(0,s.products.length-1);
			if (typeof parameter === "object"){
				var parameter2 = "|";
				$.each(parameter,function(key, value){
				parameter2 += key + ":" + value + "|";
				parameter = parameter2;
				});
			}
			s.prop53 = chara_type;
			s.eVar53 = "D=c53";
			s.prop54 = parameter;
			s.eVar54 = "D=c54";
			s.prop55 = actionType;
			s.eVar55 = "D=c55";
			// Type of button pressed
			switch (actionType){
			// Graph Comparison
			// onload
			case "onload::graph":
				s.linkTrackEvents = "event73";
				s.events = "event73";
				break;
			// Graph Action
			// CSV DL
			case "csvdl_all::graph":
			case "csvdl_all::detail":
			// PDF DL
			case "pdfdl_all::graph":
			case "pdfdl_all::detail":
			// CSV
			case "csvdl::graph":
			case "csvdl::detail":
			// print
			case "print::graph":
			case "print::detail":
			// save
			case "save::graph":
			case "save::detail":
			// copy
			case "copy::graph":
			case "copy::detail":
				s.linkTrackEvents = "event76";
				s.events = "event76";
				break;
			// Graph Setting
			case "submit::graph":
			case "submit::detail":
				s.linkTrackEvents = "event74";
				s.events = "event74";
				break;
			// Graph Preview
			case "preview::graph":
			case "preview::detail":
				s.linkTrackEvents = "event75";
				s.events = "event75";
				break;
			}
			s.linkTrackVars = "events,products,prop6,eVar53,eVar54,eVar55,prop53,prop54,prop55";
			s.tl(true,"o","aaTrackLink::graphComparison::" + actionType);
			s.linkTrackVars = "None";
			s.linkTrackEvents = "None";
			break;

/*
		// MyMurata Login
		case "mymurata_signin":
			return null;
			break;
*/
		// Medical Site Search
		case "medical_search_result":
			s.linkTrackVars = "events,eVar31";
			s.linkTrackEvents = "event101,event102";
			s.events = s.linkTrackEvents;
			s.eVar31 = "m:" + srhResult + "||" + srhWord;
			s.tl(true, "o", "aaTrackLink::medicalSearchResult");
			s.linkTrackVars = "None";
			s.linkTrackEvents = "None";
			s.eVar31 = s.events = "";
			break;
		// Capture Unexpected Values
		default:
			s.linkTrackVars = "prop74";
			s.prop74 = "cnvType:" + cnvType + "|prdCode:" + prdCode;
			s.tl(true,"o","aaTrackLink::DefaultCase");
			s.linkTrackVars = "None";
			break;
		}
	}
}


/*
 * Plugin: checkEvents
 */
s.checkEvents = function(dest){
	var eve = s.events ? s.events : "N/A";
	if(dest){
		s[dest] = eve;
		s.linkTrackVars = s.linkTrackVars ? s.linkTrackVars + "," + dest : "";
	}
};

/*
 * Plugin: checkVariables
 */
s.checkVariables = function(dest){
	var e = new Array();
	var ev = new Array();
	var p = new Array();
	var pv = new Array();
	for(var i=0;i<75;i++){
		if("eVar"+(i+1) != dest){
			e[i] = s["eVar"+(i+1)];
			if(e[i] !== "" && typeof(e[i]) !== "undefined"){
				ev.push("v"+(i+1));
			}
		}
		if("prop"+(i+1) != dest){
			p[i] = s["prop"+(i+1)];
			if(p[i] !== "" && typeof(p[i]) !== "undefined"){
				pv.push("c"+(i+1));
			}
		}
	}
	var prod = s.products ? s.products.substring(0,40).replace(/;/g,"_") : "N/A";
	var camp = s.campaign ? s.campaign : "N/A";
	if(dest){
		s[dest] = ev.toString() + "|" + pv.toString() + "|" + prod + "|" + camp;
		s.linkTrackVars = s.linkTrackVars ? s.linkTrackVars + "," + dest : "";
	}
};


/*
 * Plugin: mrt_searchArray
 */
s.mrt_searchArray = function(kw,li,ic){
	//kw:keyword
	//li:list
	//ic:set "1" to ignore case
	var res = false,chkKw,chkLi,i;
	chkKw = ic!="1" ? encodeURIComponent(kw) : encodeURIComponent(kw).toLowerCase();
	for(i=0; i<li.length; i++){
		chkLi = ic!="1" ? encodeURIComponent(li[i]) : encodeURIComponent(li[i]).toLowerCase();
		if(chkKw.indexOf(chkLi)!=-1){
			res = true;
			break;
		}
	}
	return res;
};

/*
 * Plugin: mrt_getCookie
 */
s.mrt_getCookie = function(cname){
	if(document.cookie.length > 0){
		var cArray = document.cookie.split(";");
		for(var i=0;i<cArray.length;i++){
			var cItem = cArray[i].split("=");
			cItem[0] = cItem[0].charAt(0) == " " ? cItem[0].substr(1) : cItem[0];
			if(cItem[0] == cname){
				return cItem[1];
			}
		}
	}
	return "";
};

/*
 * Plugin: mrt_normarizeProductCode 1.0
 */
s.mrt_normarizeProductCode = function(pcode){
	if(pcode){
		return pcode.replace("%23","#");
	}
};

/*
 * Plugin: mrt_getSearchConditions
 */
s.mrt_getSearchConditions = function(area){
	var i;
	switch(area){
	//psearch-simsurfing
	case "p_detail":
	case "p_detail2":
	case "p_csvdl":
	case "p_dsdl":
	case "p_graph":
		var PSparam = location.search ? location.search.replace(/^\?/,"&") + "&" : "N/A";
		s.linkTrackVars = "events,prop6,prop28,eVar28";
		s.linkTrackEvents = "event72";
		s.events = "event72";
		s.prop28 = "p::" + area + "::" + PSparam;
		s.eVar28 = "D=c28";
		s.tl(true,"o","aaTrackLink::searchCondition::" + area);
	break;
	case "m_detail":
	case "m_csvdl":
	var PSsearch = location.search;
	var PShash = location.hash;
	var d_PShash = decodeURIComponent(PShash);
		//ProductsDataSheets DL-Type(ProductsSearch-category)
		s.eVar40 = "m::" + s.Util.getQueryParam("cate");
		//ProductsSearch-settings
		var PSsplitArray = d_PShash.split("&");
		var PSsettings = "m::&";
		for(i = 0; i < PSsplitArray.length; i ++){
		PSsplitArray[i] = PSsplitArray[i].match(/(pageno|rows|lang|showcolumn)=.*/g);
			PSsettings += PSsplitArray[i] + "&" ;
			PSsettings = PSsettings.replace(/&null/,"");
		}
		s.prop29 = PSsettings;
		s.eVar29 = "D=c29";
		//ProductsSearch-conditions
		if (d_PShash.match(/&scon=([^&]+)/g)){
			var sconArray = d_PShash.match(/&scon=([^&]+)/g);
			var sconkey = "m::&";
			var sconkv = "";
			for(i = 0; i < sconArray.length; i ++){
				sconArray[i] = sconArray[i].replace(/&scon=([^&]+).*/,"$1").replace(/(@|%40)([^,]*)/g,"");
				sconkey += sconArray[i].replace(/;.+/,"") + "&" ;
				sconkv += "&" + sconArray[i].replace(/;/,"=");
			}
			s.prop28 = sconkey;
			s.eVar28 = "D=c28";
			s.list2 = sconkv;
		} else {
			//Reset
			s.prop28 = s.eVar28 = "";
			s.list2 = "";
		}
		//ProductsSearch-keywords
		if (d_PShash.match(/#.*&partno=([^&]+).*/)){
			var partno, stype;
			partno = d_PShash.replace(/#.*&partno=([^&]+).*/,"$1");
			stype = d_PShash.replace(/#.*&stype=([^&]+).*/,"$1");
			s.eVar32 = "m::" + partno + "::" + stype;
		} else {
			//Reset
			s.eVar32 = "";
		}
		//minori_csv_result
		if (area == "m_csvdl"){
			s.linkTrackEvents = "event66,event67";
			s.events = "event66,event67";
			s.tl(true,"d","csvDownloadTracking::"+ area);
		}
		//linkTrackVars
		s.linkTrackVars = "events,prop6,prop29,eVar29,eVar40";
		if (typeof s.eVar28 !=="undefined"){s.linkTrackVars += ",prop28,eVar28,list2";}
		if (typeof s.eVar32 !=="undefined"){s.linkTrackVars += ",eVar32";}
		s.linkTrackEvents = "event72";
		s.events = "event72";
		s.tl(true,"o","aaTrackLink::searchCondition::" + area);
	break;
	// Capture Unexpected Values
	default:
		s.linkTrackVars = "prop74";
		s.prop74 = "cnvType:" + cnvType;
		s.tl(true,"o","aaTrackLink::DefaultCase" + cnvType);
		s.linkTrackVars = "None";
		break;
	}
	s.linkTrackVars = "None";
	s.linkTrackEvents = "None";
};

/*
 * Plugin: AA_GET_SEARCH 1.0
 */
var AA_GET_SEARCH;
(function(AA_GET_SEARCH) {
	AA_GET_SEARCH.SearchInfo = function() {
		var iframeElem = document.getElementsByTagName("iframe");
		for(var i = 0; i < iframeElem.length; i ++){
			var iframeUrl = iframeElem[i].getAttribute("src");
			if(iframeUrl.match(/\/ssearch\/search\/result\/\?(.*&)?mss_query=/)){
				try{
					var iframeDoc = iframeElem[i].contentWindow.document;
					this.submit = iframeDoc.getElementById("mss_submit");
					this.query = iframeDoc.getElementById("mss-query");
					this.productNode = iframeDoc.getElementById("product_search");
					this.keywordSearch = iframeDoc.getElementById("keyword_search_body");
					this.url = location.href;
					this.tmpQuery = "";
					this.init();
				}catch(e){}
			}
		}
	};

	var aaGetSearch = AA_GET_SEARCH.SearchInfo.prototype;

	aaGetSearch.init = function() {
		this.gettingSearchRes();
//		this.addEvent();
	};

	aaGetSearch.gettingSearchRes = function() {
		var self = this;
		self.setBeacon();
	};

	aaGetSearch.setBeacon = function() {
		var varVal = this.getSearchRes();
		if (varVal) {
			s.linkTrackVars = "events,prop6,eVar31";
			s.linkTrackEvents = "event7,event8";
			s.eVar31 = varVal;
			s.events = "event7,event8";
			s.tl(true,"o","siteSearchResults");
			s.linkTrackVars = "None";
			s.linkTrackEvents = "None";
//console.log("sent");
		}
	};

	aaGetSearch.getSearchRes = function() {
//console.log("searching");
		var dataObj = {};
		if (this.setSearchFlag()) {
			dataObj["query"] = this.getQuery();
			dataObj["product"] = this.getProductNum();
			dataObj["google"] = this.getGoogleNum();
			if (dataObj["query"]) {
				if (this.tmpQuery !== dataObj["query"]) {
					this.tmpQuery = dataObj["query"];
					return this.createFormatData(dataObj);
				}
			}
		}
	};

	aaGetSearch.setSearchFlag = function() {
		var queryResFlag = this.query ? true : false;
		return queryResFlag;
	};

	aaGetSearch.createFormatData = function(dataObj) {
		return dataObj["product"] + ":" + dataObj["google"] + "||" + dataObj["query"];
	};

	aaGetSearch.getQuery = function() {
		return this.query.value;
	};

	aaGetSearch.getProductNum = function() {
		return this.productNode ? 1 : 0;
	};

	aaGetSearch.getGoogleNum = function() {
		return this.keywordSearch ? 1 : 0;
	};

	aaGetSearch.addEvent = function() {
		var self = this;
		this.submit.click(function() {
			self.gettingSearchRes();
			return false;
		});
	};
})(AA_GET_SEARCH || (AA_GET_SEARCH = {}));

/*
 * Plugin: DownloadLinkTrack
 * call example s.mrt_downloadLinkTrack({fileType:'DesignSupportTools',fileName:'sample-file',aObj:this})
 * 20180207
 */
s.mrt_downloadLinkTrack = function(obj){
	var fileType = obj.fileType ? obj.fileType : "";
	var fileName = obj.fileName ? obj.fileName : "";
	var aObj = obj.aObj ? obj.aObj : "";
	if(!fileName && aObj.href){fileName = aObj.href;}
	var linkName = fileName + "||" + location.href;
	switch(fileType){
	case "DesignSupportTools":
		s.linkTrackVars = "events,prop6,eVar37";
		s.linkTrackEvents = "event31,event32";
		s.eVar37 = fileName ? fileName : "";
		s.events = "event31,event32";
		s.tl(true,"d",linkName);
		break;
	case "ProductsDataSheets":
		s.linkTrackVars = "products,events,prop6";
		s.products = ";" + s.Util.getQueryParam("sNHinnm").toUpperCase();
		s.linkTrackEvents = "event25,event26";
		s.events = "event25,event26";
		s.tl(true,"d",linkName);
		break;
	case "PDFCataglog":
		s.linkTrackVars = "events,prop6,eVar41";
		s.linkTrackEvents = "event17,event18";
		s.eVar41 = fileName ? fileName : "";
		s.events = "event17,event18";
		s.tl(true,"d",linkName);
		break;
	case "ProductRelatedFiles":
		s.linkTrackVars = "events,prop6,eVar41";
		s.linkTrackEvents = "event17,event18";
		s.eVar41 = fileName ? fileName : "";
		s.events = "event17,event18";
		s.tl(true,"d",linkName);
		break;
	case "OtherFiles":
		s.linkTrackVars = "events,prop6,eVar39";
		s.linkTrackEvents = "event41";
		s.eVar39 = fileName ? fileName : "";
		s.events = "event41";
		s.tl(true,"d",linkName);
		break;
	default:
	}

	s.linkTrackVars = "None";
	s.linkTrackEvents = "None";
};

/*
 * Plugin: getTimeParting 2.0 - Set timeparting values based on time zone
 */
s.getTimeParting=new Function("t","z",""
+"var s=this,cy;dc=new Date('1/1/2000');"
+"if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}"
+"else{;z=parseFloat(z);var dsts=new Date(s.dstStart);"
+"var dste=new Date(s.dstEnd);fl=dste;cd=new Date();if(cd>dsts&&cd<fl)"
+"{z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);"
+"tz=new Date(utc + (3600000*z));thisy=tz.getFullYear();"
+"var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday',"
+"'Saturday'];if(thisy!=s.currentYear){return'Data Not Available'}else{;"
+"thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();"
+"var dow=days[thisd];var ap='AM';var dt='Weekday';var mint='00';"
+"if(thismin>30){mint='30'}if(thish>=12){ap='PM';thish=thish-12};"
+"if (thish==0){thish=12};if(thisd==6||thisd==0){dt='Weekend'};"
+"var timestring=thish+':'+mint+ap;if(t=='h'){return timestring}"
+"if(t=='d'){return dow};if(t=='w'){return dt}}};");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * Plugin: getPercentPageViewed v1.71
 */
s.getPercentPageViewed=new Function("n",""
+"var s=this,W=window,EL=W.addEventListener,AE=W.attachEvent,E=['load"
+"','unload','scroll','resize','zoom','keyup','mouseup','touchend','o"
+"rientationchange','pan'];W.s_Obj=s;s_PPVid=(n=='-'?s.pageName:n)||s"
+".pageName||location.href;if(!W.s_PPVevent){s.s_PPVg=function(n,r){v"
+"ar k='s_ppv',p=k+'l',c=s.c_r(n||r?k:p),a=c.indexOf(',')>-1?c.split("
+"',',10):[''],l=a.length,i;a[0]=unescape(a[0]);r=r||(n&&n!=a[0])||0;"
+"a.length=10;if(typeof a[0]!='string')a[0]='';for(i=1;i<10;i++)a[i]="
+"!r&&i<l?parseInt(a[i])||0:0;if(l<10||typeof a[9]!='string')a[9]='';"
+"if(r){s.c_w(p,c);s.c_w(k,'?')}return a};W.s_PPVevent=function(e){va"
+"r W=window,D=document,B=D.body,E=D.documentElement,S=window.screen|"
+"|0,Ho='offsetHeight',Hs='scrollHeight',Ts='scrollTop',Wc='clientWid"
+"th',Hc='clientHeight',C=100,M=Math,J='object',N='number',s=W.s_Obj|"
+"|W.s||0;e=e&&typeof e==J?e.type||'':'';if(!e.indexOf('on'))e=e.subs"
+"tring(2);s_PPVi=W.s_PPVi||0;if(W.s_PPVt&&!e){clearTimeout(s_PPVt);s"
+"_PPVt=0;if(s_PPVi<2)s_PPVi++}if(typeof s==J){var h=M.max(B[Hs]||E[H"
+"s],B[Ho]||E[Ho],B[Hc]||E[Hc]),X=W.innerWidth||E[Wc]||B[Wc]||0,Y=W.i"
+"nnerHeight||E[Hc]||B[Hc]||0,x=S?S.width:0,y=S?S.height:0,r=M.round("
+"C*(W.devicePixelRatio||1))/C,b=(D.pageYOffset||E[Ts]||B[Ts]||0)+Y,p"
+"=h>0&&b>0?M.round(C*b/h):0,O=W.orientation,o=!isNaN(O)?M.abs(o)%180"
+":Y>X?0:90,L=e=='load'||s_PPVi<1,a=s.s_PPVg(s_PPVid,L),V=function(i,"
+"v,f,n){i=parseInt(typeof a==J&&a.length>i?a[i]:'0')||0;v=typeof v!="
+"N?i:v;v=f||v>i?v:i;return n?v:v>C?C:v<0?0:v};if(new RegExp('(iPod|i"
+"Pad|iPhone)').exec(navigator.userAgent||'')&&o){o=x;x=y;y=o}o=o?'P'"
+":'L';a[9]=L?'':a[9].substring(0,1);s.c_w('s_ppv',escape(W.s_PPVid)+"
+"','+V(1,p,L)+','+(L||!V(2)?p:V(2))+','+V(3,b,L,1)+','+X+','+Y+','+x"
+"+','+y+','+r+','+a[9]+(a[9]==o?'':o))}if(!W.s_PPVt&&e!='unload')W.s"
+"_PPVt=setTimeout(W.s_PPVevent,333)};for(var f=W.s_PPVevent,i=0;i<E."
+"length;i++)if(EL)EL(E[i],f,false);else if(AE)AE('on'+E[i],f);f()};v"
+"ar a=s.s_PPVg();return!n||n=='-'?a[1]:a");

/********************** Utility PLUGINS SECTION *********************/
/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");

/* might not be used */
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");

/*
 * Utility Function: p_gh v0.8
 */
/*
s.p_gh=new Function("",""
+"var s=this;if(!s.eo&&!s.lnk)return'';var o=s.eo?s.eo:s.lnk,y=s.ot(o"
+"),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o"
+"=o.parentElement?o.parentElement:o.parentNode;if(!o)return'';y=s.ot"
+"(o);n=s.oid(o);x=o.s_oidt;}}return o?o:'';");
*/

/*
 * Utility Function: split v1.5
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Utility Function: repl : might not be used
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Utility Function: join : might not be used
 */
s.join=new Function("v","p",""
+"var s=this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/****************************** MODULES *****************************/
/* Module: Media */

/* AppMeasurement_Module_Integrate */
function AppMeasurement_Module_Integrate(l){var c=this;c.s=l;var e=window;e.s_c_in||(e.s_c_il=[],e.s_c_in=0);c._il=e.s_c_il;c._in=e.s_c_in;c._il[c._in]=c;e.s_c_in++;c._c="s_m";c.list=[];c.add=function(d,b){var a;b||(b="s_Integrate_"+d);e[b]||(e[b]={});a=c[d]=e[b];a.a=d;a.e=c;a._c=0;a._d=0;void 0==a.disable&&(a.disable=0);a.get=function(b,d){var f=document,h=f.getElementsByTagName("HEAD"),k;if(!a.disable&&(d||(v="s_"+c._in+"_Integrate_"+a.a+"_get_"+a._c),a._c++,a.VAR=v,a.CALLBACK="s_c_il["+c._in+"]."+
a.a+".callback",a.delay(),h=h&&0<h.length?h[0]:f.body))try{k=f.createElement("SCRIPT"),k.type="text/javascript",k.setAttribute("async","async"),k.src=c.c(a,b),0>b.indexOf("[CALLBACK]")&&(k.onload=k.onreadystatechange=function(){a.callback(e[v])}),h.firstChild?h.insertBefore(k,h.firstChild):h.appendChild(k)}catch(l){}};a.callback=function(b){var c;if(b)for(c in b)Object.prototype[c]||(a[c]=b[c]);a.ready()};a.beacon=function(b){var d="s_i_"+c._in+"_Integrate_"+a.a+"_"+a._c;a.disable||(a._c++,d=e[d]=
new Image,d.src=c.c(a,b))};a.script=function(b){a.get(b,1)};a.delay=function(){a._d++};a.ready=function(){a._d--;a.disable||l.delayReady()};c.list.push(d)};c._g=function(d){var b,a=(d?"use":"set")+"Vars";for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&b[a])try{b[a](l,b)}catch(e){}};c._t=function(){c._g(1)};c._d=function(){var d,b;for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&0<b._d)return 1;return 0};c.c=function(c,b){var a,e,g,f;"http"!=b.toLowerCase().substring(0,4)&&
(b="http://"+b);l.ssl&&(b=l.replace(b,"http:","https:"));c.RAND=Math.floor(1E13*Math.random());for(a=0;0<=a;)a=b.indexOf("[",a),0<=a&&(e=b.indexOf("]",a),e>a&&(g=b.substring(a+1,e),2<g.length&&"s."==g.substring(0,2)?(f=l[g.substring(2)])||(f=""):(f=""+c[g],f!=c[g]&&parseFloat(f)!=c[g]&&(g=0)),g&&(b=b.substring(0,a)+encodeURIComponent(f)+b.substring(e+1)),a=e));return b}}

/* AppMeasurement_Module_Media */
function AppMeasurement_Module_Media(q){var b=this;b.s=q;q=window;q.s_c_in||(q.s_c_il=[],q.s_c_in=0);b._il=q.s_c_il;b._in=q.s_c_in;b._il[b._in]=b;q.s_c_in++;b._c="s_m";b.list=[];b.open=function(d,c,e,k){var f={},a=new Date,l="",g;c||(c=-1);if(d&&e){b.list||(b.list={});b.list[d]&&b.close(d);k&&k.id&&(l=k.id);if(l)for(g in b.list)!Object.prototype[g]&&b.list[g]&&b.list[g].R==l&&b.close(b.list[g].name);f.name=d;f.length=c;f.offset=0;f.e=0;f.playerName=b.playerName?b.playerName:e;f.R=l;f.C=0;f.a=0;f.timestamp=
Math.floor(a.getTime()/1E3);f.k=0;f.u=f.timestamp;f.c=-1;f.n="";f.g=-1;f.D=0;f.I={};f.G=0;f.m=0;f.f="";f.B=0;f.L=0;f.A=0;f.F=0;f.l=!1;f.v="";f.J="";f.K=0;f.r=!1;f.H="";f.complete=0;f.Q=0;f.p=0;f.q=0;b.list[d]=f}};b.openAd=function(d,c,e,k,f,a,l,g){var h={};b.open(d,c,e,g);if(h=b.list[d])h.l=!0,h.v=k,h.J=f,h.K=a,h.H=l};b.M=function(d){var c=b.list[d];b.list[d]=0;c&&c.monitor&&clearTimeout(c.monitor.interval)};b.close=function(d){b.i(d,0,-1)};b.play=function(d,c,e,k){var f=b.i(d,1,c,e,k);f&&!f.monitor&&
(f.monitor={},f.monitor.update=function(){1==f.k&&b.i(f.name,3,-1);f.monitor.interval=setTimeout(f.monitor.update,1E3)},f.monitor.update())};b.click=function(d,c){b.i(d,7,c)};b.complete=function(d,c){b.i(d,5,c)};b.stop=function(d,c){b.i(d,2,c)};b.track=function(d){b.i(d,4,-1)};b.P=function(d,c){var e="a.media.",k=d.linkTrackVars,f=d.linkTrackEvents,a="m_i",l,g=d.contextData,h;c.l&&(e+="ad.",c.v&&(g["a.media.name"]=c.v,g[e+"pod"]=c.J,g[e+"podPosition"]=c.K),c.G||(g[e+"CPM"]=c.H));c.r&&(g[e+"clicked"]=
!0,c.r=!1);g["a.contentType"]="video"+(c.l?"Ad":"");g["a.media.channel"]=b.channel;g[e+"name"]=c.name;g[e+"playerName"]=c.playerName;0<c.length&&(g[e+"length"]=c.length);g[e+"timePlayed"]=Math.floor(c.a);0<Math.floor(c.a)&&(g[e+"timePlayed"]=Math.floor(c.a));c.G||(g[e+"view"]=!0,a="m_s",b.Heartbeat&&b.Heartbeat.enabled&&(a=c.l?b.__primetime?"mspa_s":"msa_s":b.__primetime?"msp_s":"ms_s"),c.G=1);c.f&&(g[e+"segmentNum"]=c.m,g[e+"segment"]=c.f,0<c.B&&(g[e+"segmentLength"]=c.B),c.A&&0<c.a&&(g[e+"segmentView"]=
!0));!c.Q&&c.complete&&(g[e+"complete"]=!0,c.S=1);0<c.p&&(g[e+"milestone"]=c.p);0<c.q&&(g[e+"offsetMilestone"]=c.q);if(k)for(h in g)Object.prototype[h]||(k+=",contextData."+h);l=g["a.contentType"];d.pe=a;d.pev3=l;var q,s;if(b.contextDataMapping)for(h in d.events2||(d.events2=""),k&&(k+=",events"),b.contextDataMapping)if(!Object.prototype[h]){a=h.length>e.length&&h.substring(0,e.length)==e?h.substring(e.length):"";l=b.contextDataMapping[h];if("string"==typeof l)for(q=l.split(","),s=0;s<q.length;s++)l=
q[s],"a.contentType"==h?(k&&(k+=","+l),d[l]=g[h]):"view"==a||"segmentView"==a||"clicked"==a||"complete"==a||"timePlayed"==a||"CPM"==a?(f&&(f+=","+l),"timePlayed"==a||"CPM"==a?g[h]&&(d.events2+=(d.events2?",":"")+l+"="+g[h]):g[h]&&(d.events2+=(d.events2?",":"")+l)):"segment"==a&&g[h+"Num"]?(k&&(k+=","+l),d[l]=g[h+"Num"]+":"+g[h]):(k&&(k+=","+l),d[l]=g[h]);else if("milestones"==a||"offsetMilestones"==a)h=h.substring(0,h.length-1),g[h]&&b.contextDataMapping[h+"s"][g[h]]&&(f&&(f+=","+b.contextDataMapping[h+
"s"][g[h]]),d.events2+=(d.events2?",":"")+b.contextDataMapping[h+"s"][g[h]]);g[h]&&(g[h]=0);"segment"==a&&g[h+"Num"]&&(g[h+"Num"]=0)}d.linkTrackVars=k;d.linkTrackEvents=f};b.i=function(d,c,e,k,f){var a={},l=(new Date).getTime()/1E3,g,h,q=b.trackVars,s=b.trackEvents,t=b.trackSeconds,u=b.trackMilestones,v=b.trackOffsetMilestones,w=b.segmentByMilestones,x=b.segmentByOffsetMilestones,p,n,r=1,m={},y;b.channel||(b.channel=b.s.w.location.hostname);if(a=d&&b.list&&b.list[d]?b.list[d]:0)if(a.l&&(t=b.adTrackSeconds,
u=b.adTrackMilestones,v=b.adTrackOffsetMilestones,w=b.adSegmentByMilestones,x=b.adSegmentByOffsetMilestones),0>e&&(e=1==a.k&&0<a.u?l-a.u+a.c:a.c),0<a.length&&(e=e<a.length?e:a.length),0>e&&(e=0),a.offset=e,0<a.length&&(a.e=a.offset/a.length*100,a.e=100<a.e?100:a.e),0>a.c&&(a.c=e),y=a.D,m.name=d,m.ad=a.l,m.length=a.length,m.openTime=new Date,m.openTime.setTime(1E3*a.timestamp),m.offset=a.offset,m.percent=a.e,m.playerName=a.playerName,m.mediaEvent=0>a.g?"OPEN":1==c?"PLAY":2==c?"STOP":3==c?"MONITOR":
4==c?"TRACK":5==c?"COMPLETE":7==c?"CLICK":"CLOSE",2<c||c!=a.k&&(2!=c||1==a.k)){f||(k=a.m,f=a.f);if(c){1==c&&(a.c=e);if((3>=c||5<=c)&&0<=a.g&&(r=!1,q=s="None",a.g!=e)){h=a.g;h>e&&(h=a.c,h>e&&(h=e));p=u?u.split(","):0;if(0<a.length&&p&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h/a.length*100<g&&a.e>=g&&(r=!0,n=p.length,m.mediaEvent="MILESTONE",a.p=m.milestone=g);if((p=v?v.split(","):0)&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h<g&&e>=g&&(r=!0,n=p.length,m.mediaEvent=
"OFFSET_MILESTONE",a.q=m.offsetMilestone=g)}if(a.L||!f){if(w&&u&&0<a.length){if(p=u.split(","))for(p.push("100"),n=h=0;n<p.length;n++)if(g=p[n]?parseFloat(""+p[n]):0)a.e<g&&(k=n+1,f="M:"+h+"-"+g,n=p.length),h=g}else if(x&&v&&(p=v.split(",")))for(p.push(""+(0<a.length?a.length:"E")),n=h=0;n<p.length;n++)if((g=p[n]?parseFloat(""+p[n]):0)||"E"==p[n]){if(e<g||"E"==p[n])k=n+1,f="O:"+h+"-"+g,n=p.length;h=g}f&&(a.L=!0)}(f||a.f)&&f!=a.f&&(a.F=!0,a.f||(a.m=k,a.f=f),0<=a.g&&(r=!0));(2<=c||100<=a.e)&&a.c<e&&
(a.C+=e-a.c,a.a+=e-a.c);if(2>=c||3==c&&!a.k)a.n+=(1==c||3==c?"S":"E")+Math.floor(e),a.k=3==c?1:c;!r&&0<=a.g&&3>=c&&(t=t?t:0)&&a.a>=t&&(r=!0,m.mediaEvent="SECONDS");a.u=l;a.c=e}if(!c||3>=c&&100<=a.e)2!=a.k&&(a.n+="E"+Math.floor(e)),c=0,q=s="None",m.mediaEvent="CLOSE";7==c&&(r=m.clicked=a.r=!0);if(5==c||b.completeByCloseOffset&&(!c||100<=a.e)&&0<a.length&&e>=a.length-b.completeCloseOffsetThreshold)r=m.complete=a.complete=!0;l=m.mediaEvent;"MILESTONE"==l?l+="_"+m.milestone:"OFFSET_MILESTONE"==l&&(l+=
"_"+m.offsetMilestone);a.I[l]?m.eventFirstTime=!1:(m.eventFirstTime=!0,a.I[l]=1);m.event=m.mediaEvent;m.timePlayed=a.C;m.segmentNum=a.m;m.segment=a.f;m.segmentLength=a.B;b.monitor&&4!=c&&b.monitor(b.s,m);b.Heartbeat&&b.Heartbeat.enabled&&0<=a.g&&(r=!1);0==c&&b.M(d);r&&a.D==y&&(d={contextData:{}},d.linkTrackVars=q,d.linkTrackEvents=s,d.linkTrackVars||(d.linkTrackVars=""),d.linkTrackEvents||(d.linkTrackEvents=""),b.P(d,a),d.linkTrackVars||(d["!linkTrackVars"]=1),d.linkTrackEvents||(d["!linkTrackEvents"]=
1),b.s.track(d),a.F?(a.m=k,a.f=f,a.A=!0,a.F=!1):0<a.a&&(a.A=!1),a.n="",a.p=a.q=0,a.a-=Math.floor(a.a),a.g=e,a.D++)}return a};b.O=function(d,c,e,k,f){var a=0;if(d&&(!b.autoTrackMediaLengthRequired||c&&0<c)){if(b.list&&b.list[d])a=1;else if(1==e||3==e)b.open(d,c,"HTML5 Video",f),a=1;a&&b.i(d,e,k,-1,0)}};b.attach=function(d){var c,e,k;d&&d.tagName&&"VIDEO"==d.tagName.toUpperCase()&&(b.o||(b.o=function(c,a,d){var e,h;b.autoTrack&&(e=c.currentSrc,(h=c.duration)||(h=-1),0>d&&(d=c.currentTime),b.O(e,h,a,
d,c))}),c=function(){b.o(d,1,-1)},e=function(){b.o(d,1,-1)},b.j(d,"play",c),b.j(d,"pause",e),b.j(d,"seeking",e),b.j(d,"seeked",c),b.j(d,"ended",function(){b.o(d,0,-1)}),b.j(d,"timeupdate",c),k=function(){d.paused||d.ended||d.seeking||b.o(d,3,-1);setTimeout(k,1E3)},k())};b.j=function(b,c,e){b.attachEvent?b.attachEvent("on"+c,e):b.addEventListener&&b.addEventListener(c,e,!1)};void 0==b.completeByCloseOffset&&(b.completeByCloseOffset=1);void 0==b.completeCloseOffsetThreshold&&(b.completeCloseOffsetThreshold=
1);b.Heartbeat={};b.N=function(){var d,c;if(b.autoTrack&&(d=b.s.d.getElementsByTagName("VIDEO")))for(c=0;c<d.length;c++)b.attach(d[c])};b.j(q,"load",b.N)}


/*
 Start ActivityMap Module

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(f){function g(a,d){var b,c,n;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<b.length&&(c=b[n++]);)if(-1<a.indexOf(c))return null;p=1;return a}function q(a,d,b,c,e){var g,h;if(a.dataset&&(h=a.dataset[d]))g=h;else if(a.getAttribute)if(h=a.getAttribute("data-"+b))g=h;else if(h=a.getAttribute(b))g=h;if(!g&&f.useForcedLinkTracking&&e&&(g="",d=a.onclick?""+a.onclick:"")){b=d.indexOf(c);var l,k;if(0<=b){for(b+=10;b<d.length&&0<="= \t\r\n".indexOf(d.charAt(b));)b++;
if(b<d.length){h=b;for(l=k=0;h<d.length&&(";"!=d.charAt(h)||l);)l?d.charAt(h)!=l||k?k="\\"==d.charAt(h)?!k:0:l=0:(l=d.charAt(h),'"'!=l&&"'"!=l&&(l=0)),h++;if(d=d.substring(b,h))a.e=new Function("s","var e;try{s.w."+c+"="+d+"}catch(e){}"),a.e(f)}}}return g||e&&f.w[c]}function r(a,d,b){var c;return(c=e[d](a,b))&&(p?(p=0,c):g(k(c),e[d+"Exclusions"]))}function s(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&t[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||
b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)s(c[a],d,b)}function k(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
"mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=f;var m=window;m.s_c_in||(m.s_c_il=[],m.s_c_in=0);e._il=m.s_c_il;e._in=m.s_c_in;e._il[e._in]=e;m.s_c_in++;e._c="s_m";e.c={};var p=0,t={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=f.contextData,e=f.linkObject;(a=f.pageName||f.pageURL)&&(d=r(e,"link",f.linkName))&&(b=r(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,
255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,127):b,c["a.activitymap.pageIDType"]=f.pageName?1:0)};e.link=function(a,d){var b;if(d)b=g(k(d),e.linkExclusions);else if((b=a)&&!(b=q(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=g(k(a.innerText||a.textContent),e.linkExclusions))||(s(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=g(k(c.join(""))))||(f=g(k(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():
"")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(k(a.value)):a.src&&"IMAGE"==c&&(f=g(k(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=q(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 1.6.1
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(){var a=this;a.version="1.6.1";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var q=k.AppMeasurement.Cb;q||(q=null);var r=k,n,t;try{for(n=r.parent,t=r.location;n&&n.location&&t&&""+n.location!=""+t&&r.location&&""+n.location!=""+r.location&&n.location.host==t.host;)r=n,n=r.parent}catch(u){}a.sb=function(a){try{console.log(a)}catch(b){}};a.Da=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.kb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.cookieDomain&&
!/^[0-9.]+$/.test(c)&&(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.cookieDomain=0<d?c.substring(d):c}return a.cookieDomain};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.kb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=
e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=c+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.H=[];a.ea=function(c,b,d){if(a.wa)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,m=["webkitvisibilitychange","visibilitychange"];
g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.fa)for(a.fa=1,d=0;d<m.length;d++)a.d.addEventListener(m[d],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&(a.fa=0,a.delayReady())});f=1;e=0}else d||a.l("_d")&&(f=1);f&&(a.H.push({m:c,a:b,t:e}),a.fa||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.l("_d")?b=1:a.qa();0<a.H.length;){d=a.H.shift();if(b&&!d.t&&d.t>c){a.H.unshift(d);setTimeout(a.delayReady,
parseInt(a.maxDelay/2));break}a.wa=1;a[d.m].apply(a,d.a);a.wa=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ea("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,m="";e=f="";if(a.lightProfileID)d=a.L,(m=a.lightTrackVars)&&(m=","+m+","+a.ja.join(",")+",");else{d=a.e;if(a.pe||a.linkType)m=a.linkTrackVars,
f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(m=a[e].Bb,f=a[e].Ab));m&&(m=","+m+","+a.C.join(",")+",");f&&m&&(m+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!m||0<=m.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.p=function(c,b,d,f,e){var g="",m,p,k,w,n=0;"contextData"==c&&(c="c");if(b){for(m in b)if(!(Object.prototype[m]||e&&m.substring(0,e.length)!=e)&&b[m]&&(!d||0<=d.indexOf(","+(f?f+".":"")+m+","))){k=!1;if(n)for(p=
0;p<n.length;p++)m.substring(0,n[p].length)==n[p]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),p=b[m],e&&(m=m.substring(e.length)),0<m.length))if(k=m.indexOf("."),0<k)p=m.substring(0,k),k=(e?e:"")+p+".",n||(n=[]),n.push(k),g+=a.p(p,b,d,f,k);else if("boolean"==typeof p&&(p=p?"true":"false"),p){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=m.substring(0,4),w=m.substring(4),m){case "transactionID":m="xact";break;case "channel":m="ch";break;case "campaign":m="v0";break;default:a.Da(w)&&("prop"==
k?m="c"+w:"eVar"==k?m="v"+w:"list"==k?m="l"+w:"hier"==k&&(m="h"+w,p=p.substring(0,255)))}g+="&"+a.escape(m)+"="+a.escape(p)}}""!=g&&(g+="&."+c)}return g};a.mb=function(){var c="",b,d,f,e,g,m,p,k,n="",r="",s=e="";if(a.lightProfileID)b=a.L,(n=a.lightTrackVars)&&(n=","+n+","+a.ja.join(",")+",");else{b=a.e;if(a.pe||a.linkType)n=a.linkTrackVars,r=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(n=a[e].Bb,r=a[e].Ab));n&&(n=","+n+","+a.C.join(",")+",");r&&(r=","+r+",",
n&&(n+=",events,"));a.events2&&(s+=(""!=s?",":"")+a.events2)}if(a.visitor&&1.5<=parseFloat(a.visitor.version)&&a.visitor.getCustomerIDs){e=q;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState));e&&(c+=a.p("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.p("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);m=e.substring(4);!g&&
"events"==e&&s&&(g=s,s="");if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,
255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e=
"cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":s&&(g+=(""!=g?",":"")+s);if(r)for(m=
g.split(","),g="",f=0;f<m.length;f++)p=m[f],k=p.indexOf("="),0<=k&&(p=p.substring(0,k)),k=p.indexOf(":"),0<=k&&(p=p.substring(0,k)),0<=r.indexOf(","+p+",")&&(g+=(g?",":"")+m[f]);break;case "events2":g="";break;case "contextData":c+=a.p("c",a[e],n,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e=
"mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.p("mts",a[e],n,e));g="";break;default:a.Da(m)&&("prop"==f?e="c"+m:"eVar"==f?e="v"+m:"list"==f?e="l"+m:"hier"==f&&(e="h"+m,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.c&&(c+=a.c)}return c};a.B=function(a){var b=a.tagName;if("undefined"!=""+a.Fb||"undefined"!=""+a.wb&&"HTML"!=(""+a.wb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||
"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.za=function(a){var b=a.href?a.href:"",d,f,e;d=b.indexOf(":");f=b.indexOf("?");e=b.indexOf("/");b&&(0>d||0<=f&&d>f||0<=e&&d>e)&&(f=a.protocol&&1<a.protocol.length?a.protocol:l.protocol?l.protocol:"",d=l.pathname.lastIndexOf("/"),b=(f?f+"//":"")+(a.host?a.host:l.host?l.host:"")+("/"!=h.substring(0,1)?l.pathname.substring(0,0>d?0:d)+"/":"")+b);return b};a.I=function(c){var b=a.B(c),d,f,e="",g=0;return b&&
(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):c.src&&"IMAGE"==b&&(e=c.src):e=a.za(c),e)?{id:e.substring(0,100),type:g}:0};a.Db=function(c){for(var b=a.B(c),d=a.I(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.B(c),d=a.I(c);
d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.vb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,m;a.ka=1;d||(a.ka=0,d=a.clickObject);if(d){c=a.B(d);for(b=a.I(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.B(d),b=a.I(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var p=d.onclick?""+d.onclick:"";if(0<=p.indexOf(".tl(")||0<=p.indexOf(".trackLink("))d=0}}else a.ka=1;!e&&d&&(e=a.za(d));e&&
!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var n=0,r=0,q;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(p=e.toLowerCase(),g=p.indexOf("?"),m=p.indexOf("#"),0<=g?0<=m&&m<g&&(g=m):g=m,0<=g&&(p=p.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),m=0;m<g.length;m++)(q=g[m])&&p.substring(p.length-(q.length+1))=="."+q&&(f="d");if(a.trackExternalLinks&&!f&&(p=e.toLowerCase(),a.Ca(p)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),
g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),n=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(m=0;m<g.length;m++)q=g[m],0<=p.indexOf(q)&&(r=1);r?n&&(f="e"):n||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.c="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.c="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+
"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.nb=function(){var c=a.ka,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,m,p,k,e=0;if(g)for(m=0;m<g.length;m++)p=g[m].split("="),f=a.unescape(p[0]).split(","),p=a.unescape(p[1]),
b[p]=f;f=a.account.split(",");m={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(m[k]=a.contextData[k],a.contextData[k]="");a.c=a.p("c",m)+(a.c?a.c:"");if(c||a.c){c&&!a.c&&(e=1);for(p in b)if(!Object.prototype[p])for(k=0;k<f.length;k++)for(e&&(g=b[p].join(","),g==a.account&&(a.c+=("&"!=p.charAt(0)?"&":"")+p,b[p]=[],d=1)),m=0;m<b[p].length;m++)g=b[p][m],g==f[k]&&(e&&(a.c+="&u="+a.escape(g)+("&"!=p.charAt(0)?"&":"")+p+"&u=0"),b[p].splice(m,1),d=1);c||(d=1);if(d){e=
"";m=2;!c&&a.c&&(e=a.escape(f.join(","))+"="+a.escape(a.c),m=1);for(p in b)!Object.prototype[p]&&0<m&&0<b[p].length&&(e+=(e?"&":"")+a.escape(b[p].join(","))+"="+a.escape(p),m--);a.cookieWrite("s_sq",e)}}}return c};a.ob=function(){if(!a.zb){var c=new Date,b=r.location,d,f,e=f=d="",g="",m="",k="1.2",n=a.cookieWrite("s_cc","true",0)?"Y":"N",q="",s="";if(c.setUTCDate&&(k="1.3",(0).toPrecision&&(k="1.5",c=[],c.forEach))){k="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(k="1.7",c.reduce&&(k="1.8",k.trim&&
(k="1.8.1",Date.parse&&(k="1.8.2",Object.create&&(k="1.8.5")))))}catch(t){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;m=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),q=a.b.Eb(b)?"Y":"N"}catch(u){}try{a.b.addBehavior("#default#clientCaps"),s=a.b.connectionType}catch(x){}a.resolution=d;a.colorDepth=
f;a.javascriptVersion=k;a.javaEnabled=e;a.cookiesEnabled=n;a.browserWidth=g;a.browserHeight=m;a.connectionType=s;a.homepage=q;a.zb=1}};a.M={};a.loadModule=function(c,b){var d=a.M[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.M[c]=a[c]=d;d.Sa=function(){return d.Wa};d.Xa=function(b){if(d.Wa=b)a[c+"_onLoad"]=b,a.ea(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.Sa,set:d.Xa}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=
b,a.ea(c+"_onLoad",[a,d],1)||b(a,d))};a.l=function(c){var b,d;for(b in a.M)if(!Object.prototype[b]&&(d=a.M[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.qb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>v)return 0}return 1};a.N=function(c,b){var d,
f,e,g,m,k;for(d=0;2>d;d++)for(f=0<d?a.ra:a.e,e=0;e<f.length;e++)if(g=f[e],(m=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(k in a[g])m[k]||(m[k]=a[g][k]);a[g]=m}};a.La=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.ra:a.e,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.ib=function(a){var b,d,f,e,g,k=0,p,n="",q="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(p=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,
7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?k=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(k=",p,ei,"),k&&p)))){if((a=p.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=k.indexOf(","+e.substring(0,d)+",")?n+=(n?"&":"")+e:q+=(q?"&":"")+e;n&&q?p=n+"&"+q:q=""}d=253-(p.length-q.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+p}return a};a.Ra=function(c){var b=
a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.aa=!1;a.F=!1;a.Za=function(){a.F=!0;a.i()};a.Y=!1;a.R=!1;a.Va=function(c){a.marketingCloudVisitorID=c;a.R=!0;a.i()};a.ba=!1;a.S=!1;a.$a=function(c){a.visitorOptedOut=c;a.S=!0;a.i()};a.V=!1;a.O=!1;a.Na=function(c){a.analyticsVisitorID=
c;a.O=!0;a.i()};a.X=!1;a.Q=!1;a.Pa=function(c){a.audienceManagerLocationHint=c;a.Q=!0;a.i()};a.W=!1;a.P=!1;a.Oa=function(c){a.audienceManagerBlob=c;a.P=!0;a.i()};a.Qa=function(c){a.maxDelay||(a.maxDelay=250);return a.l("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.Z=!1;a.D=!1;a.qa=function(){a.D=!0;a.i()};a.isReadyToTrack=function(){var c=!0,b=a.visitor;a.aa||a.F||(a.Ra(a.Za)?a.F=!0:a.aa=!0);if(a.aa&&!a.F)return!1;b&&b.isAllowed()&&(a.Y||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||
(a.Y=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.Va]),a.marketingCloudVisitorID&&(a.R=!0)),a.ba||a.visitorOptedOut||!b.isOptedOut||(a.ba=!0,a.visitorOptedOut=b.isOptedOut([a,a.$a]),a.visitorOptedOut!=q&&(a.S=!0)),a.V||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.V=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Na]),a.analyticsVisitorID&&(a.O=!0)),a.X||a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.X=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,
a.Pa]),a.audienceManagerLocationHint&&(a.Q=!0)),a.W||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.W=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Oa]),a.audienceManagerBlob&&(a.P=!0)),a.Y&&!a.R&&!a.marketingCloudVisitorID||a.V&&!a.O&&!a.analyticsVisitorID||a.X&&!a.Q&&!a.audienceManagerLocationHint||a.W&&!a.P&&!a.audienceManagerBlob||a.ba&&!a.S)&&(c=!1);a.Z||a.D||(a.Qa(a.qa)?a.D=!0:a.Z=!0);a.Z&&!a.D&&(c=!1);return c};a.k=q;a.q=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};
f.eb=c;f.cb=b;f.ab=d;a.k==q&&(a.k=[]);a.k.push(f);0==a.q&&(a.q=setInterval(a.i,100))};a.i=function(){var c;if(a.isReadyToTrack()&&(a.Ya(),a.k!=q))for(;0<a.k.length;)c=a.k.shift(),c.cb.apply(c.eb,c.ab)};a.Ya=function(){a.q&&(clearInterval(a.q),a.q=0)};a.Ta=function(c){var b,d,f=q,e=q;if(!a.isReadyToTrack()){b=[];if(c!=q)for(d in f={},c)f[d]=c[d];e={};a.La(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.lb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;
var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+
f.getDay()+" "+f.getTimezoneOffset());a.visitor&&(a.visitor.jb&&(a.authState=a.visitor.jb()),!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)));a.l("_s");a.Ta(c)||(b&&a.N(b),c&&(d={},a.La(d,0),a.N(c)),a.qb()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.lb()),a.vb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&
(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Ma||(a.referrer=r.document.referrer),a.Ma=1,a.referrer=a.ib(a.referrer),a.l("_g")),a.nb()&&!a.abort&&(a.ob(),g+=a.mb(),a.ub(e,g),a.l("_t"),a.referrer=""))),c&&a.N(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.c=a.lightProfileID=0};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=
c;a.linkType=b;a.linkName=d;e&&(a.j=c,a.u=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.e.length;c++)if(b=a.e[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=
void 0};a.tagContainerMarker="";a.ub=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",k=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(k||(k=a.account,f=k.indexOf(","),0<=f&&(k=k.substring(0,f)),k=k.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=k+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady();d+=f+"/b/ss/"+a.account+
"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.yb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].AudienceManagement.passData&":"")+b+"&AQE=1";a.hb(d);a.ga()};a.hb=function(c){a.g||a.pb();a.g.push(c);a.ia=a.A();a.Ja()};a.pb=function(){a.g=a.rb();a.g||(a.g=[])};a.rb=function(){var c,b;if(a.na()){try{(b=k.localStorage.getItem(a.la()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.na=function(){var c=!0;a.trackOffline&&a.offlineFilename&&
k.localStorage&&k.JSON||(c=!1);return c};a.Aa=function(){var c=0;a.g&&(c=a.g.length);a.o&&c++;return c};a.ga=function(){if(a.o&&(a.v&&a.v.complete&&a.v.timeout&&a.v.pa(),a.o))return;a.Ba=q;if(a.ma)a.ia>a.K&&a.Ha(a.g),a.oa(500);else{var c=a.bb();if(0<c)a.oa(c);else if(c=a.xa())a.o=1,a.tb(c),a.xb(c)}};a.oa=function(c){a.Ba||(c||(c=0),a.Ba=setTimeout(a.ga,c))};a.bb=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.A()-a.Ga;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-
c};a.xa=function(){if(0<a.g.length)return a.g.shift()};a.tb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.sb(b)}};a.Ua=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.U=!1;var s;try{s=JSON.parse('{"x":"y"}')}catch(x){s=null}s&&"y"==s.x?(a.U=!0,a.T=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.T=function(a){return k.$.parseJSON(a)},a.U=!0):a.T=function(){return null};a.xb=function(c){var b,
d,f;a.Ua()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(a.U?b.ta=!0:b=0));!b&&a.Ka&&(c=c.substring(0,2047));!b&&a.d.createElement&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",
b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||(b.abort=function(){b.src=q}));b.va=function(){try{b.timeout&&(clearTimeout(b.timeout),b.timeout=0)}catch(a){}};b.onload=b.pa=function(){b.va();a.gb();a.ca();a.o=0;a.ga();if(b.ta){b.ta=!1;try{var c=a.T(b.responseText);a.AudienceManagement.passData(c)}catch(d){}}};b.onabort=b.onerror=b.ya=function(){b.va();(a.trackOffline||a.ma)&&a.o&&a.g.unshift(a.fb);a.o=0;a.ia>a.K&&a.Ha(a.g);a.ca();
a.oa(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.pa():b.ya())};a.Ga=a.A();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Ea)try{f.removeChild(a.Ea)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Ea=a.v}b.timeout=setTimeout(function(){b.timeout&&(b.complete?b.pa():(a.trackOffline&&
b.abort&&b.abort(),b.ya()))},5E3);a.fb=c;a.v=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.G||a.u)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.da=setTimeout(a.ca,a.forcedLinkTrackingTimeout)};a.gb=function(){if(a.na()&&!(a.Fa>a.K))try{k.localStorage.removeItem(a.la()),a.Fa=a.A()}catch(c){}};a.Ha=function(c){if(a.na()){a.Ja();try{k.localStorage.setItem(a.la(),k.JSON.stringify(c)),a.K=a.A()}catch(b){}}};a.Ja=function(){if(a.trackOffline){if(!a.offlineLimit||
0>=a.offlineLimit)a.offlineLimit=10;for(;a.g.length>a.offlineLimit;)a.xa()}};a.forceOffline=function(){a.ma=!0};a.forceOnline=function(){a.ma=!1};a.la=function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.A=function(){return(new Date).getTime()};a.Ca=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.yb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==
d._c&&d.tagContainerName==c){a.N(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,
cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d){var f;b||(b=a.pageURL?a.pageURL:k.location);d||(d="&");return c&&b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.indexOf(d+c+"="),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.C="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.e=a.C.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ja="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.L=a.ja.slice(0);a.ra="account allAccounts debugTracking visitor trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData AudienceManagement".split(" ");
for(n=0;250>=n;n++)76>n&&(a.e.push("prop"+n),a.L.push("prop"+n)),a.e.push("eVar"+n),a.L.push("eVar"+n),6>n&&a.e.push("hier"+n),4>n&&a.e.push("list"+n);n="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest".split(" ");a.e=a.e.concat(n);a.C=a.C.concat(n);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename=
"AppMeasurement.offline";a.Ga=0;a.ia=0;a.K=0;a.Fa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Ka=!1,navigator){var y=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=y.indexOf("MSIE ")||0<=y.indexOf("Trident/")&&0<=y.indexOf("Windows NT 6"))a.Ka=!0}}catch(z){}a.ca=function(){a.da&&(k.clearTimeout(a.da),a.da=q);a.j&&a.G&&a.j.dispatchEvent(a.G);a.u&&("function"==typeof a.u?a.u():a.j&&a.j.href&&(a.d.location=
a.j.href));a.j=a.G=a.u=0};a.Ia=function(){a.b=a.d.body;a.b?(a.r=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.ua)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.r,!1);else{a.b.removeEventListener("click",a.r,!0);a.ua=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.J&&a.J==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=
0;else{var m=a.J=a.clickObject;a.ha&&(clearTimeout(a.ha),a.ha=0);a.ha=setTimeout(function(){a.J==m&&(a.J=0)},1E4);f=a.Aa();a.track();if(f<a.Aa()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Ca(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(n){b=new k.MouseEvent}if(b){try{b.initMouseEvent("click",
c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(q){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.j=c.target,a.G=b)}}}}}catch(r){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.r):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&
k.MouseEvent)&&(a.ua=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.r,!0)),a.b.addEventListener("click",a.r,!1))):setTimeout(a.Ia,30)};a.Ia();a.loadModule("ActivityMap")}
function s_gi(a){var k,q=window.s_c_il,r,n,t=a.split(","),u,s,x=0;if(q)for(r=0;!x&&r<q.length;){k=q[r];if("s_c"==k._c&&(k.account||k.oun))if(k.account&&k.account==a)x=1;else for(n=k.account?k.account:k.oun,n=k.allAccounts?k.allAccounts:n.split(","),u=0;u<t.length;u++)for(s=0;s<n.length;s++)t[u]==n[s]&&(x=1);r++}x||(k=new AppMeasurement);k.setAccount?k.setAccount(a):k.sa&&k.sa(a);return k}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,k=a.s_giq,q,r,n;if(k)for(q=0;q<k.length;q++)r=k[q],n=s_gi(r.oun),n.setAccount(r.un),n.setTagContainer(r.tagContainerName);a.s_giq=0}s_pgicq();