import { defineConfig } from "$fresh/server";
import tailwind from "$fresh/plugins/tailwind";

export default defineConfig({
  plugins: [tailwind()],
});
