Before learning about cookies first learn about how Authentication using jwt + localstorage works

When user tries to signup It sends the request to the server if the user not exists in the db it creates entry for the db and send
the email for the user to get verified.

When user tries to login user send mail and password as the request and server checks

1. check if password is right
2. check if user is verified
   then it returns the jwt token to the user and it stores in the localstorage of the browser.

Send this token for every request especially for auth realted example if the user wants to check the user_details of the user they
should send the jwt token while requeting to the server as the user is logged in and requesting for user details.

Now let's understand the Authentication using cookies and how it is different from jwt + localstorage.
Cookies in web development are small pieces of data sent from a website and stored on the user's computer by the user's web browser
while the user is browsing. They are designed to be a reliable mechanism for websites to remember things (very similar to
local storage)

1. Session Management: Cookies allow websites to identify users and track their individual session states across multiple pages or
   visits. (If the user visits a ikea website and accpets cookies they can show ads in other websites what we are searching.)
2. Personalization: Websites use cookies to personalize content and ads. For instance, cookies might store information about a user's
   preferences, allowing the site to tailor content or advertisements to those interests.
3. Tracking: Cookies can track users across websites, providing insights into browsing behavior. This information can be used for
   analytics purposes, to improve website functionality, or for advertising targeting.
4. Security: Secure cookies can be used to enhance the security of a website by ensuring that the transmission of information is only
   done over an encrypted connection, helping to prevent unauthorized access to user data.

We will be focussing on point 4
Now when user sends a request to the server server sets the cookies to the users browser. Everytime when user does the subsequent
requests the cookies will be sent along with the request.

The main benfit of using this is localstorage can't be done in nextjs. When the browser is calling top level page like
https://app.100xdevs.com/ browser can't send headers. Because browser is sending the requests.
subsequent requests can be sent like this.

```
axios.post("http://localhost:3000/api/v1/account/transfer", {
    to: id,
    amount
}, {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
})
```

This can be sent like this in subrequests but browser cannot send the headers for the main requests.

Nextjs does the SSR the very first request that comes from the browser has the users data. It already renders in the server and
returns html (let's say if course selling website what courses are purchased already renders in server itself.). If the first
request doesn't have Authorization headers how the server know who the person is and whay courses he bought.

In react this is not a problem. When a request is sent by the browser first it hits the CDN and it returns html and js bundles to the
client and it is same for everyone. Eventually i send a request to the backend server to get back my details This is CSR.
While sending subsequent requests the below can be done. Same for the main request also.

```
axios.post("http://localhost:3000/api/v1/account/transfer", {
    to: id,
    amount
}, {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
})
```

If server sets the cookie it will be sent to the every request there is no need of writing headers manually like above.
Any request that can be sent to app.100xdevs.com top level url there will be no Authorization header. Here cookie will be sent.
While a request is coming back from the nextjs server the set-cookie response header will be available. That sets the cookie to the
localstorage. Usually occures when logging in to the website.

1. Cookies can have an expiry attached to them
2. Cookies can be be restricted to only https and to certain domains

Types of cookies
Persistent - Stay even if u close the window
Session - Go away after the window closes
Secure - Sent only over secure, encrypted connections (HTTPS).

These are the few thing cookies let's to do out of the box. If the is done using jwt + localstorage all the logic should be written
by the own.

Properties of cookies

1. HttpOnly - Can not be accessed by client side scripts. Like cookies.get("") is not possible like how it's done for localstorage
2. SameSite - Ensures cookies are not send on cross origin requests
   - Strict
   - Lax - Only GET requests and on top level navigation
   - None

Domains - You can also specify what all domains should the cookie be sent from
This means Let's say there is a express server and a user sends a request to login to app.100xdevs.com it returns the cookie and
set-cookie here the domains can be specified for which domains the cookie can be set.
app.100xdevs.com
harkirat.classx.co.in
here when the user is logged in app.100xdevs.com automatically the user also logged into harkirat.classx.co.in the same cookie
will get set to the both domains. If multiple websites has same backend server this will be very easy but in NextJs it is
difficult.

In Samesite by default if we don't mention anything it chooses Lax
None means - allow it from anywhere which means CSRF attacks Persists anyone can send the update request, delete request etc will
be sent to our website.

Strict means - the website set the cookie for 100xdevs.com. It can be for the same site it can be app.100xdevs.com,
projects.100xdevs.com etc. Now any other website like learncoding.com will not get the cookies.
But there is a problem in Strict.
Let's say there is a afiliate partner react-good-courses.com that has a button See Harkirats Course. when the user clicks on the
button the requests goes to app.100xdevs.com. It is like the request came from react-good-courses.com hence the cookie doesn't go.
When the user is navigated from third party website it should not send cookie it should show login page this is how Strict works.
This happens because when a user is navigated from third party website the first request won't send the cookie because the site
was strict i.e; app.100xdevs.com so login page will be shown when navigated from another website.

Lax will allow when the user clicks on the button on react-good-courses.com It naviagates to app.100xdevs.com and it shows signed in.
This will be handled by lax. Third Party websites sending traffic to out website so it is fine to send cookie.

Even cookies are there we need jwt here some verifyable token that is on the browser and sent to the server. Here it sent in the
different way previously jwt token has been sent in the Authorization header now it is coming in the form of cookie but still here
verifcation is done.

The sample express code

```
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
    // Allow to set credentials (cookies) in the specific origin mentioned below.
    credentials: true,
    // Only single frontend origin allowed to set the cookie on this specific backend server.
    origin: 'http://localhost:5173',
  }),
);

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // do db validations, fetch id of user from db
  const token = jwt.sign(
    {
      id: 1,
    },
    JWT_SECRET,
  );
  // This will put the cookie in the set-cookie header
  // When the user signin in the website the browser will automatically recieve a set-cookie header in the response
  // headers.
  res.cookie('token', token);
  res.send('Logged in!');
});

app.get('/user', (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  // Get email of the user from the database
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

// When user visits this route send index.html file.
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
```

```
<button onClick={async () => {
    await axios.post(`${BACKEND_URL}/signin`, {
        username,
        password
    }, {
        withCredentials: true,
    });
    alert("you are logged in")
}}>Submit</button>

app.use(
  cors({
    // Allow to set credentials (cookies) in the specific origin mentioned below.
    credentials: true,
    // Only single frontend origin allowed to set the cookie on this specific backend server.
    origin: 'http://localhost:5173',
  }),
);
```

Even in backend or frontend withCredentials and credentials should be set to true else cookie will not be set and also why
withCredentials in frontend code (we are not using header but using withCredentials) because this is cross site frontend and
backend both are on different domains.
If the frontend and backend are hosted in the same site all these are not required.

Now backend and html is in samefolder
index.html -> In this file Authorization headers, withCredentials: true are not there because both backend and html (frontend) in
the same file. No need of doing clearCookie and all explicitly

```
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
        // Example: Assumes userData contains a 'name' and 'email'. Adapt based on your actual user data structure.
        userDataDiv.innerHTML = `<p>Your id is: ${userData.userId}</p>`;
      }
      fetchUserData();
    </script>
  </body>
</html>
```
