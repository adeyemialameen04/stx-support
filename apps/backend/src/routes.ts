import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "../routes/index";
import type Route1 from "../routes/users/index";
import type Route2 from "../routes/posts/index";
import type Route3 from "../routes/profile/index";
import type Route4 from "../routes/comments/index";
import type Route5 from "../routes/auth/routes";
import type Route6 from "../routes/category/index";
import type Route7 from "../routes/category/all";
import type Route8 from "../routes/posts/[id]";
import type Route9 from "../routes/comments/[id]";
import type Route10 from "../routes/category/[id]";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/api/v1/", typeof Route0>
              & ElysiaWithBaseUrl<"/api/v1/users", typeof Route1>
              & ElysiaWithBaseUrl<"/api/v1/posts", typeof Route2>
              & ElysiaWithBaseUrl<"/api/v1/profile", typeof Route3>
              & ElysiaWithBaseUrl<"/api/v1/comments", typeof Route4>
              & ElysiaWithBaseUrl<"/api/v1/auth/routes", typeof Route5>
              & ElysiaWithBaseUrl<"/api/v1/category", typeof Route6>
              & ElysiaWithBaseUrl<"/api/v1/category/all", typeof Route7>
              & ElysiaWithBaseUrl<"/api/v1/posts/:id", typeof Route8>
              & ElysiaWithBaseUrl<"/api/v1/comments/:id", typeof Route9>
              & ElysiaWithBaseUrl<"/api/v1/category/:id", typeof Route10>
}