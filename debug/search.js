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