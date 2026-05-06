#set document(
  title: "Authentication: JWT with localStorage and Cookies",
  author: "Yaswanth Gudivada",
)

#set page(
  paper: "a4",
  margin: (x: 2.5cm, y: 2.5cm),
  numbering: "1",
)

#set text(font: "New Computer Modern", size: 11pt)
#set par(justify: true, leading: 0.75em)

#set heading(numbering: "1.")
#show heading.where(level: 1): set text(size: 18pt, weight: "bold")
#show heading.where(level: 2): set text(size: 14pt, weight: "bold")
#show heading.where(level: 3): set text(size: 12pt, weight: "bold")

#show raw.where(block: true): set block(
  fill: luma(240),
  inset: 10pt,
  radius: 4pt,
  width: 100%,
)

#align(center)[
  #text(size: 22pt, weight: "bold")[Authentication in Web Applications]
  #v(0.5em)
  #text(
    size: 14pt,
  )[A Comparative Study of JWT with localStorage and Cookie-Based Authentication]
  #v(2em)
]

#outline(indent: auto)
#pagebreak()

= Introduction

Before exploring how authentication works using cookies, it is essential to first understand how authentication operates when using a JSON Web Token (JWT) stored in the browser's localStorage. Once that mechanism is clear, the differences and advantages introduced by cookie-based authentication become significantly easier to grasp. This document walks through both approaches in detail, explains the limitations that motivate the use of cookies, and provides complete code examples that illustrate the concepts.

= Authentication Using JWT and localStorage

== The Signup Flow

When a user attempts to sign up for a service, the client sends a registration request to the server. The server inspects its database to determine whether the user already exists. If no record is found, the server creates a new entry for the user in the database and dispatches a verification email. The user is then expected to click the verification link in the email to confirm ownership of the address, after which the account is considered verified.

== The Login Flow

When the user later attempts to log in, the client transmits the email address and password to the server as part of the request payload. The server then performs two distinct checks:

+ It verifies that the password supplied by the user is correct by comparing it with the stored credentials.
+ It verifies that the user's email address has been marked as verified.

If both checks succeed, the server generates a JWT and returns it to the client. The browser, upon receiving this token, stores it in localStorage so that it can be reused for subsequent requests.

== Sending the Token on Subsequent Requests

Whenever the user wants to perform an action that requires authentication, for example fetching their own profile details, the JWT must be attached to the outgoing request. This is typically done by reading the token from localStorage and placing it in the `Authorization` header of the HTTP request. A representative example of such a request is shown below:

```javascript
axios.post("http://localhost:3000/api/v1/account/transfer", {
    to: id,
    amount
}, {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
})
```

In this pattern, the server inspects the `Authorization` header on every incoming request, validates the JWT, and uses the decoded payload to identify the user.

= Introduction to Cookies

With the JWT-and-localStorage approach understood, we can now discuss authentication based on cookies and examine how it differs from the previous mechanism.

A cookie, in the context of web development, is a small piece of data that a website sends to the user's browser. The browser then stores this data on the user's computer for the duration the user is browsing. Cookies are designed to be a reliable mechanism by which a website can remember information about a user across multiple page loads and visits. In this sense, they are conceptually very similar to localStorage, but they come with additional behaviors and properties that make them especially useful for authentication.

== Common Purposes of Cookies

Cookies serve several distinct purposes in modern web applications:

+ *Session Management.* Cookies allow a website to identify individual users and to track the state of their session as they navigate between pages or return for new visits. For example, if a user visits the IKEA website and accepts cookies, the data captured can later be used to display advertisements on other websites that reflect what the user was searching for.

+ *Personalization.* Websites use cookies to tailor content and advertisements to individual users. A cookie may store information about the user's preferences, allowing the site to present content or advertisements aligned with their interests.

+ *Tracking.* Cookies can be used to track users across multiple websites, providing insights into broader browsing behavior. This information is commonly used for analytics, for improving the functionality of a website, or for advertising targeting.

+ *Security.* Secure cookies can be configured to enhance the security of a website by ensuring that the cookie is transmitted only over an encrypted connection. This helps prevent unauthorized parties from intercepting the cookie and gaining access to user data.

The remainder of this document focuses primarily on the fourth purpose, security, because this is where the authentication-related advantages of cookies become apparent.

== How Cookies Travel With Requests

