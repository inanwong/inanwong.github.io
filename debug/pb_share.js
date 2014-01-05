F.module("spb/component/pb_share", function(b,a) {
var c=F.require("sglobal/component/app_starter");
a=_.Widget.extend({
events: {
"click #j_share_hide":"hide"
},initialize: function() {
this.supportFixed=true;
var d=$.os;
if(d.ios&&parseInt(d.version)>4) {
$("body").append("<style>.pb_share_wrapper{-webkit-transition: bottom 200ms ease;}</style>")
} else {
if(!d.android||(d.android&&parseInt(d.version)<2)) {
this.supportFixed=false;
$("body").append("<style>.pb_share_overlay, .pb_share_wrapper{position:absolute;}</style>")
}
}
this.eventCenter.on("pb_share_show",_.bind(this.show,this))
},buildDom: function() {
var e=this.options.share_urls;
var d="<div class='j_pb_share_overlay pb_share_overlay'></div><div class='j_pb_share pb_share_wrapper'><div class='pb_share_inner_wrapper'><a class='pb_share_item' href='"+e.tsina+"' >\u5206\u4eab\u5230\u65b0\u6d6a\u5fae\u535a</a><a class='pb_share_item' href='"+e.tqq+"'>\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a</a><a class='pb_share_item' href='"+e.renren+"'>\u5206\u4eab\u5230\u4eba\u4eba\u7f51</a><a class='pb_share_item j_pb_share_client' href='"+e.client+"'>\u5206\u4eab\u5230\u5fae\u4fe1</a><a class='pb_share_item pb_share_cancel' href='#' id='j_share_hide'>\u53d6\u6d88</a></div></div>";
return d
},show: function() {
var d=this.buildDom(), e=this;
var g=$(d);
var f=g.find(".j_pb_share_client");
c.bind(f, {
isIos:!!$.os.ios,downloadUrl:e.options.share_urls.client,page:"spb",param:e.options.kz,baseUrl:e.options.base_url,lp:!!$.os.ios?"spb_share_client_ios_start":"spb_share_client_andriod_start"
});
this.dom=g.appendTo("body");
if(e.supportFixed) {
setTimeout(function() {
e.dom.eq(1).addClass("pb_share_animate")
},0)
} else {
var h=window.scrollY;
e.dom.eq(0).css("top",h+"px");
e.dom.eq(1).css("bottom",(0-h)+"px")
}
e.dom.on("touchmove",".j_pb_share", function(i) {
i.preventDefault();
e.hide()
}).on("touchstart",".j_pb_share_overlay", function(i) {
i.preventDefault();
e.hide()
})
},hide: function(f) {
var d=this;
f&&f.preventDefault();
d.dom.eq(1).removeClass("pb_share_animate");
this.dom.eq(0).remove();
window.setTimeout(function() {
d.dom.eq(1).remove()
},200)
}
});
return a
},[]);