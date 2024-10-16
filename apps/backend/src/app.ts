import { Elysia } from "elysia";
import { plugins } from "./plugins";

const app = new Elysia();
app.use(plugins);

export type App = typeof app;
