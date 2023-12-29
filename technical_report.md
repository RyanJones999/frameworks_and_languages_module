Technical Report
================

(intro describing purpose of report - 200ish words)


Critique of Server/Client prototype
---------------------

### Overview
()

### State and View
[example_client/index.html](https://github.com/RyanJones999/frameworks_and_languages_module/blob/17286178689ef985928e20d97a349519f024b19b/example_client/index.html#L115)
~~~html
<div data-page="items">
				<h2>List items</h2>
				<ul>
					<li>
						<span data-field="id"></span>
						<img src="" data-field="image"/>
						<!-- <a href="" class="item_title">Title</a> -->
						<a href="" data-field="user_id"></a>
						LatLon: <span data-field="lat"></span>,<span data-field="lon"></span>
						<span data-field="date_from"></span>
						<p data-field="description"></p>
						<ul data-field="keywords"></ul>
						<button data-action="delete">delete</button>
					</li>
				</ul>
			</div>
~~~
No preservation of the state and no modifying the state in the DOM, instead of changing the page dynamically. This lack of state preservation and dynamic DOM updates leads to full page refreshes for every change, resulting in slower user experiences, increased server load, and uneccessary data transfer which can be problamatic for users with slower internet connections. Also this snippet shows the lack of accessibility features like `alt` text for images and proper semantic HTML elements, which are crucial for users relying on screen readers.

### Manual DOM Manipulation
[example_client/index.html](https://github.com/RyanJones999/frameworks_and_languages_module/blob/17286178689ef985928e20d97a349519f024b19b/example_client/index.html#L402)

~~~javascript
	function renderItems(data) {
		const $item_list = document.querySelector(`[data-page="items"] ul`);
		const new_item_element = () => document.querySelector(`[data-page="items"] li`).cloneNode(true);

		for (let item_data of data) {
			const $new_item_element = new_item_element();
			$item_list.appendChild($new_item_element);
			renderDataToTemplate(item_data, $new_item_element, renderItemListFieldLookup);
			attachDeleteAction($new_item_element);
		}
	}
~~~

Manual routing in this code increases boilerplate code and error potential. As the application grows, managing routes becomes more complex and error-prone. It lacks features like route parameters and SEO-friendly, history API-based routing, using less flexible hash-based routing instead.

### last client critique
[example_client/index.html]()

~~~

~~~
Explanation

### Manual Parsing of HTTP Requests

[example_server/app/http_server.py](https://github.com/RyanJones999/frameworks_and_languages_module/blob/17286178689ef985928e20d97a349519f024b19b/example_server/app/http_server.py#L22)


~~~python
RE_HTTP_HEADER = re.compile(r'(?P<method>GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH) (?P<path>.+) HTTP/(?P<version>.+)\r\n')
RE_HTTP_HEADER_KEY_VALUE = re.compile(r'(?P<key>.+): (?P<value>.+)\r\n')
RE_HTTP_BODY = re.compile(r'\r\n\r\n(?P<body>.*)', flags=re.MULTILINE)
def parse_request(data):
    r"""
    >>> parse_request(b'GET /?key1=value1&key2=value2 HTTP/1.1\r\nHost: localhost:8000\r\nUser-Agent: curl/7.68.0\r\nAccept: */*\r\n\r\n')
    {'method': 'GET', 'path': '/', 'version': '1.1', 'query': {'key1': 'value1', 'key2': 'value2'}, 'host': 'localhost:8000', 'user-agent': 'curl/7.68.0', 'accept': '*/*', 'body': ''}
    >>> parse_request(b'Not a http request')
    Traceback (most recent call last):
    app.http_server.InvalidHTTPRequest: Not a http request
    """
    data = data.decode('utf8')
    match_header = RE_HTTP_HEADER.search(data)
    if not match_header:
        log.error(data)
        raise InvalidHTTPRequest(data)
    request = match_header.groupdict()
    request['query'] = {}
    path_query = request['path'].split('?', maxsplit=1)
    if (len(path_query) == 2):
        request['path'], request['query'] = path_query
        request['query'] = {k: '|'.join(v) for k,v in urllib.parse.parse_qs(request['query']).items()}
    for header in RE_HTTP_HEADER_KEY_VALUE.finditer(data):
        key, value = header.groupdict().values()
        request[key.lower()] = value
    request.update(RE_HTTP_BODY.search(data).groupdict())
    log.debug(request)
    return request
~~~

Regular expressions are used to extract the HTTP method, path, version, headers and body from the raw request data. This approach requres a deep understanding of the HTTP protocols structure and might not robustly handle all valid HTTP request formats or malformed requests. It's also more prone to errors compared to using higher-level abstractions provided by web frameworks.

Modern web frameworks abstract this complexity away, allowing developers to focus on the logic of handling requests rather than the intricacies of parsing them.


### (name of Issue 1)

(A code snippet example demonstrating the issue)
(Explain why this pattern is problematic - 40ish words)

### Recommendation
(why the existing implementation should not be used - 40ish words)
(suggested direction - frameworks 40ish words)


Server Framework Features
-------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Server Language Features
-----------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Client Framework Features
-------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Client Language Features
------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)

### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Conclusions
-----------

(justify why frameworks are recommended - 120ish words)
(justify which frameworks should be used and why 180ish words)


Unsorted Notes
=============

in the example server:

 No, the way the routing has been handled is not expandable as each one has been put into a function which generalizes how each route can be used. They are all in one place, can only route on the URL path. Other frameworks let you route on a variety of things.

 the CORS headers are set here: https://github.com/RyanJones999/frameworks_and_languages_module/blob/d3847e7dc51aa7b7fc243c63fd88103b70cfe26a/example_server/app/http_server.py#L66

 middleware is the code that runs between server and client that handles the pre-processing of requests to help modulate the code 
