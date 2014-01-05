F.module("sglobal/widget/pic_free_mode_adapter", function(b,a) {
a=_.Widget.extend({
initialize: function() {
var e=this.$el;
var d=setTimeout(function() {
e.addClass("pic_free_mode")
},1000);
var c=new Image();
c.onerror= function() {
clearTimeout(d);
e.removeClass("pic_free_mode")
};
c.src="http://0.0.0.0/"
}
});
return a
},[]);