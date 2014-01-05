var _pb= {
focused:null,focusedFlag:false,net_type:1,setPbImageWidth: function(a) {
var d=a.scale||0.8, c=Math.min(screen.width,screen.height)-20;
var b=c*d;
if($.cookie("IS_SAVE_FLOW")=="0"&&a.net_type==2) {
b=c*d
} else {
b=a.net_type==1?c:a.net_type==2?150:c*d
}
$.cookie("SET_PB_IMAGE_WIDTH",b,365)
},leaveInput: function() {
var b=$(".goTop"), a=false;
$(document).bind("touchstart", function() {
a=false
});
$(document).bind("touchmove", function() {
a=true
});
$(document).bind("touchend", function(g) {
var f=g.target, c=f.tagName, d=f.className;
if(c.toLocaleLowerCase()=="input"||c.toLocaleLowerCase()=="textarea") {
if(!a) {
if(d.indexOf("j_input_box")>=0) {
if(b.length>0) {
b.hide()
}
}
_pb.focused=f;
_pb.focusedFlag=true
}
} else {
if(d.indexOf("cross")>=0||c.toLocaleLowerCase()=="b"||f.id=="search-bar"||d.indexOf("search-button")>=0) {
_pb.focused=_pb.focused;
_pb.focusedFlag=true
} else {
if(_pb.focused!=null) {
setTimeout(function() {
_pb.focused.blur()
},120)
}
if(window.pageYOffset>2*document.documentElement.clientHeight+$("#i_head").offset().top) {
b.show()
}
_pb.focusedFlag=false
}
}
})
},saveflowOpen: function() {
_pb.setPbImageWidth({
net_type:_pb.net_type
})
},saveflowClose: function() {
_pb.setPbImageWidth({
net_type:_pb.net_type
})
},init: function(a) {
_pb.net_type=a.net_type;
_pb.baseUrl=a.baseUrl;
_.eventCenter.on("saveflow_open",_pb.saveflowOpen);
_.eventCenter.on("saveflow_close",_pb.saveflowClose);
hashMoni({
"^[0-9]*[0-9][0-9]*$|^s*$": function(b) {
_.eventCenter.trigger("hash_change",b)
}
});
if($.os.ios) {
_pb.leaveInput()
}
_pb.setPbImageWidth({
net_type:a.net_type
});
saveTrafficModeSwitch.init();
saveTrafficModeTip.init(a.net_type);
$(window).bind("pageshow", function() {
saveTrafficModeSwitch.init()
});
_.eventCenter.trigger("page_init");
_pb.listenEvent();
window.onpageshow= function() {
$(".client_download_tip").css("display","none")
}
},listenEvent: function() {
_.eventCenter.on("glob_hide",_.bind(_pb.hide,_pb));
_.eventCenter.on("glob_show",_.bind(_pb.show,_pb))
},hide: function() {
$("#glob").hide()
},show: function() {
$("#glob").show()
}
};