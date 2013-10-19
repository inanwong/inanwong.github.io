---
layout: main
title: 调试页面
---

## Global Variables ##

### site ###

site.time:{{site.time}}<br/>
site.title_suffix:{{site.title_suffix }}<br/>

Hello!

### page ###

{{site.title_suffix }}

## Post ##
* * *

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

<hr/>

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>

## Post ##
* * *

## Tag ##
* * *

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
	  <p></p>
	  {% for tag in post.tags %}
	  <p>{{ tag }}</p>
	  {% endfor %}
    </li>
  {% endfor %}
</ul>

## JB ##
* * *

{% include JB/setup %}

{BASE_PATH}
{{BASE_PATH}}
{JB.BASE_PATH}
{{site.JB.BASE_PATH}}

<ul>
  {% assign pages_list = site.pages %}  
  {% include JB/pages_list %}
</ul>

* * *

<ul>
  {% assign tags_list = site.tags %}  
  {% include JB/tags_list %}
</ul>

* * *

<ul>
  {% assign tags_list = site.tags %}  
{% if site.JB.tags_list.provider == "custom" %}
  {% include custom/tags_list %}
{% else %}
  {% if tags_list.first[0] == null %}
    {% for tag in tags_list %} 
    	<li><a href="{{ BASE_PATH }}{{ site.JB.tags_path }}#{{ tag }}-ref">{{ tag }} <span>{{ site.tags[tag].size }}</span></a></li>
    {% endfor %}
  {% else %}
    {% for tag in tags_list %} 
    	<li><a href="{{ BASE_PATH }}{{ site.JB.tags_path }}#{{ tag[0] }}-ref">{{ tag[0] }} <span>{{ tag[1].size }}</span></a></li>
    {% endfor %}
  {% endif %}
{% endif %}
{% assign tags_list = nil %}
</ul>

* * *





