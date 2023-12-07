#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.js";
import config from "./fresh.config.js";

import "$std/dotenv/load.js";

await dev(import.meta.url, "./main.js", config);
