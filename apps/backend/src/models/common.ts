import { t } from "elysia";

export const IdModel = t.Object({
  id: t.String({ format: "uuid" }),
});
