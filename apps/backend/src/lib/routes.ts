import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "../../routes/index";
import type Route1 from "../../routes/users/index";
import type Route2 from "../../routes/posts/index";
import type Route3 from "../../routes/support/index";
import type Route4 from "../../routes/profile/index";
import type Route5 from "../../routes/comments/index";
import type Route6 from "../../routes/auth/logout/index";
import type Route7 from "../../routes/auth/sign-up/index";
import type Route8 from "../../routes/auth/sign-in/index";
import type Route9 from "../../routes/auth/oauth/index";
import type Route10 from "../../routes/auth/refresh/index";
import type Route11 from "../../routes/category/index";
import type Route12 from "../../routes/category/all";
import type Route13 from "../../routes/posts/[id]";
import type Route14 from "../../routes/comments/[id]";
import type Route15 from "../../routes/category/[id]";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/api/v1", typeof Route0>
              & ElysiaWithBaseUrl<"/api/v1/users", typeof Route1>
              & ElysiaWithBaseUrl<"/api/v1/posts", typeof Route2>
              & ElysiaWithBaseUrl<"/api/v1/support", typeof Route3>
              & ElysiaWithBaseUrl<"/api/v1/profile", typeof Route4>
              & ElysiaWithBaseUrl<"/api/v1/comments", typeof Route5>
              & ElysiaWithBaseUrl<"/api/v1/auth/logout", typeof Route6>
              & ElysiaWithBaseUrl<"/api/v1/auth/sign-up", typeof Route7>
              & ElysiaWithBaseUrl<"/api/v1/auth/sign-in", typeof Route8>
              & ElysiaWithBaseUrl<"/api/v1/auth/oauth", typeof Route9>
              & ElysiaWithBaseUrl<"/api/v1/auth/refresh", typeof Route10>
              & ElysiaWithBaseUrl<"/api/v1/category", typeof Route11>
              & ElysiaWithBaseUrl<"/api/v1/category/all", typeof Route12>
              & ElysiaWithBaseUrl<"/api/v1/posts/:id", typeof Route13>
              & ElysiaWithBaseUrl<"/api/v1/comments/:id", typeof Route14>
              & ElysiaWithBaseUrl<"/api/v1/category/:id", typeof Route15>
}