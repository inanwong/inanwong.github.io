---
layout: blog
title: 博客
---

{% for post in site.posts %}
<div class="article">
	<header>
		<h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
		<h3 class="datetext" style="float:left">Posted on {{ post.date | date_to_string }}</h3>
		<span class="tag-list"> 
			{% for tag in post.tags %}
			<a href="{{ site.PATH.tags_path }}#{{ tag }}-ref">{{ tag }}</a> 
			{% endfor %}
		</span>
	</header>
	
	<div class="c">&nbsp;</div>

	<!-- <br></br> -->
	
	{{ post.content | strip_html | truncate: 300 }}
	
	<footer>
		<p style="text-align:right;"><a href="{{ post.url }}">更多内容...</a></p>
	</footer>

</div>
{% endfor %}
