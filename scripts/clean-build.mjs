import { rm } from "node:fs/promises";

// Clear only the generated directories ignored by this repository.
await rm(".next", { recursive: true, force: true });
await rm("out", { recursive: true, force: true });