When a user sends a request to the server, the server can include a `Set-Cookie` header in its response. The browser, upon receiving such a response, stores the cookie. From that moment on, every subsequent request the browser sends to that origin automatically includes the stored cookie. The application code does not need to attach the cookie manually; the browser handles this transparently.

= Why Cookies Are Necessary For Next.js

The principal reason cookies become attractive (and often necessary) is that localStorage is not viable for the way Next.js renders pages. The argument is as follows.

When the browser navigates to a top-level page such as `https://app.100xdevs.com/`, the browser itself is the entity making the request. The browser does not (and cannot) attach custom headers such as an `Authorization: Bearer ...` header to that initial top-level navigation request. Custom headers can only be attached to subsequent requests that the JavaScript application code triggers itself.

For instance, after the page has loaded, the application can issue an AJAX call like the following, in which the token is read from localStorage and added as a header:

```javascript
axios.post("http://localhost:3000/api/v1/account/transfer", {
    to: id,
    amount
}, {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
})
```

This works for the subsequent request, but it cannot work for the very first top-level navigation request to the website.

== The Server-Side Rendering Problem

Next.js performs server-side rendering (SSR). This means that the very first request originating from the browser is expected to carry the user's identifying data so that the server can produce a fully personalized HTML document and return it to the client. For example, on a course-selling website, the server should already render the list of courses the user has purchased before sending the HTML back. If the very first request does not include any `Authorization` header, the server has no way of knowing who the user is, which courses they have purchased, or what content to render.

== Why React-Only Applications Do Not Have This Problem

In a traditional React application that uses client-side rendering (CSR), the situation is different. When the browser issues its initial request, that request is served by a Content Delivery Network (CDN) which simply returns identical HTML and JavaScript bundles to every visitor. The same static assets are returned regardless of who the user is. Once the JavaScript executes in the browser, the application then sends a follow-up request to the backend server to fetch user-specific data. Because this follow-up request is initiated from JavaScript, it can attach an `Authorization` header in the usual manner:

```javascript
axios.post("http://localhost:3000/api/v1/account/transfer", {
    to: id,
    amount
}, {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
})
```

In this CSR model the same approach can be used for both the initial data-fetch request and any subsequent requests, because the initial HTML does not need to be personalized at the server.

== How Cookies Solve The SSR Problem

Once the server sets a cookie on the user's browser, that cookie is included automatically on every request to the server, including the initial top-level navigation request. There is no need for the application code to attach an `Authorization` header manually. Any request directed at a top-level URL such as `app.100xdevs.com` will not carry an `Authorization` header, but it will carry the cookie. When the response from the Next.js server contains a `Set-Cookie` response header, the browser stores the cookie, and this is the typical moment at which a cookie is created, namely when the user logs in.

= Properties Of Cookies

Cookies provide a number of behaviors and configuration options out of the box. If the same outcomes were attempted using JWT plus localStorage, every piece of related logic would have to be implemented manually by the developer.

== Built-in Capabilities

+ Cookies can have an expiry time attached to them, after which the browser will discard them automatically.
+ Cookies can be restricted so that they are only transmitted over HTTPS, and they can be restricted to specific domains.

== Types Of Cookies

There are three commonly referenced categories of cookies, classified primarily by their lifetime and transport requirements:

- *Persistent cookies.* These remain in the browser even after the window is closed.
- *Session cookies.* These are removed automatically when the browser window is closed.
- *Secure cookies.* These are sent only over secure, encrypted HTTPS connections.

== Configurable Properties

Beyond the lifetime classifications above, cookies expose several properties that can be tuned to control how and when they are sent.

=== HttpOnly

A cookie marked `HttpOnly` cannot be accessed by client-side scripts. In other words, JavaScript code running in the browser cannot read its value. This contrasts sharply with localStorage, where calls such as `cookies.get("...")` (or, in the localStorage case, `localStorage.getItem("...")`) would expose the value to any script on the page. The `HttpOnly` flag therefore protects the cookie from being stolen by malicious scripts injected through cross-site scripting (XSS).

=== SameSite

The `SameSite` attribute controls whether or not the cookie is sent on cross-origin requests. It accepts three values:

- `Strict`
- `Lax`
- `None`

If no value is specified explicitly, browsers default to `Lax`.

The behavior of each value is detailed in a dedicated section below.

=== Domains

