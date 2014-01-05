F.module("spb/widget/normal_title_area", function(b,a) {
a=_.Widget.extend({
events: {
"click #j_top_mbtn":"titleEventInit"
},titleEventInit: function(c) {
c.preventDefault();
this.eventCenter.trigger("manage_thread_toggle")
}
});
return a
},[]);