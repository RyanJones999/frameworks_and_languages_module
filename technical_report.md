Technical Report
================

(intro describing purpose of report - 200ish words)


Critique of Server/Client prototype
---------------------

### Overview
()

### State and View
`example_client/index.html`
```html
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
```
No preservation of the state and no modifying the state in the DOM, instead of changing the page dynamically this requires the whole page to refresh.
(Explain why this pattern is problematic - 40ish words)


### (name of Issue 2)

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
 
 the routing is being defined here: https://github.com/RyanJones999/frameworks_and_languages_module/blob/d3847e7dc51aa7b7fc243c63fd88103b70cfe26a/example_server/app/server.py#L9

 the routing is being handled here: https://github.com/RyanJones999/frameworks_and_languages_module/blob/d3847e7dc51aa7b7fc243c63fd88103b70cfe26a/example_server/app/views.py#L8

 No, the way the routing has been handled is not expandable as each one has been put into a function which generalizes how each route can be used. They are all in one place, can only route on the URL path. Other frameworks let you route on a variety of things.

 the CORS headers are set here: https://github.com/RyanJones999/frameworks_and_languages_module/blob/d3847e7dc51aa7b7fc243c63fd88103b70cfe26a/example_server/app/http_server.py#L66

 middleware is the code that runs between server and client that handles the pre-processing of requests to help modulate the code 

 issues with the client:

 all the functions and js code should be in seperate in js modules. Seperate from the html, the html should also be in seperate html files. There could also be a seperate css file. All of these changes would make the code more readable and scalable. 
 
 Issues would arise with multiple requests there is a high possibility of duplicate requests because there is nothing seperating the view logic from the state logic => https://github.com/RyanJones999/frameworks_and_languages_module/blob/d3847e7dc51aa7b7fc243c63fd88103b70cfe26a/example_client/index.html#L91

A state: https://github.com/RyanJones999/frameworks_and_languages_module/blob/d3847e7dc51aa7b7fc243c63fd88103b70cfe26a/example_client/index.html#L91

Another state: https://github.com/RyanJones999/frameworks_and_languages_module/blob/d3847e7dc51aa7b7fc243c63fd88103b70cfe26a/example_client/index.html#L402

An action: https://github.com/RyanJones999/frameworks_and_languages_module/blob/d3847e7dc51aa7b7fc243c63fd88103b70cfe26a/example_client/index.html#L380

This is a function for an action: https://github.com/RyanJones999/frameworks_and_languages_module/blob/d3847e7dc51aa7b7fc243c63fd88103b70cfe26a/example_client/index.html#L343


comments on the currenct reference implementation
======
the current reference implementation for lat and lon are unsuitable for a business application as they work incorrectly (add detail).