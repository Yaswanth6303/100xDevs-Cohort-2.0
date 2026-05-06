// ------------------------------------------------------
// Importing dependencies
// ------------------------------------------------------
//
// `zod` is a TypeScript-first schema validation library.
// It helps validate and parse data at runtime (while your app is running).
//
// `express` is a Node.js framework for building REST APIs and web servers.
//
// Together, they make a perfect combination for creating safe and type-checked APIs.
import { z } from 'zod';
import express from 'express';

// ------------------------------------------------------
// Create the Express app
// ------------------------------------------------------
//
// This sets up the main Express application instance.
const app = express();

// Enable JSON body parsing middleware so Express can read JSON from requests.
app.use(express.json());

// ------------------------------------------------------
// Define the Zod schema for user profile update
// ------------------------------------------------------
//
// Zod schemas define what a valid object should look like **at runtime**.
//
// That means when a request comes in, you can check if it matches this schema.
// If it doesn’t, you can safely reject it with a descriptive error.
//
// ------------------------------------------------------
// Schema Explanation
// ------------------------------------------------------
//  - `name`: Must be a non-empty string.
//  - `email`: Must be a valid email string.
//  - `age`: Optional number, but if provided, must be >= 18.
const userProfileSchema = z.object({
  // .min(1) ensures that empty strings are not accepted.
  name: z.string().min(1, { message: 'Name cannot be empty' }),

  // .email() validates the format strictly.
  email: z.string().email({ message: 'Invalid email format' }),

  // .min(18) ensures minimum age if provided.
  // The `.optional()` makes this field not required.
  age: z.number().min(18, { message: 'You must be at least 18 years old' }).optional(),
});

// ------------------------------------------------------
// API endpoint: PUT /user
// ------------------------------------------------------
//
// This route will handle user profile updates.
//
// It will:
//   1. Validate the request body at runtime using Zod.
//   2. Infer TypeScript types from the same schema for compile-time safety.
//   3. Return appropriate responses.
app.put('/user', (req, res) => {
  // ------------------------------------------------------
  // Runtime Validation (Zod)
  // ------------------------------------------------------
  //
  // `.safeParse()` checks if `req.body` matches the schema.
  // It returns an object with:
  //   - `success`: boolean (true if valid, false if invalid)
  //   - `data` (if valid)
  //   - `error` (if invalid)
  //
  // Example output:
  //   { success: true, data: {...validated data...} }
  //   OR
  //   { success: false, error: ZodError {...} }
  const { success } = userProfileSchema.safeParse(req.body);

  // ------------------------------------------------------
  // Compile-time Validation (TypeScript)
  // ------------------------------------------------------
  //
  // `z.infer<typeof schema>` automatically generates a TypeScript type
  // that exactly matches the structure of your Zod schema.
  //
  // So here:
  //   type UpdateBody = {
  //     name: string;
  //     email: string;
  //     age?: number; // optional because of `.optional()`
  //   }
  //
  // This gives you strong typing for `updateBody`, so if you accidentally
  // assign an invalid type (like `age: "twenty"`), TypeScript will catch it
  // **before you even run the code**.
  type UpdateBody = z.infer<typeof userProfileSchema>;

  // The `updateBody` variable is now typed safely at compile time.
  // Note: At runtime, this does not automatically validate the data —
  // that’s what `.safeParse()` above does.
  const updateBody: UpdateBody = req.body;

  // You can safely use updateBody here in your code — TypeScript knows its shape.
  console.log(updateBody);

  // ------------------------------------------------------
  // Handling invalid requests
  // ------------------------------------------------------
  //
  // If runtime validation failed, respond with an error.
  if (!success) {
    return res.status(411).json({
      error: 'Invalid request body', // You can also include `error.errors` for details
    });
  }

  // ------------------------------------------------------
  // If validation passed — perform your business logic
  // ------------------------------------------------------
  //
  // Here, you’d typically perform:
  //   - A database update (e.g., update user profile)
  //   - An external API call
  //   - Or any other processing logic
  //
  // Since validation succeeded, you can trust that:
  //   - `name` is a non-empty string
  //   - `email` is valid
  //   - `age` is either undefined or >= 18
  // TypeScript AND Zod together ensure this safety.
  return res.status(200).json({
    message: 'User updated',
  });
});

// ------------------------------------------------------
// Start the Express server
// ------------------------------------------------------
//
// This will start the server on port 3000 and log a message when ready.
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
