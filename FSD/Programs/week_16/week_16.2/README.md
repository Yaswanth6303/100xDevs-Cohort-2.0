By default when we initalize monorepo using this command bunx create-turbo@latest
we get apps folder inside it we will have 2 next js projects one is web and other is docs
There is some other foler called packages where inside that all the ui components, eslint, etc will be available. This is common
packages form all 2 projects which is inside apps i.e; for web and docs because. Inside packages/ui/src/button.tsx this can be
used by both docs and web inside apps folder.
Now in terminal when we do bun run dev both the web and docs will start
web runs in localhost:3000/
docs runs in localhost:3001/

in root package.json dev -> turbo dev so when we run bun run dev it runs this turbo dev. But how turbo dev knows to run only web and
docs folder only not any other folders this is because of turbo.json which is present in the root folder.

```
{
  "$schema": "https://turborepo.dev/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

["^build"], -> This says when user runs bun run build go to all folders inside apps i.e; web and docs and build the project.
Same for lint and check-types also. web and docs has build script but packages/ui doesn't have build script

"outputs": [".next/**", "!.next/cache/**"] -> This line helps the turborepo in caching.
This line in turbo.json tells Turborepo to cache the build output from the .next folder, but exclude .next/cache. When we run
bun run build, Next.js generates the .next folder. If the inputs to the build haven't changed, Turborepo restores the cached .next
output instead of rebuilding. The .next/cache folder is excluded because it contains internal Next.js cache data that is not needed
and may cause inconsistent caching.

Inside dev, we've specified "cache": false. This means we're telling Turborepo not to cache the results of the dev script. dev runs
a persistent dev server and produces no outputs, so there is nothing to cache. Learn more about it in our docs on turning off
caching.
Additionally, we set "persistent": true, to let turbo know that this is a long-running dev server, so that turbo can ensure that
no otheytasks depend on it. You'tan read more in the docs for the persistent option.

Now inside apps folder i have created a react project and named it as react-app. Now in root i have done bun install so root
package.json installs required dependencies. Now when i do bun run dev it starts all the 3 project web, docs and react-app.

Now if i try to access packages/ui/button.tsx from react-app is it possible with out mentioning

```
"dependencies": {
    "@repo/ui": "*",
},
```

this @repo/ui dependency ?
Yes it is possible because in global node_modules there is file in this path -> cd node_modules/@repo/ui/ so globally react project
able to access those ui components even it is not metioned in the dependencies in package.json of react-app. That @repo/ui is there
globally because of starter code web and docs in future if we delete these two and freshly create a react project inside apps and
do bun install then for sure in global node_modules @repo/ui will not be there we have to keep @repo/ui in package.json of the
react project.

Now let's create a backend bun project using express and create simple healthy endpoint
Small error in creating bunjs in zed

bun init -y -> Creastes bun js project by default so i created a src folder and moved index.js inside it and also added eslint and
prettier for that particular project by doing it i got this error

```
Parsing error: ESLint was configured to run on `/Users/yaswanthgudivada/Documents/Learnings/HarkiratSingh/Cohort-2/FSD/Programs/week_16/week_16.2/monorepo-project-2/apps/backend/src/index.ts` using `parserOptions.project`: <tsconfigRootDir>/tsconfig.json
However, that TSConfig does not include this file. Either:
- Change ESLint's list of included files to not include this file
- Change that TSConfig to include this file
- Create a new TSConfig that includes this file and include it in your parserOptions.project
See the typescript-eslint docs for more info: https://tseslint.com/none-of-those-tsconfigs-include-this-file
```

What was causing the error?
This is a very common issue in monorepo setups when using Zed (or VS Code) along with ESLint flat configs and TypeScript.

The editor (Zed) typically runs the ESLint language server from the root of your monorepo workspace. When ESLint found your
apps/backend/eslint.config.js, it read this rule:

```javascript
project: "./tsconfig.json";
```

Because ESLint was executed from the root of the monorepo, it assumed ./tsconfig.json was located at the repo root rather than
inside the apps/backend directory. When it failed to match your src/index.ts file with its corrupted path understanding, it threw
the parsing error you saw.

Additionally, TypeScript can be a bit unreliable when finding included files across IDE boundaries if an explicit "include" array
is missing from the tsconfig.json.

How I fixed it:
I modified two configuration files in your apps/backend folder:

apps/backend/eslint.config.js
I added tsconfigRootDir: import.meta.dirname to the typescript-eslint parserOptions. This tells ESLint to always resolve
./tsconfig.json relative to the directory where eslint.config.js lives, regardless of where your editor initiates the language
server from:

```javascript
parserOptions: {
  ecmaVersion: "latest",
  sourceType: "module",
  project: "./tsconfig.json",
  tsconfigRootDir: import.meta.dirname, // <-- Added this
}
```

apps/backend/tsconfig.json
I explicitly added "include": ["src/**/*"] to the root of your configuration. This guarantees that your language server correctly
associates src/index.ts as part of the project being linted.

You may need to restart the ESLint language server or reload the Zed window (Command Palette -> workspace: reload or just reopen
the editor window) for the changes to take effect, but the error should be completely gone!

Currently i have solved this issue but the tsconfig.json should be present in packages/typescript-config from there we have to
import. Because the max code of tsconfig.json is already present in packages/typescript-config.

Previously by tsconfig.json should be like this

```
{
  "compileroptions": {
    // environment setup & latest features
    "lib": ["esnext"],
    "target": "esnext",
    "module": "esnext",
    "moduledetection": "force",
    "jsx": "react-jsx",
    "allowjs": true,

    // bundler mode
    "moduleresolution": "bundler",
    "allowimportingtsextensions": true,
    "verbatimmodulesyntax": true,
    "noemit": true,

    // best practices
    "strict": true,
    "skiplibcheck": true,
    "nofallthroughcasesinswitch": true,
    "nouncheckedindexedaccess": true,

    // some stricter flags (disabled by default)
    "nounusedlocals": false,
    "nounusedparameters": false,
    "nopropertyaccessfromindexsignature": false
  },
  "include": ["src/**/*"]
}

