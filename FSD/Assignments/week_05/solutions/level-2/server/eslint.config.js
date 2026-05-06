// JavaScript-only ESLint config for Bun projects
import js from "@eslint/js";

export default [
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
            "prefer-const": "error",
            "no-var": "error",
            "eqeqeq": ["error", "always"],
            "curly": ["error", "all"],
            "no-trailing-spaces": "error",
            "indent": ["error", 2],
            "quotes": ["error", "single"],
            "semi": ["error", "always"],
        },
    },
    {
        // Ignore common directories
        ignores: [
            "node_modules/**",
            "dist/**", 
            "build/**",
            "coverage/**",
            "*.min.js"
        ]
    }
];
