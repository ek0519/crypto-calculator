import { Elysia, t } from "elysia";
import swagger from "@elysiajs/swagger";
import { authRoute } from "../../../backend/routes/auth";

const app = new Elysia({ prefix: "/api" })
  .use(
    swagger({
      documentation: {
        tags: [{ name: "Auth", description: "Authentication endpoints" }],
        info: {
          title: "Donation API",
          version: "1.0.0",
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
      path: "/docs",
    }),
  )
  .use(authRoute)
  .get("/", () => "hi")
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  });

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);
export const POST: RequestHandler = ({ request }) => app.handle(request);

export type App = typeof app;
