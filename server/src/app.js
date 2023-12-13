// Import the express module from npm
import express from 'npm:express';
// Import CORS (Cross-Origin Resource Sharing) middleware
import cors from "npm:cors";
// Import all functions from the handlers file
import * as handlers from "./handlers.js";

// Initialize the express application
const app = express();
// Define the port number where the server will listen
const port = 8000;

// Middleware to parse JSON bodies in requests
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// POST route for adding a new item
app.post('/item', (req, res) => {
  // Extract the request body
  const body = req.body;
  // Log the received body to the console (for debugging)
  console.log(body);
  // Call the add_item function from handlers with the request body
  const item = handlers.add_item(body);
  // If the item is successfully added, respond with status 201 and the added item
  if (item) {
    res.status(201).json(item);
  } else {
    // If the item is not added, respond with status 405 and an error message
    res.status(405).json({ message: 'Invalid input - some input fields may be missing' });
  }
});

// GET route for retrieving an item by its ID
app.get('/item/:itemId', (req, res) => {
  // Extract the itemId parameter from the request
  const id = req.params.itemId;
  // Call the get_item function from handlers with the item ID
  const item = handlers.get_item(id);
  // If the item is found, respond with status 200 and the item
  if (item) {
    res.status(200).json(item);
  } else {
    // If the item is not found, respond with status 404 and an error message
    res.status(404).json({ message: "Item not found." });
  } 
});

// GET route for the root path, responding with a welcome message
app.get('/', (_req, res) => {
  res.status(200).send('Welcome to the API');
});

// GET route for retrieving all items
app.get('/items/', (_req, res) => {
  // Log the received GET request to the console (for debugging)
  console.log("received get request");
  // Call the get_all_items function from handlers
  const allItems = handlers.get_all_items();
  // Respond with status 200 and all the items
  res.status(200).json(allItems);
});

// DELETE route for removing an item by its ID
app.delete('/item/:itemId', (req, res) => {
  // Extract the itemId parameter from the request and convert it to a number if necessary
  const id = req.params.itemId;
  // Log the item type and deletion request to the console (for debugging)
  console.log(typeof(id));
  console.log("Deleting item with ID:", id);
  // Call the delete_item function from handlers with the item ID
  const result = handlers.delete_item(id);

  // If the item is successfully deleted, respond with status 204
  if (result) {
    console.log("Item successfully deleted:", id);
    res.status(204).json({ message: "Ok" });
  } else {
    // If the item is not found or could not be deleted, respond with status 404 and an error message
    console.log("Item not found or could not be deleted:", id);
    res.status(404).json({ message: "Item not found" });
  }
});

// Start the server and listen on port 8000
app.listen(port, () => {
  console.log('Server is running on port 8000');
});
