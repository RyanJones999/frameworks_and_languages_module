// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $index from "./routes/index.jsx";
import * as $CreateItem from "./islands/CreateItem.jsx";
import * as $DeleteItem from "./islands/DeleteItem.jsx";
import * as $GetItems from "./islands/GetItems.jsx";
import * as $GetSingleItem from "./islands/GetSingleItem.jsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/index.jsx": $index,
  },
  islands: {
    "./islands/CreateItem.jsx": $CreateItem,
    "./islands/DeleteItem.jsx": $DeleteItem,
    "./islands/GetItems.jsx": $GetItems,
    "./islands/GetSingleItem.jsx": $GetSingleItem,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
