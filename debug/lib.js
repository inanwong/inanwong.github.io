(function(a) {
if(String.prototype.trim===a) {
String.prototype.trim= function() {
return this.replace(/^\s+/,"").replace(/\s+$/,"")
}
}
if(Array.prototype.reduce===a) {
Array.prototype.reduce= function(c) {
if(this===
void 0||this===null) {
throw new TypeError()
}
var f=Object(this), b=f.length>>>0, e=0, d;
if( typeof c!="function") {
throw new TypeError()
}
if(b==0&&arguments.length==1) {
throw new TypeError()
}
if(arguments.length>=2) {
d=arguments[1]
} else {
do {
if( e in f) {
d=f[e++];
break
}
if(++e>=b) {
throw new TypeError()
}
} while(true)
}
while(e<b) {
if( e in f) {
d=c.call(a,d,f[e],e,f)
}
e++
}
return d
}
}
})();
var Zepto=(function() {
var i, o, z, a, F=[], k=F.slice, f=window.document, E= {}, G= {}, m=f.defaultView.getComputedStyle, N= {
"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1
}, s=/^\s*<(\w+|!)[^>]*>/, y=[1,3,8,9,11], t=["after","prepend","before","append"], p=f.createElement("table"), H=f.createElement("tr"), g= {
tr:f.createElement("tbody"),tbody:p,thead:p,tfoot:p,td:H,th:H,"*":f.createElement("div")
}, q=/complete|loaded|interactive/, B=/^\.([\w-]+)$/, r=/^#([\w-]+)$/, D=/^[\w-]+$/, e=( {}).toString, c= {}, L, I, A=f.createElement("div");
c.matches= function(T,P) {
if(!T||T.nodeType!==1) {
return false
}
var R=T.webkitMatchesSelector||T.mozMatchesSelector||T.oMatchesSelector||T.matchesSelector;
if(R) {
return R.call(T,P)
}
var S, U=T.parentNode, Q=!U;
if(Q) {
( U=A).appendChild(T)
}
S=~c.qsa(U,P).indexOf(T);
Q&&A.removeChild(T);
return S
};
function l(P) {
return e.call(P)=="[object Function]"
}
function C(P) {
return P instanceof Object
}
function O(R) {
var P, Q;
if(e.call(R)!=="[object Object]") {
return false
}
Q=(l(R.constructor)&&R.constructor.prototype);
if(!Q||!hasOwnProperty.call(Q,"isPrototypeOf")) {
return false
}
for(P in R) {
}
return P===i||hasOwnProperty.call(R,P)
}
function v(P) {
return P instanceof Array
}
function w(P) {
return typeof P.length=="number"
}
function M(P) {
return P.filter(function(Q) {
return Q!==i&&Q!==null
})
}
function x(P) {
return P.length>0?[].concat.apply([],P):P
}
L= function(P) {
return P.replace(/-+(.)?/g, function(Q,R) {
return R?R.toUpperCase():""
})
};
function j(P) {
return P.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()
}
I= function(P) {
return P.filter(function(R,Q) {
return P.indexOf(R)==Q
})
};
function J(P) {
return P in G?G[P]:(G[P]=new RegExp("(^|\\s)"+P+"(\\s|$)"))
}
function d(P,Q) {
return ( typeof Q=="number"&&!N[j(P)])?Q+"px":Q
}
function K(R) {
var P, Q;
if(!E[R]) {
P=f.createElement(R);
f.body.appendChild(P);
Q=m(P,"").getPropertyValue("display");
P.parentNode.removeChild(P);
Q=="none"&&( Q="block");
E[R]=Q
}
return E[R]
}
c.fragment= function(R,Q) {
if(Q===i) {
Q=s.test(R)&&RegExp.$1
}
if(!( Q in g)) {
Q="*"
}
var P=g[Q];
P.innerHTML=""+R;
return z.each(k.call(P.childNodes), function() {
P.removeChild(this)
})
};
c.Z= function(Q,P) {
Q=Q||[];
Q.__proto__=arguments.callee.prototype;
Q.selector=P||"";
return Q
};
c.isZ= function(P) {
return P instanceof c.Z
};
c.init= function(P,Q) {
if(!P) {
return c.Z()
} else {
if(l(P)) {
return z(f).ready(P)
} else {
if(c.isZ(P)) {
return P
} else {
var R;
if(v(P)) {
R=M(P)
} else {
if(O(P)) {
R=[z.extend({},P)], P=null
} else {
if(y.indexOf(P.nodeType)>=0||P===window) {
R=[P], P=null
} else {
if(s.test(P)) {
R=c.fragment(P.trim(),RegExp.$1), P=null
} else {
if(Q!==i) {
return z(Q).find(P)
} else {
R=c.qsa(f,P)
}
}
}
}
}
return c.Z(R,P)
}
}
}
};
z= function(P,Q) {
return c.init(P,Q)
};
z.extend= function(P) {
k.call(arguments,1).forEach(function(Q) {
for(o in Q) {
if(Q[o]!==i) {
P[o]=Q[o]
}
}
});
return P
};
c.qsa= function(Q,P) {
var R;
return (Q===f&&r.test(P))?(( R=Q.getElementById(RegExp.$1))?[R]:F):(Q.nodeType!==1&&Q.nodeType!==9)?F:k.call(B.test(P)?Q.getElementsByClassName(RegExp.$1):D.test(P)?Q.getElementsByTagName(P):Q.querySelectorAll(P))
};
function u(Q,P) {
return P===i?z(Q):z(Q).filter(P)
}
function n(R,Q,P,S) {
return l(Q)?Q.call(R,P,S):Q
}
z.isFunction=l;
z.isObject=C;
z.isArray=v;
z.isPlainObject=O;
z.inArray= function(Q,R,P) {
return F.indexOf.call(R,Q,P)
};
z.trim= function(P) {
return P.trim()
};
z.uuid=0;
z.map= function(T,U) {
var S, P=[], R, Q;
if(w(T)) {
for( R=0;R<T.length;R++) {
S=U(T[R],R);
if(S!=null) {
P.push(S)
}
}
} else {
for(Q in T) {
S=U(T[Q],Q);
if(S!=null) {
P.push(S)
}
}
}
return x(P)
};
z.each= function(R,S) {
var Q, P;
if(w(R)) {
for( Q=0;Q<R.length;Q++) {
if(S.call(R[Q],Q,R[Q])===false) {
return R
}
}
} else {
for(P in R) {
if(S.call(R[P],P,R[P])===false) {
return R
}
}
}
return R
};
z.fn= {
forEach:F.forEach,reduce:F.reduce,push:F.push,indexOf:F.indexOf,concat:F.concat,map: function(P) {
return z.map(this, function(R,Q) {
return P.call(R,Q,R)
})
},slice: function() {
return z(k.apply(this,arguments))
},ready: function(P) {
if(q.test(f.readyState)) {
P(z)
} else {
f.addEventListener("DOMContentLoaded", function() {
P(z)
},false)
}
return this
},get: function(P) {
return P===i?k.call(this):this[P]
},toArray: function() {
return this.get()
},size: function() {
return this.length
},remove: function() {
return this.each(function() {
if(this.parentNode!=null) {
this.parentNode.removeChild(this)
}
})
},each: function(P) {
this.forEach(function(R,Q) {
P.call(R,Q,R)
});
return this
},filter: function(P) {
return z([].filter.call(this, function(Q) {
return c.matches(Q,P)
}))
},add: function(P,Q) {
return z(I(this.concat(z(P,Q))))
},is: function(P) {
return this.length>0&&c.matches(this[0],P)
},not: function(P) {
var Q=[];
if(l(P)&&P.call!==i) {
this.each(function(S) {
if(!P.call(this,S)) {
Q.push(this)
}
})
} else {
var R= typeof P=="string"?this.filter(P):(w(P)&&l(P.item))?k.call(P):z(P);
this.forEach(function(S) {
if(R.indexOf(S)<0) {
Q.push(S)
}
})
}
return z(Q)
},eq: function(P) {
return P===-1?this.slice(P):this.slice(P,+P+1)
},first: function() {
var P=this[0];
return P&&!C(P)?P:z(P)
},last: function() {
var P=this[this.length-1];
return P&&!C(P)?P:z(P)
},find: function(Q) {
var P;
if(this.length==1) {
P=c.qsa(this[0],Q)
} else {
P=this.map(function() {
return c.qsa(this,Q)
})
}
return z(P)
},closest: function(P,Q) {
var R=this[0];
while(R&&!c.matches(R,P)) {
R=R!==Q&&R!==f&&R.parentNode
}
return z(R)
},parents: function(P) {
var R=[], Q=this;
while(Q.length>0) {
Q=z.map(Q, function(S) {
if(( S=S.parentNode)&&S!==f&&R.indexOf(S)<0) {
R.push(S);
return S
}
})
}
return u(R,P)
},parent: function(P) {
return u(I(this.pluck("parentNode")),P)
},children: function(P) {
return u(this.map(function() {
return k.call(this.children)
}),P)
},siblings: function(P) {
return u(this.map(function(Q,R) {
return k.call(R.parentNode.children).filter(function(S) {
return S!==R
})
}),P)
},empty: function() {
return this.each(function() {
this.innerHTML=""
})
},pluck: function(P) {
return this.map(function() {
return this[P]
})
},show: function() {
return this.each(function() {
this.style.display=="none"&&(this.style.display=null);
if(m(this,"").getPropertyValue("display")=="none") {
this.style.display=K(this.nodeName)
}
})
},replaceWith: function(P) {
return this.before(P).remove()
},wrap: function(P) {
return this.each(function() {
z(this).wrapAll(z(P)[0].cloneNode(false))
})
},wrapAll: function(P) {
if(this[0]) {
z(this[0]).before( P=z(P));
P.append(this)
}
return this
},unwrap: function() {
this.parent().each(function() {
z(this).replaceWith(z(this).children())
});
return this
},clone: function() {
return z(this.map(function() {
return this.cloneNode(true)
}))
},hide: function() {
return this.css("display","none")
},toggle: function(P) {
return (P===i?this.css("display")=="none":P)?this.show():this.hide()
},prev: function() {
return z(this.pluck("previousElementSibling"))
},next: function() {
return z(this.pluck("nextElementSibling"))
},html: function(P) {
return P===i?(this.length>0?this[0].innerHTML:null):this.each(function(Q) {
var R=this.innerHTML;
z(this).empty().append(n(this,P,Q,R))
})
},text: function(P) {
return P===i?(this.length>0?this[0].textContent:null):this.each(function() {
this.textContent=P
})
},attr: function(Q,R) {
var P;
return ( typeof Q=="string"&&R===i)?(this.length==0||this[0].nodeType!==1?i:(Q=="value"&&this[0].nodeName=="INPUT")?this.val():(!( P=this[0].getAttribute(Q))&& Q in this[0])?this[0][Q]:P):this.each(function(S) {
if(this.nodeType!==1) {
return
}
if(C(Q)) {
for(o in Q) {
this.setAttribute(o,Q[o])
}
} else {
this.setAttribute(Q,n(this,R,S,this.getAttribute(Q)))
}
})
},removeAttr: function(P) {
return this.each(function() {
if(this.nodeType===1) {
this.removeAttribute(P)
}
})
},prop: function(P,Q) {
return (Q===i)?(this[0]?this[0][P]:i):this.each(function(R) {
this[P]=n(this,Q,R,this[P])
})
},data: function(P,R) {
var Q=this.attr("data-"+j(P),R);
return Q!==null?Q:i
},val: function(P) {
return (P===i)?(this.length>0?this[0].value:i):this.each(function(Q) {
this.value=n(this,P,Q,this.value)
})
},offset: function() {
if(this.length==0) {
return null
}
var P=this[0].getBoundingClientRect();
return {
left:P.left+window.pageXOffset,top:P.top+window.pageYOffset,width:P.width,height:P.height
}
},css: function(R,Q) {
if(Q===i&& typeof R=="string") {
return (this.length==0?i:this[0].style[L(R)]||m(this[0],"").getPropertyValue(R))
}
var P="";
for(o in R) {
if( typeof R[o]=="string"&&R[o]=="") {
this.each(function() {
this.style.removeProperty(j(o))
})
} else {
P+=j(o)+":"+d(o,R[o])+";"
}
}
if( typeof R=="string") {
if(Q=="") {
this.each(function() {
this.style.removeProperty(j(R))
})
} else {
P=j(R)+":"+d(R,Q)
}
}
return this.each(function() {
this.style.cssText+=";"+P
})
},index: function(P) {
return P?this.indexOf(z(P)[0]):this.parent().children().indexOf(this[0])
},hasClass: function(P) {
if(this.length<1) {
return false
} else {
return J(P).test(this[0].className)
}
},addClass: function(P) {
return this.each(function(Q) {
a=[];
var S=this.className, R=n(this,P,Q,S);
R.split(/\s+/g).forEach(function(T) {
if(!z(this).hasClass(T)) {
a.push(T)
}
},this);
a.length&&(this.className+=( S?" ":"")+a.join(" "))
})
},removeClass: function(P) {
return this.each(function(Q) {
if(P===i) {
return this.className=""
}
a=this.className;
n(this,P,Q,a).split(/\s+/g).forEach(function(R) {
a=a.replace(J(R)," ")
});
this.className=a.trim()
})
},toggleClass: function(Q,P) {
return this.each(function(R) {
var S=n(this,Q,R,this.className);
(P===i?!z(this).hasClass(S):P)?z(this).addClass(S):z(this).removeClass(S)
})
}
};
["width","height"].forEach(function(P) {
z.fn[P]= function(Q) {
var S, R=P.replace(/./, function(T) {
return T[0].toUpperCase()
});
if(Q===i) {
return this[0]==window?window["inner"+R]:this[0]==f?f.documentElement["offset"+R]:( S=this.offset())&&S[P]
} else {
return this.each(function(T) {
var U=z(this);
U.css(P,n(this,Q,T,U[P]()))
})
}
}
});
function h(P,S,R) {
var Q=(P%2)?S:S.parentNode;
Q?Q.insertBefore(R,!P?S.nextSibling:P==1?Q.firstChild:P==2?S:null):z(R).remove()
}
function b(R,P) {
P(R);
for(var Q in R.childNodes) {
b(R.childNodes[Q],P)
}
}
t.forEach(function(Q,P) {
z.fn[Q]= function() {
var R=z.map(arguments, function(V) {
return C(V)?V:c.fragment(V)
});
if(R.length<1) {
return this
}
var S=this.length, T=S>1, U=P<2;
return this.each(function(V,Y) {
for(var W=0;W<R.length;W++) {
var X=R[ U?R.length-W-1:W];
b(X, function(Z) {
if(Z.nodeName!=null&&Z.nodeName.toUpperCase()==="SCRIPT"&&(!Z.type||Z.type==="text/javascript")) {
window["eval"].call(window,Z.innerHTML)
}
});
if(T&&V<S-1) {
X=X.cloneNode(true)
}
h(P,Y,X)
}
})
};
z.fn[(P%2)?Q+"To":"insert"+( P?"Before":"After")]= function(R) {
z(R)[Q](this);
return this
}
});
c.Z.prototype=z.fn;
c.camelize=L;
c.uniq=I;
z.zepto=c;
return z
})();
window.Zepto=Zepto;
"$" in window||(window.$=Zepto);
(function(c) {
var g=c.zepto.qsa, n= {}, d=1, j= {}, f;
j.click=j.mousedown=j.mouseup=j.mousemove="MouseEvents";
function a(s) {
return s._zid||(s._zid=d++)
}
function h(t,v,u,s) {
v=m(v);
if(v.ns) {
var w=q(v.ns)
}
return (n[a(t)]||[]).filter(function(x) {
return x&&(!v.e||x.e==v.e)&&(!v.ns||w.test(x.ns))&&(!u||a(x.fn)===a(u))&&(!s||x.sel==s)
})
}
function m(s) {
var t=(""+s).split(".");
return {
e:t[0],ns:t.slice(1).sort().join(" ")
}
}
function q(s) {
return new RegExp("(?:^| )"+s.replace(" "," .* ?")+"(?: |$)")
}
function p(s,u,t) {
if(c.isObject(s)) {
c.each(s,t)
} else {
s.split(/\s/).forEach(function(v) {
t(v,u)
})
}
}
function k(w,v,x,t,s,u) {
u=!!u;
var z=a(w), y=(n[z]||(n[z]=[]));
p(v,x, function(D,C) {
var B=s&&s(C,D), F=B||C;
var E= function(H) {
var G=F.apply(w,[H].concat(H.data));
if(G===false) {
H.preventDefault()
}
return G
};
var A=c.extend(m(D), {
fn:C,proxy:E,sel:t,del:B,i:y.length
});
y.push(A);
w.addEventListener(A.e,E,u)
})
}
function r(u,t,v,s) {
var w=a(u);
p(t||"",v, function(y,x) {
h(u,y,x,s).forEach(function(z) {
delete n[w][z.i];
u.removeEventListener(z.e,z.proxy,false)
})
})
}
c.event= {
add:k,remove:r
};
c.proxy= function(u,t) {
if(c.isFunction(u)) {
var s= function() {
return u.apply(t,arguments)
};
s._zid=a(u);
return s
} else {
if( typeof t=="string") {
return c.proxy(u[t],u)
} else {
throw new TypeError("expected function")
}
}
};
c.fn.bind= function(s,t) {
return this.each(function() {
k(this,s,t)
})
};
c.fn.unbind= function(s,t) {
return this.each(function() {
r(this,s,t)
})
};
c.fn.one= function(s,t) {
return this.each(function(v,u) {
k(this,s,t,null, function(x,w) {
return function() {
var y=x.apply(u,arguments);
r(u,w,x);
return y
}
})
})
};
var o= function() {
return true
}, e= function() {
return false
}, i= {
preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"
};
function b(t) {
var s=c.extend({
originalEvent:t
},t);
c.each(i, function(v,u) {
s[v]= function() {
this[u]=o;
return t[v].apply(t,arguments)
};
s[u]=e
});
return s
}
function l(t) {
if(!("defaultPrevented" in t)) {
t.defaultPrevented=false;
var s=t.preventDefault;
t.preventDefault= function() {
this.defaultPrevented=true;
s.call(this)
}
}
}
c.fn.delegate= function(s,u,v) {
var t=false;
if(u=="blur"||u=="focus") {
if(c.iswebkit) {
u=u=="blur"?"focusout":u=="focus"?"focusin":u
} else {
t=true
}
}
return this.each(function(x,w) {
k(w,u,v,s, function(y) {
return function(B) {
var z, A=c(B.target).closest(s,w).get(0);
if(A) {
z=c.extend(b(B), {
currentTarget:A,liveFired:w
});
return y.apply(A,[z].concat([].slice.call(arguments,1)))
}
}
},t)
})
};
c.fn.undelegate= function(s,t,u) {
return this.each(function() {
r(this,t,u,s)
})
};
c.fn.live= function(s,t) {
c(document.body).delegate(this.selector,s,t);
return this
};
c.fn.die= function(s,t) {
c(document.body).undelegate(this.selector,s,t);
return this
};
c.fn.on= function(t,s,u) {
return s==undefined||c.isFunction(s)?this.bind(t,s):this.delegate(s,t,u)
};
c.fn.off= function(t,s,u) {
return s==undefined||c.isFunction(s)?this.unbind(t,s):this.undelegate(s,t,u)
};
c.fn.trigger= function(s,t) {
if( typeof s=="string") {
s=c.Event(s)
}
l(s);
s.data=t;
return this.each(function() {
if("dispatchEvent" in this) {
this.dispatchEvent(s)
}
})
};
c.fn.triggerHandler= function(t,u) {
var v, s;
this.each(function(x,w) {
v=b( typeof t=="string"?c.Event(t):t);
v.data=u;
v.target=w;
c.each(h(w,t.type||t), function(y,z) {
s=z.proxy(v);
if(v.isImmediatePropagationStopped()) {
return false
}
})
});
return s
};
("focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error").split(" ").forEach(function(s) {
c.fn[s]= function(t) {
return this.bind(s,t)
}
});
["focus","blur"].forEach(function(s) {
c.fn[s]= function(u) {
if(u) {
this.bind(s,u)
} else {
if(this.length) {
try {
this.get(0)[s]()
} catch(t) {
}
}
}
return this
}
});
c.Event= function(v,u) {
var w=document.createEvent(j[v]||"Events"), s=true;
if(u) {
for(var t in u) {
(t=="bubbles")?( s=!!u[t]):(w[t]=u[t])
}
}
w.initEvent(v,s,true,null,null,null,null,null,null,null,null,null,null,null,null);
return w
}
})(Zepto);
(function(b) {
function a(c) {
var f=this.os= {}, g=this.browser= {}, l=c.match(/WebKit\/([\d.]+)/), e=c.match(/(Android)\s+([\d.]+)/), m=c.match(/(iPad).*OS\s([\d_]+)/), k=!m&&c.match(/(iPhone\sOS)\s([\d_]+)/), n=c.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), j=n&&c.match(/TouchPad/), i=c.match(/Kindle\/([\d.]+)/), h=c.match(/Silk\/([\d._]+)/), d=c.match(/(BlackBerry).*Version\/([\d.]+)/);
if(g.webkit=!!l) {
g.version=l[1]
}
if(e) {
f.android=true,f.version=e[2]
}
if(k) {
f.ios=f.iphone=true,f.version=k[2].replace(/_/g,".")
}
if(m) {
f.ios=f.ipad=true,f.version=m[2].replace(/_/g,".")
}
if(n) {
f.webos=true,f.version=n[2]
}
if(j) {
f.touchpad=true
}
if(d) {
f.blackberry=true,f.version=d[2]
}
if(i) {
f.kindle=true,f.version=i[1]
}
if(h) {
g.silk=true,g.version=h[1]
}
if(!h&&f.android&&c.match(/Kindle Fire/)) {
g.silk=true
}
}
a.call(b,navigator.userAgent);
b.__detect=a
})(Zepto);
(function(e,c) {
var g="", k, b, i, m= {
Webkit:"webkit",Moz:"",O:"o",ms:"MS"
}, j=window.document, d=j.createElement("div"), l=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, h= {};
function a(n) {
return n.toLowerCase()
}
function f(n) {
return k?k+n:a(n)
}
e.each(m, function(o,n) {
if(d.style[o+"TransitionProperty"]!==c) {
g="-"+a(o)+"-";
k=n;
return false
}
});
h[g+"transition-property"]=h[g+"transition-duration"]=h[g+"transition-timing-function"]=h[g+"animation-name"]=h[g+"animation-duration"]="";
e.fx= {
off:(k===c&&d.style.transitionProperty===c),cssPrefix:g,transitionEnd:f("TransitionEnd"),animationEnd:f("AnimationEnd")
};
e.fn.animate= function(n,o,p,q) {
if(e.isObject(o)) {
p=o.easing, q=o.complete, o=o.duration
}
if(o) {
o=o/1000
}
return this.anim(n,o,p,q)
};
e.fn.anim= function(s,p,o,u) {
var r, w= {}, t, q=this, n, v=e.fx.transitionEnd;
if(p===c) {
p=0.4
}
if(e.fx.off) {
p=0
}
if( typeof s=="string") {
w[g+"animation-name"]=s;
w[g+"animation-duration"]=p+"s";
v=e.fx.animationEnd
} else {
for(t in s) {
if(l.test(t)) {
r||( r=[]);
r.push(t+"("+s[t]+")")
} else {
w[t]=s[t]
}
}
if(r) {
w[g+"transform"]=r.join(" ")
}
if(!e.fx.off&& typeof s==="object") {
w[g+"transition-property"]=Object.keys(s).join(", ");
w[g+"transition-duration"]=p+"s";
w[g+"transition-timing-function"]=(o||"linear")
}
}
n= function(x) {
if( typeof x!=="undefined") {
if(x.target!==x.currentTarget) {
return
}
e(x.target).unbind(v,arguments.callee)
}
e(this).css(h);
u&&u.call(this)
};
if(p>0) {
this.bind(v,n)
}
setTimeout(function() {
q.css(w);
if(p<=0) {
setTimeout(function() {
q.each(function() {
n.call(this)
})
},0)
}
},0);
return this
};
d=null
})(Zepto);
(function($) {
var jsonpID=0, isObject=$.isObject, document=window.document, key, name, rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, scriptTypeRE=/^(?:text|application)\/javascript/i, xmlTypeRE=/^(?:text|application)\/xml/i, jsonType="application/json", htmlType="text/html", blankRE=/^\s*$/;
function triggerAndReturn(context,eventName,data) {
var event=$.Event(eventName);
$(context).trigger(event,data);
return !event.defaultPrevented
}
function triggerGlobal(settings,context,eventName,data) {
if(settings.global) {
return triggerAndReturn(context||document,eventName,data)
}
}
$.active=0;
function ajaxStart(settings) {
if(settings.global&&$.active++===0) {
triggerGlobal(settings,null,"ajaxStart")
}
}
function ajaxStop(settings) {
if(settings.global&&!(--$.active)) {
triggerGlobal(settings,null,"ajaxStop")
}
}
function ajaxBeforeSend(xhr,settings) {
var context=settings.context;
if(settings.beforeSend.call(context,xhr,settings)===false||triggerGlobal(settings,context,"ajaxBeforeSend",[xhr,settings])===false) {
return false
}
triggerGlobal(settings,context,"ajaxSend",[xhr,settings])
}
function ajaxSuccess(data,xhr,settings) {
var context=settings.context, status="success";
settings.success.call(context,data,status,xhr);
triggerGlobal(settings,context,"ajaxSuccess",[xhr,settings,data]);
ajaxComplete(status,xhr,settings)
}
function ajaxError(error,type,xhr,settings) {
var context=settings.context;
settings.error.call(context,xhr,type,error);
triggerGlobal(settings,context,"ajaxError",[xhr,settings,error]);
ajaxComplete(type,xhr,settings)
}
function ajaxComplete(status,xhr,settings) {
var context=settings.context;
settings.complete.call(context,xhr,status);
triggerGlobal(settings,context,"ajaxComplete",[xhr,settings]);
ajaxStop(settings)
}
function empty() {
}
$.ajaxJSONP= function(options) {
var callbackName="jsonp"+(++jsonpID), script=document.createElement("script"), abort= function() {
$(script).remove();
if( callbackName in window) {
window[callbackName]=empty
}
ajaxComplete("abort",xhr,options)
}, xhr= {
abort:abort
}, abortTimeout;
if(options.error) {
script.onerror= function() {
xhr.abort();
options.error()
}
}
window[callbackName]= function(data) {
clearTimeout(abortTimeout);
$(script).remove();
delete window[callbackName];
ajaxSuccess(data,xhr,options)
};
serializeData(options);
script.src=options.url.replace(/=\?/,"="+callbackName);
$("head").append(script);
if(options.timeout>0) {
abortTimeout=setTimeout(function() {
xhr.abort();
ajaxComplete("timeout",xhr,options)
},options.timeout)
}
return xhr
};
$.ajaxSettings= {
type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:true,xhr: function() {
return new window.XMLHttpRequest()
},accepts: {
script:"text/javascript, application/javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"
},crossDomain:false,timeout:0
};
function mimeToDataType(mime) {
return mime&&(mime==htmlType?"html":mime==jsonType?"json":scriptTypeRE.test(mime)?"script":xmlTypeRE.test(mime)&&"xml")||"text"
}
function appendQuery(url,query) {
return (url+"&"+query).replace(/[&?]{1,2}/,"?")
}
function serializeData(options) {
if(isObject(options.data)) {
options.data=$.param(options.data)
}
if(options.data&&(!options.type||options.type.toUpperCase()=="GET")) {
options.url=appendQuery(options.url,options.data)
}
}
$.ajax= function(options) {
var settings=$.extend({},options|| {});
for(key in $.ajaxSettings) {
if(settings[key]===undefined) {
settings[key]=$.ajaxSettings[key]
}
}
ajaxStart(settings);
if(!settings.crossDomain) {
settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host
}
var dataType=settings.dataType, hasPlaceholder=/=\?/.test(settings.url);
if(dataType=="jsonp"||hasPlaceholder) {
if(!hasPlaceholder) {
settings.url=appendQuery(settings.url,"callback=?")
}
return $.ajaxJSONP(settings)
}
if(!settings.url) {
settings.url=window.location.toString()
}
serializeData(settings);
var mime=settings.accepts[dataType], baseHeaders= {}, protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol, xhr=$.ajaxSettings.xhr(), abortTimeout;
if(!settings.crossDomain) {
baseHeaders["X-Requested-With"]="XMLHttpRequest"
}
if(mime) {
baseHeaders.Accept=mime;
if(mime.indexOf(",")>-1) {
mime=mime.split(",",2)[0]
}
xhr.overrideMimeType&&xhr.overrideMimeType(mime)
}
if(settings.contentType||(settings.data&&settings.type.toUpperCase()!="GET")) {
baseHeaders["Content-Type"]=(settings.contentType||"application/x-www-form-urlencoded")
}
settings.headers=$.extend(baseHeaders,settings.headers|| {});
xhr.onreadystatechange= function() {
if(xhr.readyState==4) {
clearTimeout(abortTimeout);
var result, error=false;
if((xhr.status>=200&&xhr.status<300)||xhr.status==304||(xhr.status==0&&protocol=="file:")) {
dataType=dataType||mimeToDataType(xhr.getResponseHeader("content-type"));
result=xhr.responseText;
try {
if(dataType=="script") {
(1,eval)(result)
} else {
if(dataType=="xml") {
result=xhr.responseXML
} else {
if(dataType=="json") {
result=blankRE.test(result)?null:JSON.parse(result)
}
}
}
} catch(e) {
error=e
}
if(error) {
ajaxError(error,"parsererror",xhr,settings)
} else {
ajaxSuccess(result,xhr,settings)
}
} else {
ajaxError(null,"error",xhr,settings)
}
}
};
var async="async" in settings?settings.async:true;
xhr.open(settings.type,settings.url,async);
for(name in settings.headers) {
xhr.setRequestHeader(name,settings.headers[name])
}
if(ajaxBeforeSend(xhr,settings)===false) {
xhr.abort();
return false
}
if(settings.timeout>0) {
abortTimeout=setTimeout(function() {
xhr.onreadystatechange=empty;
xhr.abort();
ajaxError(null,"timeout",xhr,settings)
},settings.timeout)
}
xhr.send(settings.data?settings.data:null);
return xhr
};
$.get= function(url,success) {
return $.ajax({
url:url,success:success
})
};
$.post= function(url,data,success,dataType) {
if($.isFunction(data)) {
dataType=dataType||success, success=data, data=null
}
return $.ajax({
type:"POST",url:url,data:data,success:success,dataType:dataType
})
};
$.getJSON= function(url,success) {
return $.ajax({
url:url,success:success,dataType:"json"
})
};
$.fn.load= function(url,success) {
if(!this.length) {
return this
}
var self=this, parts=url.split(/\s/), selector;
if(parts.length>1) {
url=parts[0], selector=parts[1]
}
$.get(url, function(response) {
self.html( selector?$(document.createElement("div")).html(response.replace(rscript,"")).find(selector).html():response);
success&&success.call(self)
});
return this
};
var escape=encodeURIComponent;
function serialize(params,obj,traditional,scope) {
var array=$.isArray(obj);
$.each(obj, function(key,value) {
if(scope) {
key= traditional?scope:scope+"["+( array?"":key)+"]"
}
if(!scope&&array) {
params.add(value.name,value.value)
} else {
if( traditional?$.isArray(value):isObject(value)) {
serialize(params,value,traditional,key)
} else {
params.add(key,value)
}
}
})
}
$.param= function(obj,traditional) {
var params=[];
params.add= function(k,v) {
this.push(escape(k)+"="+escape(v))
};
serialize(params,obj,traditional);
return params.join("&").replace("%20","+")
}
})(Zepto);
(function(a) {
a.fn.serializeArray= function() {
var b=[], c;
a(Array.prototype.slice.call(this.get(0).elements)).each(function() {
c=a(this);
var d=c.attr("type");
if(this.nodeName.toLowerCase()!="fieldset"&&!this.disabled&&d!="submit"&&d!="reset"&&d!="button"&&((d!="radio"&&d!="checkbox")||this.checked)) {
b.push({
name:c.attr("name"),value:c.val()
})
}
});
return b
};
a.fn.serialize= function() {
var b=[];
this.serializeArray().forEach(function(c) {
b.push(encodeURIComponent(c.name)+"="+encodeURIComponent(c.value))
});
return b.join("&")
};
a.fn.submit= function(c) {
if(c) {
this.bind("submit",c)
} else {
if(this.length) {
var b=a.Event("submit");
this.eq(0).trigger(b);
if(!b.defaultPrevented) {
this.get(0).submit()
}
}
}
return this
}
})(Zepto);
(function(g) {
var f= {}, b;
function c(j) {
return "tagName" in j?j:j.parentNode
}
function h(k,j,m,l) {
var o=Math.abs(k-j), n=Math.abs(m-l);
return o>=n?(k-j>0?"Left":"Right"):(m-l>0?"Up":"Down")
}
var e=750, a;
function i() {
a=null;
if(f.last) {
f.el.trigger("longTap");
f= {}
}
}
function d() {
if(a) {
clearTimeout(a)
}
a=null
}
g(document).ready(function() {
var j, k;
g(document.body).bind("touchstart", function(l) {
j=Date.now();
k=j-(f.last||j);
f.el=g(c(l.touches[0].target));
b&&clearTimeout(b);
f.x1=l.touches[0].pageX;
f.y1=l.touches[0].pageY;
if(k>0&&k<=250) {
f.isDoubleTap=true
}
f.last=j;
a=setTimeout(i,e)
}).bind("touchmove", function(l) {
d();
f.x2=l.touches[0].pageX;
f.y2=l.touches[0].pageY
}).bind("touchend", function(l) {
d();
if(f.isDoubleTap) {
f.el.trigger("doubleTap");
f= {}
} else {
if((f.x2&&Math.abs(f.x1-f.x2)>30)||(f.y2&&Math.abs(f.y1-f.y2)>30)) {
f.el.trigger("swipe")&&f.el.trigger("swipe"+(h(f.x1,f.x2,f.y1,f.y2)));
f= {}
} else {
if("last" in f) {
f.el.trigger("tap");
b=setTimeout(function() {
b=null;
f.el.trigger("singleTap");
f= {}
},250)
}
}
}
}).bind("touchcancel", function() {
if(b) {
clearTimeout(b)
}
if(a) {
clearTimeout(a)
}
a= b=null;
f= {}
})
});
["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(j) {
g.fn[j]= function(k) {
return this.bind(j,k)
}
})
})(Zepto);
;
if( typeof JSON!=="object") {
JSON= {}
}( function() {
function f(n) {
return n<10?"0"+n:n
}
if( typeof Date.prototype.toJSON!=="function") {
Date.prototype.toJSON= function(key) {
return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON= function(key) {
return this.valueOf()
}
}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta= {
"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"
}, rep;
function quote(string) {
escapable.lastIndex=0;
return escapable.test(string)?'"'+string.replace(escapable, function(a) {
var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'
}
function str(key,holder) {
var i, k, v, length, mind=gap, partial, value=holder[key];
if(value&& typeof value==="object"&& typeof value.toJSON==="function") {
value=value.toJSON(key)
}
if( typeof rep==="function") {
value=rep.call(holder,key,value)
}
switch(typeof value) {
case"string":
return quote(value);
case"number":
return isFinite(value)?String(value):"null";
case"boolean":
case"null":
return String(value);
case"object":
if(!value) {
return "null"
}
gap+=indent;
partial=[];
if(Object.prototype.toString.apply(value)==="[object Array]") {
length=value.length;
for( i=0;i<length;i+=1) {
partial[i]=str(i,value)||"null"
}
v=partial.length===0?"[]": gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;
return v
}
if(rep&& typeof rep==="object") {
length=rep.length;
for( i=0;i<length;i+=1) {
if( typeof rep[i]==="string") {
k=rep[i];
v=str(k,value);
if(v) {
partial.push(quote(k)+( gap?": ":":")+v)
}
}
}
} else {
for(k in value) {
if(Object.prototype.hasOwnProperty.call(value,k)) {
v=str(k,value);
if(v) {
partial.push(quote(k)+( gap?": ":":")+v)
}
}
}
}
v=partial.length===0?"{}": gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;
return v
}
}
if( typeof JSON.stringify!=="function") {
JSON.stringify= function(value,replacer,space) {
var i;
gap="";
indent="";
if( typeof space==="number") {
for( i=0;i<space;i+=1) {
indent+=" "
}
} else {
if( typeof space==="string") {
indent=space
}
}
rep=replacer;
if(replacer&& typeof replacer!=="function"&&( typeof replacer!=="object"|| typeof replacer.length!=="number")) {
throw new Error("JSON.stringify")
}
return str("", {
"":value
})
}
}
if( typeof JSON.parse!=="function") {
JSON.parse= function(text,reviver) {
var j;
function walk(holder,key) {
var k, v, value=holder[key];
if(value&& typeof value==="object") {
for(k in value) {
if(Object.prototype.hasOwnProperty.call(value,k)) {
v=walk(value,k);
if(v!==undefined) {
value[k]=v
} else {
delete value[k]
}
}
}
}
return reviver.call(holder,key,value)
}
text=String(text);
cx.lastIndex=0;
if(cx.test(text)) {
text=text.replace(cx, function(a) {
return "\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})
}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))) {
j=eval("("+text+")");
return typeof reviver==="function"?walk({
"":j
},""):j
}
throw new SyntaxError("JSON.parse")
}
}
}());
;(function(i) {
var l= {
version:"1.0.6",debug:false
};
function h(r,q) {
if( r instanceof Array) {
for(var p=0, n=r.length;p<n;p++) {
if(q.call(r[p],r[p],p)===false) {
return
}
}
} else {
for(var p in r) {
if(r.hasOwnProperty(p)) {
if(q.call(r[p],r[p],p)===false) {
return
}
}
}
}
}
function j(o,q) {
if(Array.prototype.indexOf) {
return o.indexOf(q)
}
for(var p=0, n=o.length;p<n;p++) {
if(o[p]===q) {
return p
}
}
return -1
}
function a(n,p) {
if(Array.prototype.filter) {
return n.filter(p)
}
var o=[];
h(n, function(s,r,q) {
if(p(s,r,q)) {
o.push(s)
}
});
return o
}
function e(n,o) {
return a(o, function(p) {
return !g.loadingPaths[p]||!m(g.cache[p],n)
})
}
function m(o,p) {
if(!o||o._loaded) {
return false
}
var q=o.deps||[];
if(q.length) {
if(j(q,p)>-1) {
return true
} else {
for(var n=0;n<q.length;n++) {
if(m(g.cache[q[n]],p)) {
return true
}
}
return false
}
}
return false
}
function g(o,n) {
this.name=n;
this.path=o;
this.fn=null;
this.exports= {};
this._loaded=false;
this._requiredStack=[];
this._readyStack=[];
g.cache[this.name]=this
}
g.loadedPaths= {};
g.loadingPaths= {};
g.cache= {};
g.paths= {};
g.moduleFileMap= {};
g.requiredPaths= {};
g.lazyLoadPaths= {};
g.prototype= {
init: function() {
if(!this._inited) {
this._inited=true;
if(!this.fn) {
throw new Error('Module "'+this.name+'" not found!')
}
var n;
if( n=this.fn.call(null,d,this.exports)) {
this.exports=n
}
}
},load: function() {
g.loadingPaths[this.path]=true;
var n=l.debug?this.path:(g.moduleFileMap[this.name]||this.path)
},lazyLoad: function() {
var n=this.name, o=this.path;
if(g.lazyLoadPaths[n]) {
this.define();
delete g.lazyLoadPaths[n]
} else {
if(g.loadedPaths[o]) {
this.triggerStack()
} else {
if(!g.loadingPaths[o]) {
g.requiredPaths[this.name]=true;
this.load()
}
}
}
},ready: function(o,p) {
var n= p?this._requiredStack:this._readyStack;
if(o) {
if(this._loaded) {
o()
} else {
n.push(o)
}
} else {
this._loaded=true;
g.loadedPaths[this.path]=true;
delete g.loadingPaths[this.path];
this.triggerStack()
}
},triggerStack: function() {
if(this._readyStack.length>0) {
this.init();
h(this._readyStack, function(n) {
if(!n.doing) {
n.doing=true;
n()
}
});
this._readyStack=[]
}
if(this._requiredStack.length>0) {
h(this._requiredStack, function(n) {
if(!n.doing) {
n.doing=true;
n()
}
});
this._requiredStack=[]
}
},define: function() {
var p=this, n=this.deps, o=[];
if(!n&&l.debug) {
n=getDependents(p.fn)
}
n=e(p.path,n);
if(n.length) {
g.loadingPaths[this.path]=true;
h(n, function(r) {
var q=c(r);
o.push(q.path)
});
h(n, function(r) {
var q=c(r);
q.ready(function() {
if(k(o)) {
p.ready()
}
},true);
q.lazyLoad()
})
} else {
this.ready()
}
}
};
function d(n) {
var o=c(n);
o.init();
return o.exports
}
l.require=d;
function k(o) {
var n=true;
h(o, function(p) {
if(!( p in g.loadedPaths)) {
return n=false
}
});
return n
}
function f(n) {
return i?(i+n):n
}
function c(n) {
var o=n.indexOf(":")>-1?n:f(n);
if(g.cache[n]) {
return g.cache[n]
}
return new g(o,n)
}
if(i&&i.charAt(i.length-1)=="/") {
i=i.substr(0,i.length-1)
}
l.use= function(q,p) {
if( typeof q==="string") {
q=[q]
}
var o=[];
var n=[];
h(q, function(r,s) {
n[s]=false
});
h(q, function(r,t) {
var s=c(r);
s.ready(function() {
o[t]=s.exports;
n[t]=true;
var u=true;
h(n, function(v) {
if(v===false) {
return u=false
}
});
if(p&&u) {
p.apply(null,o)
}
});
s.lazyLoad()
})
};
l.module= function(n,p,q) {
var o=c(n);
o.fn=p;
o.deps=q;
if(g.requiredPaths[n]) {
o.define()
} else {
g.lazyLoadPaths[n]=true
}
};
l._fileMap= function(o,n) {
if( typeof o==="object") {
h(o, function(q,r) {
l._fileMap(r,q)
})
} else {
if( typeof n==="string") {
n=[n]
}
h(n, function(p) {
g.moduleFileMap[p]=o
})
}
};
var b= {};
l.context= function(o,q) {
var p=arguments.length;
if(p>1) {
b[o]=q
} else {
if(p==1) {
if( typeof o=="object") {
for(var n in o) {
if(o.hasOwnProperty(n)) {
b[n]=o[n]
}
}
} else {
return b[o]
}
}
}
};
"F" in window||(window.F=l)
})();
;(function() {
var j= {};
eventSplitter=/\s+/, slice=Array.prototype.slice, splice=Array.prototype.splice, toString=Object.prototype.toString, delegateEventSplitter=/^(\S+)\s*(.*)$/, FuncProto=Function.prototype, nativeBind=FuncProto.bind;
var h= function(n,m,o) {
var p;
if(m&&m.hasOwnProperty("constructor")) {
p=m.constructor
} else {
p= function() {
n.apply(this,arguments)
}
}
$.extend(p,n);
i.prototype=n.prototype;
p.prototype=new i();
if(m) {
$.extend(p.prototype,m)
}
if(o) {
$.extend(p,o)
}
p.prototype.constructor=p;
p.__super__=n.prototype;
return p
};
var e= function(m,n) {
var o=h(this,m,n);
o.extend=this.extend;
return o
};
var i= function() {
};
function k(m) {
if( typeof m!="undefined"&&m.callbacks) {
this.callbacks=m.callbacks
} else {
this.callbacks= {}
}
}
k.extend=e;
$.extend(k.prototype, {
on: function(p,t,o) {
var n, r, q, m, s;
if(!t) {
return this
}
p=p.split(eventSplitter);
n=this.callbacks;
while( r=p.shift()) {
s=n[r];
q= s?s.tail: {};
q.next= m= {};
q.context=o;
q.callback=t;
n[r]= {
tail:m,next: s?s.next:q
}
}
return this
},off: function(t,r,n) {
var m, u, o, q, p, s;
if(!( u=this.callbacks)) {
return
}
if(!(t||r||n)) {
delete this.callbacks;
return this
}
t= t?t.split(eventSplitter):j.keys(u);
while( m=t.shift()) {
o=u[m];
delete u[m];
if(!o||!(r||n)) {
continue
}
q=o.tail;
while(( o=o.next)!==q) {
p=o.callback;
s=o.context;
if((r&&p!==r)||(n&&s!==n)) {
this.on(m,p,s)
}
}
}
return this
},trigger: function(p) {
var t, s, o, n, m, r, q;
if(!( o=this.callbacks)) {
return this
}
r=o.all;
p=p.split(eventSplitter);
q=slice.call(arguments,1);
while( t=p.shift()) {
if( s=o[t]) {
n=s.tail;
while(( s=s.next)!==n) {
s.callback.apply(s.context||this,q)
}
}
if( s=r) {
n=s.tail;
m=[t].concat(q);
while(( s=s.next)!==n) {
s.callback.apply(s.context||this,m)
}
}
}
return this
}
});
j.bind= function f(p,n) {
var o, m;
if(p.bind===nativeBind&&nativeBind) {
return nativeBind.apply(p,slice.call(arguments,1))
}
if(!$.isFunction(p)) {
throw new TypeError
}
m=slice.call(arguments,2);
return o= function() {
if(!(this instanceof o)) {
return p.apply(n,m.concat(slice.call(arguments)))
}
i.prototype=p.prototype;
var r=new i;
var q=p.apply(r,m.concat(slice.call(arguments)));
if(Object(q)===q) {
return q
}
return r
}
};
var l=new k();
var a=0;
var d= function(m) {
var n=a++;
return m?m+n:n
};
var b= function(m,n) {
if(!(m&&m[n])) {
return null
}
return $.isFunction(m[n])?m[n]():m[n]
};
var c= {};
j.setGlobalParam= function(m) {
( typeof m!="undefined")&&$.isPlainObject(m)&&( c=$.extend({},c,m))
};
j.getGlobalParam= function() {
return c
};
var g= function(m) {
this.cid=d("widget");
this._configure(m|| {});
if(!this.options.$el) {
this.options.$el=$(document.body)
}
this.setElement(this.options.$el);
this.initialize.apply(this,arguments)
};
$.extend(g.prototype, {
initialize: function() {
},on: function(n,o,m) {
this.eventCenter.on(n,o,m)
},off: function(n,o,m) {
this.eventCenter.off(n,o,m)
},trigger: function(m) {
this.eventCenter.trigger(m)
},setGlobalParam: function(m) {
j.setGlobalParam(m)
},getGlobalParam: function(m) {
return j.getGlobalParam(m)
},eventCenter:l,_configure: function(m) {
if(this.options) {
m=$.extend({},this.options,m)
}
this.options=m|| {};
this.options.eventCenter&&(this.eventCenter=this.options.eventCenter)
},delegateEvents: function(q) {
if(!(q||( q=b(this,"events")))) {
return
}
this.undelegateEvents();
for(var p in q) {
var r=q[p];
if(!$.isFunction(r)) {
r=this[q[p]]
}
if(!r) {
throw new Error('Method "'+q[p]+'" does not exist')
}
var o=p.match(delegateEventSplitter);
var n=o[1], m=o[2];
r=j.bind(r,this);
n+=".delegateEvents"+this.cid;
if(m==="") {
this.$el.bind(n,r)
} else {
this.$el.delegate(m,n,r)
}
}
},setElement: function(m,n) {
if(this.$el) {
this.undelegateEvents()
}
this.$el=(toString.call(m)=="[object Array]")?m:$(m);
this.el=this.$el[0];
if(n!==false) {
this.delegateEvents()
}
return this
},remove: function() {
this.$el.remove();
return this
},undelegateEvents: function() {
this.$el.unbind(".delegateEvents"+this.cid)
},destroy: function() {
this.undelegateEvents();
this.remove()
}
});
g.extend=e;
j.Widget=g;
j.Events=k;
j.extend=e;
j.eventCenter=l;
$(window).bind("resize orientationchange", function() {
j.eventCenter.trigger("window_resize")
});
"_" in window||(window._=j)
})();
;
window.PageUnit=window.PageUnit|| {
load: function(c,b) {
var a="";
if( typeof (PageUnitData)=="object"&&PageUnitData[c]!=null) {
a=PageUnitData[c];
if(b!=null&&a.indexOf("<")==0) {
a=$(a).tbattr(b).get(0).outerHTML
}
}
return a
}
};
;(function(a,b) {
a.extend(String.prototype, {
getByteLength: function() {
return this.replace(/[^\x00-\xff]/g,"mm").length
},subByte: function(g,f) {
if(this.getByteLength()<=g) {
return this
}
f=f===b?"...":String(f);
g-=f.getByteLength();
for(var d=Math.floor(g/2), c=this.getByteLength();d<c;d++) {
var e=this.substring(0,d);
if(e.getByteLength()>=g) {
return e+f
}
}
return this
}
})
})(Zepto);
;(function(a,b) {
a.touchStart= function() {
return ("ontouchstart" in window)?"touchstart":"click"
}
})(Zepto);
;
var hashMoni= function(b) {
var c=null, d= function(e) {
var g;
for(var f in c) {
g=new RegExp(f);
if(g.test(e)) {
return c[f]
}
}
}, a= function() {
var f=window.location.hash.replace("#",""), e=d(f);
e&&e.call(this,f)
};
if( typeof b!=="object") {
return
} else {
c=b
}
$(window).bind("hashchange",a)
};
;
var scrollPos= function(a,e,f) {
if( typeof a=="undefined") {
return
}
var c=/^[0-9]+.?[0-9]*$/, b=c.test(e)?e:200, d=c.test(a)?a:($(a).length>0?(Object.prototype.toString.call(a)=="[object Array]"?a.offset()["top"]:( typeof a=="string"?$(a).offset()["top"]:0)):"error");
if(d==="error") {
return
}
setTimeout(function() {
if(f) {
var m=window.pageYOffset;
var l=f, j=10, h=l/j, g=(-m+d)/h;
for(var k=1;k<=h;k++) {
(function(n) {
window.setTimeout(function() {
scrollTo(0,n*g+m)
},n*j)
})(k)
}
} else {
window.scrollTo(0,d)
}
},b)
};
;
var andriodUCHigh= function() {
var e=navigator.appVersion, b=navigator.userAgent, c=(b.match(/Android/i)!=null), d=(e.match(/UC/i)!=null), a;
if(c&&d) {
a=e.substr(e.lastIndexOf("UC")+5,1);
if(a&&parseInt(a)>=6) {
return true
} else {
return false
}
} else {
return false
}
};
var postReply= function(b,a) {
if(andriodUCHigh()) {
if(b.offset()["top"]>500) {
setTimeout(function() {
if(a) {
a()
} else {
return
}
},10)
} else {
if(a) {
a()
} else {
return
}
}
} else {
if(a) {
a()
} else {
return
}
}
};
var saveTrafficModeSwitch= {
cookieName:"IS_SAVE_FLOW",getCookie: function(b) {
try {
if(b) {
return $.cookie(this.cookieName)
}
return $.cookie(this.cookieName)||0
} catch(a) {
if(b) {
return $("body").cookie(this.cookieName)
}
return $("body").cookie(this.cookieName)||0
}
},setCookie: function(d,b,c) {
b=b||this.cookieName, _expireDay=c||365;
try {
$.cookie(b,d,_expireDay)
} catch(a) {
$("body").cookie(b,d,_expireDay)
}
},init: function() {
var a=this.getCookie();
this.toggleStatus(a==1?0:1,false,false)
},bindEvents: function() {
var a=this;
$(".j_smode_switch").on("click", function(c) {
var b=a.getCookie();
a.toggleStatus(b,true,true)
})
},toggleStatus: function(a,c,b) {
if(a==1) {
$(".j_smode_switch").addClass("smode_switch_off");
c&&this.setCookie(0);
c&&this.setCookie(1,"abstract_mode");
_.eventCenter.trigger("saveflow_open")
} else {
$(".j_smode_switch").removeClass("smode_switch_off");
c&&this.setCookie(1);
c&&this.setCookie(0,"abstract_mode");
_.eventCenter.trigger("saveflow_close")
}
}
};
saveTrafficModeSwitch.bindEvents();
var saveTrafficModeTip= {
init: function(a) {
var c;
if(a==3||a==1) {
c=saveTrafficModeSwitch.getCookie();
if(parseInt($.cookie("3wtip"))!=1&&c==1) {
var b= function() {
var d=document.documentElement.offsetHeight-window.innerHeight-50;
if(window.pageYOffset>=d) {
setTimeout(function() {
$.toast.send("\u60a8\u73b0\u5728\u7f51\u901f\u8f83\u5feb\uff0c\u5efa\u8bae\u5173\u95ed\u7701\u6d41\u91cf\u6a21\u5f0f",3000);
$(window).off("scroll",b);
$.cookie("3wtip",1)
},0)
}
};
$(window).on("scroll",b)
}
}
}
};
;(function(a) {
a.escapeHTML= function(b) {
return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\s/g,"&nbsp;").replace(/"/g,"&quot;")
};
a.unescapeHTML= function(b) {
return b.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ").replace(/&quot;/g,'"')
}
})(Zepto);
;(function(a) {
a.tbFormat= function(d,e) {
if(e=="none"||e==null) {
return tempalte
}
for(var c in e) {
e[c]=a.escapeHTML(String(e[c]))
}
return b(d,e)
};
function b(m,j) {
if( typeof j==="undefined") {
return
}
var h=/([.*+?^=!:${}()|[\]\/\\])/g, g="{".replace(h,"\\$1"), c="}".replace(h,"\\$1");
var e=(new RegExp("#"+g+"([^"+g+c+"]+)"+c,"g")), d=(new RegExp("#"+g+"(\\d+)"+c,"g"));
if( typeof (j)=="object") {
return m.replace(e, function(k,n) {
var l=j[n];
if( typeof l=="function") {
l=l(n)
}
return typeof (l)=="undefined"?"":l
})
} else {
if( typeof (j)!="undefined") {
var i=Array.prototype.slice.call(arguments,0);
var f=i.length;
return m.replace(d, function(k,l) {
l=parseInt(l,10);
return (l>=f)?k:i[l]
})
}
}
}
})(Zepto);
;(function(d) {
var b= {
tbattr:d.fn.attr,tbprop:d.fn.prop,tbdata:d.fn.data
};
var a= {};
for(var c in b) {
(function(e) {
var f=b[e];
a[e]= function(h) {
var g=f.apply(this,arguments);
if( typeof (g)=="string") {
g=d.escapeHTML(g)
}
return g
}
})(c)
}
d.extend(d.fn,a)
})(Zepto);
;(function(b,a,c) {
b.cookie= function(g,i,e,k,h,j) {
if(i===c&& typeof g=="string") {
var d=a.cookie.match(new RegExp("(^| )"+g+"=([^;]*)(;|$)"));
if(d!=null) {
return unescape(d[2])
}
return false
} else {
if(e&&( typeof e=="number"||e.toUTCString)) {
var f;
if( typeof e=="number") {
f=new Date();
f.setTime(f.getTime()+(e*24*60*60*1000))
} else {
f=e
}
e="; expires="+f.toUTCString()
}
k= k?"; path="+k:";path=/";
h= h?"; domain="+h:"";
j= j?"; secure":"";
a.cookie=[g,"=",encodeURIComponent(i),e,k,h,j].join("")
}
};
b.removeCookie= function(e,d,h,f,g) {
if(b.cookie(e)!==null) {
b.cookie(e,null,-1);
return true
}
return false
}
})(Zepto,document);
;(function(b) {
var a= {
isWifi:undefined,is2g:undefined,is3g:undefined,init: function(c) {
this.isWifi=c==1;
this.is2g=c==2;
this.is3g=c==3
}
};
b.netType=a
})(Zepto);
;(function(a,b) {
a.location= {
getHref: function() {
return this._escape(location.href)
},setHref: function(c) {
location.href=c
},getSearch: function() {
return this._escape(location.search)
},getHash: function() {
return this._escape(location.hash)
},setHash: function(c) {
location.hash=c
},getHost: function() {
return location.host
},getHostname: function() {
return location.hostname
},getPort: function() {
return location.port
},getProtocol: function() {
return location.protocol
},getPathname: function() {
return this._escape(location.pathname)
},reload: function() {
location.reload()
},getOrigin: function() {
return this._escape(location.origin)
},_escape: function(c) {
return c.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&nbsp;").replace(/"/g,"&quot;")
},_escapeHTML: function(c) {
return c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\s/g,"&nbsp;").replace(/"/g,"&quot;")
},_unescapeHTML: function(c) {
return c.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ").replace(/&quot;/g,'"')
},_getSearchValue: function(e) {
var g=location.search.replace(/^\?/,""), h= {};
if(!g) {
return e===b?h:b
}
g=g.split("&");
var d;
for(var f=0, c=g.length;f<c;f++) {
d=g[f].indexOf("=");
if(d>0) {
h[g[f].substring(0,d)]=g[f].substring(d+1)
} else {
h[g[f]]=""
}
}
return e===b?h:h[e]
},getSearchValue: function(d) {
if(d) {
var c=this.getSearch(d);
if(c!=null) {
return this._escapeHTML(this._decode(c))
} else {
return null
}
} else {
var f=this.getSearch();
for(var e in f) {
f[e]=this._escapeHTML(this._decode(f[e]))
}
return f
}
},_decode: function(c) {
try {
return decodeURIComponent(c)
} catch(d) {
return c
}
}
}
})(Zepto);
;(function(c) {
var f="touchstart", s="touchmove", g="touchend", r="touchcancel", j="gesturestart", b="gesturechange", o="gestureend", n="webkitTransitionEnd";
var l=Math, a=("WebKitCSSMatrix" in window&&"m11" in new WebKitCSSMatrix()), k=(function() {
return window.requestAnimationFrame||window.webkitRequestAnimationFrame||
function(m) {
return setTimeout(m,17)
}
})(), i=(function() {
return window.cancelRequestAnimationFrame||window.webkitCancelAnimationFrame||clearTimeout
})();
var d=300, q=250, h=0.1, p=350;
var e= function(m) {
this._options= {
container:null,selector:null,wrap:null,hScroll:false,vScroll:false,momentum:true,bounce:true,bounceMaxX:null,bounceMaxY:null,speedScale:1,zoomed:true,vAutoScrollOutIn:true,useTransition:false,isDispatchClick:true,snap:false,snapThreshold:200,onScroll:null,onTouchStart: function(t) {
c.os.android&&t.preventDefault()
},onTouchMoveStart:null,onTouchMoveEnd:null,onTouchEnd:null,onGestureStart:null,onGestureChange:null,onGestureEnd:null,onTransitionEnd:null,onBounceEnd:null,onMomentumStart:null,onScrollEnd:null,onSnapStart:null,onSnapUpdateEnd:null,onSnapBounceEnd:null
};
this.steps=[];
this._data= {
scale:1,initX:0,initY:0,startTime:0,pointX:0,pointY:0,isMoveX:false,isMoveY:false,moved:false,distX:0,distY:0,adjustDistX:0,adjustDistY:0,currentX:0,currentY:0,isGesture:false,scrollerOffset:null
},this._base= {
$container:null,$scroller:null,containerHeight:null,containerWidth:null
},c.extend(this._options,m);
this.refresh();
this._delegateEvent(f);
this._delegateEvent(s);
this._delegateEvent(g);
this._delegateEvent(r);
if(this._options.useTransition) {
this._delegateEvent(n)
}
if(this._options.zoomed) {
this._delegateEvent(j);
this._delegateEvent(b);
this._delegateEvent(o)
}
};
e.prototype= {
_snaping:"",_handleEvent: function(m) {
var t=this;
switch(m.type) {
case f:
t._touchStart(m);
break;
case s:
t._touchMove(m);
break;
case g:
case r:
t._touchEnd(m);
break;
case j:
t._gestureStart(m);
break;
case b:
t._gestureChange(m);
break;
case o:
t._gestureEnd(m);
break;
case n:
t._transitionEnd(m)
}
},refresh: function() {
var v=this, u=v._data, t=v._base, m=v._options;
t.$container= typeof m.container==="string"?m.wrap.find(m.container).first():m.container;
if(!t.$container||!t.$container.length) {
return false
}
_offset=t.$container.offset();
t.containerHeight=_offset.height;
t.containerWidth=_offset.width;
t.$scroller= typeof m.selector==="string"?t.$container.find(m.selector).first():m.selector;
if(!t.$scroller||!t.$scroller.length) {
return false
}
u.scrollerOffset=t.$scroller.offset()
},_preventDefault: function(m) {
m.preventDefault()
},_touchStart: function(w) {
var x=this, v=x._data, u=x._base, m=x._options;
if( typeof m.container==="string") {
u.$container=c(w.target).closest(m.container)
} else {
u.$container=m.container
}
var t=u.$container.offset();
x._enabledTouch=true;
x._data.isGesture=false;
u.$scroller= typeof m.selector==="string"?c(w.target).closest(m.selector):m.selector;
u.$scroller.bind("click",x._preventDefault);
u.containerHeight=t.height;
u.containerWidth=t.width;
v.startTime=w.timeStamp||Date.now();
!x._snaping&&i(x.aniTime);
m.useTransition&&x.transitionTime(0);
v.initX=v.currentX;
v.initY=v.currentY;
v.startX=v.currentX;
v.startY=v.currentY;
v.moved=false;
c.isFunction(m.onTouchStart)&&m.onTouchStart.call(x,w);
v.scrollerOffset=u.$scroller.offset();
v.isMoveX=(v.scrollerOffset.width>u.containerWidth)?true:false;
v.isMoveY=(v.scrollerOffset.height>u.containerHeight)?true:false;
v.minScrollX=v.isMoveX?(u.containerWidth-v.scrollerOffset.width-(v.scale-1)*v.scrollerOffset.width/2):0;
v.minScrollY=v.isMoveY?(u.containerHeight-v.scrollerOffset.height-(v.scale-1)*v.scrollerOffset.height/2):0;
v.maxScrollX=v.isMoveX?(v.scale-1)*v.scrollerOffset.width/2:0;
v.maxScrollY=v.isMoveY?(v.scale-1)*v.scrollerOffset.height/2:0;
v.isMoveX=m.hScroll||v.isMoveX;
v.isMoveY=m.vScroll||v.isMoveY;
m.bounceMaxX=l.abs(m.bounceMaxX)||u.containerWidth;
m.bounceMaxY=l.abs(m.bounceMaxY)||u.containerHeight;
if(w.touches.length===1) {
v.moved=false;
v.pointX=w.touches[0].pageX;
v.pointY=w.touches[0].pageY
}
},_touchMove: function(w) {
var x=this, m=x._options, u=x._base, t=x._data, v=Date.now();
if(x._snaping||w.touches.length!==1) {
t.pointX=w.touches[0].pageX;
t.pointY=w.touches[0].pageY;
x._enabledTouch=false;
c.isFunction(x._options.onTouchMoveStart)&&x._options.onTouchMoveStart.call(x,w);
return false
}
t.moved=true;
t.distX=w.touches[0].pageX-t.pointX;
t.distY=w.touches[0].pageY-t.pointY;
t.adjustDistX=t.isMoveX?t.distX:0;
t.adjustDistY=t.isMoveY?t.distY:0;
t.adjustDistX=t.adjustDistX/t.scale+t.initX;
t.adjustDistY=t.adjustDistY/t.scale+t.initY;
if(v-t.startTime>d) {
t.startTime=v;
t.startX=t.currentX;
t.startY=t.currentY
}
if(x._options.vAutoScrollOutIn) {
if((t.adjustDistY>t.maxScrollY&&t.initY==t.maxScrollY)||(t.adjustDistY<t.minScrollY&&t.initY==t.minScrollY)) {
this._enabledTouch=false;
c.os.android&&window.scrollTo(0,window.pageYOffset-t.distY)
} else {
w.preventDefault()
}
}
if(x._options.bounce) {
t.adjustDistX=t.adjustDistX>=t.maxScrollX?(t.adjustDistX-t.maxScrollX)*m.bounceMaxX/u.containerWidth+t.maxScrollX:(t.adjustDistX<t.minScrollX?(t.adjustDistX-t.minScrollX)*m.bounceMaxX/u.containerWidth+t.minScrollX:t.adjustDistX);
t.adjustDistY=t.adjustDistY>=t.maxScrollY?(t.adjustDistY-t.maxScrollY)*m.bounceMaxY/u.containerHeight+t.maxScrollY:(t.adjustDistY<t.minScrollY?(t.adjustDistY-t.minScrollY)*m.bounceMaxY/u.containerHeight+t.minScrollY:t.adjustDistY)
} else {
t.adjustDistX=t.adjustDistX>t.maxScrollX?t.maxScrollX:(t.adjustDistX<t.minScrollX?t.minScrollX:t.adjustDistX);
t.adjustDistY=t.adjustDistY>t.maxScrollY?t.maxScrollY:(t.adjustDistY<t.minScrollY?t.minScrollY:t.adjustDistY)
}
c.isFunction(x._options.onTouchMoveStart)&&x._options.onTouchMoveStart.call(x,w);
if(!x._enabledTouch) {
return false
}
x.render(x._base.$scroller,t.scale,t.adjustDistX,t.adjustDistY);
c.isFunction(x._options.onTouchMoveEnd)&&x._options.onTouchMoveEnd.call(x,w)
},_touchEnd: function(B) {
var A=this, m=A._data, C=A._base, D=A._options, w= {
dist:0,time:0
}, v= {
dist:0,time:0
}, x=(B.timeStamp||Date.now())-m.startTime, u, t, z, y;
if(!this._enabledTouch) {
m.initX=m.currentX;
m.initY=m.currentY;
if(A._snaping) {
return false
}
z=m.currentX;
y=m.currentY;
t=m.initX+m.distX/l.abs(m.distX)*D.snapThreshold;
if(D.snap&&t>=m.minScrollX&&t<=m.maxScrollX) {
if(x<q||l.abs(m.distX)>h*C.containerWidth) {
z=m.initX+(m.distX/l.abs(m.distX))*D.snapThreshold
} else {
z=m.initX
}
A.snap(z,y)
}
} else {
if(m.moved) {
c.isFunction(A._options.onMomentumStart)&&A._options.onMomentumStart.call(A,B);
z=m.currentX;
y=m.currentY;
t=m.initX+m.distX/l.abs(m.distX)*D.snapThreshold;
if(D.snap&&t>=m.minScrollX&&t<=m.maxScrollX) {
if(x<q||l.abs(m.distX)>h*C.containerWidth) {
z=m.initX+(m.distX/l.abs(m.distX))*D.snapThreshold
} else {
z=m.initX
}
A.snap(z,y);
c.isFunction(A._options.onTouchEnd)&&A._options.onTouchEnd.call(A);
return
}
if(x<d&&D.momentum) {
w= z?A._momentum(z-m.startX,x,-z,m.scrollerOffset.width-C.containerWidth+z,D.bounce?C.containerWidth:0):w;
v= y?A._momentum(y-m.startY,x,-y,m.scrollerOffset.height-C.containerHeight+y,D.bounce?C.containerHeight:0):v;
z=z+w.dist;
y=y+v.dist;
if((m.currentX>m.maxScrollX&&z>m.maxScrollX)||(m.currentX<m.minScrollX&&z<m.minScrollX)) {
w= {
dist:0,time:0
}
}
if((m.currentY<m.minScrollY&&y<m.minScrollY)||(m.currentY>m.maxScrollY&&y>m.maxScrollY)) {
v= {
dist:0,time:0
}
}
}
if(w.dist||v.dist) {
u=l.max(l.max(w.time,v.time),10);
z=l.round(z);
y=l.round(y);
A.scrollTo(u,z,y);
m.initX=z;
m.initY=y
} else {
A.fixPosition()
}
} else {
C.$scroller.unbind("click",A._preventDefault);
if(D.isDispatchClick&&c.os.android&&B.type!==r) {
setTimeout(function() {
var F=B.target;
while(F.nodeType!=1) {
F=F.parentNode
}
if(F.tagName!="SELECT"&&F.tagName!="INPUT"&&F.tagName!="TEXTAREA") {
var E=document.createEvent("MouseEvents");
E.initMouseEvent("click",true,true,B.view,1,B.screenX,B.screenY,B.clientX,B.clientY,B.ctrlKey,B.altKey,B.shiftKey,B.metaKey,0,null);
E._fake=true;
F.dispatchEvent(E)
}
},p)
}
}
}
c.isFunction(A._options.onTouchEnd)&&A._options.onTouchEnd.call(A,B)
},_gestureStart: function(m) {
var t=this;
t._enabledGesture=true;
c.isFunction(t._options.onGestureStart)&&t._options.onGestureStart.call(t,m)
},_gestureChange: function(m) {
m.preventDefault();
var t=this;
t._data.newScale=m.scale*t._data.scale;
if(!this._enabledGesture) {
return false
}
t.render(t._base.$scroller,t._data.newScale,t._data.initX,t._data.initY);
c.isFunction(t._options.onGestureChange)&&t._options.onGestureChange.call(t,m)
},_gestureEnd: function(m) {
var t=this;
t._data.scale=t._data.newScale;
t._data.isGesture=true;
c.isFunction(t._options.onGestureEnd)&&t._options.onGestureEnd.call(t,m)
},_transitionEnd: function(m) {
var t=this;
if(m.target!=t._base.$scroller[0]) {
return
}
t.fixPosition();
t._snaping=="snapBounce"&&c.isFunction(t._options.onSnapBounceEnd)&&t._options.onSnapBounceEnd.call(t,m);
t._snaping=="snapUpdate"&&c.isFunction(t._options.onSnapUpdateEnd)&&t._options.onSnapUpdateEnd.call(t,m);
c.isFunction(t._options.onTransitionEnd)&&t._options.onTransitionEnd.call(t);
t._snaping=""
},_delegateEvent: function(v,u,t) {
var w=this, m=w._options;
if( typeof m.selector=="object") {
m.selector.bind(v, function(x) {
w._handleEvent.call(w,x)
});
return
}
(t||m.wrap||m.container).delegate(u||m.selector,v, function(x) {
w._handleEvent.call(w,x)
})
},transitionTime: function(m) {
this._base.$scroller.css("-webkit-transition-duration",m+"ms")
},fixPosition: function(y) {
var z=this, w=z._data, v=z._base, u=w.currentX, m=w.currentY;
y=y||z._base.$scroller;
var t=z._options.zoomed?y.offset(): {
width:w.scrollerOffset.width,height:w.scrollerOffset.height,left:w.currentX,top:w.currentY
};
w.isMoveX=(t.width>v.containerWidth)?true:false;
w.isMoveY=(t.height>v.containerHeight)?true:false;
if(!w.isMoveY) {
m=0
} else {
var x=t.top;
if(x>0) {
m=m-x/w.scale
} else {
if(x+t.height<v.containerHeight) {
m=m-(x+t.height-v.containerHeight)/w.scale
}
}
}
if(!w.isMoveX) {
u=0
} else {
if(t.left>0) {
u=u-t.left/w.scale
} else {
if(t.left+t.width<v.containerWidth) {
u=u-(t.left+t.width-v.containerWidth)/w.scale
}
}
}
if(w.scale<1) {
w.scale=1
}
w.scaled=false;
w.initX=u;
w.initY=m;
if(u==w.currentX&&m==w.currentY) {
c.isFunction(z._options.onScrollEnd)&&z._options.onScrollEnd.call(z);
return false
}
if(z._options.bounce) {
z.scrollTo(200,u,m,"bounce")
} else {
z.render(y,w.scale,u,m)
}
},snap: function(m,w) {
var v=this, u=v._data, t=m!=u.initX?"snapUpdate":"snapBounce";
u.initX=m;
u.initY=w;
v._snaping=t;
c.isFunction(v._options.onSnapStart)&&v._options.onSnapStart.call(v);
v.scrollTo(200,m,w,t)
},scrollTo: function(u,m,w,t) {
var v=this;
m=(m==undefined)?v._data.initX:m;
w=(w==undefined)?v._data.initY:w;
v.stop();
v.steps.push({
x:m,y:w,time:u||0
});
v._startAni(t)
},render: function(v,u,t,m) {
var w=this;
if(!v[0]) {
return false
}
u=u||1;
t=t||0;
m=m||0;
if(!w._options.zoomed||c.os.ios) {
v[0].style.webkitTransform="scale("+u+") "+( a?"translate3d":"translate")+"("+t+"px, "+m+"px"+( a?", 0px)":")")
} else {
v[0].style.webkitTransform="scale("+u+")";
v.parent()[0].style.webkitTransform=( a?"translate3d":"translate")+"("+t*u+"px, "+m*u+"px"+( a?", 0px)":")")
}
w._data.currentX=t;
w._data.currentY=m;
c.isFunction(w._options.onScroll)&&w._options.onScroll.call(w)
},_momentum: function(z,u,x,t,B) {
var y=0.0006, v=l.abs(z)*(this._options.speedScale||1)/u, m=(v*v)/(2*y), A=0, w=0;
if(z>0&&m>x) {
w=B/(6/(m/v*y));
x=x+w;
v=v*x/m;
m=x
} else {
if(z<0&&m>t) {
w=B/(6/(m/v*y));
t=t+w;
v=v*t/m;
m=t
}
}
m=m*(z<0?-1:1);
A=v/y;
return {
dist:m,time:l.round(A)
}
},_startAni: function(A) {
var z=this, u=z._data, y=u.currentX, x=u.currentY, v=Date.now(), w, B, t, m=z._base.$scroller;
if(z.animating||!z.steps.length) {
return
}
w=z.steps.shift();
if(w.x==y&&w.y==x) {
w.time=0
}
z.animating=true;
if(z._options.useTransition) {
z.transitionTime(w.time);
z.render(m,u.scale,w.x,w.y);
z.animating=false;
return
}
t= function() {
var C=Date.now(), E, D;
if(C>=v+w.time) {
z.render(m,u.scale,w.x,w.y);
z.animating=false;
z.fixPosition();
c.isFunction(z._options.onTransitionEnd)&&z._options.onTransitionEnd.call(z);
A==="bounce"&&c.isFunction(z._options.onBounceEnd)&&z._options.onBounceEnd.call(z);
A==="snapBounce"&&c.isFunction(z._options.onSnapBounceEnd)&&z._options.onSnapBounceEnd.call(z);
A==="snapUpdate"&&c.isFunction(z._options.onSnapUpdateEnd)&&z._options.onSnapUpdateEnd.call(z);
z._snaping="";
return
}
C=(C-v)/w.time-1;
B=l.sqrt(1-C*C);
E=(w.x-y)*B+y;
D=(w.y-x)*B+x;
z.render(m,u.scale,E,D);
if(z.animating) {
z.aniTime=k(t)
}
};
t()
},stop: function() {
i(this.aniTime);
this.steps=[];
this.animating=false
},setOptions: function(m,t) {
this._options[m]=t
},setData: function(m,t) {
this._data[m]=t
},getData: function(m) {
return this._data[m]
},setBaseData: function(m,t) {
this._base[m]=t
},getBaseData: function(m) {
return this._base[m]
},getSnapingStatus: function() {
return this._snaping
},setSnapingStatus: function(m) {
this._snaping=m
},resetDatas: function(t) {
if(!t[0]) {
return false
}
var m=this._data.scale;
c.extend(this._data, {
scale:1,initX:0,initY:0,startTime:0,pointX:0,pointY:0,isMoveX:false,isMoveY:false,moved:false,distX:0,distY:0,adjustDistX:0,adjustDistY:0,currentX:0,currentY:0,isGesture:false
});
if(m!==1||t.height()>this._base.containerHeight) {
this.render(t)
}
},enableTouch: function() {
this._enabledTouch=true
},disableTouch: function() {
this.stop();
this._enabledTouch=false
},enableGesture: function() {
this._enabledGesture=true
},disableGesture: function() {
this._enabledGesture=false
},destory: function() {
var m=this._options, t=m.wrap?m.wrap:m.container;
if( typeof m.selector==="string") {
t.undelegate(this._options.selector)
} else {
m.selector.unbind()
}
}
};
c.iGesture=e
})(Zepto);
;(function(a) {
var b= function(e,c) {
var f=this, d;
f.options= {
damp:0.001,horizon:true,snap:false,preventDefaultScroll:null,onBeforeScrollStart:null,onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null,predictByInertia:false,overflow:"spring",getScrollerWidth: function() {
return this.$scroller.width()||document.body.clientWidth
},getContainerWidth: function() {
return a(e).width()||document.body.clientWidth
}
};
for(d in c) {
f.options[d]=c[d]
}
f.direction=f.options.horizon?"x":"y";
f.x=f.options.x;
f.y=f.options.y;
f._touchCache=[];
f._usePercentPosition=a.os.ios||a.browser.chrome;
f.$wrapper=a(e);
f.$scroller=f.$wrapper.children().first();
f.$scroller.addClass("scroller");
f.$item=f.$scroller.children();
f.width=f.options.getScrollerWidth.call(f);
f.containerWidth=f.options.getContainerWidth.call(f);
f._bind("resize",window);
f._bind("webkitTransitionEnd");
f._bind("touchstart");
f.currentPage=0
};
b.prototype= {
handleEvent: function(d) {
var c=this;
switch(d.type) {
case"touchstart":
c._start(d);
break;
case"touchmove":
c._move(d);
break;
case"touchend":
case"touchcancel":
c._end(d);
break;
case"resize":
c._resize();
break;
case"webkitTransitionEnd":
c._transitionEnd(d);
break
}
},_prevent: function(c) {
c.preventDefault()
},_start: function(d) {
var c=this;
if(c.width*c.$item.length<=c.containerWidth) {
return
}
d.srcElement.addEventListener("click",c._prevent);
c.started=true;
c.moved=false;
if(c.options.preventDefaultScroll===null) {
c.useDefault=undefined
}
var f=c._getPos();
c.startPos= {
x:d.touches[0].pageX,y:d.touches[0].pageY,xTrans:f.x,yTrans:f.y,t:d.timeStamp||Date.now()
};
c._setTransition(0);
c._bind("touchmove");
c._bind("touchend");
c._bind("touchcancel")
},doScrollMove: function(d) {
var c=this;
if(c.interval) {
clearInterval(c.interval);
c.interval=null
}
c._setPos(d)
},_move: function(d) {
var c=this;
if(!c.started) {
c._unbind("touchmove");
return
}
c._cache(d);
if(c.options.preventDefaultScroll===true) {
d.preventDefault();
c.doScrollMove(d)
} else {
if(c.options.preventDefaultScroll===false) {
c.doScrollMove(d)
} else {
if(!c.moved) {
c._setUseDefault()
}
if(c.useDefault) {
c._unbind("touchmove");
c._unbind("touchend");
c._unbind("touchcancel")
} else {
d.preventDefault();
d.stopPropagation();
c.doScrollMove(d)
}
}
}
c.moved=true
},_end: function(k) {
var j=this;
if(!j.moved) {
k.srcElement.removeEventListener("click",j._prevent)
} else {
k.preventDefault();
j._cacheTouchEnd(k);
var h=j._getSpeed(), f, c=j._setPos(k)[j.direction]+j.width*j.currentPage, l=c/j.width, g=Math.abs(h/j.options.damp), d=0;
if(j.options.predictByInertia) {
l+=(g*h/2/j.width);
var i=((k.timeStamp||Date.now())-j.startPos.t), n=1/(-1/(0.00005*Math.pow(h,2)*Math.pow(i,3)+1)+1);
if(l*h>0) {
d=l>0?0.4:-0.4
}
var m=-Math.round(l*n+d);
if(Math.abs(m)>1&&n>2&&h) {
m=m>0?1:-1
}
} else {
m=0;
if(c<-10&&h<0.2) {
m=1
} else {
if(c>10&&h>-0.2) {
m=-1
}
}
}
j.setCurrentPage(j.currentPage+m);
c+=j.width*m;
f=Math.abs(c/h*2);
if(f<50) {
f=50
} else {
if(f>400) {
f=400
}
}
j.scrollToPage(j.currentPage,f);
if(j.options.onTouchEnd) {
j.options.onTouchEnd.call(j)
}
}
j._unbind("touchmove");
j._unbind("touchend");
j._unbind("touchcancel")
},_resize: function(c) {
this.width=this.options.getScrollerWidth.call(this,c);
this.containerWidth=this.options.getContainerWidth.call(this,c)
},_transitionEnd: function(c) {
this._setTransition();
if(this.options.onScrollEnd) {
this.options.onScrollEnd.call(this)
}
},_bind: function(e,d,c) {
(d||this.$wrapper[0]).addEventListener(e,this,!!c)
},_unbind: function(e,d,c) {
(d||this.$wrapper[0]).removeEventListener(e,this,!!c)
},_getPos: function(d) {
d= d?a(d)[0]:this.$scroller[0];
var c=getComputedStyle(this.$scroller[0],null)["webkitTransform"].replace(/[^0-9\-.,]/g,"").split(",");
return {
x:c[4]*1||0,y:c[5]*1||0
}
},_setPos: function(g,d) {
d=a(d||this.$scroller);
var f= {
x:0,y:0
}, c=this.direction;
if(g&&g.x!==undefined&&g.y!==undefined) {
f=g;
d[0].style.webkitTransform="translate("+f.x+", "+f.y+") translateZ(0)"
} else {
var h=(g===undefined||g.touches.length===0)?this._touchCache[0]: {
x:g.touches[0].pageX,y:g.touches[0].pageY
};
f[c]=h[c]-this.startPos[c]+this.startPos[c+"Trans"];
if(this.options.overflow) {
switch(this.options.overflow) {
case"spring":
if(f[c]>0) {
f[c]/=2
} else {
if(f[c]<-this.width*this.$item.length+this.containerWidth) {
f[c]-=(f[c]+this.width*this.$item.length-this.containerWidth)/2
}
}
break;
default:
if(f[c]>0) {
f[c]=0
} else {
if(f[c]<-this.width*this.$item.length+this.containerWidth) {
f[c]=-this.width*this.$item.length+this.containerWidth
}
}
break
}
}
d[0].style.webkitTransform="translate("+f.x+"px,"+f.y+"px) translateZ(0)"
}
return f
},_setTransition: function(d,c) {
d=(d===undefined)?200:d;
a(c||this.$scroller)[0].style.webkitTransitionDuration=d+"ms"
},setCurrentPage: function(c) {
if(c===undefined) {
return
} else {
if(c<0) {
c=0
} else {
if(c>this.$item.length-1) {
c=this.$item.length-1
}
}
}
this.currentPage=c;
return this.currentPage
},_cache: function(d) {
var c=d.timeStamp||Date.now();
if(this._touchCache[0]&&(c-this._touchCache[0]["t"]<50)) {
return
}
if(this._touchCache.length>1) {
this._touchCache=[this._touchCache.shift()]
}
this._touchCache.unshift({
x:d.touches[0].pageX,y:d.touches[0].pageY,t:c
})
},_cacheTouchEnd: function(d) {
var c=d.timeStamp||Date.now();
this._touchCache[0]&&(this._touchCache[0].t=c)
},_getSpeed: function() {
var d=this.direction, c=this._touchCache;
if(c.length===2&&d) {
return (c[0][d]-c[1][d])/(c[0]["t"]-c[1]["t"])
} else {
if(c.length===1) {
return (c[0][d]-this.startPos[d])/(c[0]["t"]-this.startPos.t)
} else {
return
}
}
},_setUseDefault: function() {
var d=this._touchCache;
if(this.useDefault!==undefined||d.length<2) {
return -1
} else {
var c=Math.abs((d[0]["y"]-d[1]["y"])/(d[0]["x"]-d[1]["x"]));
this.useDefault=(this.direction==="y")?(c<1):(c>1)
}
},scrollToPage: function(c,e) {
var d=this.setCurrentPage(c);
if((this.$item.length-d)*this.width>=this.containerWidth) {
this._setPos({
x:this._usePercentPosition?(100*-c+"%"):(this.width*-c+"px"),y:0
})
} else {
this._setPos({
x:this.containerWidth-this.$item.length*this.width+"px",y:0
})
}
this._setTransition(e)
},destroy: function() {
if(this.options.onDestroy) {
this.options.onDestroy.call(this)
}
this._unbind("resize",window);
this._unbind("webkitTransitionEnd");
this._unbind("touchstart");
this._unbind("touchmove");
this._unbind("touchend");
this._unbind("touchcancel")
}
};
a.Scroll=b
})(Zepto);
;(function(a,b) {
a.storage= {
available: function() {
try {
if(!!window.localStorage) {
window.localStorage.setItem("jQuery Store Availability test",true);
window.localStorage.removeItem("jQuery Store Availability test");
return true
}
return false
} catch(c) {
return false
}
},init: function() {
},get: function(c) {
return window.localStorage.getItem(c)
},set: function(c,d) {
window.localStorage.setItem(c,d)
},del: function(c) {
window.localStorage.removeItem(c)
},flush: function() {
window.localStorage.clear()
}
}
})(Zepto);
;(function(a,b) {
a.sessionstorage= {
available: function() {
try {
if(!!window.sessionStorage) {
window.sessionStorage.setItem("jQuery Store Availability test",true);
window.sessionStorage.removeItem("jQuery Store Availability test");
return true
}
return false
} catch(c) {
return false
}
},init: function() {
},get: function(c) {
return window.sessionStorage.getItem(c)
},set: function(c,d) {
window.sessionStorage.setItem(c,d)
},del: function(c) {
window.sessionStorage.removeItem(c)
},flush: function() {
window.sessionStorage.clear()
}
}
})(Zepto);
;(function(e,f) {
var d=navigator.userAgent, a=navigator.appVersion, c=e.browser, b;
e.os.android=e.os.android||/HTC/.test(d);
if(!e.os.android&&( b=d.match(/(Android).*?([\d.]+)/))) {
e.os.android=true;
e.os.version=b[2]
}
e.extend(c, {
qq:/qq/i.test(d),chrome:/chrome/i.test(d)||/CriOS/i.test(d),uc:/UC/i.test(d)||/UC/i.test(a),safari:/safari/i.test(a),baidu:/flyflow/i.test(d)||/baidubrowser/i.test(a),palmBaidu:/bdmobile/i.test(d),baiduFrame:/baiduboxapp/i.test(d)
});
c.safari=c.safari&&!c.qq&&!c.uc&&!c.chrome&&!c.baidu&&!c.palmBaidu;
c.version=c.uc?a.match(/UC(?:Browser)?\/([\d.]+)/):c.qq?d.match(/MQQBrowser\/([\d.]+)/):c.chrome?d.match(/(?:CriOS|Chrome)\/([\d.]+)/):c.baidu?d.match(/(?:flyflow|baidubrowser)\/([\d.]+)/i):c.palmBaidu?d.match(/(?:bdmobile)\/([\d.]+)/i):c.version;
c.version!==null&&( typeof c.version=="object")&&(c.version=c.version[1]);
e.viewport= {
getViewportHeight: function() {
var g=document.documentElement.clientHeight;
return !e.os.android&&e.browser.safari?(g+60):g
},getViewportWidth: function() {
return window.innerWidth
}
};
e.isSupportFix=(e.os.ios&&parseFloat(e.os.version)>=5)||(e.os.android&&parseFloat(e.os.version)>2.1);
e.throttle= function(g,h,l) {
var j=0, i;
if( typeof h!=="function") {
l=h;
h=g;
g=250
}
function k() {
var p=this, q=Date.now()-j, o=arguments;
function n() {
j=Date.now();
h.apply(p,o)
}
function m() {
i=f
}
if(l&&!i) {
n()
}
i&&clearTimeout(i);
if(l===f&&q>g) {
n()
} else {
i=setTimeout( l?m:n,l===f?g-q:g)
}
}
k._zid=h._zid=h._zid||e.proxy(h)._zid;
return k
};
e.debounce= function(g,i,h) {
return i===f?e.throttle(250,g,false):e.throttle(g,i,h===f?false:h!==false)
};
e(document).ready(function() {
(function() {
e(window).on("scroll",e.debounce(100, function() {
e(document).trigger("scrollStop")
},false))
})()
})
})(Zepto);
;(function(b) {
var a;
b.fn.imglazyload= function(c) {
c=b.extend({
threshold:0,container:window,urlName:"data-url",nodeTag:"",placeHolder:"",eventName:"scrollStop",startload:null,refresh:true
},c);
var e=this.selector.toString(), f=Array.prototype.splice, j=b(c.container), k=j.scrollTop(), i=j.height(), d= {
init: function(n,m) {
return k>=n-c.threshold-i&&k<=n+m+i
},"default": function(p,m) {
var o=j.scrollTop(), n=j.height();
return o>=p-c.threshold-n&&o<=p+m+n
}
};
function l(m) {
return b.slice(m).reverse()
}
a=l(this);
function h(r,o) {
var n=b(r), q=n.attr(c.urlName), p=b("<img />"), m=c.nodeTag?b("<"+c.nodeTag+"></"+c.nodeTag+">"):p;
b.isFunction(c.startload)&&c.startload.call(this,n,m);
p.on("load", function() {
c.nodeTag&&m.css("background-image","url("+q+")");
n.trigger("loadcomplete",[m]).replaceWith(m);
p.off("load");
f.call(a,o,1)
}).on("error", function() {
var s=b.Event("error");
n.trigger(s);
s.defaultPrevented&&f.call(a,o,1);
p.off("error").remove()
}).attr("src",q)
}
function g(o) {
if(c.refresh&&e) {
a=l(b(e))
}
var m, n, p, q;
for( m=a.length;m--;) {
n=b( q=a[m]);
p=n.offset();
d[o||"default"](p.top,p.height)&&h(q,m)
}
}
b(document).ready(function() {
g("init")
});
(c.container===window?b(document):j).on(c.eventName, function() {
g()
});
return this
}
})(Zepto);
;(function(d) {
function b(g) {
g=g||((d.os.android&&d.browser.uc)?1.5:window.devicePixelRatio);
var h= function(j,i) {
return Math[j](window.innerHeight,window.innerWidth)*i
}, e=h("min",g), f=h("max",g);
return {
width:e,height:f
}
}
function c(e) {
e=parseInt(e,10);
var f=null;
switch(e) {
case 1:
f=b();
break;
default:
f=b(1)
}
return {
width:f.width,height:f.height
}
}
function a(e) {
e=parseInt(e,10);
var f="";
switch(e) {
case 2:
f=80;
break;
default:
f=100
}
return {
quality:f
}
}
d.resolution=b;
d.getImgSizePara=c;
d.getImgQualityPara=a
})(Zepto);
;(function(a,b) {
a.track= function(e) {
e=e|| {};
var c=new Image();
var d="http://static.tieba.baidu.com/tb/img/track.gif?";
var f=["client_type=wap_smart","url="+encodeURIComponent(document.location.href),"refer="+encodeURIComponent(document.referrer),"uname="+(e.uname&&encodeURIComponent(e.uname)||""),"task="+(e.task&&encodeURIComponent(e.task)||""),"page="+(e.page&&encodeURIComponent(e.page)||""),"locate="+(e.locate&&encodeURIComponent(e.locate)||""),"type="+(e.type&&encodeURIComponent(e.type)||"click"),"fname="+(e.fname&&encodeURIComponent(e.fname)||""),"fid="+(e.fid&&encodeURIComponent(e.fid)||""),"tid="+(e.tid&&encodeURIComponent(e.tid)||""),"pid="+(e.pid&&encodeURIComponent(e.pid)||""),"version="+(a.os.android?"android":"iphone"),"first_dir="+(e.firstDir&&encodeURIComponent(e.firstDir)||""),"second_dir="+(e.secondDir&&encodeURIComponent(e.secondDir)||""),"net_type="+(e.netType&&encodeURIComponent(e.netType)||""),"is_new_user="+(e.isNewUser&&encodeURIComponent(e.isNewUser)||""),"_t="+(new Date())*1000];
d+=f.join("&");
c.src=d;
c=null
}
})(Zepto);
;(function(b) {
var a=(function() {
if($.os.ios&&parseFloat($.os.version)<5) {
return false
}
if($.os.android&&(parseFloat($.os.version)<2.1||parseFloat($.os.version)==2.3)) {
return false
}
if(/M031/.test(navigator.userAgent)) {
return false
}
return true
})();
function c(e,d) {
this.$el=e;
this.options= {};
$.extend(this.options,d);
if(a) {
this._nativeFixed()
} else {
this._absoluteFixed()
}
this._initEvents()
}
c.prototype= {
_setNativePosition: function(e,d) {
if( typeof d=="undefined") {
e.css({
top:0,left:0
})
}
if( typeof d.top=="undefined") {
if( typeof d.bottom=="undefined") {
e.css("top",0)
} else {
e.css("bottom",d.bottom)
}
} else {
e.css("top",d.top)
}
if( typeof d.right=="undefined") {
if( typeof d.left=="undefined") {
e.css("right",0)
} else {
e.css("left",d.left)
}
} else {
e.css("right",d.right)
}
},_setAbsolutePosition: function(e,d) {
e.css({
top:window.pageYOffset+(d.bottom!==undefined?window.innerHeight-e.height()-d.bottom:(d.top||0)),left:d.right!==undefined?document.body.offsetWidth-e.width()-d.right:(d.left||0)
})
},_absoluteFixed: function() {
this.$el.css("position","absolute").css("z-index","10000");
this._setAbsolutePosition(this.$el,this.options)
},_nativeFixed: function() {
this.$el.css("position","fixed").css("z-index","10000");
this._setNativePosition(this.$el,this.options)
},_initEvents: function() {
var d=this;
if(!a) {
$(window).on("ortchange", function() {
d._absoluteFixed()
});
$(document).on("touchmove", function() {
d._absoluteFixed()
});
$(document).on("scroll", function() {
d._absoluteFixed()
})
}
},destory: function() {
},isSupportFix: function() {
return a
},changePosition: function(d) {
$.extend(this.options,d);
this._setPosition(this.$el,d)
}
};
b.Fix=c
})(window);
;(function(f) {
var e= {}, g=f.fn.data, c=f.zepto.camelize, h=f.expando="Zepto"+(+new Date());
function a(l,j) {
var m=l[h], i=m&&e[m];
if(j===undefined) {
return i||b(l)
} else {
if(i) {
if( j in i) {
return i[j]
}
var k=c(j);
if( k in i) {
return i[k]
}
}
return g.call(f(l),j)
}
}
function b(k,j,l) {
var m=k[h]||(k[h]=++f.uuid), i=e[m]||(e[m]=d(k));
if(j!==undefined) {
i[c(j)]=l
}
return i
}
function d(j) {
var i= {};
f.each(j.attributes, function(l,k) {
if(k.name.indexOf("data-")==0) {
i[c(k.name.replace("data-",""))]=k.value
}
});
return i
}
f.fn.data= function(i,j) {
return j===undefined?f.isPlainObject(i)?this.each(function(k,l) {
f.each(i, function(m,n) {
b(l,m,n)
})
}):this.length==0?undefined:a(this[0],i):this.each(function() {
b(this,i,j)
})
};
f.fn.removeData= function(i) {
if( typeof i=="string") {
i=i.split(/\s+/)
}
return this.each(function() {
var k=this[h], j=k&&e[k];
if(j) {
f.each(i, function() {
delete j[c(this)]
})
}
})
}
})(Zepto);
(function(a) {
var b=/^(?:body|html)$/i;
a.extend(a.fn, {
offsetParent: function() {
return a(a.map(this, function(d) {
var c=d.offsetParent||document.body;
while(c&&!b.test(c.nodeName)&&a(c).css("position")=="static") {
c=c.offsetParent
}
return c
}))
},scrollTop: function() {
if(!this.length) {
return
}
return ("scrollTop" in this[0])?this[0].scrollTop:this[0].scrollY
}
});
a.extend(a, {
contains: function(c,d) {
return c.compareDocumentPosition?!!(c.compareDocumentPosition(d)&16):c!==d&&c.contains(d)
}
})
})(Zepto);
(function(a) {
a.extend(a, {
toString: function(b) {
return Object.prototype.toString.call(b)
},slice: function(c,b) {
return Array.prototype.slice.call(c,b||0)
},later: function(d,b,f,c,e) {
return window["set"+(f?"Interval":"Timeout")](function() {
d.apply(c,e)
},b||0)
},parseTpl: function(e,d) {
var b="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+e.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/<%=([\s\S]+?)%>/g, function(f,g) {
return "',"+g.replace(/\\'/g,"'")+",'"
}).replace(/<%([\s\S]+?)%>/g, function(f,g) {
return "');"+g.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+"__p.push('"
}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');";
var c=new Function("obj",b);
return d?c(d):c
},throttle: function(b,c,g) {
var e=0, d;
if( typeof c!=="function") {
g=c;
c=b;
b=250
}
function f() {
var k=this, l=Date.now()-e, j=arguments;
function i() {
e=Date.now();
c.apply(k,j)
}
function h() {
d=undefined
}
if(g&&!d) {
i()
}
d&&clearTimeout(d);
if(g===undefined&&l>b) {
i()
} else {
d=setTimeout( g?h:i,g===undefined?b-l:b)
}
}
f._zid=c._zid=c._zid||a.proxy(c)._zid;
return f
},debounce: function(b,d,c) {
return d===undefined?a.throttle(250,b,false):a.throttle(b,d,c===undefined?false:c!==false)
}
});
a.each("String Boolean RegExp Number Date Object Null Undefined".split(" "), function(c,b) {
var d="";
switch(b) {
case"Null":
d="obj === null";
break;
case"Undefined":
d="obj === undefined";
break;
default:
d="new RegExp('"+b+"]', 'i').test(Object.prototype.toString.call(obj))"
}
a["is"+b]=new Function("obj","return "+d)
})
})(Zepto);
(function(d,g) {
var c=navigator.userAgent, a=navigator.appVersion, b=d.browser;
d.extend(d.browser, {
qq:/qq/i.test(c),chrome:/chrome/i.test(c)||/CriOS/i.test(c),uc:/UC/i.test(c)||/UC/i.test(a)
});
d.browser.uc=d.browser.uc||!d.browser.qq&&!d.browser.chrome&&!/safari/i.test(c);
try {
d.browser.version=b.uc?a.match(/UC(?:Browser)?\/([\d.]+)/)[1]:b.qq?c.match(/MQQBrowser\/([\d.]+)/)[1]:b.chrome?c.match(/(?:CriOS|Chrome)\/([\d.]+)/)[1]:b.version
} catch(f) {
}
d.support=d.extend(d.support|| {}, {
orientation:!(d.browser.uc||(parseFloat(d.os.version)<5&&(d.browser.qq||d.browser.chrome)))&&"orientation" in window&&"onorientationchange" in window,touch:"ontouchend" in document,cssTransitions:"WebKitTransitionEvent" in window,has3d:"WebKitCSSMatrix" in window&&"m11" in new WebKitCSSMatrix()
})
})(Zepto);
(function(b) {
b(document).ready(function() {
var g="matchMedia" in window? function() {
return window.matchMedia("(orientation: portrait)").matches?"portrait":"landscape"
}: function() {
var i=document.documentElement;
return i.clientWidth/Math.max(i.clientHeight,320)<1.1?"portrait":"landscape"
}, e=g(), d= function(i) {
if(i.type=="orientationchange") {
return b(window).trigger("ortchange")
}
f=20;
clearInterval(h);
h=b.later(function() {
var j=g();
if(e!==j) {
e=j;
clearInterval(h);
b(window).trigger("ortchange")
} else {
if(--f) {
clearInterval(h)
}
}
},50,true)
}, h, f;
b(window).bind(b.support.orientation?"orientationchange":"resize",b.debounce(d))
});
function a() {
b(window).on("scroll",b.debounce(80, function() {
b(document).trigger("scrollStop")
},false))
}
function c() {
b(window).off("scroll");
a()
}
a();
b(window).on("pageshow", function(d) {
if(d.persisted) {
b(document).off("touchstart",c).one("touchstart",c)
}
})
})(Zepto);
;(function(g,c) {
g.ui=g.ui|| {
version:"2.0.3",guid:h,define: function(n,p,o) {
if(o) {
p.inherit=o
}
var m=g.ui[n]=d(function(r,q) {
var s=k(m.prototype, {
_id:g.parseTpl(j, {
name:n,id:h()
})
});
s._createWidget.call(s,r,q,m.plugins);
return s
},p);
return i(n,m)
},isWidget: function(n,m) {
return n instanceof (m===c?l:g.ui[m]||f)
}
};
var b=1, f= function() {
}, j="<%=name%>-<%=id%>", e="gmu-widget";
function h() {
return b++
}
function k(m,n) {
var o= {};
Object.create? o=Object.create(m):o.__proto__=m;
return g.extend(o,n|| {})
}
function d(m,n) {
if(n) {
a(m,n);
g.extend(m.prototype,n)
}
return g.extend(m, {
plugins:[],register: function(o) {
if(g.isObject(o)) {
g.extend(this.prototype,o);
return
}
this.plugins.push(o)
}
})
}
function a(m,p) {
var n=p.inherit||l, o=n.prototype, q;
q=m.prototype=k(o, {
$factory:m,$super: function(r) {
var s=o[r];
return g.isFunction(s)?s.apply(this,g.slice(arguments,1)):s
}
});
q._data=g.extend({},o._data,p._data);
delete p._data;
return m
}
function i(m) {
g.fn[m]= function(p) {
var o, q, n=g.slice(arguments,1);
g.each(this, function(r,s) {
q=g(s).data(e+m)||g.ui[m](s,g.extend(g.isPlainObject(p)?p: {}, {
setup:true
}));
if(g.isString(p)) {
o=g.isFunction(q[p])&&q[p].apply(q,n);
if(p=="this"||o!==q&&o!==c) {
return false
}
o=null
}
});
return o||(p=="this"?q:this)
}
}
var l= function() {
};
g.extend(l.prototype, {
_data: {
status:true
},data: function(m,o) {
var n=this._data;
if(g.isObject(m)) {
return g.extend(n,m)
} else {
return !g.isUndefined(o)?n[m]=o:n[m]
}
},_createWidget: function(o,q,m) {
if(g.isObject(o)) {
q=o|| {};
o=c
}
var r=g.extend({},this._data,q);
g.extend(this, {
_el: o?g(o):c,_data:r
});
var p=this;
g.each(m, function(u,v) {
var s=v.apply(p);
if(s&&g.isPlainObject(s)) {
var t=p._data.disablePlugin;
if(!t||g.isString(t)&&t.indexOf(s.pluginName)==-1) {
delete s.pluginName;
g.each(s, function(w,y) {
var x;
if(( x=p[w])&&g.isFunction(y)) {
p[w]= function() {
p[w+"Org"]=x;
return y.apply(p,arguments)
}
} else {
p[w]=y
}
})
}
}
});
if(r.setup) {
this._setup(o&&o.getAttribute("data-mode"))
} else {
this._create()
}
this._init();
var p=this, n=this.trigger("init").root();
n.on("tap", function(s) {
(s.bubblesList||(s.bubblesList=[])).push(p)
});
n.data(e+this._id.split("-")[0],this)
},_create: function() {
},_setup: function(m) {
},root: function(m) {
return this._el=m||this._el
},id: function(m) {
return this._id=m||this._id
},destroy: function() {
var m=this, n;
g.each(this.data("components")||[], function(p,o) {
o.destroy()
});
n=this.trigger("destroy").off().root();
n.find("*").off();
n.removeData(e).off().remove();
this.__proto__=null;
g.each(this, function(o,p) {
delete m[o]
})
},component: function(m) {
var n=this.data("components")||this.data("components",[]);
try {
n.push(g.isFunction(m)?m.apply(this):m)
} catch(o) {
}
return this
},on: function(m,n) {
this.root().on(m,g.proxy(n,this));
return this
},off: function(m,n) {
this.root().off(m,n);
return this
},trigger: function(n,o) {
n=g.isString(n)?g.Event(n):n;
var p=this.data(n.type), m;
if(p&&g.isFunction(p)) {
n.data=o;
m=p.apply(this,[n].concat(o));
if(m===false||n.defaultPrevented) {
return this
}
}
this.root().trigger(n,o);
return this
}
})
})(Zepto);
;(function(e) {
var d, a=false, f, c, b= function() {
clearTimeout(f);
if(d&&( c=d.attr("highlight-cls"))) {
d.removeClass(c).attr("highlight-cls","");
d=null
}
};
e.extend(e.fn, {
highlight: function(g) {
a=a||!!e(document).on("touchend.highlight touchmove.highlight touchcancel.highlight",b);
b();
return this.each(function() {
var h=e(this);
h.css("-webkit-tap-highlight-color","rgba(255,255,255,0)").off("touchstart.highlight");
g&&h.on("touchstart.highlight", function() {
f=e.later(function() {
d=h.attr("highlight-cls",g).addClass(g)
},100)
})
})
}
})
})(Zepto);
;(function(a,b) {
a.ui.define("refresh", {
_data: {
ready:null,statechange:null
},_setup: function() {
var d=this, e=d._data, c=d.root();
e.$upElem=c.find(".ui-refresh-up");
e.$downElem=c.find(".ui-refresh-down");
c.addClass("ui-refresh");
return d
},_init: function() {
var c=this, d=c._data;
a.each(["up","down"], function(g,f) {
var e=d["$"+f+"Elem"], h=e.get(0);
if(e.length) {
c._status(f,true);
if(!h.childNodes.length||(e.find(".ui-refresh-icon").length&&e.find(".ui-refresh-label").length)) {
!h.childNodes.length&&c._createBtn(f);
d.refreshInfo||(d.refreshInfo= {});
d.refreshInfo[f]= {
$icon:e.find(".ui-refresh-icon"),$label:e.find(".ui-refresh-label"),text:e.find(".ui-refresh-label").html()
}
}
e.on("click", function() {
if(!c._status(f)||d._actDir) {
return
}
c._setStyle(f,"loading");
c._loadingAction(f,"click")
})
}
});
return c
},_createBtn: function(c) {
this._data["$"+c+"Elem"].html('<span class="ui-refresh-icon"></span><span class="ui-refresh-label">\u52a0\u8f7d\u66f4\u591a</span>');
return this
},_setStyle: function(d,f) {
var e=this, c=a.Event("statechange");
e.trigger(c,[e._data["$"+d+"Elem"],f,d]);
if(c.defaultPrevented) {
return e
}
return e._changeStyle(d,f)
},_changeStyle: function(c,f) {
var e=this._data, d=e.refreshInfo[c];
switch(f) {
case"loaded":
d["$label"].html(d.text);
d["$icon"].removeClass();
e._actDir="";
break;
case"loading":
d["$label"].html("");
d["$icon"].addClass("ui-loading");
e._actDir=c;
break;
case"disable":
d["$label"].html("");
break
}
return this
},_loadingAction: function(c,d) {
var f=this, g=f._data, e=g.ready;
a.isFunction(e)&&e.call(f,c,d);
f._status(c,false);
return f
},afterDataLoading: function(c) {
var e=this, d=c||e._data._actDir;
e._setStyle(d,"loaded");
e._status(d,true);
return e
},_status: function(d,c) {
var e=this._data;
return c===b?e["_"+d+"Open"]:e["_"+d+"Open"]=!!c
},_setable: function(d,c,e) {
var f=this, g=f._data, h= c?[c]:["up","down"];
a.each(h, function(l,k) {
var j=g["$"+k+"Elem"];
if(!j.length) {
return
}
d?j.show():( e?j.hide():f._setStyle(k,"disable"));
f._status(k,d)
});
return f
},disable: function(c,d) {
return this._setable(false,c,d)
},enable: function(c) {
return this._setable(true,c)
}
})
})(Zepto);
;(function(a,b) {
a.ui.refresh.register(function() {
return {
pluginName:"lite",_init: function() {
var d=this, e=d._data, c=d.root();
d._initOrg();
e.seamless&&a(document).on("scrollStop",a.proxy(d._eventHandler,d));
c.on("touchstart touchmove touchend touchcancel",a.proxy(d._eventHandler,d));
e.wrapperH=d.root().height();
e.wrapperTop=d.root().offset().top;
e._win=window;
e._body=document.body;
return d
},_changeStyle: function(c,f) {
var d=this, e=d._data.refreshInfo[c];
if(f=="beforeload") {
e["$icon"].removeClass("ui-loading");
e["$label"].html("")
}
return d._changeStyleOrg(c,f)
},_startHandler: function(c) {
this._data._startY=c.touches[0].pageY
},_moveHandler: function(i) {
var g=this, h=g._data, d=h._startY, j=d-i.touches[0].pageY, f=window.innerHeight, c=h.threshold||(h.wrapperH<f?(h.wrapperH/2+h.wrapperTop||0):f/2);
if(!g._status("down")||j<0) {
return
}
if(!h._refreshing&&(d>=document.body.scrollHeight-f+c)&&j>10) {
g._setStyle("down","beforeload");
h._refreshing=true
}
return g
},_endHandler: function() {
var c=this, d=c._data;
c._setStyle("down","loading");
c._loadingAction("down","pull");
d._refreshing=false;
return c
},_eventHandler: function(f) {
var c=this, d=c._data;
switch(f.type) {
case"touchstart":
c._startHandler(f);
break;
case"touchmove":
clearTimeout(d._endTimer);
d._endTimer=a.later(function() {
c._endHandler()
},300);
c._moveHandler(f);
break;
case"touchend":
case"touchcancel":
clearTimeout(d._endTimer);
d._refreshing&&c._endHandler();
break;
case"scrollStop":
(!d._refreshing&&d._win.pageYOffset>=d._body.scrollHeight-d._win.innerHeight+(d.threshold||-1))&&c._endHandler();
break
}
return c
}
}
})
})(Zepto);
;