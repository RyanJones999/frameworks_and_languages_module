// deno-lint-ignore-file no-explicit-any
import express from "npm:express";
import cors from "npm:cors";
import * as handlers from "./handlers.ts";

// Set the port
const port = 8000

// initializing the items variable


// Initialize the Express application
const app = express();

app.use(express.json())
app.use(cors())

// Routes ----------------------------------------------------------------------

app.get('/', (req: any , res: any) => {
  res.sendFile('client.html', {root: __dirname})
})

app.post('/item', (req: any, res: any) => {
  const body = req.body;
  console.log(body);
  const item_id = handlers.add_item(body);
  if (item_id) {
    res.status(201);
    res.send(`${item_id}`);
  } else {
    res.status(405);
    res.send();
  } 
});

app.get('/item/:itemId', (req: any, res: any) => {
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