Server
======

These instructions will guide you on how to set up and run the server either directly using Deno or using Docker with a Makefile.

### Prerequisites

- **Deno**: If you want to run the server directly using Deno, ensure you have Deno installed on your machine. Install it from [Deno's official website](https://deno.land/#installation).
- **Docker and Make**: For running the server using Docker, ensure Docker is installed on your machine. Additionally, have `make` available to use the Makefile. Download Docker from [Docker's official website](https://www.docker.com/get-started).

## Running the Server

### Using Deno

1. Open a terminal and navigate to the root directory of your project.

2. Run the server with the following command:

~~~bash
deno run -A app.js
~~~
This command starts your server using Deno. The `-A` flag grants all permissions to the script.

3. Your server should now be running and accessible at `http://localhost:8000`.

4. To stop the server, use `Ctrl + C` in your terminal.

### Using Docker with Makefile

#### Building the Docker Image

1. Open a terminal and navigate to the root directory of the project using the following command:

~~~ bash
cd server
~~~

2. Now that you are where the Makefile is located, build the Docker image with this command:

~~~ bash
make build
~~~

This command uses the Makefile to build a Docker image named `server`.

#### Running the Docker Container

1. Start the container with the following command:

~~~ bash
make run
~~~

This command uses the Makefile to run the `server` image as a container, mapping port 8000 of the container to port 8000 on your host machine.

2. The server should now be accessible at `http://localhost:8000`.

3. To stop the container, simply exit the interactive terminal or use `Ctrl + C` in your terminal.

## Testing the Server

To test the server the following `curl` commands can be used.

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

