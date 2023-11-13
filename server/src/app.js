import express from "npm:express";
import cors from "npm:cors";
import * as handlers from "./handlers.js";

// Set the port
const port = 8000

// initializing the items variable

// Initialize the Express application
const app = express();

app.use(express.json());
app.use(cors());

// Routes ----------------------------------------------------------------------

app.post('/item', (req, res) => {
  const body = req.body;
  console.log(req.body);
  const item_id = handlers.add_item(body);
  console.log(handlers.get_item(item_id))
  if (typeof(item_id) == typeof(1)) {
    res.status(201).json({ message: "Item created successfully"});
  } else {
    res.status(405).json({ message: "Invalid input - some input fields may be missing"});
  } 
});

app.get('/item/:itemId', (req, res) => {
  const id = req.params.itemId;
  const item = handlers.get_item(id);
  if (item) {
    res.status(200).json({item});
  } else {
    res.status(404).json({ message: "Item not found." });
  } 
});

app.get('/', (_req, res) => {
  res.status(200).send('Welcome to the API');
});

app.get('/items/', (_req, res) => {
  const allItems = handlers.get_all_items();
  res.status(200).json(allItems);
});

app.delete('/item/:itemId', (req, res) => {
  const id = parseInt(req.params.itemId, 10); // Convert to number if necessary
  console.log("Deleting item with ID:", id);

  const result = handlers.delete_item(id);

  if (result) {
    console.log("Item successfully deleted:", id);
    res.status(204).json({ message: "Ok" });
  } else {
    console.log("Item not found or could not be deleted:", id);
    res.status(404).json({ message: "Item not found" });
  }
});


// Start the server on port 8000
app.listen(port, () => {
  console.log('Server is running on port 8000');
});