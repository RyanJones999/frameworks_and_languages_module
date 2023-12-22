Client
======
These instructions will guide you on how to set up and run the client either directly using deno or using Docker with a Makefile.

### Prerequisites

- **Deno**: If you want to run the client directly using Deno, ensure you have Deno installed on your machine. Install it from [Deno's official website](https://deno.land/#installation).
- **Docker and Make**: For running the server using Docker, ensure Docker is installed on your machine. Additionally, have `make` available to use the Makefile. Download Docker from [Docker's official website](https://www.docker.com/get-started).

## Running the Client

### Using Deno
1. Open a terminal and navigate to the root directory of the project.
2. Run the client using the following command:
~~~bash
deno task start
~~~
3. The client should now be running and accessible at `http://localhost:8001`.
4. To stop the client use `Ctrl + C` in your terminal.

## Using Docker with Makefile
### Building the Docker Image
1. Open a terminal and navigate to the root directory of the project using the following command:
~~~bash
cd client
~~~
2. Now that you are where the Makefile is located, build the Docker image with this command:
~~~bash
# This command uses the Makefile to build the Docker image for the client.
make build
~~~
### Running the Docker Container
1. Start the container with the following command:
~~~bash
make run
~~~

This command uses the Makefile to run the client image as a container, mapping port 8001 of the container to port 8001 on the host machine.

2. The client should now be accessible at `http://localhost:8001`.

3. To stop the container, use `Ctrl + C` in the terminal.

