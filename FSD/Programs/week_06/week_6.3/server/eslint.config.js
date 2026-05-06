// Universal ESLint config for Bun projects (JS + TS)
import js from "@eslint/js";

// Check if TypeScript is available
let tsPlugin;
try {
    tsPlugin = await import("@typescript-eslint/eslint-plugin");
} catch {
    // TypeScript not available, continue with JS only
}

const baseConfig = [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                // Bun globals
                Bun: "readonly",
                // Node.js globals for compatibility
                process: "readonly",
                console: "readonly",
                Buffer: "readonly",
                __dirname: "readonly",
                __filename: "readonly",
                global: "readonly",
                require: "readonly",
                module: "readonly",
                exports: "readonly",
            },
        },
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off",
        },
    },
];

// Add TypeScript config if available
if (tsPlugin) {
    baseConfig.push({
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: await import("@typescript-eslint/parser"),
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

export default baseConfig;
