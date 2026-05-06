import { Hono } from "hono";
import type { Context, Next } from "hono";

const app = new Hono();

async function authMiddleware(c: Context, next: Next) {
  const token = c.req.header("Authorization");
  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  if (token !== "Bearer 1234567890") {
    // If the token is not the same as the one in the header, return an error.
    return c.json({ error: "Unauthorized" }, 401);
  }

  await next();
}

app.post("/", authMiddleware, async (c) => {
  // To access the body, headers, url, method, etc. we can use the c object.
  // Whenever we convert the body to json, we need to await the conversion because it is a promise. This is because
  // the body is a stream and we need to wait for it to be converted to json.
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  // In express we get the body, headers, url, method, etc. from the request object. Hono does this in a different way.
  // Instead of req.headers.authorization, we use c.req.header("authorization"). This is because Hono is a framework that
  // is built on top of the Fetch API.
  // req.headers.authorization -> c.req.header("authorization")
  // req.body -> await c.req.json()
  // req.query -> c.req.query("param")

  return c.text("Hello Hono!");
});

// In Postman, we can send a POST request to the / endpoint with the following body:
// {
//   "name":"John",
//   "email":"john@gmail.com",
//   "password":"Qwerty@123"
// }
// And the following headers:
// Authorization: Bearer 1234567890
// And the following query parameters:
// param=2
// POST request URL: http://localhost:8787/?param=2

app.get("/", (c) => {
  return c.json({
    message: "Users",
    users: [
      {
        id: 1,
        name: "John Doe",
      },
      {
        id: 2,
        name: "Jack Sparrow",
      },
      {
        id: 3,
        name: "Jill Smith",
      },
    ],
  });
});

export default app;
