import express from 'npm:express';
import cors from "npm:cors";
import * as handlers from "./handlers.js";

const app = express();
const port = 8000;

//app.use(express.json())
app.use(express.json())
app.use(cors())

// POST route
app.post('/item', (req, res) => {
  const body = req.body;
  console.log(body)
  const item = handlers.add_item(body);
  if (item) {
    res.status(201).json(item);
  } else {
    // Respond with an error if parsing fails
    res.status(405).json({ message: 'Invalid input - some input fields may be missing' });
  }
});

app.get('/item/:itemId', (req, res) => {
  const id = req.params.itemId;
  //console.log(typeof(id))
  const item = handlers.get_item(id)
  if (item) {
    res.status(200).json(item);
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
  const id = req.params.itemId // Convert to number if necessary
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