The `Domain` property allows the developer to specify the set of domains from which the cookie should be sent. Consider the example of an Express server that handles authentication for `app.100xdevs.com`. After login, the server returns a `Set-Cookie` header. By configuring the `Domain` attribute appropriately, the same cookie can be set so that it is also transmitted when the user visits `harkirat.classx.co.in`. The practical effect is that, once the user logs in to `app.100xdevs.com`, they are automatically considered logged in on `harkirat.classx.co.in` because the same cookie is delivered to the same backend on both domains. This pattern is convenient when several websites share a common backend server. In a Next.js context, however, configuring this can be more difficult.

= Detailed Behavior Of `SameSite`

== `SameSite=None`

Setting `SameSite=None` allows the cookie to be sent from any origin. In effect, any third-party site can issue authenticated requests to the server. This permissive setting opens the door to Cross-Site Request Forgery (CSRF) attacks, in which any external website can trigger update or delete requests against the user's account on the target site.

== `SameSite=Strict`

`SameSite=Strict` ties the cookie to a single site. If the cookie is set for `100xdevs.com`, it will be sent only on requests originating from the same site. This includes related subdomains such as `app.100xdevs.com` and `projects.100xdevs.com`, but it excludes any other site such as `learncoding.com`, which will never receive the cookie.

There is, however, a notable user-experience consequence of `Strict` mode. Suppose there is an affiliate partner site `react-good-courses.com` that displays a button labeled "See Harkirat's Course". When the user clicks this button, the browser navigates to `app.100xdevs.com`. Because the navigation originates from a third-party site (`react-good-courses.com`), `Strict` mode treats the request as cross-site and refuses to attach the cookie. As a result, the user appears to be logged out and is shown the login page, even if they had previously logged in. In short, when a user is navigated to the site from a third-party origin, `Strict` mode does not send the cookie on that first request, and the login page is displayed.

== `SameSite=Lax`

`SameSite=Lax` softens this restriction. With `Lax`, the cookie is sent on top-level navigations triggered by GET requests, even when the navigation originates from a third-party site. Returning to the previous example, when the user clicks the "See Harkirat's Course" button on `react-good-courses.com` and is navigated to `app.100xdevs.com`, the cookie is included with the request and the user is recognized as signed in. The reasoning behind `Lax` is that traffic arriving from third-party sites by way of top-level navigation is generally considered legitimate and should therefore be allowed to carry the cookie.

In summary, `Lax` permits the cookie on:

- Top-level navigations.
- GET requests only.

= JWT Is Still Required When Using Cookies

Even when authentication is performed via cookies, a JWT (or some other verifiable token) is still required. The cookie is simply the transport mechanism: instead of placing the JWT in the `Authorization` header, the server places it inside a cookie. The verification step on the server side, however, remains identical. The token is extracted from the cookie, its signature is checked, and the payload is decoded to determine the identity of the user.

= Sample Express Server Code

The following Express server demonstrates how to set, read, and clear an authentication cookie that contains a JWT.

```typescript
import express from 'express';
// Parses a very long cookie-string and gets you an object.
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import path from 'path';

const JWT_SECRET = 'test123';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    // Allow credentials (cookies) to be set from the specific origin below.
    credentials: true,
    // Only this single frontend origin is permitted to set the cookie
    // on this specific backend server.
    origin: 'http://localhost:5173',
  }),
);

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Perform database validation and fetch the user's id from the database.
  const token = jwt.sign(
    {
      id: 1,
    },
    JWT_SECRET,
  );
  // This places the cookie in the Set-Cookie response header.
  // When the user signs in, the browser automatically receives a
  // Set-Cookie header in the response and stores the cookie.
  res.cookie('token', token);
  res.send('Logged in!');
});

app.get('/user', (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  // Look up the user's email in the database here, if needed.
  res.send({
    userId: decoded.id,
  });
});

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'Logged out!',
  });
});

// When a user visits the root route, send the index.html file.
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
```

Several aspects of this server deserve emphasis:

- `cookie-parser` is registered as middleware so that incoming cookies are parsed into a convenient object on `req.cookies`.
- The CORS middleware is configured with `credentials: true` and a single allowed `origin`. This is what permits the browser to honor the `Set-Cookie` header on cross-origin responses.
- The `/signin` route signs a JWT, places it inside a cookie named `token`, and returns a confirmation message.
- The `/user` route reads the `token` cookie, verifies the JWT, and returns the user's identifier.
- The `/logout` route clears the `token` cookie so the user is no longer authenticated on subsequent requests.

= Frontend Code Across Different Origins

