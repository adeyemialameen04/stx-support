import Elysia, { NotFoundError, t } from "elysia";
import {
  AuthenticationError,
  AuthorizationError,
  InvariantError,
} from "../exceptions/errors";
import { ERRORS } from "../models/error-models";

export const errors = (app: Elysia) =>
  app
    .model(
      "ErrorModels",
      t.Object({
        UNAUTHORIZED: ERRORS.UNAUTHORIZED,
        NOT_FOUND: ERRORS.NOT_FOUND,
        CONFLICT: ERRORS.CONFLICT,
      }),
    )
    .error("AUTHENTICATION_ERROR", AuthenticationError)
    .error("AUTHORIZATION_ERROR", AuthorizationError)
    .error("INVARIANT_ERROR", InvariantError)
    .error("NOT_FOUND", NotFoundError)
    .onError(({ code, error, set }) => {
      switch (code) {
        case "AUTHORIZATION_ERROR":
          set.status = 401;
          return {
            status: 401,
            error: error.name,
            detail: error.message,
          };
        case "INVARIANT_ERROR":
          set.status = 400;
          return {
            status: 401,
            error: error.name,
            detail: error.message,
          };
        case "NOT_FOUND":
          set.status = 404;
          return {
            status: 401,
            error: error.name,
            detail: error.message,
          };

        case "INTERNAL_SERVER_ERROR":
          set.status = 500;
          return {
            status: "error",
            detail: "Something went wrong!",
            error: error.name,
          };
      }
    });
