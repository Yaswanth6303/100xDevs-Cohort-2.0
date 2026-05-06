# ☁️ Serverless Application using Cloudflare Workers

This project demonstrates how to build and deploy a **serverless function** using **Cloudflare Workers** with **Bun** as the runtime and package manager.  
Cloudflare Workers are similar to **AWS Lambda**, but they run at the **edge**, providing **faster response times** and **global availability**.

---

## 🚀 What Are Cloudflare Workers?

Cloudflare Workers allow you to run lightweight JavaScript, TypeScript, or WebAssembly code on Cloudflare’s global network — without managing servers.  
They are ideal for:
- Building APIs
- Handling requests at the edge
- Performing lightweight computations
- Serving static or dynamic content quickly

---

## ⚙️ Prerequisites

Before getting started, make sure you have the following installed:

- **[Bun](https://bun.sh/)** (JavaScript runtime and package manager)
- **[Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)** (Cloudflare’s CLI tool for developing and deploying Workers)
- A **Cloudflare account**

---

## 🏗️ Project Setup

To create a new Cloudflare Worker project using **Bun**, run:

```bash
bun create cloudflare -- my-app
```

This command scaffolds a new Cloudflare Worker project named my-app with all the necessary configuration files.

## 🧠 Project Structure
```bash
cloudflare-app/
├── src/
│   └── index.ts       # Main entry file where your Worker logic resides
├── wrangler.jsonc     # Configuration file for Wrangler
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration (if using TypeScript)
└── README.md           # Project documentation
```

## 🧩 Writing Your Logic

Inside the src/index.ts file, you can define your Worker logic using the fetch handler.

For example:

```typescript
export default {
  async fetch(request: Request): Promise<Response> {
    return new Response("Hello from Cloudflare Worker!", { status: 200 });
  },
};
```

The **fetch** function receives every incoming HTTP request and must return a **Response**.

## 🔐 Login to Cloudflare

Before deploying your Worker, log in to your Cloudflare account via Wrangler.

```bash
bunx wrangler login
```

This command opens your browser and authenticates your session.

To verify your login status:

```bash
bunx wrangler whoami
```

It will display your Cloudflare account details.

## 🚀 Deploying to Cloudflare

Once your Worker is ready, deploy it to Cloudflare’s edge network:

```bash
bun run deploy
```

After deployment, Wrangler will show you the live URL of your Worker, for example:

```bash
✅ Successfully deployed to: https://cloudflare-app.username.workers.dev
```

## 🧼 Useful Commands

| Command                           | Description                             |
| --------------------------------- | --------------------------------------- |
| `bun create cloudflare -- my-app` | Creates a new Cloudflare Worker project |
| `bunx wrangler login`             | Logs into your Cloudflare account       |
| `bunx wrangler whoami`            | Shows Cloudflare account info           |
| `bun run dev`                     | Runs the Worker locally for development |
| `bun run deploy`                  | Deploys the Worker to Cloudflare        |

> **_NOTE:_**  To change the name of the app change it in **`wrangler.jsonc`**