When the frontend and backend live on different origins, the frontend must opt in to sending and receiving cookies. With `axios`, this is done by setting `withCredentials: true` on the request, as shown below:

```jsx
<button onClick={async () => {
    await axios.post(`${BACKEND_URL}/signin`, {
        username,
        password
    }, {
        withCredentials: true,
    });
    alert("you are logged in")
}}>Submit</button>
```

The corresponding CORS configuration on the backend must also enable credentials for the matching origin:

```javascript
app.use(
  cors({
    // Allow credentials (cookies) to be set on the specific origin below.
    credentials: true,
    // Only this single frontend origin is permitted to set the cookie
    // on this specific backend server.
    origin: 'http://localhost:5173',
  }),
);
```

Two points must be highlighted here:

+ Both sides of the connection must opt in. The backend must set `credentials: true` in its CORS configuration, and the frontend must set `withCredentials: true` on each outgoing request. If either is missing, the cookie will not be set.

+ The reason `withCredentials` is needed on the frontend (rather than a custom header) is that this is a cross-site setup in which the frontend and backend are hosted on different domains. The browser treats such requests with extra caution, and `withCredentials` is the explicit signal that cookies should be allowed to flow.

If the frontend and backend happen to be hosted on the same site, none of this extra configuration is required.

= Same-Origin Hosting: A Simpler Setup

When the backend serves the HTML directly, that is, when the frontend HTML and the backend code reside in the same project and on the same origin, the frontend code does not need to set `Authorization` headers, and it does not need to set `withCredentials: true`. There is also no need to call `clearCookie` explicitly through any cross-origin mechanism. The example below illustrates this simpler setup with an `index.html` page that is served by the backend:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login Page</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  </head>
  <body>
    <input id="username" type="text" placeholder="username" />
    <input id="password" type="password" placeholder="password" />
    <button id="loginButton">Submit</button>
    <button id="logoutButton">Logout</button>
    <div id="userData"></div>

    <script>
      document.getElementById('loginButton').addEventListener('click', async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
          await axios.post(`/signin`, {
            username,
            password,
          });
          alert('You are logged in');
        } catch (error) {
          console.error('Login failed:', error);
          alert('Login failed');
        }
      });

      document.getElementById('logoutButton').addEventListener('click', () => {
        axios
          .post(`/logout`)
          .then(() => {
            console.log('Logged out successfully.');
          })
          .catch((error) => {
            console.error('Logout failed:', error);
          });
      });

      function fetchUserData() {
        axios
          .get(`/user`)
          .then((response) => {
            const userData = response.data;
            displayUserData(userData);
          })
          .catch((error) => {
            console.error('Failed to fetch user data:', error);
          });
      }

      function displayUserData(userData) {
        const userDataDiv = document.getElementById('userData');
        // Adapt this to the actual structure of your user data.
        userDataDiv.innerHTML = `<p>Your id is: ${userData.userId}</p>`;
      }
      fetchUserData();
    </script>
  </body>
</html>
```

Because the backend and the HTML page live on the same origin, the browser treats the requests as same-site. The cookie set by the server is automatically sent on every subsequent request, the `Authorization` header is unnecessary, and `withCredentials` does not need to be configured.

= Summary

This document has presented two approaches to authentication. The first stores a JWT in localStorage and attaches it to every authenticated request as an `Authorization` header. The second stores the JWT inside a cookie and relies on the browser to attach the cookie to every request automatically.

The cookie-based approach becomes essential in any application that performs server-side rendering, because the very first request, namely the top-level navigation, cannot carry custom headers. Cookies, by contrast, are sent on every request, including the initial top-level navigation, allowing the server to render a personalized response from the start.

Cookies also provide a number of built-in capabilities, including expiry, HTTPS-only delivery, domain restrictions, the `HttpOnly` flag that hides the cookie from JavaScript, and the `SameSite` attribute that controls cross-site behavior. These capabilities would otherwise need to be implemented manually if a developer chose to remain on the JWT-with-localStorage path. Even with cookies, the JWT itself is still used as the verifiable token: the cookie merely changes the transport, not the verification logic.

Finally, the deployment topology matters. When the frontend and backend share an origin, the configuration is straightforward, and the browser handles cookies transparently. When the frontend and backend are hosted on different origins, both sides must explicitly opt in to credentialed requests by setting `credentials: true` in the server's CORS configuration and `withCredentials: true` on each frontend request.
