import express from "express";
import cors from "cors";
import * as handlers from "./handlers.js";

// Set the port
const port = 8000

// initializing the items variable


// Initialize the Express application
const app = express();
app.use(express.json());
app.use(cors());

// Routes ----------------------------------------------------------------------

app.post('/item', async function (req, res, next) {
  const body = await req.body;
  console.log(req.body);
  //console.log(req);
  const item_id = handlers.add_item(body);
  if (item_id) {
    res.status(201);
    res.send(`${item_id}`);
  } else {
    res.status(405);
    res.send();
  } 
});

app.get('/item/:itemId', (req, res) => {
  const id = req.params.itemId;
  const item = handlers.get_item(id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Item not found." });
  } 
});

// Start the server on port 8000
app.listen(port, () => {
  console.log('Server is running on port 8000');
});