var mediaWikiLoadStart=(new Date()).getTime();function isCompatible(ua){if(ua===undefined){ua=navigator.userAgent;}return!((ua.indexOf('MSIE')!==-1&&parseFloat(ua.split('MSIE')[1])<6)||(ua.indexOf('Firefox/')!==-1&&parseFloat(ua.split('Firefox/')[1])<3)||ua.match(/BlackBerry[^\/]*\/[1-5]\./)||ua.match(/webOS\/1\.[0-4]/)||ua.match(/PlayStation/i)||ua.match(/SymbianOS|Series60/)||ua.match(/NetFront/)||ua.match(/Opera Mini/)||ua.match(/S40OviBrowser/)||(ua.match(/Glass/)&&ua.match(/Android/)));}var startUp=function(){mw.config=new mw.Map(true);mw.loader.addSource({"local":{"loadScript":"/w/load.php","apiScript":"/w/api.php"}});mw.loader.register([["site","1506585883",[],"site"],["noscript","1506227572",[],"noscript"],["startup","1506888885",[],"startup"],["filepage","1506227572"],["user.groups","1506227572",[],"user"],["user","1506227572",[],"user"],["user.cssprefs","1506227572",["mediawiki.user"],"private"],["user.options","1506227572",[],"private"],["user.tokens","1506227572",[],
"private"],["mediawiki.language.data","1506227572",["mediawiki.language.init"]],["mediawiki.skinning.elements","1506227581"],["mediawiki.skinning.content","1506227581"],["mediawiki.skinning.interface","1506227580"],["skins.cologneblue","1506227581"],["skins.modern","1506227581"],["skins.vector.styles","1506227580"],["skins.monobook.styles","1506227581"],["skins.vector.js","1506227581",["jquery.throttle-debounce"]],["skins.vector.collapsibleNav","1506227582",["jquery.client","jquery.cookie","jquery.tabIndex"]],["jquery","1506227581"],["jquery.appear","1506227581"],["jquery.arrowSteps","1506227581"],["jquery.async","1506227581"],["jquery.autoEllipsis","1506227581",["jquery.highlightText"]],["jquery.badge","1506227581",["mediawiki.language"]],["jquery.byteLength","1506227581"],["jquery.byteLimit","1506227581",["jquery.byteLength"]],["jquery.checkboxShiftClick","1506227581"],["jquery.chosen","1506227581"],["jquery.client","1506227581"],["jquery.color","1506227581",["jquery.colorUtil"]],[
"jquery.colorUtil","1506227581"],["jquery.cookie","1506227581"],["jquery.delayedBind","1506227581"],["jquery.expandableField","1506227581"],["jquery.farbtastic","1506227581",["jquery.colorUtil"]],["jquery.footHovzer","1506227581"],["jquery.form","1506227581"],["jquery.fullscreen","1506227581"],["jquery.getAttrs","1506227581"],["jquery.hidpi","1506227581"],["jquery.highlightText","1506227581",["jquery.mwExtension"]],["jquery.hoverIntent","1506227581"],["jquery.json","1506227581"],["jquery.localize","1506227581"],["jquery.makeCollapsible","1506227582"],["jquery.mockjax","1506227581"],["jquery.mw-jump","1506227581"],["jquery.mwExtension","1506227581"],["jquery.placeholder","1506227581"],["jquery.qunit","1506227581"],["jquery.qunit.completenessTest","1506227581",["jquery.qunit"]],["jquery.spinner","1506227581"],["jquery.jStorage","1506227581",["jquery.json"]],["jquery.suggestions","1506227581",["jquery.highlightText"]],["jquery.tabIndex","1506227581"],["jquery.tablesorter","1506888885",[
"jquery.mwExtension","mediawiki.language.months"]],["jquery.textSelection","1506227581",["jquery.client"]],["jquery.throttle-debounce","1506227581"],["jquery.validate","1506227581"],["jquery.xmldom","1506227581"],["jquery.tipsy","1506227581"],["jquery.ui.core","1506227581",[],"jquery.ui"],["jquery.ui.widget","1506227581",[],"jquery.ui"],["jquery.ui.mouse","1506227581",["jquery.ui.widget"],"jquery.ui"],["jquery.ui.position","1506227581",[],"jquery.ui"],["jquery.ui.draggable","1506227581",["jquery.ui.core","jquery.ui.mouse","jquery.ui.widget"],"jquery.ui"],["jquery.ui.droppable","1506227581",["jquery.ui.core","jquery.ui.draggable","jquery.ui.mouse","jquery.ui.widget"],"jquery.ui"],["jquery.ui.resizable","1506227581",["jquery.ui.core","jquery.ui.mouse","jquery.ui.widget"],"jquery.ui"],["jquery.ui.selectable","1506227581",["jquery.ui.core","jquery.ui.mouse","jquery.ui.widget"],"jquery.ui"],["jquery.ui.sortable","1506227581",["jquery.ui.core","jquery.ui.mouse","jquery.ui.widget"],
"jquery.ui"],["jquery.ui.accordion","1506227581",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.ui.autocomplete","1506227581",["jquery.ui.core","jquery.ui.position","jquery.ui.widget"],"jquery.ui"],["jquery.ui.button","1506227581",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.ui.datepicker","1506227581",["jquery.ui.core"],"jquery.ui"],["jquery.ui.dialog","1506227581",["jquery.ui.button","jquery.ui.core","jquery.ui.draggable","jquery.ui.mouse","jquery.ui.position","jquery.ui.resizable","jquery.ui.widget"],"jquery.ui"],["jquery.ui.progressbar","1506227581",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.ui.slider","1506227581",["jquery.ui.core","jquery.ui.mouse","jquery.ui.widget"],"jquery.ui"],["jquery.ui.tabs","1506227581",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.effects.core","1506227581",[],"jquery.ui"],["jquery.effects.blind","1506227581",["jquery.effects.core"],"jquery.ui"],["jquery.effects.bounce","1506227581",[
"jquery.effects.core"],"jquery.ui"],["jquery.effects.clip","1506227581",["jquery.effects.core"],"jquery.ui"],["jquery.effects.drop","1506227581",["jquery.effects.core"],"jquery.ui"],["jquery.effects.explode","1506227581",["jquery.effects.core"],"jquery.ui"],["jquery.effects.fade","1506227581",["jquery.effects.core"],"jquery.ui"],["jquery.effects.fold","1506227581",["jquery.effects.core"],"jquery.ui"],["jquery.effects.highlight","1506227581",["jquery.effects.core"],"jquery.ui"],["jquery.effects.pulsate","1506227581",["jquery.effects.core"],"jquery.ui"],["jquery.effects.scale","1506227581",["jquery.effects.core"],"jquery.ui"],["jquery.effects.shake","1506227581",["jquery.effects.core"],"jquery.ui"],["jquery.effects.slide","1506227581",["jquery.effects.core"],"jquery.ui"],["jquery.effects.transfer","1506227581",["jquery.effects.core"],"jquery.ui"],["moment","1506227581"],["mediawiki","1506227581"],["mediawiki.api","1506227581",["mediawiki.util"]],["mediawiki.api.category","1506227581",[
"mediawiki.Title","mediawiki.api"]],["mediawiki.api.edit","1506227581",["mediawiki.Title","mediawiki.api","user.tokens"]],["mediawiki.api.login","1506227581",["mediawiki.api"]],["mediawiki.api.parse","1506227581",["mediawiki.api"]],["mediawiki.api.watch","1506227581",["mediawiki.api","user.tokens"]],["mediawiki.debug","1506227581",["jquery.footHovzer","jquery.tipsy"]],["mediawiki.debug.init","1506227581",["mediawiki.debug"]],["mediawiki.feedback","1506227581",["jquery.ui.dialog","mediawiki.Title","mediawiki.api.edit","mediawiki.jqueryMsg"]],["mediawiki.hidpi","1506227581",["jquery.hidpi"]],["mediawiki.hlist","1506227581",["jquery.client"]],["mediawiki.htmlform","1506416629"],["mediawiki.icon","1506227581"],["mediawiki.inspect","1506227581",["jquery.byteLength","jquery.json"]],["mediawiki.notification","1506227581",["mediawiki.page.startup"]],["mediawiki.notify","1506227581"],["mediawiki.searchSuggest","1506227582",["jquery.client","jquery.placeholder","jquery.suggestions",
"mediawiki.api"]],["mediawiki.Title","1506227581",["jquery.byteLength","mediawiki.util"]],["mediawiki.toc","1506227582",["jquery.cookie"]],["mediawiki.Uri","1506227581"],["mediawiki.user","1506227581",["jquery.cookie","mediawiki.api","user.options","user.tokens"]],["mediawiki.util","1506227581",["jquery.client","jquery.mwExtension","mediawiki.notify","mediawiki.toc"]],["mediawiki.action.edit","1506227581",["jquery.byteLimit","jquery.textSelection","mediawiki.action.edit.styles"]],["mediawiki.action.edit.styles","1506227581"],["mediawiki.action.edit.collapsibleFooter","1506227581",["jquery.cookie","jquery.makeCollapsible","mediawiki.icon"]],["mediawiki.action.edit.preview","1506227581",["jquery.form","jquery.spinner","mediawiki.action.history.diff"]],["mediawiki.action.history","1506227581",[],"mediawiki.action.history"],["mediawiki.action.history.diff","1506227581",[],"mediawiki.action.history"],["mediawiki.action.view.dblClickEdit","1506227581",["mediawiki.page.startup",
"mediawiki.util"]],["mediawiki.action.view.metadata","1506227581"],["mediawiki.action.view.postEdit","1506227582",["jquery.cookie","mediawiki.jqueryMsg"]],["mediawiki.action.view.redirectToFragment","1506227581",["jquery.client"]],["mediawiki.action.view.rightClickEdit","1506227581"],["mediawiki.action.edit.editWarning","1506418736",["mediawiki.jqueryMsg"]],["mediawiki.action.watch.ajax","1506227572",["mediawiki.page.watch.ajax"]],["mediawiki.language","1506227581",["mediawiki.cldr","mediawiki.language.data"]],["mediawiki.cldr","1506227581",["mediawiki.libs.pluralruleparser"]],["mediawiki.libs.pluralruleparser","1506227581"],["mediawiki.language.init","1506227581"],["mediawiki.jqueryMsg","1506227581",["mediawiki.language","mediawiki.util"]],["mediawiki.language.months","1506888885",["mediawiki.language"]],["mediawiki.libs.jpegmeta","1506227581"],["mediawiki.page.gallery","1506227581"],["mediawiki.page.ready","1506227581",["jquery.checkboxShiftClick","jquery.makeCollapsible",
"jquery.mw-jump","jquery.placeholder","mediawiki.util"]],["mediawiki.page.startup","1506227581",["mediawiki.util"]],["mediawiki.page.patrol.ajax","1506227581",["jquery.spinner","mediawiki.Title","mediawiki.api","mediawiki.notify","mediawiki.page.startup","mediawiki.util","user.tokens"]],["mediawiki.page.watch.ajax","1506416592",["jquery.mwExtension","mediawiki.api.watch","mediawiki.notify","mediawiki.page.startup","mediawiki.util"]],["mediawiki.page.image.pagination","1506227581",["jquery.spinner","mediawiki.Uri","mediawiki.util"]],["mediawiki.special","1506227581"],["mediawiki.special.block","1506227581",["mediawiki.util"]],["mediawiki.special.changeemail","1506227581",["mediawiki.util"]],["mediawiki.special.changeslist","1506227581"],["mediawiki.special.changeslist.legend","1506227581"],["mediawiki.special.changeslist.legend.js","1506227581",["jquery.cookie","jquery.makeCollapsible"]],["mediawiki.special.changeslist.enhanced","1506227581"],["mediawiki.special.movePage","1506227581",[
"jquery.byteLimit"]],["mediawiki.special.pagesWithProp","1506227581"],["mediawiki.special.preferences","1506227581",["mediawiki.language"]],["mediawiki.special.recentchanges","1506227581",["mediawiki.special"]],["mediawiki.special.search","1506233517"],["mediawiki.special.undelete","1506227581"],["mediawiki.special.upload","1506416629",["mediawiki.libs.jpegmeta","mediawiki.util"]],["mediawiki.special.userlogin.common.styles","1506227581"],["mediawiki.special.userlogin.signup.styles","1506227581"],["mediawiki.special.userlogin.login.styles","1506227581"],["mediawiki.special.userlogin.common.js","1506377104"],["mediawiki.special.userlogin.signup.js","1506227581",["jquery.throttle-debounce","mediawiki.api","mediawiki.jqueryMsg"]],["mediawiki.special.javaScriptTest","1506227581",["jquery.qunit"]],["mediawiki.special.version","1506227581"],["mediawiki.legacy.ajax","1506227581",["mediawiki.legacy.wikibits","mediawiki.util"]],["mediawiki.legacy.commonPrint","1506227580"],[
"mediawiki.legacy.config","1506227581",["mediawiki.legacy.wikibits"]],["mediawiki.legacy.protect","1506227581",["jquery.byteLimit"]],["mediawiki.legacy.shared","1506227580"],["mediawiki.legacy.oldshared","1506227581"],["mediawiki.legacy.upload","1506227581",["jquery.spinner","mediawiki.Title","mediawiki.api","mediawiki.util"]],["mediawiki.legacy.wikibits","1506227581",["mediawiki.util"]],["mediawiki.ui","1506227581"],["mediawiki.ui.button","1506227580"],["oojs","1506227581"],["oojs-ui","1506227581",["oojs"]],["ext.gadget.edit0","1506227572"],["ext.gadget.timer","1506227572"],["ext.gadget.collapsible","1506227572"],["ext.gadget.msp","1506227572"],["ext.gadget.tabber","1506227572"],["ext.gadget.quotation-mark","1506227572"],["ext.cite","1506233259"],["ext.cite.popups","1506227581",["jquery.tooltip"]],["jquery.tooltip","1506227581"],["ext.rtlcite","1506227581"],["ext.interwiki.specialpage","1506227581",["jquery.makeCollapsible"]],["ext.nuke","1506227581"],["ext.geshi.local","1506227572"],
["mediawiki.api.titleblacklist","1506227581",["mediawiki.api"]],["jquery.wikiEditor","1506227581",["jquery.client","jquery.textSelection"],"ext.wikiEditor"],["jquery.wikiEditor.dialogs","1506227581",["jquery.tabIndex","jquery.ui.button","jquery.ui.dialog","jquery.ui.draggable","jquery.ui.resizable","jquery.wikiEditor","jquery.wikiEditor.toolbar"],"ext.wikiEditor"],["jquery.wikiEditor.dialogs.config","1506227581",["jquery.suggestions","jquery.wikiEditor","jquery.wikiEditor.dialogs","jquery.wikiEditor.toolbar.i18n","mediawiki.Title","mediawiki.jqueryMsg"],"ext.wikiEditor"],["jquery.wikiEditor.preview","1506227581",["jquery.wikiEditor"],"ext.wikiEditor"],["jquery.wikiEditor.previewDialog","1506227581",["jquery.wikiEditor","jquery.wikiEditor.dialogs"],"ext.wikiEditor"],["jquery.wikiEditor.publish","1506227581",["jquery.wikiEditor","jquery.wikiEditor.dialogs"],"ext.wikiEditor"],["jquery.wikiEditor.toolbar","1506227581",["jquery.wikiEditor","jquery.wikiEditor.toolbar.i18n"],"ext.wikiEditor"]
,["jquery.wikiEditor.toolbar.config","1506227581",["jquery.async","jquery.cookie","jquery.wikiEditor","jquery.wikiEditor.toolbar","jquery.wikiEditor.toolbar.i18n"],"ext.wikiEditor"],["jquery.wikiEditor.toolbar.i18n","1506227572",[],"ext.wikiEditor"],["ext.wikiEditor","1506227581",["jquery.wikiEditor"],"ext.wikiEditor"],["ext.wikiEditor.dialogs","1506227581",["ext.wikiEditor","ext.wikiEditor.toolbar","jquery.wikiEditor.dialogs","jquery.wikiEditor.dialogs.config"],"ext.wikiEditor"],["ext.wikiEditor.preview","1506227581",["ext.wikiEditor","jquery.wikiEditor.preview"],"ext.wikiEditor"],["ext.wikiEditor.previewDialog","1506227581",["ext.wikiEditor","jquery.wikiEditor.previewDialog"],"ext.wikiEditor"],["ext.wikiEditor.publish","1506227581",["ext.wikiEditor","jquery.wikiEditor.publish"],"ext.wikiEditor"],["ext.wikiEditor.tests.toolbar","1506227581",["ext.wikiEditor.toolbar"],"ext.wikiEditor"],["ext.wikiEditor.toolbar","1506227581",["ext.wikiEditor","jquery.wikiEditor.toolbar",
"jquery.wikiEditor.toolbar.config"],"ext.wikiEditor"],["ext.wikiEditor.toolbar.hideSig","1506227581",[],"ext.wikiEditor"],["ext.MsUpload","1506418736",["jquery.ui.progressbar"]],["ext.FancyBoxThumbs","1506227581"]]);mw.config.set({"wgLoadScript":"/w/load.php","debug":false,"skin":"vector","stylepath":"/w/skins","wgUrlProtocols":"http\\:\\/\\/|https\\:\\/\\/|ftp\\:\\/\\/|ftps\\:\\/\\/|ssh\\:\\/\\/|sftp\\:\\/\\/|irc\\:\\/\\/|ircs\\:\\/\\/|xmpp\\:|sip\\:|sips\\:|gopher\\:\\/\\/|telnet\\:\\/\\/|nntp\\:\\/\\/|worldwind\\:\\/\\/|mailto\\:|tel\\:|sms\\:|news\\:|svn\\:\\/\\/|git\\:\\/\\/|mms\\:\\/\\/|bitcoin\\:|magnet\\:|urn\\:|geo\\:|\\/\\/","wgArticlePath":"/wiki/$1","wgScriptPath":"/w","wgScriptExtension":".php","wgScript":"/w/index.php","wgSearchType":null,"wgVariantArticlePath":false,"wgActionPaths":{},"wgServer":"https://www.waveshare.com","wgUserLanguage":"en","wgContentLanguage":"en","wgVersion":"1.23.5","wgEnableAPI":true,"wgEnableWriteAPI":true,"wgMainPageTitle":"Main Page",
"wgFormattedNamespaces":{"-2":"Media","-1":"Special","0":"","1":"Talk","2":"User","3":"User talk","4":"Waveshare Wiki","5":"Waveshare Wiki talk","6":"File","7":"File talk","8":"MediaWiki","9":"MediaWiki talk","10":"Template","11":"Template talk","12":"Help","13":"Help talk","14":"Category","15":"Category talk"},"wgNamespaceIds":{"media":-2,"special":-1,"":0,"talk":1,"user":2,"user_talk":3,"waveshare_wiki":4,"waveshare_wiki_talk":5,"file":6,"file_talk":7,"mediawiki":8,"mediawiki_talk":9,"template":10,"template_talk":11,"help":12,"help_talk":13,"category":14,"category_talk":15,"image":6,"image_talk":7,"project":4,"project_talk":5},"wgContentNamespaces":[0],"wgSiteName":"Waveshare Wiki","wgFileExtensions":["png","gif","jpg","jpeg","doc","xls","mpp","pdf","ppt","tiff","bmp","docx","xlsx","txt","pptx","ps","odt","ods","odp","odg","rar","zip","7z","tar.gz","wmv","flv","mp4","mp3","ogg","webm","mov","ogv","c","h","cpp","bz2","gz"],"wgDBname":"waveshareDB","wgFileCanRotate":true,
"wgAvailableSkins":{"cologneblue":"CologneBlue","modern":"Modern","monobook":"MonoBook","vector":"Vector"},"wgExtensionAssetsPath":"/w/extensions","wgCookiePrefix":"waveshareDB","wgResourceLoaderMaxQueryLength":-1,"wgCaseSensitiveNamespaces":[],"wgLegalTitleChars":" %!\"$\u0026'()*,\\-./0-9:;=?@A-Z\\\\\\^_`a-z~+\\u0080-\\uFFFF","wgResourceLoaderStorageVersion":1,"wgResourceLoaderStorageEnabled":false,"wgWikiEditorMagicWords":{"redirect":"#REDIRECT","img_right":"right","img_left":"left","img_none":"none","img_center":"center","img_thumbnail":"thumbnail","img_framed":"framed","img_frameless":"frameless"}});};if(isCompatible()){document.write("\u003Cscript src=\"/w/load.php?debug=false\u0026amp;lang=en\u0026amp;modules=jquery%2Cmediawiki\u0026amp;only=scripts\u0026amp;skin=vector\u0026amp;version=20170924T043301Z\"\u003E\u003C/script\u003E");};
/* cache key: waveshareDB:resourceloader:filter:minify-js:7:38b6e271e17ef40731f99a4396c232f6 */