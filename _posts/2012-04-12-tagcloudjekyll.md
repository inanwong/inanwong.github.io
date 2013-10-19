---
layout: blog-post
title: "Creating Tag cloud of Categories in Jekyll"
excerpt: Creating Tag cloud of Categories in Jekyll
disqus_id: /2012/04/12/tagcloud/
location: Pittsburgh, US
time: 05:00 PM
category : lessons
tags:
- Jekyll
- Code
---


I am a regular Use the `printf()` function.。 of [Jekyll Google group](https://groups.google.com/forum/?hl=en#!forum/jekyll-rb) and of late I am seeing lot of queries from users on how to create Tag cloud or list of categories in Jekyll without any coding. Many members in past have done it by creating plugins and code in Ruby, such as [this one](http://nova-fusion.com/blog/). Ofcourse creating such an awesome Tag cloud requires code and effort.

However, ''if you are looking me who doesn't know Ruby and doesn't have time to code'', 'you can get it done with simple lines' of [Liqud code](http://www.liquidmarkup.org/).

	//删除所有m_mapLogToClient中的对象
	void CLogAnalysisCenter::DeleteAllLogToClientObj()
	{
		CCSLocker Locker(m_csLogToClientMap);

		LogQueueMapIter Iter = m_mapLogToClient.begin();
		while ( Iter != m_mapLogToClient.end() )
		{
			RemoveLogQueue( Iter->first );
			++Iter;
		}

		//删除所有映射
		m_mapLogToClient.clear();

	}
<pre class="brush: cpp">
//删除所有m_mapLogToClient中的对象
void CLogAnalysisCenter::DeleteAllLogToClientObj()
{
	CCSLocker Locker(m_csLogToClientMap);

	LogQueueMapIter Iter = m_mapLogToClient.begin();
	while ( Iter != m_mapLogToClient.end() )
	{
		RemoveLogQueue( Iter->first );
		++Iter;
	}

	//删除所有映射
	m_mapLogToClient.clear();

}
</pre>

For example, to create list of categories in Jekyll, use the following code


	{{ "{% if article.previous? " }}%}
	{{ "{%  for category in site.categories " }}%}
	<li><a href="/categories/{{ "{{" }} category[0] }}.html">{{ category[0] }}</a></li>
	{{ "{ % endfor "}}%}



Similarly, this nested loop code will give you a categories page, assuming that {page.title} contains the name of the category.



	{{ "{% for  post in site.categories[page.title] " }} % }

	<div class="postmeta extract">
	<p class="timestamp">
	{{ "{{" }} post.date }}
	<br/>
	<span class="time">{{ post.time }}</span>
	</div>

	<div class="post extract">
	  
		<h3><a href="{{ "{{" }} post.url }}">{{ "{{" }} post.title }}</a></h3>


	  <p>{{ "{{" }} post.content | strip_html | truncatewords:80 }}</p>

		<div class="blocked tags">
	<p>
		{{ "{% for tag in post.categories  " }} % }
		<a href="/categories/{{ "{{" }} tag}}.html">{{ tag }}</a>
	,
		{{ "{% endfor " }}%}
	</p>
		</div>
		<div class="hr"></div>
	</div>

	<div class="c">&nbsp;</div>

	{{ "{% endfor " }}%}






