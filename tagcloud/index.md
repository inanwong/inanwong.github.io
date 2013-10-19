---
layout: default
title: 标签云
---
<div class="category tagcloud">
<h3>{{page.title}}</h3>

<ul class="tag_box inline">
  {% assign tag_cloud = site.tags %}  
  {% include Inan/tag_cloud %}
</ul>

{% for tag in site.tags %}
  <ul class="tag_tag" id="{{ tag[0] }}-ref">	
	<div class="category tagcloud">
		<h3>{{ tag[0] }}</h3>
	</div>
  </ul>
  <ul class="tag_post">
  	  {% assign page_list_ex = tag[1] %}  
  	  {% include Inan/page_list_ex %}
  </ul>
{% endfor %}

</div>

{% include Inan/tag_select %}