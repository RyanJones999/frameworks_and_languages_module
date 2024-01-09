Technical Report
================
This technical report critically evaluates the existing server and client prototype of a web application, focusing on its architecture, code structure, and functionality. The purpose is to identify areas where modern web development frameworks and language features could enhance the application's performance, scalability, and maintainability. By comparing the prototype's implementation with industry-standard practices, the report aims to provide insights into how leveraging contemporary frameworks and JavaScript features can address existing limitations and improve the overall efficiency and user experience of the web application.


Critique of Server/Client prototype
---------------------

### Overview
The current prototype of the server and client application exhibits several fundamental deficiencies when evaluated against modern web development standards. The critique is focused on specific aspects of the application, including state management, DOM manipulation, HTTP request parsing, field validation, and overall architectural approach. Each of these areas is examined in detail to understand the impact of the current implementation choices and to explore how modern frameworks and language features could offer significant improvements

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

### Island-Based Architecture

The Fresh framework adopts an "island-based" architecture, which allows for selective hydration, where only interactive parts of the application (islands) load JavaScript, improving performance and reducing load time.

~~~javascript
// Render the main page content.
import CreateItem from "../islands/CreateItem.jsx";
import GetItems from "../islands/GetItems.jsx";

export default function Home({ url }) {
  // ... URL parameter handling logic ...

  return (
    <>
      <h1>FreeCycle</h1>
      <div>
        <CreateItem api={api} />
      </div>
      <div>
        <GetItems api={api}/>
      </div>
    </>
  );
}
~~~

The island-based architecture is utillised here by importing `CreateItem` and `GetItems` components. This selectivly enhances the interactive parts of the webpage with JavaScript, optimizing performance. This approach addresses the typical SPA's issue of loading excessive JavaScript, ensuring faster page loads and improved user experience. It's particularly beneficial for efficient resource usage, better SEO, and maintaining a clear seperation between dynamic and static content making the application more scalable and maintainable.

[Islands Architecture Documentation](https://deno.com/blog/intro-to-islands)

### Server-Side Rendering (SSR)

Server-Side Rendering (SSR) in Deno Fresh is a process where the server pre-renders the web page's content into HTML before sending it to the client's browser. Unlike client-side rendering, where javascript is excecuted in the browser to render the page. In Fresh, SSR in integral, the server executes the application's JavaScript, including components written in `jsx` or `tsx`, to generate the corresponding HTML. The HTML is then sent to the browser along with minimal JavaScript for interactivity. 

~~~javascript
export default function Home({ url }) {
  // JSX rendering logic
}
~~~

Server-Side Rendering (SSR) in Deno Fresh significantly enhances performance by reducing initial load times, especially on slower networks or devices. It's vital for SEO, as search engines more effectively index server-rendered content. SSR also ensures content accessibility for users with limited or no JavaScript support. The `Home` function is a server-rendered component, transforming the JSX into HTML. This process enables immediate content availability upon the initial page load, bypassing the need for client-side JavaScript execution.

[SSR Documentation](https://deno.com/blog/the-future-and-past-is-server-side-rendering)

### Integration with Async Operations

(Technical description of the feature - 40ish words)
Fresh's architecture allows for seamless integration of asynchronous operations like API calls using`fetch`. Thiis is evident in the form submission logic, where the asynchronous posting of data to the API enpoint occurs.

~~~javascript
try {
  const response = await fetch(`${api}/item/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(submitData),
  });
  // ... response handling ...
}
~~~

The integration of event handling and asynchronous requests in the `CreateItem` component enhances user interactivity and efficiently manages server communications. This approach ensures a responsive UI, maintains application performance during network requests, and provides a scalable solution for dynamic user interactions and data handling.

[Async Routing Documentation](https://deno.com/blog/fresh-1.3)

Client Language Features
------------------------

### Efficient State Management with the useState Hook

The concept of hooks, introduced in React and also available in Preact, is a JavaScript language feature. It's a pattern enabled by the JavaScript language's closure and function capabilities. Hooks allow you to use state and other React features without writing a class, which is a significant shift from the traditional class-based component state management.

~~~javascript
import { useState } from "preact/hooks";

export default function CreateItem({api}) {
  // State for form data to handle user input.
  const [formData, setFormData] = useState({
    user_id: 'user123',
    keywords: '',
    description: '',
    image: "http://placekitten.com/100/100",
    lat: '',
    lon: ''
  });
}
~~~

(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
The `useState` hook in the `CreateItem` component simplifies state management, addressing complexities of class conponents by enabling efficient local state handling in functional components. It enhances code readability, maintainability and reuseability.

[Hooks Documentation](https://preactjs.com/guide/v10/hooks/)

### Template Literals: Simplifying Strings

Template literals, introduced in ES6, are a significant improvement over the older string concatenation methods in JavaScript, offering a more expressive and flexible way to handle strings. This feature is widely used for dynamically generating URLs, messages, and other string content in modern JavaScript applications.

~~~javascript
const handleSubmit = async (event) => {
  // ...
  const fetchUrl = `${api}/item/`; // Template literal used here
  // ...
};
~~~

The use of templace literals in the `CreateItem` component addresses complex string concatenation challenges, enhancing the readability and maintainability of dynamic string creation, like API URLs. Their clear, expressive syntax simplifies embedding variables and expressions, offering improved code clarity and flexibility in crafting multiline strings and interpolated expressions. Also, it was used this way so the api parameter could be captured dynamically and could be used dynamically, with no hardcoding involved.

[Template Literals Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

Conclusions
-----------

The recommendation to adopt modern web frameworks is strongly justified by the critique of the existing prototype. Frameworks like Express.js and Deno Fresh significantly enhance performance and user experience by eliminating full page refreshes and streamlining state management, leading to responsive and efficient applications. They simplify development and maintenance, offering structured solutions for routing and HTTP request handling, thus reducing complexity and error potential. This structured approach also bolsters security and robustness, providing inbuilt mechanisms for data validation and secure request processing. Furthermore, frameworks are designed to accommodate scalability, handling growing application needs more effectively than manual methods. By aligning with modern development practices and facilitating the use of contemporary JavaScript features, these frameworks ensure the application remains up-to-date with industry standards, making them a strategic choice for long-term application success and sustainability.

Using Express.js for the server and Deno Fresh for the client is highly recommended. Express.js addresses the server-side prototype's challenges, such as manual HTTP request parsing and limited field validation, with its robust and secure framework. Its middleware capabilities, particularly express.json(), automate JSON parsing, improving data handling and reducing development complexities. Structured route handling in Express.js enhances maintainability and reduces errors, ensuring a more streamlined and secure server environment. On the client side, Deno Fresh effectively resolves issues related to manual DOM manipulation and state management. Its innovative island-based architecture optimizes JavaScript loading, leading to enhanced performance. Fresh’s server-side rendering feature significantly improves initial load times and boosts SEO. Additionally, Fresh's compatibility with modern JavaScript features, such as template literals and Preact's hooks, aligns with contemporary development practices, offering a dynamic and engaging user interface. Collectively, Express.js and Deno Fresh provide a comprehensive solution that enhances efficiency, security, and maintainability, aligning the project with current industry standards and best practices for modern web application development.