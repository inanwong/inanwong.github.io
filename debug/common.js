(function() {
var c=0, d, b= function(g) {
c=g.touches[0].pageY;
var f=document.body.scrollTop
}, e= function(f) {
if(c-f.touches[0].pageY<0&&document.body.scrollTop<=10) {
$("#header").show();
a()
}
}, a= function() {
$(document).off("touchstart",$.proxy(b,document)).off("touchmove",$.proxy(e,document))
};
$(document).on("touchstart",$.proxy(b,document)).on("touchmove",$.proxy(e,document))
})();
;
function Tab(a) {
this.options= {
selector:null,head:null,body:null,startAt:0,hash:null,switchBodyFn:null,onBeforeClick:null,onAfterClick:null
};
for(var b in a) {
this.options[b]=a[b]
}
this.index=undefined;
this.$el=$(this.options.selector);
this.$head=(this.options.head?$(this.options.head):this.$el.children(".tab_head"));
this.$head_list=this.$head.children(".tab_head_item");
this.$body_list=(this.options.body?$(this.options.body):this.$el.children(".tab_body")).children(".tab_body_item");
this.initEvent()
}
Tab.prototype= {
initEvent: function() {
var b=this, a=-1;
if(this.options.hash) {
a=this.switchTo($.location.getHash())
}
if(a===-1&&this.options.startAt>-1) {
this.switchTo(this.options.startAt)
}
this.$head.on("click",".tab_head_item", function(d) {
var c=$(this).index();
if(b.options.onBeforeClick) {
b.options.onBeforeClick.call(this,d,c,b)
}
b.switchTo(c);
if(b.options.onAfterClick) {
b.options.onAfterClick.call(this,d,c,b)
}
if(!b.options.hash) {
return false
}
return true
})
},switchTo: function(a) {
if(this.options.hash) {
var b;
if( typeof a==="string") {
b= a=a.replace("#","");
if(a==="") {
a=this.options.startAt
} else {
a=$(this.$head_list.filter("["+this.options.hash+"$='"+a+"']")).index()
}
}
if( typeof a=="number") {
b=this.$head_list.eq(a).tbattr(this.options.hash)
}
if(a===-1) {
return -1
}
if(b!="") {
$.location.setHash(b)
}
}
if(a===this.index) {
return
}
this.index=a;
this.$head_list.removeClass("active").eq(a).addClass("active");
if(this.options.switchBodyFn) {
this.options.switchBodyFn.call(this,a)
} else {
this.$body_list.hide().eq(a).show()
}
},next: function() {
var a=this.index+1;
var b=this.$head_list.length;
if(a>=b) {
a=0
}
this.switchTo(a)
},destroy: function() {
this.unbind();
this.$el.remove()
},unbind: function() {
this.$head.off("click",".tab_head_item")
},setOption: function(a,b) {
this.options[a]=b
}
};
;
var PageTurn= function(d) {
var c= {
node:"",freezeColor:"#C4C5C8",currentPage:1,totalPage:1,pageSize:30,pageId:"list_pager",firstId:"first",nextId:"next",prevId:"prev",lastId:"last",inputId:"inputPageNum",newWord:null,urlArg:"pn",baseOn:0,getData:null,rendWrap:"po_list",form:"",lp: {
flp:6050,plp:6051,nlp:6052,llp:6053,tlp:6054
}
}, g= function(i) {
var h="", j=0;
switch(i.id) {
case"first":
if(c.currentPage<=1) {
return
}
j=c.baseOn?1:0;
h="&lp="+c.lp.flp;
break;
case"prev":
if(c.currentPage<=1) {
return
}
j=c.baseOn?parseInt(c.currentPage-2)*3+1:(c.currentPage-2)*c.pageSize;
h="&lp="+c.lp.plp;
break;
case"next":
if(c.currentPage>=c.totalPage) {
return
}
j=c.baseOn?parseInt(c.currentPage)*3+1:c.currentPage*c.pageSize;
h="&lp="+c.lp.nlp;
break;
case"last":
if(c.currentPage>=c.totalPage) {
return
}
j=c.baseOn?parseInt(c.totalPage-1)*3+1:(c.totalPage-1)*c.pageSize;"&lp="+c.lp.llp;
break;
default:
return
}
if(c.newWord!=null) {
h+="&new_word="+c.newWord
}
h+="&"+c.urlArg+"="+j;
$.loading();
b&&c.getData(h,$("#"+c.rendWrap))
}, f= function(k) {
if(!b) {
return false
}
var h=k.val();
if(h==""||h==c.currentPage) {
var j=c.form=="totalOut"?c.currentPage:c.currentPage+"/"+c.totalPage;
k.val(j);
return false
}
$.loading();
var i="", l=0;
if(/^[1-9]*[0-9][0-9]*$/.test(h)) {
h=Math.min(parseInt(h,10),c.totalPage);
l=c.baseOn?parseInt(h-1)*3+1:(h-1)*c.pageSize;
i="&lp="+c.lp.tlp+"&"+c.urlArg+"="+l
} else {
l=c.baseOn?1:0;
i="&lp="+c.lp.tlp+"&"+c.urlArg+"="+l
}
if(c.newWord!=null) {
i+="&new_word="+c.newWord
}
c.getData(i,$("#"+c.rendWrap))
}, e= function() {
var h=[c.firstId,c.nextId,c.prevId,c.lastId];
for(var i in h) {
c.node.delegate("#"+h[i],"click", function(j) {
g(j.target);
_.eventCenter.trigger("page_turn_change",j.target);
j.preventDefault()
})
}
}, a= function(h) {
h.bind("click", function() {
h.val("")
});
h.bind("blur", function() {
f(h)
});
h.bind("keypress", function(i) {
if(i.keyCode==13) {
f(h)
}
})
};
$.extend(c,d);
var b=$.isFunction(c.getData);
e();
a($("#"+c.inputId));
return {
getConf: function(h) {
return c[h]||""
},changeConf: function(h) {
$.extend(c,h);
b=$.isFunction(c.getData);
a($("#"+c.inputId))
}
}
};
;(function(b) {
var d, a;
d="a_preload";
a='<div class="'+d+'"></div>';
function e(g) {
var f, i;
if(g&&g.container) {
f=b(g.container);
if(f.height()<36||f.width()<36) {
return null
}
i=f.height()/2-11
} else {
f=b("body");
i=document.documentElement.clientHeight/2+f.get(0).scrollTop-10
}
if(f.find("."+d).length==0) {
f.append(a)
}
return f.find("."+d).css("top",i+"px").show()
}
function c(f) {
var g=null;
if(f&&f.container) {
g=b(f.container).find("."+d)
} else {
g=b("."+d)
}
g[0]&&g.hide();
return g
}
b.loading=e;
b.unloading=c;
_.eventCenter.on("loading_show",b.loading);
_.eventCenter.on("loading_hide",b.unloading)
})(Zepto);
;
var recordSize= {
init: function() {
if(!($.cookie("CLIENTWIDTH")&&$.cookie("CLIENTHEIGHT"))) {
var b=window.innerWidth>window.innerHeight?window.innerHeight:window.innerWidth, a=window.innerHeight>window.innerWidth?window.innerHeight:window.innerWidth;
$.cookie("CLIENTWIDTH",b,360);
$.cookie("CLIENTHEIGHT",a,360)
}
}
};
(function(a) {
recordSize.init()
})(Zepto);
;
F.module("sglobal/component/footer", function(b,a) {
var c=F.require("sglobal/component/app_starter");
var d= {
$pcLink:null,sleepTime:2500,events: {
"click .j_footer_pc_link":"pcLinkClick"
},initialize: function() {
this.$pcLink=$(".j_footer_pc_link");
var e=this;
c.bind($(".j_footer_link"), {
isIos:!!$.os.ios,downloadUrl:$(".j_footer_link").attr("href"),page:e.options.page,param:e.options.param,baseUrl:e.options.baseUrl,lp:!!$.os.ios?"footer_client_ios_start":"footer_client_andriod_start"
})
},pcLinkClick: function(g) {
g.preventDefault();
var f=this;
$.toast.send("<div class='footer_pc_link_warning'>\u4f60\u5373\u5c06\u8fdb\u5165\u7535\u8111\u7248\u8d34\u5427\uff0c\u53ef\u901a\u8fc7wapp.baidu.com\u8fd4\u56de\u624b\u673a\u7248</div>",f.sleepTime);
setTimeout(function() {
location.href=f.$pcLink.attr("data-link")
},f.sleepTime)
},clientLinkClick: function(h) {
var g=this, f=h.target.href;
if(f&&f.indexOf("ios")!=-1) {
var i=new Date();
setTimeout(function() {
if(new Date()-i<2500) {
window.location.href=f
}
},1500);
$.ajax({
url:g.options.baseUrl+"pv?lp=sglobal_ios_client_click&amp;fr=sglobal_client"
});
window.location.href="com.baidu.tieba://";
return false
} else {
return true
}
return false
}
};
a=_.Widget.extend(d);
return a
},[]);
;
F.module(["sglobal/component/list_loader"], function(b,a) {
a=_.Widget.extend({
_scrollTimeout:null,_onloading:false,events: {},load: function() {
var c=this;
if(c._onloading) {
return false
}
this.pn++;
c.option.onBeforeLoad&&c.option.onBeforeLoad.call(c);
$.ajax({
url:c.option.url,data:c.option.getAjaxData.call(c,c.pn),dataType:c.option.dataType,success: function(d) {
$.unloading();
c._onloading=false;
c.option.callback&&c.option.callback.call(c,d)
},error: function() {
$.unloading();
c._onloading=false;
$.toast.send("\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5\u3002")
}
});
$.loading();
c._onloading=true;
return true
},_checkPosition: function(f) {
if($(f).length===0) {
return false
}
var e=$(f).offset().top, d=document.documentElement.clientHeight;
if(top===undefined) {
return false
} else {
var c=window.scrollY+d+20>e;
return c
}
},autoLoad: function() {
if(this._checkPosition(this.option.loadBtnSelector)) {
this.load()
}
},_handleScroll: function() {
var c=this;
if(this._scrollTimeout) {
window.clearTimeout(this._scrollTimeout)
}
this._scrollTimeout=window.setTimeout(function() {
c.autoLoad.call(c)
},500)
},initialize: function(d) {
var c=this;
this.option=$.extend({
url:"",dataType:"json",callback:null,onBeforeLoad:null,initPn:1,scrollAutoLoad:false,getAjaxData: function(e) {
return {
is_ajax:1,pn:e
}
},loadBtnSelector:".j_load_more"
},d.option);
this.pn=this.option.initPn;
this._time=Date.now();
this.$el.on("click.load_"+this._time,this.option.loadBtnSelector,_.bind(this.load,this));
if(this.option.scrollAutoLoad) {
$(window).on("scroll.autoLoad_"+this._time, function() {
c._handleScroll()
});
c._handleScroll()
}
},reset: function() {
this.pn=this.option.initPn
},unbind: function() {
this.$el.off("click.load_"+this._time);
$(window).off("scroll.autoLoad_"+this._time)
}
});
return a
},[]);
;
F.module("sglobal/component/pletter_count_manager", function(c,b) {
var a="pletter_count_cache";
b= {
getShowNumber: function(e) {
var d=this.get();
if(e!=d) {
return e
} else {
return 0
}
},get: function() {
return $.storage.get(a)
},set: function(d) {
return $.storage.set(a,d)
},del: function() {
return $.storage.del(a)
}
};
return b
});
;
F.module("sglobal/component/app_starter", function(b,a) {
var c=new (function(){window.app=window.app||{};var k=function(){};var m=this;var j;var l={isIos:false,packageName:"com.baidu.tieba",downloadUrl:"",page:"",param:"",baseUrl:"",lp:"",onFail:null};this.bind=function(p,n){var q=this,o=n;p.bind("click",function(){return function(r){r.preventDefault();q.triggerAppStarter(o);return false}}())};this.delegate=function(q,n,o){var r=this,p=o;$("body").on(q,n,function(){return function(s){s.preventDefault();r.triggerAppStarter(p);return false}}())};this.triggerAppStarter=function(n){(n.isIos===undefined?$.os.ios:n.isIos)?d(n):g(n)};var e=function(n){$.get(n.baseUrl+"pv?lp="+n.lp+"&r="+Math.random())};var f=function(n){if(!n.onFail&&n.downloadUrl!="#"){$.location.setHref(n.downloadUrl);return}else{n.onFail(n.downloadUrl);return}};var g=function(n){var o;switch(n.page){case"sfrs":case"frs":o="S.fname="+n.param+";S.type=frs;";break;case"spb":case"pb":o="S.id="+n.param+";S.type=pb;";break;case"im":o="S.groupid="+n.param+";S.type=groupinfo;";break;default:o=""}if(o!=""){j="http://127.0.0.1:6259/sendintent?intent="+window.encodeURIComponent("#Intent;action=com.baidu.tieba.VIEW;launchFlags=0x10000000;component=com.baidu.tieba/.service.WebNativeReceiver;"+o+"end")+"&t="+(+new Date())}else{f(n);return}i(function(){e(n)},function(){f(n)})};var d=function(o){var q;switch(o.page){case"sfrs":case"frs":q="jumptoforum?tname="+o.param;break;case"spb":case"pb":q="jumptoforum?kz="+o.param;break;case"im":q="jumptoforum?groupid="+o.param+"=groupname="+o.groupname;break;default:q=""}var n="com.baidu.tieba://"+q;var p=new Date();setTimeout(function(){if(new Date()-p<2500){f(o)}},2000);e(o);setTimeout(function(){document.location.href=n},100)};var i=function(n,o){h({url:j,timeout:2000,done:function(p){(p&&p.error==0)?n():o()},fail:o})};var h=function(p){var r=p;var n="__jsonp"+parseInt(Math.random()*10000,10),u=p.timeout||2000,x=null,v=document.createElement("script"),s=null,q=function(C,o){if(s){return}s=["fail","done"][+C];C&&!!r.done&&r.done(o);!C&&!!r.fail&&r.fail(o)},w=function(){return p.url+["?","&"][+(p.url.indexOf("?")>=0)]+[encodeURIComponent("callback"),encodeURIComponent(n)].join("=")},A=function(){v.type="text/javascript";v.src=w();v.async=true;v.addEventListener("error",t,true)},B=function(){window[n]=y;document.body.appendChild(v);x=u?setTimeout(t,u):x},z=function(){if(s){return}delete window[n];document.body.removeChild(v);if(x){clearTimeout(x);x=null}},y=function(o){if(s){return}z();q(true,o)},t=function(o){if(s){return}z();q(false,o)};A();B()}})();
a=c;
return a
},[]);
;
F.module("sglobal/layout/collapse", function(b,a) {
a=_.Widget.extend({
$arrow:null,$body:null,events: {
"click .j_arrow":"toggle"
},toggle: function(c) {
c.preventDefault();
if(this.$arrow.hasClass("arrow_up")) {
this.hide()
} else {
if(this.$arrow.hasClass("arrow_down")) {
this.show()
}
}
},show: function() {
this.$arrow.removeClass("arrow_down").addClass("arrow_up");
this.$body.show()
},hide: function() {
this.$arrow.removeClass("arrow_up").addClass("arrow_down");
this.$body.hide()
},initialize: function(c) {
this.$arrow=this.$el.find(".j_arrow");
this.$body=this.$el.find(".collapse_body");
this.initStyle();
this.listenEvent()
},listenEvent: function() {
},initStyle: function() {
var c=this.$el, d=c.tbattr("data-init");
c.removeAttr("data-init");
if(d==="show") {
c.find(".j_arrow").addClass("arrow arrow_up arrow_line arrow_custom");
c.children(".collapse_body").show()
} else {
if(d==="hide") {
c.find(".j_arrow").addClass("arrow arrow_down arrow_line arrow_custom");
c.children(".collapse_body").hide()
}
}
}
});
return a
},[]);
;
var More=More|| {};
More.bindObody= function() {
More.obody[0]&&More.obody.die("click").live("click", function() {
More.obody.hide();
More.smallAction.className=""
})
};
More.bindBtnMore= function() {
More.btn_more.die("click").live("click", function(b) {
if(More.olist.css("display")=="none") {
var a=document.body.offsetHeight;
More.obody.css("width","100%").css("height",a-31+"px").show();
More.olist.css("visibility","visible").css("left",More.btn_more.offset()["left"]-1+"px").css("top",More.btn_more.offset()["top"]+29+"px").css("display","block");
More.smallAction.className="on";
More.upbutton.style.display="block";
More.btn_more.css("color","#2932E1");
More.obody.hide()
} else {
More.olist.css("visibility","hidden").css("display","none");
More.obody.hide();
More.smallAction.className="";
More.upbutton.style.display="none";
More.btn_more.css("color","#46446D")
}
b.preventDefault()
})
};
More.init= function() {
More.obody=$("#o_body");
More.olist=$("#o_list");
More.smallAction=$("#nav")[0]?$("#nav")[0].getElementsByTagName("small")[0]:"error";
More.btn_more=$("#o_more");
More.upbutton=$("#nav_down")[0];
More.bindObody();
More.bindBtnMore()
};
;
var Clear= {
init: function() {
var a=$("#search-area .search-input"), b=$("#search-area span.cross");
if(navigator.userAgent.indexOf("UC")!==-1) {
b.css({
right:105
})
}
b.live($.touchStart(), function(c) {
c.preventDefault();
a.val("");
b.hide();
_.eventCenter.trigger("sug_display_default")
});
b.live("mousedown", function(c) {
a.val("");
b.hide();
a[0].focus();
c.preventDefault()
});
a.live("input", function() {
if(a.val()=="") {
b.hide()
} else {
b.show()
}
});
a.live("click", function() {
if(a.val()!=="") {
b.show()
}
});
a.live("blur", function() {
b.hide()
})
}
};
;
var Suggestion=Suggestion|| {}, _isInputSetStr=false;
Suggestion.strSelect= function(c,b) {
_isInputSetStr=true;
$(Suggestion.node).removeClass("input_tip");
var a=$(c).tbattr("data-name");
Suggestion.node.val(a);
$.get(Suggestion.base_url+"pv?lp="+b+"&dptag="+Suggestion.dpTag+"&dprelative="+Suggestion.dpRelative+"&dpconf="+Suggestion.dpConf, function() {
_.eventCenter.trigger("search_execute")
})
};
Suggestion.s= function(a) {
scrollPos(a,0,100)
};
Suggestion.objToArr= function(c) {
var b=[];
for(var a in c) {
c[a]&&b.push(c[a])
}
return b
};
Suggestion.textChange= function(b) {
var a=Suggestion.node.val().trim();
if((a&&encodeURIComponent(a)!=Suggestion.default_word)||(!Suggestion.isEnterForum&&a)) {
$.getJSON(Suggestion.sug_url+encodeURIComponent(a)+"&is_ajax=1", function(d) {
var c=Suggestion.node.val().trim();
if((c&&encodeURIComponent(c)!=Suggestion.default_word)||(!Suggestion.isEnterForum&&c)) {
Suggestion.displaySuggestion(d,true,a)
}
})
} else {
if(Suggestion.isEnterForum) {
if(!Suggestion.hasRequestSug) {
$.getJSON(Suggestion.sug_url+encodeURIComponent(a)+"&is_ajax=1&sug=1", function(c) {
Suggestion.default_data.dataSeen=Suggestion.objToArr(c.data.seen_forum);
Suggestion.default_data.dataLike=Suggestion.objToArr(c.data.like_forum);
Suggestion.default_data.dataConf=Suggestion.objToArr(c.data.conf_forum);
Suggestion.hasRequestSug=true;
Suggestion.displayDefault(1)
})
} else {
Suggestion.displayDefault(1)
}
} else {
Suggestion.$el.hide();
Suggestion.displaySearchHistory(1)
}
}
Suggestion.queryChange=a||decodeURI(Suggestion.default_word);
$("#j_keyword").html(Suggestion.queryChange)
};
Suggestion.rendSearchDefaultSugHtml= function(b) {
var a="";
b=b||[];
for(var d=0, c=b.length;d<c;d++) {
a+="<span><a href='#' class='j_label' data-name='"+b[d]+"' data-cate='sug_search_history'>"+b[d]+"</a></span>"
}
a+="<span class='suggestion_func' id='suggestion_func'><a href='#' class='search_relative' id='j_clear_history'>\u6e05\u9664\u641c\u7d22\u5386\u53f2</a><a href='#' class='close' id='j_sug_close'></a></span>";
Suggestion.$el.html(a).show()
};
Suggestion.displaySearchHistory= function(b) {
Suggestion.dpTag="none";
Suggestion.dpRelative="none";
Suggestion.dpConf="none";
var a=$.storage.get("search_history");
if(!a|| typeof a!="string") {
return false
}
a=a.split("#");
Suggestion.rendSearchDefaultSugHtml(a);
$.get(Suggestion.base_url+"pv?lp=sug_search_default_display");
if(b) {
Suggestion.s(35)
}
return true
};
Suggestion.rendForumDefaultSugHtml= function(b,a,h) {
var l="";
b=b||[];
a=a||[];
h=h||[];
if(b.length||a.length) {
l+="<div class='sug_region_header'>\u6211\u7231\u901b\u7684\u5427</div><ul class='sug_region_body'>";
for(var e=0, g=b.length;e<g;e++) {
l+="<li class='sug_forumTile_wrapper'><a href='#' class='j_label sug_forumtile' data-name='"+b[e]+"' data-cate='sug_forum_like'>"+b[e].subByte(13,"...")+"\u5427</a></span>"
}
for(var c=0, f=a.length;c<f;c++) {
l+="<li class='sug_forumTile_wrapper'><a href='#' class='j_label sug_forumtile' data-name='"+a[c]+"' data-cate='sug_forum_seen'>"+a[c].subByte(13,"...")+"\u5427</a></span>"
}
l+="</ul>"
}
if(h.length) {
l+="<div class='sug_region_header sug_hot_recommend'>\u70ed\u95e8\u63a8\u8350<em>HOT</em></div><ul class='sug_region_body'>";
for(var d=0, k=h.length;d<k;d++) {
l+="<li class='sug_forumTile_wrapper'><a href='#' class='j_label sug_forumtile' data-name='"+h[d]+"' data-cate='sug_forum_conf'>"+h[d].subByte(13,"...")+"\u5427</a></span>"
}
l+="</ul>"
}
l+="<span class='suggestion_func suggestion_func_empty' id='suggestion_func'><a href='#' class='search_relative'></a><a href='#' class='close' id='j_sug_close'></a></span>";
Suggestion.$el.html(l).show()
};
Suggestion.displayDefault= function(c) {
Suggestion.dpTag="none";
Suggestion.dpRelative="none";
var b=Suggestion.default_data.dataLike, d=Suggestion.default_data.dataSeen, a=Suggestion.default_data.dataConf;
if(a&&a.length) {
Suggestion.dpConf="exist"
}
Suggestion.rendForumDefaultSugHtml(b,d,a);
if(c) {
Suggestion.s(35)
}
return true
};
Suggestion.rendNormalSugHtml= function(h,o,e,l,c) {
var k="";
h=h||"";
o=o||[];
e=e||[];
l=l||[];
c=c||[];
for(var b=0, g=Math.min(o.length,3);b<g;b++) {
k+="<span><a href='#' class='j_label' data-name='"+o[b]+"' data-cate='sug_forum_match'>"+o[b]+"\u5427</a></span>"
}
if(e[0]) {
k+="<span><a href='#' class='j_label' data-name='"+e[0]+"' data-cate='sug_forum_topic'>"+e[0]+"\u5427</a></span>"
}
if(l.length||c.length) {
k+="<span class='banner_relative'>\u4e0e<span class='keyword'>"+h+"</span>\u6709\u5173\u7684\u5427</span>";
for(var f=0, j=Math.min(l.length,2);f<j;f++) {
k+="<span><a href='#' class='j_label' data-name='"+l[f]+"' data-cate='sug_forum_tag'>"+l[f]+"\u5427</a></span>"
}
for(var d=0, a=Math.min(c.length,2);d<a;d++) {
k+="<span><a href='#' class='j_label' data-name='"+c[d]+"' data-cate='sug_forum_relative'>"+c[d]+"\u5427</a></span>"
}
}
k+="<span class='suggestion_func' id='suggestion_func'><a href='#' class='search_relative' id='j_search_relative'>\u641c\u7d22\u66f4\u591a\u4e0e<span class='keyword' id='j_keyword'>"+Suggestion.queryChange+"</span>\u76f8\u5173\u7684\u5427</a><a href='#' id='j_sug_close' class='close'></a></span>";
Suggestion.$el.html(k).show()
};
Suggestion.displaySuggestion= function(b,g,f) {
Suggestion.dpConf="none";
if(b.no!=0||!b.data) {
return
}
var a=b.data.match_forum, d=b.data.topic_forum, c=b.data.tag_forum, e=b.data.related_forum;
Suggestion.dpTag=c.length?"exist":"none";
Suggestion.dpRelative=e.length?"exist":"none";
if(!a.length&&!d.length&&!c.length) {
Suggestion.$el.hide()
} else {
Suggestion.rendNormalSugHtml(f,a,d,c,e);
if(g) {
Suggestion.s(35)
}
}
};
Suggestion._autoShowDefaultWord= function(a) {
$(a.node).addClass("input_tip").focus(function() {
if($.trim($(this).val())==$.trim(a.default_word)) {
$(this).tbattr("placeholder","");
$(this).removeClass("input_tip")
}
}).blur(function(b) {
var c=this;
setTimeout(function() {
if($.trim($(c).val())!="") {
$(c).removeClass("input_tip")
} else {
if(!_isInputSetStr) {
$(c).addClass("input_tip");
$(c).tbattr("placeholder",a.placeHolderWord)
}
}
},100)
})
};
Suggestion.clearHistory= function() {
var a=new Dialog({
mask:true,closebtn:false,title:"",content:"\u662f\u5426\u6e05\u9664\u641c\u7d22\u5386\u53f2",cancelbtn:"\u53d6\u6d88",okbtn:"\u786e\u5b9a",okbtnStyle:"background-color:#42a2e5; border-color:#42a2e5",contentStyle:"margin:20px 0 10px; font-size:16px;",fixed:true
});
a.dom.on("ok", function() {
a.remove();
$.storage.del("search_history");
Suggestion.$el.hide();
Suggestion.s(0);
$.get(Suggestion.base_url+"pv?lp=sug_clear_history")
}).on("cancel", function() {
a.remove()
})
};
Suggestion.init= function(b) {
Suggestion.hasRequestSug=false;
Suggestion.sug_url=b.sug_url;
Suggestion.base_url=b.base_url;
Suggestion.tag_url=b.tag_url;
Suggestion.$el=$(".suggestion");
Suggestion.node=$("#kw");
Suggestion.node.tbattr("value",decodeURIComponent(b.word));
Suggestion.default_word=b.word;
Suggestion.queryChange=decodeURI(b.word);
Suggestion.autoShowDefaultWord=b.autoShowDefaultWord||false;
Suggestion.placeHolderWord="\u8f93\u5165\u4f60\u611f\u5174\u8da3\u7684\u4e1c\u4e1c";
Suggestion.default_data= {
no:0,error:"",data:b.forum_data,dataLike:b.forum_like_data,dataSeen:b.forum_seen_data
};
var a=null;
Suggestion.node.die("input").live("input click", function() {
clearTimeout(a);
a=setTimeout(function() {
Suggestion.textChange()
},0)
});
if(Suggestion.autoShowDefaultWord) {
Suggestion._autoShowDefaultWord(Suggestion)
}
Suggestion.$el.delegate("#j_search_relative","click", function(c) {
c.preventDefault();
_.eventCenter.trigger("search_all",Suggestion.queryChange,"seekForum","sug_more_click")
}).delegate("#j_sug_close","click", function(c) {
c.preventDefault();
Suggestion.$el.hide();
Suggestion.s(0)
}).delegate(".j_label","click", function(d) {
d.preventDefault();
var c=$(this).tbattr("data-cate");
Suggestion.strSelect(this,c)
}).delegate("#j_clear_history","click", function(c) {
c.preventDefault();
Suggestion.clearHistory()
});
Suggestion.node.focus(function() {
_.eventCenter.trigger("getSearchType")
});
_.eventCenter.on("sug_display_default", function() {
Suggestion.textChange()
});
_.eventCenter.on("searchAndEnterChange", function(c) {
Suggestion.isEnterForum=c;
Suggestion.$el.hide()
})
};
;
var SearTie=SearTie|| {};
SearTie.getSub7= function(a) {
return (function(b) {
var c=new RegExp("(^|&)"+b+"=([^&]*)(&|$)");
var d=window.location.search.substr(1).match(c);
if(d!=null) {
return unescape(d[2])
}
return null
})(a)
};
SearTie.isEnterForum=SearTie.getSub7("sub7")?false:true;
SearTie.hiddenInputSub7="<input type='hidden' id='sub7' class='hidden' name='sub7' value='\u641c\u7d22'/>";
SearTie.hiddenInputSub4="<input type='hidden' id='sub4' class='hidden' name='sub4' value='\u8fdb\u5427'/>";
SearTie.executeCommand= function() {
var a=$("#kw").val().trim();
if(SearTie.isEnterForum) {
SearTie.searchForum(a)
} else {
SearTie.searchAll(a)
}
};
SearTie.searchAll= function(a,b,c) {
if(location.href.indexOf("seekforum")!==-1||b=="seekForum") {
$("#search_form").attr("action",$("#search_form").attr("data-seekforum"))
} else {
$("#search_form").attr("action",$("#search_form").attr("data-seekall"))
}
SearTie.isEnterForum=false;
$("#btn").html("\u641c\u7d22");
if($("#sub7").length==0) {
$("#span_sub").html(SearTie.hiddenInputSub7)
}
$("#searchLp").val(c||"6092");
if(a) {
SearTie.storageHistory(a);
$("#kw").val(a);
$("#search_form")[0].submit()
}
SearTie.conveySearchType()
};
SearTie.searchForum= function(a) {
$("#search_form").attr("action",$("#search_form").attr("data-enter"));
SearTie.isEnterForum=true;
$("#btn").html("\u8fdb\u5427");
if($("#sub4").length==0) {
$("#span_sub").html(SearTie.hiddenInputSub4)
}
$("#searchLp").val("6093");
if(a) {
$("#kw").val(a);
if(encodeURIComponent(a)==SearTie.default_word) {
$("#page_from_search").val($("#page_from_search").val()+"_repeat")
}
$("#search_form")[0].submit()
}
SearTie.conveySearchType()
};
SearTie.storageHistory= function(a) {
var b=$.storage.get("search_history")||"";
var c=[a];
if(b) {
b=b.split("#");
$.each(b, function(d,e) {
if(e!=a) {
c.push(e)
}
});
c.slice(0,SearTie.historyLength)
}
$.storage.set("search_history",c.join("#"))
};
SearTie.appendNode= function() {
var a="<div id='search_switcher_wrap' class='search_switcher_wrap'>";
if(SearTie.isEnterForum) {
a+='<a id="searchPost" href="javascript:;">\u641c\u7d22</a>'
} else {
a+='<a id="enterForum" href="javascript:;">\u8fdb\u5427</a>'
}
a+="</div>";
$("#search_switcher_btn").append(a)
};
SearTie.bindEnterForum= function() {
$("#enterForum").die("click").live("click", function(b) {
var a=$("#kw").val().trim();
$("#search_switcher_wrap").remove();
SearTie.searchForum(a)
})
};
SearTie.bindSearchPost= function() {
$("#searchPost").die("click").live("click", function(b) {
var a=$("#kw").val().trim();
$("#search_switcher_wrap").remove();
SearTie.searchAll(a)
})
};
SearTie.conveySearchType= function() {
_.eventCenter.trigger("searchAndEnterChange",SearTie.isEnterForum)
};
SearTie.init= function(a) {
SearTie.default_word=a.word;
$("#btn").html(SearTie.isEnterForum?"\u8fdb\u5427":"\u641c\u7d22");
$("#search_switcher_btn").die("click").live("click", function(b) {
if($("#search_switcher_wrap")[0]) {
$("#search_switcher_wrap").remove()
} else {
SearTie.appendNode()
}
});
SearTie.bindEnterForum();
SearTie.bindSearchPost();
SearTie.historyLength=6;
$("#btn").bind("click", function() {
SearTie.executeCommand()
});
$(document).bind("click", function(b) {
if($("#search_switcher_wrap")[0]&&b.target!=$("#search_switcher_btn")[0]&&b.target!=$("#search_switcher_btn>small")[0]) {
$("#search_switcher_wrap").remove()
}
});
_.eventCenter.on("search_all",SearTie.searchAll);
_.eventCenter.on("search_forum",SearTie.searchForum);
_.eventCenter.on("search_execute",SearTie.executeCommand);
_.eventCenter.on("getSearchType",SearTie.conveySearchType)
};
;
function docheck(a) {
if(a.word.value.trim()=="") {
return false
} else {
_.eventCenter.trigger("search_execute");
return false
}
}
var search= {
hide: function() {
$("#header").hide()
},show: function() {
$("#header").show()
},listenEvent: function() {
_.eventCenter.on("header_hide",_.bind(search.hide,search));
_.eventCenter.on("header_show",_.bind(search.show,search))
}
};
;
var GoTop= {
conf: {
showGoTopPage:1
},_clientHeight:document.documentElement.clientHeight,_scrollHeight:document.documentElement.scrollHeight,_footerHeight:0,_updateClientHeight: function() {
this._clientHeight=document.documentElement.clientHeight
},init: function(c,e,d,b,a) {
if(c==-1) {
return
}
this._initDom(c,a);
if(this._iosVersion()>=5&&this._iosVersion()<6) {
this._initEventIOS5(e)
} else {
if(b==null) {
this._initEventIOS5(e)
} else {
this._initEvent(e,b)
}
}
if(!this._isFixedSupported()) {
this._emulateFixed.init()
}
if(d) {
window.setTimeout(function() {
GoTop._footerHeight=document.body.clientHeight-$(d).offset().top
},0)
}
},_initDom: function(b,a) {
var c;
if(b!==undefined) {
this.conf.showGoTopPage=b
}
if($(".goTop").length==0) {
c=document.createElement("a");
c.className="goTop";
c.href="#";
$(a||"body").append($(c))
} else {
c=$(".goTop")[0]
}
this._el=c
},_initEventIOS5: function(c) {
var b=this;
var a="onorientationchange" in window?"orientationchange":"resize";
$(".goTop").bind("click", function(d) {
scrollPos(c||0,0,200);
d.stopPropagation();
d.preventDefault()
});
$(window).bind("scroll", function() {
if(window.pageYOffset<b.conf.showGoTopPage*b._clientHeight) {
$(b._el).hide()
} else {
if(b._isFixedSupported()) {
if(b._ifReachBottom()) {
$(b._el).css({
top:$("body").height()-GoTop._footerHeight+"px",position:"absolute"
})
} else {
$(b._el).css({
bottom:"8px",position:"fixed",top:"auto"
})
}
}
$(b._el).show()
}
}).bind(a, function() {
b._updateClientHeight();
$(this).trigger("scroll")
});
$(window).trigger(a)
},_initEvent: function(d,b) {
var c=this;
var a="onorientationchange" in window?"orientationchange":"resize";
$(".goTop").bind("click", function(f) {
if($(f.target).hasClass("goBottomStyle")) {
if($(b).length>0) {
scrollPos(b||0,0,200)
} else {
scrollPos("#post"||0,0,200)
}
} else {
scrollPos(d||0,0,200)
}
f.stopPropagation();
f.preventDefault()
});
$(window).bind("scroll", function() {
if(window.pageYOffset<c.conf.showGoTopPage*c._clientHeight) {
$(c._el).addClass("goBottomStyle")
} else {
if(c._isFixedSupported()) {
if(c._ifReachBottom()) {
$(c._el).css({
top:$("body").height()-GoTop._footerHeight+"px",position:"absolute"
})
} else {
$(c._el).css({
bottom:"8px",position:"fixed",top:"auto"
})
}
}
$(c._el).removeClass("goBottomStyle")
}
}).bind(a, function() {
c._updateClientHeight();
$(this).trigger("scroll")
});
$(window).trigger(a)
},_ifReachBottom: function() {
if(($("body").height()-window.pageYOffset-window.innerHeight+46)<=this._footerHeight) {
return true
} else {
return false
}
},_iosVersion: function() {
var b=navigator.userAgent.match(/(iPad|iPhone|iPod).*OS\s([\d_]+)/);
if(b!==null) {
var a=b[2].replace(/_/g,".").split(".")[0];
return a
}
},_isFixedSupported: function() {
var a=this._iosVersion();
return a?(a>4):true
},_emulateFixed: {
init: function() {
var a=this;
GoTop._el.style.position="absolute";
$(document.body).bind("touchstart", function(b) {
if(b.target.className=="goTop") {
return
}
GoTop.hide()
});
$(window).bind("touchend scroll", function() {
a._setAbsPos();
GoTop.show()
})
},_setAbsPos: function() {
var a;
if(GoTop._ifReachBottom()) {
a=document.documentElement.scrollHeight-GoTop._footerHeight-19
} else {
a=window.pageYOffset+window.innerHeight-8-38
}
GoTop._el.style.top=a+"px"
}
},hide: function() {
GoTop._el.style.visibility="hidden"
},show: function() {
GoTop._el.style.visibility="visible"
}
};
;
function Dialog(a) {
this.option=a;
this._create();
this._bindEvents()
}
Dialog.prototype= {
_assembleHTML: function() {
var c=this.option, d=c.okbtn?(c.cancelbtn?2:1):(c.cancelbtn?1:0), a= function(e) {
return typeof e==="undefined"?"":String(e)
}, b="";
if( typeof c.mask==="undefined"||!!c.mask) {
b+='<div id="dia_mask_'+this.id+'" class="dia_mask"></div>'
}
b+='<div data id="dia_wrapper_'+this.id+'" class="dia_wrapper '+a(c.wrapperClass)+'" style="'+a(c.wrapperStyle)+'">';
if(c.closebtn) {
b+='<a class="j_dia_closebtn dia_closebtn_container" href="#"><span class="dia_closebtn"></span></a>'
}
b+='<div class="j_dia_title dia_title" style="'+a(c.titleStyle)+'">'+a(c.title)+"</div>";
b+='<div class="j_dia_content dia_content" style="'+a(c.contentStyle)+'">'+a(c.content)+"</div>";
b+='<div class="dia_btnwrapper">';
if(c.cancelbtn) {
b+='<a href="#" style="'+a(c.cancelbtnStyle)+'" class="j_dia_cancelbtn dia_btn dia_cancelbtn dia_btn_l'+d+'">'+c.cancelbtn+"</a>"
}
if(c.okbtn) {
b+='<a href="#" style="'+a(c.okbtnStyle)+'" class="j_dia_okbtn dia_btn dia_okbtn dia_btn_l'+d+'">'+c.okbtn+"</a>"
}
b+="</div></div>";
return b
},_create: function() {
this.id=this.option.id||(((1+Math.random())*4096)|0).toString(16);
$("body").append(this._assembleHTML());
this.maskdom=$("#dia_mask_"+this.id);
this.dom=$("#dia_wrapper_"+this.id);
this._setPosition()
},_setPosition: function() {
if(this.option.fixed) {
this.dom.css("position","fixed");
this.maskdom.css("height",document.height+"px")
} else {
this.maskdom.css("height",document.height+"px");
this.dom.css("top",parseInt(window.innerHeight/2+window.scrollY)+"px")
}
},_bindEvents: function() {
var a=this.dom, b=this.maskdom;
b.on("touchstart", function(c) {
c&&c.preventDefault()
});
a.on("touchmove", function(c) {
c&&c.preventDefault()
});
a.on("click",".j_dia_closebtn", function(c) {
c.preventDefault();
a.trigger("close")
}).on("click",".j_dia_cancelbtn", function(c) {
c.preventDefault();
a.trigger("cancel")
}).on("click",".j_dia_okbtn", function(c) {
c.preventDefault();
a.trigger("ok")
})
},getOkBtn: function() {
return this.dom.find(".j_dia_okbtn")
},getCancelBtn: function() {
return this.dom.find(".j_dia_cancelbtn")
},hide: function() {
this.maskdom.remove();
this.dom.remove()
},remove: function(a) {
this.maskdom.remove();
this.dom.remove();
if(a) {
this.dom.off();
this.maskdom=null;
this.dom=null
}
},rebuild: function() {
this.maskdom&&this.maskdom.appendTo("body");
this.dom&&this.dom.appendTo("body");
this._setPosition()
},setTitle: function(a) {
if( typeof a!=="string") {
return false
}
this.dom.find(".j_dia_title").html(a)
},setContent: function(a) {
if( typeof a!=="string") {
return false
}
this.dom.find(".j_dia_content").html(a)
}
};
;(function(a) {
a.toast= {
id:"j_toast",showing:false,timeout: function() {
},send: function(e,f,b) {
var d=this, g=a("#"+this.id), c= typeof b=="string"?b:"";
e= typeof e=="string"?e:"", f=parseInt(f)||2500;
if(!e) {
return false
}
clearTimeout(this.timeout);
if(g.length>0) {
g.html(e)
} else {
g=a("<div id='"+this.id+"' class='bodytoast "+c+"'>"+e+"</div>");
a("body").append(g);
this.showing=true
}
this.timeout=setTimeout(function() {
a.toast.kill()
},f)
},kill: function() {
a("#"+this.id).remove();
this.showing=false;
clearTimeout(this.timeout)
}
}
})(Zepto);
;
function Bookmark(b,a,c) {
this.indexName="bookmark/"+b;
this.tbs=a;
this.base_url=c;
this.onlineUrls= {
add:this.base_url+"addstore",del:this.base_url+"rmstore",read:this.base_url+"threadstore"
};
this.sendTwenty()
}
Bookmark.prototype= {
maxLength:100,set: function(b) {
if( typeof b==="string") {
try {
window.localStorage.setItem(this.indexName,b);
return true
} catch(a) {
return false
}
}
},get: function() {
try {
return window.localStorage.getItem(this.indexName)
} catch(a) {
return ""
}
},remove: function() {
try {
window.localStorage.removeItem(this.indexName);
return true
} catch(a) {
return false
}
},hasLocalStorage: function() {
try {
window.localStorage.setItem("bookmark.test","hello, world");
window.localStorage.removeItem("bookmark.test");
return true
} catch(a) {
return false
}
},save: function(a) {
if(Array.isArray(a)) {
return this.set(JSON.stringify(a))
}
return false
},read: function() {
var a=this.get();
if(!a) {
return new Array()
} else {
return JSON.parse(a)
}
},getLatest: function(e,h) {
var f=this.read(), g=[], b=e>1?e:1;
if( typeof h=="string") {
for(var d=0, a=f.length, c=0;d<a;d++) {
if(f[d]["word"]==h) {
g.push(f[d]);
if(++c==b) {
break
}
}
}
return g
} else {
return f.slice(0,b)
}
},hasBooked: function(c) {
var b=this.read(), a=b.every(function(e,d,f) {
if(e.tid==c) {
return false
}
return true
});
return !a
},add: function(f,a,g,e,b) {
var d=this.read(), c=d.every(function(j,i,k) {
if(j.kz==b) {
var h=k.splice(i,1)[0];
h.time=new Date()-0;
h.tid=f;
h.un=a;
k.unshift(h);
return false
}
return true
});
if(!c) {
this.save(d);
return {
no:0,error:"\u66f4\u65b0\u4e66\u7b7e\u6210\u529f"
}
}
if(d.length>=this.maxLength) {
d=d.slice(0,-1)
}
d.unshift({
tid:f,un:a,title:g,word:e,kz:b,time:new Date()-0
});
if(this.save(d)) {
return {
no:0,error:"\u6dfb\u52a0\u4e66\u7b7e\u6210\u529f"
}
} else {
return {
no:1,error:"\u672c\u5730\u5b58\u50a8\u5931\u6548"
}
}
},del: function(c) {
var a=this.read(), b=a.filter(function(e,d,f) {
if(e.tid==c) {
return false
}
return true
});
return this.save(b)
},delOldest: function() {
var a=this.read(), b=a.slice(0,-1);
return this.save(b)
},getLength: function() {
return this.read().length
},clear: function() {
this.remove()
},readOnline: function(e,d,f) {
var a=d>-1?d:10, b=e>-1?e:0, c=this.onlineUrls.read+"?rn="+a+"&offset="+b+"&is_ajax=1&lp=home_collect_more";
$.getJSON(c, function(g) {
if( typeof f=="function") {
f(g)
}
})
},delOnline: function(b,c) {
var a=this;
$.ajax({
type:"POST",url:a.onlineUrls.del,data: {
tid:b,tbs:a.tbs
},success: function(d) {
if( typeof c=="function") {
c(d)
}
},dataType:"json"
})
},addOnline: function(b,d,a,e) {
var c=[{
tid:b,pid:d,status:a
}];
this._addOnline(c,e)
},_addOnline: function(b,c) {
var a=this;
$.ajax({
type:"POST",url:a.onlineUrls.add,data: {
data:JSON.stringify(b),tbs:a.tbs
},success: function(d) {
if( typeof c=="function") {
c(d)
}
},error: function(d) {
},dataType:"json"
})
},getTwenty: function() {
var e=this.read().slice(0,20), a=[];
for(var d=0, b=e.length;d<b;d++) {
var c=e[d];
a.push({
tid:c.kz,pid:c.tid,status:0
})
}
return a
},delTwenty: function() {
var a=this.read(), b=a.slice(20);
return this.save(b)
},sendTwenty: function() {
var b=this, a=this.getTwenty();
if(a.length>0) {
this._addOnline(a, function(c) {
if(c.no==0&&b.delTwenty()) {
b.sendTwenty()
}
})
} else {
this.clear()
}
}
};
;
var UserAccount=(function() {
var c=0;
var b=false;
function a(e) {
var f=new Dialog({
title:e.title||"\u786e\u8ba4\u8df3\u8f6c",okbtn:e.okbtn||"\u786e\u8ba4",cancelbtn:"\u53d6\u6d88",content:e.content
});
f.dom.on("ok", function() {
if( typeof e.callback=="function") {
e.callback()
}
f.remove()
});
f.dom.on("close", function() {
f.remove()
});
f.dom.on("cancel", function() {
f.remove()
});
return f
}
function d(e) {
var g=window.location.href;
var f=g.split("#")[0];
if(f.search("&last=1")) {
f.replace("&last=1","")
}
if(f.search("pn=")!=-1) {
f=f.replace(/pn\=(\d+)/i,"pn="+e)
} else {
f+="&pn="+e
}
if( typeof arguments[1]=="string") {
f+="&"+arguments[1]+"="+1
}
return f
}
return {
init: function(e) {
var f=e|| {};
if(f.open_third_login) {
c=1
}
if(f.isNative) {
b=true
}
},login: function(f) {
var g=d(f), e;
if( typeof arguments[1]=="string") {
g=d(f,arguments[1])
}
e="http://wappass.baidu.com/passport/?login&tn=bdIndex&regtype=1&tpl=tb&u="+encodeURIComponent(g)+this._addNativeQuery();
if(c) {
e+="&authsite=1"
}
window.location.href=e
},_addNativeQuery: function() {
if(b) {
return "&jump_tieba_native=1&jumptologin=1"
}
return ""
},logout: function(f) {
var e="http://wappass.baidu.com/passport/?logout&tn=bdIndex&tpl=tb&u="+encodeURIComponent(this.getCurUrl(f))+this._addNativeQuery;
window.location.href=e
},fillUname: function(g) {
var f=g||window.location.href;
var e=window.origin+"/mo/q/openitb?u="+encodeURIComponent(g);
window.location.href="http://wappass.baidu.com/passport/fillname?tpl=tb&tn=bdIndex&u="+encodeURIComponent(e)+this._addNativeQuery
},bindAccount: function(f) {
var e=f||window.location.href;
window.location.href="http://wappass.baidu.com/v2/?bindingaccount&tpl=tb&u="+encodeURIComponent(e)+this._addNativeQuery
},showNoUnDialog: function(f) {
var g=f|| {};
var e=this;
a({
title:"\u8be5\u529f\u80fd\u9700\u8981\u586b\u5199\u7528\u6237\u540d",content:"",okbtn:"\u586b\u5199",callback: function() {
if( typeof g.callback=="function") {
g.callback()
}
e.fillUname()
}
})
},showBindAccountDialog: function(f) {
var e=this;
var g=f|| {};
a({
title:g.text||"\u8be5\u529f\u80fd\u9700\u8981\u5148\u5b8c\u5584\u4e2a\u4eba\u4fe1\u606f",callback: function() {
if( typeof g.callback=="function") {
g.callback()
}
e.bindAccount()
}
})
},showLoginDialog: function(f) {
var e=this;
var g=f|| {};
a({
title:g.text||"\u4f60\u9700\u8981\u5148\u767b\u5f55\uff0c\u624d\u80fd\u8fdb\u884c\u6b64\u64cd\u4f5c",content:"",callback: function() {
if( typeof f.callback=="function") {
f.callback()
}
e.login()
}
})
}
}
})();
;