```

Now after importing from packages/typescript-config/base.json it is like this

```
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "allowJs": true,
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noPropertyAccessFromIndexSignature": false
  },
  "include": ["src/**/*"]
}
```

It will be same for eslint also by default my eslint.config.js is like this

```

// 🧠 Universal ESLint + Prettier config for Bun projects
import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

let tsPlugin;
try {
  tsPlugin = await import("@typescript-eslint/eslint-plugin");
} catch {}

const baseConfig = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        Bun: "readonly",
      },
    },
    rules: {
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "warn",
      "no-mixed-spaces-and-tabs": "error",
      "no-trailing-spaces": "warn",
      "object-curly-spacing": ["error", "always"],
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];

if (tsPlugin) {
  baseConfig.push({
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: (await import("@typescript-eslint/parser")).default,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin.default,
    },
    rules: {
      ...tsPlugin.default.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
    },
  });
}

baseConfig.push(
  {
    ignores: ["node_modules", "dist", "build", ".next", ".turbo"],
  },
  prettier
);

export default baseConfig;
```

Now it is like this imported from packages/eslint-config/base

```
import { config } from "@repo/eslint-config/base";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    languageOptions: {
      globals: {
        Bun: "readonly",
      },
    },
  },
];
```

There is an error

```
Could not find a declaration file for module '@repo/eslint-config/base'. '/Users/yaswanthgudivada/Documents/Learnings/HarkiratSingh/Cohort-2/FSD/Programs/week_16/week_16.2/monorepo-project-2/packages/eslint-config/base.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/repo__eslint-config` if it exists or add a new declaration (.d.ts) file containing `declare module '@repo/eslint-config/base';`
```

To solve this
The reason you're seeing that TypeScript error is because the @repo/eslint-config package exports its configurations as pure
JavaScript files (base.js, next.js, etc.) without providing corresponding TypeScript declaration (.d.ts) files. Since your other
projects are checking types or running in strict TypeScript mode, TS complains about the missing types.

To fix this properly, I've created the missing declaration files directly in the packages/eslint-config/ package:

packages/eslint-config/base.d.ts

```
import type { Linter } from "eslint";
export const config: Linter.Config[];

