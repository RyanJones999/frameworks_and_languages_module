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


### Inadequate Field Validation

[example_server/app/views.py](https://github.com/RyanJones999/frameworks_and_languages_module/blob/4344f64f5cf6586680ab89b2ddf0176b0d759d4b/example_server/app/views.py#L38)

~~~python
def post_item(request):
    data = request.get('body')
    REQUIRED_FIELDS = frozenset({'user_id', 'keywords', 'description', 'lat', 'lon'})
    FIELDS = frozenset(data.keys())
    if not REQUIRED_FIELDS.issubset(FIELDS):
        return json_response({'error': f"missing fields", 'fields': tuple(REQUIRED_FIELDS - FIELDS)}, {'code': 405})
    # TODO: check data types of input? lat,lon
    data['date_from'] = datetime.datetime.now().isoformat()
    item = datastore.create_item(data)
    return json_response(item, {'code': 201})
~~~

While the function checks if required fields are present, it does not validate the type or format of the data. For example, 'lat' and 'lon' should be validated as valid geographic coordinates. Frameworks often provide comprehensive validation tools to ensure data integrity.

### Recommendation
The existing client implementation should not be used as it demonstrates several critical deficiencies, when compared to modern web development frameworks. It lacks state preservation and dynamic DOM updates, leading to inefficient full page refreshes, increased server load and data transfer, abscence of accessibility features. Additionally, the approach to manual DOM manipulation and routing in the JavaScript snippet introduces significant boilerplate, elevating the potential for errors and complicating scalability. These issues collectively underscore the inefficiencies and limitations of the existing approach, highlighting the superior capabilities of modern frameworks in terms of performance, accessibility, scalability, and maintainability.

The existing server implementation should not be used, manually parsing HTTP requests and limited data validation in the existing implementation can lead to errors, security vulnerabilities, and increased maintenance complexity, making it unsuitable for robust web application development.

Modern web frameworks address the issues noted, like complex HTTP request parsing and limited data validation, by offering standardized request handling, comprehensive data validation, enhanced security and simplified maintanence. By using frameworks the development process can be streamlined to focus on core application functionality instead of low-level technicalities. Also modern day frameworks have extensive amounts of documentation on implementation, debugging and solutions to common issues; which removes the complexity behind creating a server from scratch (like in the existing implementation.).

Server Framework Features
-------------------------

### Middleware Integration

The `express.json()` is a built in middleware function in Express which automatically parses incoming JSON payloads, converting them into JavaScript objects accessible via req.body, streamlining server-side data handling for JSON-based HTTP requests. It is based on the Node.js `body-parser` body parsing middleware.

(A code block snippet example demonstrating the feature)
~~~javascript
// Middleware to parse JSON bodies in requests
app.use(express.json());

// POST route for adding a new item
app.post('/item', (req, res) => {
  // Extract the request body
  const body = req.body;
  ...
~~~

The `express.json` middleware function is used to automate the parsing of incoming request bodies into JSON format, a common requirement in modern web APIs. It processes ‘Content-Type: application/json’ headers in HTTP requests, seamlessly converting JSON payloads into JavaScript objects accessible via `req.body`, thereby abstracting the complexities of manual JSON parsing. This line `app.use(express.json())` integrates middleware for parsing JSON request bodies. This is a task that would require manual implementation in the existing server implementation.

[express.json Documentation](http://expressjs.com/en/api.html#express.json)


### CORS

CORS (Cross-Origin Resource Sharing) is a middleware in Express.js that manages cross-origin HTTP requests. It enables web applications to bypass browser same-origin policies, allowing resources to be requested from different domains. CORS configures HTTP headers to control access permissions for cross-domain requests.

~~~javascript
// Enable CORS for all routes
app.use(cors());
~~~

The CORS middleware in Express.js addresses key limitations of the existing server implementation by simplifying the handling of cross-origin HTTP requests. It automatically sets appropriate CORS headers, enabling seamless resource sharing across different domains. This feature eliminates the need for manual header management and ensures compliance with web security standards, which are not inherently handled in the existing implementation. This results in enhanced security, ease of development, and broader accessibility for web applications.

[CORS Documentation](https://expressjs.com/en/resources/middleware/cors.html)


### Structured Route Handling

Structured route handling in Express.js refers to the framework's organized approach to managing web server routes. It allows for defining clear, specific routes for different HTTP methods and paths, streamlining request processing, and improving application scalability and maintainability. This structure enhances the clarity and efficiency of server-side routing logic.

~~~javascript
// POST route for adding a new item
app.post('/item', (req, res) => {
  ...
});

// GET route for retrieving an item by its ID
app.get('/item/:itemId', (req, res) => {
  ...
});
...
~~~
This code exemplifies structured route handling by defining specific endpoints (/item and /item/:itemId) with corresponding HTTP methods (POST and GET). Each route has a clear, focused handler for its respective task.

In contrast, the hand-rolled Python server requires manual parsing of the HTTP request method and URL to determine the appropriate action. This can lead to more complex, less readable, and error-prone code, especially as the number of endpoints grows. Express.js's structured approach simplifies this process, enhancing clarity and reducing potential errors.

[Express Documentation](http://expressjs.com/en/starter/basic-routing.html)

Server Language Features
-----------------------

### Module Import and Export

Modules in JavaScript are an essential feature that allow for splitting code into separate files, thereby improving maintainability, reusability, and organization of code. ES6 introduced a standardized module system which is widely used in modern JavaScript development.

~~~javascript
import { items } from './global.js';
...
export const add_item = (item) => {
    // function logic
};
~~~

Modules allow javascript to have a built-in system for modularizing and organising code. The `import` statement is used to read in and bring in functions, objects, or primitives from another module or file. In this case I am reading in the `items` list from the `globals.js` file so it could be used in my `handlers.js` to populate. The `export` function statement makes functions, objects, or primitives from a module available for use in other modules. In this case I am exporting the `add_item` so that it can be used within the post route to parse the JSON object from incoming requests, so that the `items` list may be populated.

[JavaScript Modules Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)


### Spread Operator

(Technical description of the feature - 40ish words)

The spread operator `...item` provides a concise syntax for several operations in JavaScript, such as expanding arrays or objects to be expanded in places where zero or more arguments/ function calls/ elements and/ or array literals are expected. in an object literal, the spread syntax enumerates the properties of an object and adds the key-value pairs to the object being created.
~~~javascript
const new_item = {
        id: myUUID,
        ...item, // Spread operator to copy fields from item
        date_from: new Date().toISOString().replace(/Z$/, ''), 
        date_to: new Date().toISOString().replace(/Z$/, ''),
    };
~~~
The spread operator in JavaScript simplifies array and object manipulation, enabling concise merging, cloning, and element expansion. It enhances code readability, supports immutable data patterns, and fits seamlessly with modern JavaScript practices, offering a straightforward solution for previously verbose operations. In this case I was using the spread operator `...item` copy the properties of `item` into `new_item`.

[Spread Operator Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)



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

