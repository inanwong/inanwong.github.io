F.module("spb/widget/ghost", function(b,a) {
a=_.Widget.extend({
events: {
"click #j_ghost_forum":"doBack","click #j_ghost_tool_reply":"doReply","click #j_ghost_tool_collect":"doCollect","click #j_ghost_tool_share":"doShare","click #j_ghost_tool_interest_smiley":"doShowInterestSmiley","click #j_ghost_tool_refresh":"doRefresh"
},initialize: function(e) {
var c=this.options, d=this;
this.dom_plus=$("#j_ghost_plus");
this.dom_panel=$("#j_ghost_panel");
this.setFix();
this.togglePlus();
this.dom_panel.on("touchstart","a", function(f) {
$(this).addClass("ghost_item_clicked")
}).on("touchend","a", function() {
$(this).removeClass("ghost_item_clicked")
});
F.use("spb/component/collect", function(f) {
new f({
kz:c.kz,uid:c.uid,tbs:c.tbs,see_lz:c.see_lz,base_url:c.base_url
})
});
F.use("spb/component/pb_share", function(f) {
new f({
share_urls:c.share_urls,base_url:c.base_url,kz:c.kz
})
});
this.listenEvent()
},listenEvent: function() {
_.eventCenter.on("ghost_hide",_.bind(this.hide,this));
_.eventCenter.on("smiley_select_panel_show",_.bind(this.hidePanel,this));
_.eventCenter.on("mask_show",this.hideAll);
_.eventCenter.on("mask_hide",this.showAll);
_.eventCenter.on("show_interest_smiley_select_panel",_.bind(function() {
this.show();
this.doShowInterestSmiley()
},this));
_.eventCenter.on("ghost_show",_.bind(this.show,this));
_.eventCenter.on("ghost_do_collect",_.bind(this.collect,this))
},collect: function() {
this.$el.find("#j_ghost_tool_collect").trigger("click")
},setFix: function() {
var c=$.os, e=$("#j_ghost"), d= function() {
var f=0-window.scrollY;
e.css("bottom",f+"px")
};
if(c.ios&&parseInt(c.version)>4) {
$(".ghost_plus").addClass("ghost_plus_animate");
$(".ghost_panel").addClass("ghost_panel_animate")
} else {
if(!c.android||(c.android&&parseFloat(c.version)<2.3)) {
e.css("position","absolute");
$("body").on("touchstart", function(f) {
if($(f.target).closest("#j_ghost").length==0) {
e.hide()
}
}).on("touchend scroll", function(f) {
d();
e.show()
});
setTimeout(d,1000)
}
}
},doBack: function(c) {
this.eventCenter.trigger("top_bar_back_frs",c)
},doReply: function(c) {
if(this.options.is_login) {
c.preventDefault();
this.hide();
this.eventCenter.trigger("postor_focus_to_main")
}
},doCollect: function(d) {
if(!this.options.is_login) {
return
}
d.preventDefault();
var c=$(d.target);
if(c.hasClass("ghost_tool_collect_done")) {
this.eventCenter.trigger("collect_add", function(e) {
if(e.no==0) {
$.toast.send("\u6536\u85cf\u4f4d\u7f6e\u66f4\u65b0\u6210\u529f")
} else {
$.toast.send("\u6536\u85cf\u66f4\u65b0\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5")
}
})
} else {
this.eventCenter.trigger("collect_add", function(e) {
if(e.no==0) {
$.toast.send("\u6dfb\u52a0\u6536\u85cf\u6210\u529f");
c.addClass("ghost_tool_collect_done").html("\u66f4\u65b0\u6536\u85cf")
} else {
$.toast.send("\u6dfb\u52a0\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5")
}
})
}
},doShare: function(c) {
c.preventDefault();
this.eventCenter.trigger("pb_share_show");
this.hide()
},doShowInterestSmiley: function(c) {
c&&c.preventDefault();
_.eventCenter.trigger("interest_smiley_select_panel_show_click")
},doRefresh: function(c) {
$.location.reload()
},addOverlay: function() {
var c=this;
$("body").append("<div class='j_ghost_overlay ghost_overlay'></div>");
$(".j_ghost_overlay").on("touchstart", function() {
c.hide()
})
},removeOverlay: function() {
$(".j_ghost_overlay").off().remove()
},toggleOverlay: function() {
if($(".j_ghost_overlay").length>0) {
this.removeOverlay()
} else {
this.addOverlay()
}
},togglePlus: function(f) {
var c=this;
if($.os&&$.os.webos) {
this.dom_plus.on("click", function() {
c.togglePlusShow()
})
} else {
var d=true;
this.dom_plus.on("touchstart", function(g) {
d=true
}).on("touchmove", function(g) {
d=false
}).on("touchend", function(g) {
if(!d) {
return
}
c.togglePlusShow()
})
}
},togglePlusShow: function() {
this.dom_plus.toggleClass("ghost_plus_active");
this.toggleOverlay();
if(this.dom_panel.hasClass("ghost_panel_active")) {
this.dom_panel.removeClass("ghost_panel_active");
_.eventCenter.trigger("plus_hide")
} else {
this.dom_panel.show().addClass("ghost_panel_active");
_.eventCenter.trigger("plus_show")
}
},hide: function() {
this.removeOverlay();
this.dom_plus.removeClass("ghost_plus_active");
this.dom_panel.removeClass("ghost_panel_active");
_.eventCenter.trigger("plus_hide")
},show: function() {
this.addOverlay();
this.dom_plus.addClass("ghost_plus_active");
this.dom_panel.show().addClass("ghost_panel_active");
_.eventCenter.trigger("plus_show")
},hidePanel: function() {
this.dom_panel.hide()
},hideAll: function() {
$("#j_ghost").css("visibility","hidden")
},showAll: function() {
$("#j_ghost").css("visibility","visible")
}
});
return a
},[]);