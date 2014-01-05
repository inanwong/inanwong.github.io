F.module("spb/component/floor_list", function(b,a) {
a=_.Widget.extend({
events: {
"click .j_freply_btn":"floorReplay","click .j_floor_vipdel":"confirmDelFloorList"
},getFloorNum: function(c) {
return c.attr("data-list-count")
},getFloorData: function(f) {
var c=f.attr("data-info");
try {
return JSON.parse(c)
} catch(d) {
return null
}
},confirmDelFloorList: function(c) {
c.preventDefault();
var d=this;
ConfirmDialog.show({
content:"\u786e\u8ba4\u5220\u9664\u5417\uff1f",ok_callback: function() {
d.floorVipDel(c.target)
}
})
},floorVipDel: function(g) {
var d=$(g).closest("li"), c=this.options.conf, h=this, e=d.attr("pid"), f=c.base_url+"m?ntn=bdPLW&tn=baiduManagerSubmit&delete_my_post=1&tbs="+c.tbs+"&z="+c.kz+"&fid="+c.fid+"&word="+encodeURIComponent(c.word)+"&lp=6076&pid="+e+"&sc="+e+"&lm="+c.fid+"&src=3&is_vipdel="+c.is_vipdel;
_.eventCenter.trigger("loading_show");
$.ajax({
url:f,type:"GET",dataType:"json",cache:false,success: function(i) {
_.eventCenter.trigger("loading_hide");
if(i&&i.no==0) {
h.removeFloor(d)
} else {
if(i.error) {
alert(i.error)
} else {
alert("\u5220\u9664\u5931\u8d25\uff01")
}
}
},error: function() {
_.eventCenter.trigger("loading_hide");
alert("\u5220\u9664\u5931\u8d25!")
}
})
},buildUnRealFloorHtml: function(e,f,g) {
var d=this.options.conf.base_url+"/i?un="+g, c='<li class="fmain"><div class="floor_footer_item"><a href="'+d+'" class="user_name fl">'+g+'</a><span class="list_item_time" style="padding-right: 50px;">'+f+'</span></div><div class="floor_content">'+e+"</div></li>";
return c
},floorReplay: function(k) {
k.preventDefault();
var g=this.options.conf, r=$(k.target), i=r.closest("li"), o=i.parents("li"), q=this.getFloorData(i), f=this.getFloorData(o), l=q.un, d=r.closest(".j_floor_list"), p=r.closest(".j_floor_panel"), j=this, c= {}, n;
if(!g.is_login) {
try {
var h= {};
h.isMainLzl=false;
h.lzl_id=q.pid;
h.pid=f.pid;
$.storage.set("pb_lzl_postor_login_back",JSON.stringify(h))
} catch(m) {
console.log("The localStorage is disabled!")
}
UserAccount.login();
return
}
$.get(g.base_url+"pv?lp=6046&fid="+g.fid);
n=$(".j_floor_editor",p);
if(n.length>0) {
n.remove();
i.append(n);
n.show()
} else {
i.after('<div class="j_floor_editor"></div>')
}
setTimeout(function() {
c.floor_num=p.closest("li").attr("fn");
c.pid=p.closest("li").attr("tid");
c.at_name=l;
c.lzl_id=r.closest("li").attr("pid");
c.outerContainer=p.find(".j_floor_editor");
_.eventCenter.trigger("postor_lzl_reply_at",c)
},10)
},removeFloor: function(c) {
var d=c.closest(".j_floor_panel"), e=this.getFloorNum(d);
c.remove();
this.eventCenter.trigger("floormain_updatefloornum",d,e);
this.eventCenter.trigger("flist_updatefloornum",d.closest("li"),e-1)
},addFloor: function(d) {
var c=this.buildUnRealFloorHtml(d.content,this.getFormatDate(),d.username), f=d.childNode.closest(".j_floor_panel"), e=f.find(".flist"), g=0;
g=this.getFloorNum(f);
if(e.children().length==0) {
f.find(".j_floor_til").show()
}
this.eventCenter.trigger("floormain_updatefloornum",f,parseInt(g)+1);
this.eventCenter.trigger("flist_updatefloornum",f.closest("li"),parseInt(g)+1);
e.append(c);
f.find(".j_floor_editor").hide()
},scrollToLastLzl: function(c) {
var e=c.closest(".j_floor_panel").find(".flist");
var d=e.children().last().offset()["top"];
window.scrollTo(0,(d-window.innerHeight/2+25))
},addMoreFloorHtml: function(c,d) {
c.find(".flist").append(d)
},initialize: function() {
this.initEvent();
this.listenEvent()
},initEvent: function() {
},listenEvent: function() {
this.eventCenter.on("floor_remove",_.bind(this.removeFloor,this));
this.eventCenter.on("floor_add",_.bind(this.addFloor,this));
this.eventCenter.on("floor_scroll_to_last_lzl",_.bind(this.scrollToLastLzl,this))
},getFormatDate: function() {
var c=new Date();
var e=c.getHours();
var d=c.getMinutes();
if(d<10) {
d="0"+d
}
return e+":"+d
}
});
return a
},[]);