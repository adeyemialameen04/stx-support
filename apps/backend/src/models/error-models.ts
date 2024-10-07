import { t } from "elysia";

export const CONFLICT = t.Object({
  status: t.Number({ default: 409 }),
  detail: t.String(),
  error: t.String({ default: "Conflict" }),
});

export const NOT_FOUND = t.Object({
  status: t.Number({ default: 404 }),
  detail: t.String(),
  error: t.String({ default: "Not Found" }),
});

export const UNAUTHORIZED = t.Object({
  status: t.Number({ default: 401 }),
  detail: t.String(),
  error: t.String({ default: "Unauthorized" }),
});

export const ERRORS = {
  CONFLICT,
  NOT_FOUND,
  UNAUTHORIZED,
};
