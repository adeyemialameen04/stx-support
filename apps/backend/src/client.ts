import { treaty } from "@elysiajs/eden";
import type { App } from "./app";
const client = treaty<App>("localhost:3000");