```

packages/eslint-config/next.d.ts

```
import type { Linter } from "eslint";
export const nextJsConfig: Linter.Config[];

```

packages/eslint-config/react-internal.d.ts

```
import type { Linter } from "eslint";
export const config: Linter.Config[];
```

These simply declare the exported config variables as import type { Linter } from "eslint"; Linter.Config[] arrays.

The error should now be completely suppressed in your editor.

So we can remove those dependencies from package.json also by default my package.json looks like this

```
{
  "name": "backend",
  "module": "src/index.ts",
  "type": "module",
  "private": true,
  "devDependencies": {
    "@types/bun": "latest",
    "eslint": "^9.33.0",
    "@eslint/js": "^9.33.0",
    "eslint-config-prettier": "^9.1.0",
    "globals": "^15.9.0",
    "prettier": "^3.3.3",
    "@typescript-eslint/parser": "^8.11.0",
    "@typescript-eslint/eslint-plugin": "^8.11.0"
  },
  "peerDependencies": {
    "typescript": "^5"
  },
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:json": "eslint . --format json",
    "format": "prettier --write ."
  }
}
```

Now after importing from packages/ we can remove because already in packages folder package.json is available. In that those
dependencies are available now my package.json looks like this in bunjs backend app

```
{
  "name": "backend",
  "module": "src/index.ts",
  "type": "module",
  "private": true,
  "devDependencies": {
    "@types/bun": "latest",
    "eslint": "^9.33.0",
    "prettier": "^3.3.3",
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*"
  },
  "peerDependencies": {
    "typescript": "^5"
  },
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:json": "eslint . --format json",
    "format": "prettier --write ."
  },
  "dependencies": {
    "@types/express": "^5.0.6",
    "express": "^5.2.1"
  }
}
```

Here in my monorepo if i run bun run dev all web docs react-app is running but why backend is not running?
In package.json in scripts there is no dev so tubro is not able to find it

```
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:json": "eslint . --format json",
    "format": "prettier --write ."
  },
```

so add that line

```
  "scripts": {
    "dev": "bun --watch src/index.ts",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:json": "eslint . --format json",
    "format": "prettier --write ."
  },
```

Now from packages/ folder bunjs project should import something ui is not impoted by bunjs backend project so create a folder and
name it as common in packages/ folder. packages/common. Inside this we create some another bun-project and we initialize express
and try to import from this common. Import to docs web react-app backend. we will try to import from packages/common.

Before writing code manange eslint.config.js and tsconfig.js that extends from packages/typescript-config and packages/eslint-config
and also in package.json change the name to "name": "common" to "name": "@repo/common" and we have to add exports also in
package.json file then only apps/ folder should able to see and import it.

```
  "exports": {
    "./*": "./src/*.ts"
  },
```

packages/common/src/index.ts

```
export const VALUE = 'Yaswanth Gudivada';

// This URL may be needed by both backend and frontend so i kept this in common inside packages
// packages/common
export const BACKEND_URL = 'https://api.google.com';
```

Now globally install all the dependencies once by bun install

Now let's try to import these in apps/ folder.
In backend/src/index.js i imported the VALUE

```
import express from 'express';
import { VALUE } from '@repo/common/index';

const app = express();
const PORT = 5050;

app.use(express.json());
console.log(`Name of the VALUE is: ${VALUE}`);

app.get('/healthy', (_req, res) => {
  res.status(200).json({
    message: 'Server is healthy',
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening in the http://localhost:${PORT}`);
});
```

Now when i run it prints Name of the VALUE is: Yaswanth Gudivada
Which means it is imported and working properly.
Again remember in backend/package.json in dependencies i have not done this `"@repo/common": "*"` but still it is working because
in root node_modules inside @repo common is present so it is working. So don't forget to add `"@repo/common": "*"` in package.json
of backend like this.

```
  "dependencies": {
    "@repo/common": "*",
    "@types/express": "^5.0.6",
    "express": "^5.2.1"
  }
```

We are not getting any issues here and working proeprly because we are using bun it is managing typescript to convert into js
but if we use tsc compiler we get some export issues (export const VALUE = 'Yaswanth Gudivada';) from here we get some export
issues. To solve these we have to use tsup or esbuild compilers.
