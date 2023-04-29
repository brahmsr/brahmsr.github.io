(function() {
if (document.querySelector === undefined) {
return;
}
var e = {},
b, a = [],
f, d, c;
e.maxPostsToFetch = (typeof bloggerRelatedPosts_config === "object" && bloggerRelatedPosts_config.maxPostsToFetch) || 100;
e.maxPostsToDisplay = (typeof bloggerRelatedPosts_config === "object" && bloggerRelatedPosts_config.maxPostsToDisplay) || 5;
b = document.querySelector("link[rel=canonical]").href;
if (/\x2F\d{4}\x2F\d{2}\x2F/.test(b) === false) {
return;
}
for (f = 0, d = document.querySelectorAll("a[rel=tag]"); f < d.length; f++) {
a.push(decodeURIComponent(d[f].href.split("/").pop()));
}
bloggerRelatedPosts_callback = function(o) {
var h = [],
p, n, l, r, y, x, q, t, g, s, w, u, v, m;
for (p = 0, r = o.feed.entry; p < r.length; p++) {
y = {
title: r[p].title.$t,
updated: new Date(r[p].updated.$t),
categories: [],
count: 0
};
for (n = 0, x = r[p].link; n < x.length; n++) {
if (x[n].rel === "alternate") {
y.link = x[n].href;
break;
}
}
if (y.link === b) {
continue;
}
for (n = 0, q = r[p].category; n < q.length; n++) {
y.categories.push(q[n].term);
for (l = 0; l < a.length; l++) {
if (a[l] === q[n].term) {
y.count++;
break;
}
}
}
if (r[p].media$thumbnail) {
y.icon = {
src: r[p].media$thumbnail.url,
width: r[p].media$thumbnail.width,
height: r[p].media$thumbnail.height
};
}
h.push(y);
}
h.sort(function(j, i) {
return (i.count - j.count) || (i.updated - j.updated);
});
h = h.slice(0, e.maxPostsToDisplay);
t = function() {
if (typeof ga === "function") {
var i = this;
ga("send", {
hitType: "event",
eventCategory: "Blogger Related Posts",
eventAction: "Related Post Clicked",
eventLabel: i.href,
hitCallback: function() {
location.href = i.href;
}
});
return false;
}
};
g = document.createElement("div");
g.id = "blogger-related-posts";
g.innerHTML = "<<div style="text-align: center;"><h3 style="text-align: left;"><u style="color: #fb5252;">Receitas que você pode gostar:</u></h3></div>";
s = document.createElement("ul");
for (p = 0; p < h.length; p++) {
w = document.createElement("li");
u = document.createElement("a");
u.href = h[p].link;
u.title = h[p].count + " common " + (h[p].count === 1 ? "category" : "
