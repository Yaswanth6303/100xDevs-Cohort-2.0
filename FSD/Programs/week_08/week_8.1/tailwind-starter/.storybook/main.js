// To download storybook in existing project use this command
// pnpm dlx storybook init
// Select React + Vite

// To run storybook use this command
// pnpm run storybook
// To build storybook use this command
// pnpm run build-storybook
// To preview storybook use this command
// pnpm run preview
// Storybook helps us to opensource components.
// By using story book we can expose our components without rendering them in App.jsx
// Storybook is a place where we can locate all our components
// By using Storybook we can opensource certain components

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
