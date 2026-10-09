import { rm } from "node:fs/promises";

// Clear only the generated directories ignored by this repository.
await rm(".next", {
  recursive: true,
  force: true,
  maxRetries: 3,
  retryDelay: 100,
});
await rm("out", {
  recursive: true,
  force: true,
  maxRetries: 3,
  retryDelay: 100,
});
