Server
======

These instructions will guide you on how to set up and run the server either directly using Deno or using Docker with a Makefile.

### Prerequisites

- **Deno**: If you want to run the server directly using Deno, ensure you have Deno installed on your machine. Install it from [Deno's official website](https://deno.land/#installation).
- **Docker and Make**: For running the server using Docker, ensure Docker is installed on your machine. Additionally, have `make` available to use the Makefile. Download Docker from [Docker's official website](https://www.docker.com/get-started).

## Running the Server

### Using Deno

1. Open a terminal and navigate to the root directory of the project.

2. Run the server with the following command:

~~~bash
deno run -A app.js
~~~
This command starts the server using Deno. The `-A` flag grants all permissions to the script.

3. the server should now be running and accessible at `http://localhost:8000`.

4. To stop the server, use `Ctrl + C` in the terminal.

### Using Docker with Makefile

#### Building and Running the Docker Image

1. Open a terminal and navigate to the root directory of the project using the following command:

~~~ bash
cd server
~~~

2. Now that you are where the Makefile is located, build the Docker image with this command:

~~~ bash
# This command uses the Makefile to build a Docker image for the server.
make build
~~~

2. Start the container with the following command:

~~~ bash
make run
~~~

This command uses the Makefile to run the `server` image as a container, mapping port 8000 of the container to port 8000 on your host machine.

3. The server should now be accessible at `http://localhost:8000`.

4. To stop the container, use `Ctrl + C` in the terminal.

## Testing the Server
### Using Automated Tests
1. To test the server using the automated tests, navigate to the `test_server` folder:

~~~bash
cd test_server
~~~

2. Then run the automated tests using `make`:

~~~bash
make test_server
~~~

~~~bash
# A snippet of the expected result
test_server-1  | ---------------- generated xml file: /pytest/reports/junit.xml -----------------
test_server-1  | ---------- Generated html report: file:///pytest/reports/report.html -----------
test_server-1  | ======================== 16 passed, 4 skipped in 4.46s =========================
test_server-1 exited with code 0
USER=197609:197609 docker compose --file docker-compose.yml --file docker-compose.cypress.yml --file docker-compose.test.yml down
[+] Running 3/3
 ✔ Container frameworks_and_languages_module-test_server-1  Removed                                                                              0.0s 
 ✔ Container frameworks_and_languages_module-server-1       Removed                                                                              0.5s 
 ✔ Network frameworks_and_languages_module_default          Removed
~~~

### Using pytest
To use pytest to test the server, the server needs to be running, see the [Running the Server](#running-the-server) section above to run the server.

1. Once the server is running, open another terminal and in the main project directory `frameworks_and_languages_module/` run the following command:

~~~bash
pytest --pdb
~~~
This command will also launch a helpful debugger to point out where errors are occuring.

~~~bash
# A snippet of the expected result
========================================================== test session starts ==========================================================
platform win32 -- Python 3.9.13, pytest-7.1.1, pluggy-1.0.0
rootdir: C:\Users\Ryana\Projects\Uni\frameworks_and_languages_module
plugins: anyio-3.5.0, cov-3.0.0, dependency-0.5.1
collected 20 items

test_server\test_api.py ................ssss                                                                                       [100%]

=============================================== 16 passed, 4 skipped in 67.84s (0:01:07) ================================================
~~~

If a test fails it will appear above these lines and detail what is going wrong and where.

## Using the Server

To use without the client the server the following `curl` commands can be used. 

To use the server with the client please see the ["Using the Client" ](https://github.com/RyanJones999/frameworks_and_languages_module/blob/e62cbf3b6349218937d9e541c3409460a434fb06/client/README.md#using-the-client) section in the client documentation.

### Adding an Item

To add an item, send a POST request with the following JSON data:

~~~bash
curl -X POST http://localhost:8000/item -H "Content-Type: application/json" -d '{"user_id": "user1234", "keywords": ["hammer", "nails", "tools"], "description": "A hammer and nails set", "image": "https://placekitten.com/200/300", "lat": 51.2798438, "lon": 1.0830275}'
~~~

After a successful POST request you should get a response that looks like this:

~~~bash
{"id":"f0b85bb9-2965-43ca-96f9-3763a7cabacd","user_id":"user1234","keywords":["hammer","nails","tools"],"description":"A hammer and nails set","image":"https://placekitten.com/200/300","lat":51.2798438,"lon":1.0830275,"date_from":"2023-12-13T19:20:43.535","date_to":"2023-12-13T19:20:43.696"}
~~~

As you can see a unique ID has been generated and added to the item above: `"id":"f0b85bb9-2965-43ca-96f9-3763a7cabacd"`

If there are missing fields in the POST request it will be fail, here is an example of a POST request with missing fields to demonstrate:

~~~bash
curl -X POST http://localhost:8000/item -H "Content-Type: application/json" -d '{"user_id": "user1234", "keywords": ["hammer", "nails", "tools"], "description": "A hammer and nails set", "image": "https://placekitten.com/200/300,"}'
~~~

I have purposely removed the `lat` and `lon` from the original request to demonstrate the error handling. With this request you will get the following response:

~~~bash
{"message":"Invalid input - some input fields may be missing"}
~~~

### Retrieving an Item
To retrieve an item by its ID, send a GET request with the following URL format:

~~~bash
curl http://localhost:8000/item/{itemId}
~~~

Replace `{itemId}` with the actual ID of the item you want to get.

You  can copy the item ID straight after running a POST request to test this.

If the ID provided in the GET request is invalid or does not exist it will return the following:

~~~bash
{"message":"Item not found."}
~~~

### Retrieving All Items
To get a list of all items:
~~~bash
curl http://localhost:8000/items/
~~~
If no items exist then the following error message will appear:
~~~bash
{"message":"Item not found."}
~~~
### Deleting an Item
To delete an item by its ID:

~~~bash
curl -X DELETE http://localhost:8000/item/{itemId}
~~~
Replace `{itemId}` with the actual ID of the item you want to delete.

If the item does not exist the following error message will appear:

~~~bash
{"message":"Item not found."}
~~~



## Acknowledgments

I used the following resources to help develop this project:

- The [Express.js Documentation](https://expressjs.com/en/4x/api.html) provided essential guides and references for server-side logic development.
- The [Deno Documentation](https://deno.land/manual) offered detailed insights and instructions for effectively utilizing Deno in this project.

