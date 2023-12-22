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

### Using Docker with Makefile
#### Building the Docker Image
1. Open a terminal and navigate to the root directory of the project using the following command:
~~~bash
cd client
~~~
2. Now that you are where the Makefile is located, build the Docker image with this command:
~~~bash
# This command uses the Makefile to build the Docker image for the client.
make build
~~~
#### Running the Docker Container
1. Start the container with the following command:
~~~bash
make run
~~~

This command uses the Makefile to run the client image as a container, mapping port 8001 of the container to port 8001 on the host machine.

2. The client should now be accessible at `http://localhost:8001`.

3. To stop the container, use `Ctrl + C` in the terminal.

## Testing the Client

### Automated Tests

1. To run the automated tests, ensure that cypress is installed, you can check/ install cypress using this command:

~~~bash
npm install cypress@10.3.0 -g
~~~

2. Now to set up cypress you can use the following commands:
~~~bash
export CYPRESS_BASE_URL=http://localhost:8001/?api=http://localhost:8000
~~~~
then
~~~bash
npx cypress open
~~~~



3. To run the automated tests we would first need to `run the server` and `run the client`:

There are two different of ways to run the server, please see the [Server Documentation](https://github.com/RyanJones999/frameworks_and_languages_module/blob/main/server/README.md#running-the-server). Although, for the purpose of this guide I will use deno to run the server locally.

4. To run the server navigate to the `server` folder:

~~~bash
cd server/src/
~~~

5. Once in this folder, use the following command to run the server using deno:

~~~bash
deno run -A app.js
~~~

6. Now that the server is running, we need to run the client. you can follow the steps in `"Running the Client"` above.


7. Once you have the server running, open a new terminal and navigate to the `test_client` folder:

~~~bash
cd test_client
~~~

8. Then to run the automated tests use this command:

~~~bash
npx cypress run
~~~

Once you have run the automated tests you will get the results of the test both in the terminal, screenshots of any errors and a video of the tests will be uploaded to `test_client/reports/` then in either the `screenshots` or `videos` folders.

9. If the test failed/ did not run, use this command to check if the base url has been set:

~~~bash
echo $CYPRESS_BASE_URL
~~~

If this returns blank then re-run this command:

~~~bash
export CYPRESS_BASE_URL=http://localhost:8001/?api=http://localhost:8000
~~~

Then the `echo` command can be used again to check if the base URL has been set.

10. If the URL has been successfully set you can re-run the automated tests using:

~~~bash
npx cypress run
~~~

The results of the tests in the terminal will look like this:

~~~bash
$ npx cypress run


DevTools listening on ws://127.0.0.1:63894/devtools/browser/30b23e50-5420-4803-9899-aa4579a93b69
Couldn't determine Mocha version

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        13.6.1                                                                         │
  │ Browser:        Electron 114 (headless)                                                        │
  │ Node Version:   v21.1.0 (C:\Users\Ryana\Projects\Uni\frameworks_and_languages_module\node      │
  │                 _modules\node\bin\node.exe)                                                    │
  │ Specs:          1 found (freecycle.cy.js)                                                      │
  │ Searched:       cypress/**/*.cy.js                                                             │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  freecycle.cy.js                                                                 (1 of 1)

  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        5                                                                                │
  │ Passing:      5                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     8 seconds                                                                        │
  │ Spec Ran:     freecycle.cy.js                                                                  │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Video output: C:\Users\Ryana\Projects\Uni\frameworks_and_languages_module\test_client\reports\videos\freecycle.cy.js.mp4


====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  freecycle.cy.js                          00:08        5        5        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:08        5        5        -        -        -

~~~

## Using the Client

To use the client, the server and client both need to be running.

1. To run the server please see the [Server Documentation](https://github.com/RyanJones999/frameworks_and_languages_module/blob/main/server/README.md#running-the-server)

2. To run the Client please follow the [steps above](#running-the-client)

3. Once both are running, open up a browser and paste `http://localhost:8001/?api=http://localhost:8000` into the browser search bar. Or [click here](http://localhost:8001/?api=http://localhost:8000) to access the client.

4. To create an item use the "Create New Item" form, making sure that all fields are filled in before submitting.

5. Once submitted (if successful) the newly created item will appear under the "Items List"

6. To delete an item, navigate to the items list, locate the item you would like to delete and click on the "Delete Item" button attached to the bottom of the item.




