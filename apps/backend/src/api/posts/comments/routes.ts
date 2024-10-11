import { selectCommentSchema } from "@/db/schema/comment";
import { ERRORS } from "@/models/error-models";
import { CreateCommentModel } from "@/models/posts";
import { accessTokenPlugin } from "@/plugins/auth";
import Elysia, { t } from "elysia";
import { commentService } from "./service";
import { AuthorizationError, NotFoundError } from "@/exceptions/errors";
import { accessTokenSecurity } from "@/utils/helpers";
import { IdModel } from "@/models/common";

const tags = ["Comments"];
export const commentRoutes = new Elysia({
  prefix: "/comment",
  name: "api.comments",
  tags,
})
  .use(accessTokenPlugin)
  .model("CreateCommentModel", CreateCommentModel)
  .guard(
    {
      detail: {
        security: accessTokenSecurity,
      },
      async beforeHandle({ payload }) {
        if (!payload) {
          throw new AuthorizationError("Invalid Token");
        }
      },
    },
    (app) =>
      app
        .post(
          "",
          async ({ body, payload, set }) => {
            const comment = await commentService.createComment(
              body,
              payload && "user" in payload ? payload.user.id : "",
            );
            set.status = "Created";
            return comment;
          },
          {
            body: "CreateCommentModel",
            response: {
              201: selectCommentSchema,
              401: ERRORS.UNAUTHORIZED,
            },
            detail: {
              summary: "Create Comment",
              detail: "Create a comment",
            },
          },
        )
        .guard(
          {
            params: IdModel,
          },
          (app) =>
            app
              .delete(
                "/:id",
                async ({ params: { id }, set, payload }) => {
                  const comment = await commentService.isCommentOwner(
                    id,
                    payload && "user" in payload ? payload.user.id : "",
                  );

                  if (comment.length === 0) {
                    throw new NotFoundError(
                      "Comment not found or you don't have permission to edit it",
                    );
                  }

                  const [deletedComment] =
                    await commentService.deleteComment(id);
                  return deletedComment;
                },
                {
                  detail: {
                    summary: "Delete Comment",
                    description: "Deletes a comment",
                  },
                  response: {
                    200: selectCommentSchema,
                    401: ERRORS.UNAUTHORIZED,
                    404: ERRORS.NOT_FOUND,
                  },
                },
              )
              .patch(
                "/:id",
                async ({ params: { id }, set, payload, body }) => {},
                {
                  body: t.Partial(CreateCommentModel),
                  detail: {
                    summary: "Update Comment",
                    description: "Updates a comment",
                  },
                  response: {
                    200: selectCommentSchema,
                    401: ERRORS.UNAUTHORIZED,
                    404: ERRORS.NOT_FOUND,
                  },
                },
              ),
        ),
  );
