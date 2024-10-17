import { Elysia } from "elysia";
import { plugins } from "./plugins";

const app = new Elysia();
app.get("/", () => "Hi Stx Support").use(plugins);

export type App = typeof app;
