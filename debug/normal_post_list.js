F.module("spb/widget/normal_post_list", function(c,b) {
var a= {
updateFloorNum: function(d,e) {
if(e>0) {
d.find(".j_reply_num").html(e).addClass("pb_icon")
} else {
d.find(".j_reply_num").html("")
}
},isFloorShow: function(d) {
if(d.css("disply")=="none"||d.children().length==0) {
return false
}
return true
},removePost: function(d) {
d.remove()
},getFloorNum: function(d) {
return d.attr("data-list-count")
}
};
b=_.Widget.extend({
events: {
"click .j_nreply_btn":"floorReply","click .j_vipdel":"deleteUserThread","click .j_posdel":"delPost","click .smodemore":"saveFlowLoadMore"
},conf: {
base_url:"",kz:"",is_login:false,see_lz:0,word:"",fid:"",tbs:"",page:1,has_url_param:"",page_type:"",loadErrMsg:"\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u5237\u65b0\u6d4f\u89c8\u5668\u5c1d\u8bd5",save_flow_html:""
},initialize: function(d) {
this.listenEvent();
$.extend(this.conf,d.conf);
var f=this, e=this.conf.page;
this.pageTurn=new PageTurn({
node:$("#po_list"),currentPage:e.current_page,totalPage:e.total_page,getData: function(g) {
f.getData(g)
}
});
( typeof PDC!="undefined")&&PDC.mark("c_pageturnavi");
$("#glob").refresh({
ready: function(g,h) {
var i=this;
_.eventCenter.trigger("flist_showmoredata")
},threshold:-1800
});
this.initLazyLoad();
this.autoShowData();
( typeof PDC!="undefined")&&PDC.mark("c_loadmoreavi")
},initLazyLoad: function() {
$(".j_media_thumb_holder").imglazyload({
threshold:600,startload: function(e,d) {
$(d).addClass(e.attr("data-class"));
if(e.attr("data-type")=="gif") {
$(d).attr("type","gif");
$('<span class="gif_mark"></span>').insertBefore($(e))
}
}
}).on("error", function(d) {
d.preventDefault()
})
},loadError: function() {
_.eventCenter.trigger("loading_hide");
alert(this.conf.loadErrMsg)
},delThread: function(g) {
var d=$(g).closest("li"), e=d.attr("tid"), f=data.base_url+"m?&ntn=bdPLW&tn=baiduManagerSubmit&tbs="+data.tbs+"&z="+data.kz+"&fid="+data.fid+"&word="+encodeURIComponent(data.word)+"&lp=6076&pid="+e+"&sc="+e+"&lm="+data.fid+"&is_vipdel=1";
_.eventCenter.trigger("loading_show");
$.ajax({
url:f,type:"GET",dataType:"json",cache:false,success: function(h) {
_.eventCenter.trigger("loading_hide");
if(h&&h.no==0) {
d.remove()
} else {
if(h.error) {
alert(h.error)
} else {
alert("\u5220\u9664\u5931\u8d25\uff01")
}
}
},error: function() {
_.eventCenter.trigger("loading_hide");
alert("\u5220\u9664\u5931\u8d25!")
}
})
},autoShowData: function() {
if(this.options.conf.net_type==1&&this.isLoginBack()!="1") {
setTimeout(function() {
_.eventCenter.trigger("flist_showmoredata")
},1000)
}
},isLoginBack: function() {
try {
return window.localStorage.pb_main_postor_login_back||window.localStorage.pb_lzl_postor_login_back
} catch(d) {
return false
}
},getData: function(d,i) {
var f=this.conf, h=d||"", e=f.base_url+"m?kz="+f.kz+h+"&has_url_param="+f.has_url_param+"&is_ajax=1&post_type=normal&_t="+(new Date()).getTime();
if(h.indexOf("pn")==-1) {
e+="&pn="+this.conf.page.offset
}
if(h.indexOf("see_lz")==-1) {
e+="&see_lz="+this.conf.see_lz
}
var g=this;
_.eventCenter.trigger("loading_show");
$.ajax({
url:e,type:"GET",dataType:"json",success: function(j) {
var k;
_.eventCenter.trigger("loading_hide");
if(j&&j.no==0) {
k=j.data;
g.$el.html(k.html);
g.trigger("postor_lzl_destory_all");
g.updatePageObj(k.page);
if(window.location.hash.replace("#","")!=k.page.offset) {
g.updateHistoryDepth();
g.updatePageNum(k.page.offset);
g.updateBrowserHash(k.page.offset)
}
$("#glob").refresh("this").afterDataLoading("down");
g.autoShowData();
setTimeout(function() {
g.pageTurn.changeConf({
currentPage:k.page.current_page,totalPage:k.page.total_page
});
g.conf.save_flow_html=k.save_flow_html
},10);
_.eventCenter.trigger("spb_datalist_loaded");
if( typeof i=="function") {
i()
} else {
g.eventCenter.trigger("top_bar_scroll_to")
}
} else {
g.loadError()
}
},error: function() {
g.loadError()
}
})
},updateBrowserHash: function(d) {
window.location.hash=d;
$.sessionstorage.available()&&$.sessionstorage.set("slide_image_use_hash",d);
this.eventCenter.trigger("browser_hash",d)
},updatePageNum: function(d) {
this.conf.page.offset=d;
this.eventCenter.trigger("pageinfo_update_pn",d)
},updatePageObj: function(d) {
this.conf.page=d;
this.eventCenter.trigger("pageinfo_update_pageobj",d)
},updateHistoryDepth: function() {
this.conf.history_depth-=1;
this.eventCenter.trigger("history_depth_update",this.conf.history_depth)
},delPost: function(h) {
h.preventDefault();
var d=h.target, g=this, f=$(d).attr("href");
var i= function() {
$.loading();
$.ajax({
url:f,type:"GET",dataType:"json",cache:false,success: function(e) {
$.unloading();
if(e&&e.no==0) {
window.location.href=g.conf.base_url+"m?kw="+encodeURIComponent(g.conf.word)
} else {
if(e.error) {
alert(e.error)
} else {
alert("\u5220\u9664\u5931\u8d25\uff01")
}
}
},error: function() {
$.unloading();
alert("\u5220\u9664\u5931\u8d25!")
}
})
};
ConfirmDialog.show({
content:"\u786e\u8ba4\u5220\u9664\u8fd9\u6761\u8d34\u5b50?",ok_callback:i
})
},deleteUserThread: function(f) {
var d=this;
f.preventDefault();
ConfirmDialog.show({
content:"\u786e\u8ba4\u5220\u9664\u5417\uff1f",ok_callback: function() {
d.vipDel(f.target)
}
})
},vipDel: function(g) {
var h=this.conf;
var d=$(g).closest("li"), e=d.attr("tid"), f=h.base_url+"m?&ntn=bdPLW&tn=baiduManagerSubmit&delete_my_post=1&tbs="+h.tbs+"&z="+h.kz+"&fid="+h.fid+"&word="+encodeURIComponent(h.word)+"&lp=6076&pid="+e+"&sc="+e+"&lm="+h.fid+"&is_vipdel="+h.is_vipdel;
$.loading();
$.ajax({
url:f,type:"GET",dataType:"json",cache:false,success: function(i) {
$.unloading();
if(i&&i.no==0) {
d.remove()
} else {
if(i.error) {
alert(i.error)
} else {
alert("\u5220\u9664\u5931\u8d25\uff01")
}
}
},error: function() {
$.unloading();
alert("\u5220\u9664\u5931\u8d25!")
}
})
},saveFlowLoadMore: function(d) {
if($.trim(this.conf.save_flow_html)!="") {
$("#manualLoadMore").remove();
$("#pblist").append(this.conf.save_flow_html);
this.conf.save_flow_html="";
_.eventCenter.trigger("floorlist_loadmore_complete")
}
},getFloorData: function(g) {
var d=g.attr("data-info");
try {
return JSON.parse(d)
} catch(f) {
return null
}
},floorReply: function(j) {
j.preventDefault();
var h=$(j.target), f=h.closest("li"), d=this.getFloorData(f);
if(!this.conf.is_login) {
try {
var i= {};
i.isMainLzl=true;
i.pid=d.pid;
$.storage.set("pb_lzl_postor_login_back",JSON.stringify(i))
} catch(g) {
console.log("The localStorage is disabled!")
}
UserAccount.login()
} else {
this.normalReplyBtn(j.target)
}
},normalReplyBtn: function(h) {
var e=$(h).closest("li"), i=e.attr("fn"), f, d, j=0;
if(i==1) {
this.eventCenter.trigger("postor_focus_to_main")
} else {
f=e.attr("tid");
d=e.find(".j_floor_panel");
var g=this.conf.page_type;
if(!a.isFloorShow(d)) {
if(g>0) {
_.eventCenter.trigger("manage_post_hide",e.find(".j_mid_mpanel"))
}
this.eventCenter.trigger("floormain_showfloor",d,f,i);
this.eventCenter.trigger("floor_show_editor",d);
j=a.getFloorNum(d);
if(j==0) {
d.removeClass("fr_list_arrow")
}
} else {
if(e.attr("is_inner_floor")!=0) {
if(g>0) {
_.eventCenter.trigger("manage_post_hide",e.find(".j_mid_mpanel"))
}
d.show();
this.eventCenter.trigger("floor_show_editor",d)
} else {
j=a.getFloorNum(d);
if(j<1) {
this.eventCenter.trigger("floormain_hidefloor",d)
} else {
if(d.find(".j_floor_editor").length>0&&d.find(".j_floor_editor").children().length>0) {
this.eventCenter.trigger("floormain_hidefloor",d.find(".j_floor_editor"))
} else {
this.eventCenter.trigger("floor_show_editor",d)
}
}
}
}
}
},seeLatestPost: function() {
this.getData("&last=1", function() {
setTimeout(function() {
_.eventCenter.trigger("flist_showmoredata");
var d=$(".list>li:last-child").offset()["top"];
window.scrollTo(0,d)
},100)
})
},listenEvent: function() {
this.eventCenter.on("flist_refresh",_.bind(this.getData,this));
this.eventCenter.on("flist_updatefloornum",a.updateFloorNum);
this.eventCenter.on("flist_removepost",a.removePost);
this.eventCenter.on("flist_see_latest_post",_.bind(this.seeLatestPost,this));
this.eventCenter.on("flist_showmoredata",_.bind(this.saveFlowLoadMore,this))
}
});
return b
},[]);