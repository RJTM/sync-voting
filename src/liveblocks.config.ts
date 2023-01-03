import { createClient } from "@liveblocks/client";

let PUBLIC_KEY = import.meta.env.PROD
  ? "pk_live_9sJkV3G7gpKxrlhu5_tw9o90"
  : "pk_test_9gg9EzFe1vjbf2Cw279LHTmY";

export const client = createClient({
  publicApiKey: PUBLIC_KEY,
});
