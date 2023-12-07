import "$std/dotenv/load.js";

import { start } from "$fresh/server.js";
import manifest from "./fresh.gen.js";
import config from "./fresh.config.js";

await start(manifest, config);
